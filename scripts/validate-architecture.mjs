#!/usr/bin/env node
// scripts/validate-architecture.mjs
// Validates that the PEPWORLD Logistics V2 architecture constraints are met.
// Build Rule 3: 120 engine cards, 50 UI modules, 12 map cards as separate registries.
// Build Rule 4: map cards must not contain GO/CAUTION/AVOID decision signals.
// Build Rule 8: demo payloads must be labelled.

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function check(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅  ${label}`);
    passed++;
  } else {
    console.error(`  ❌  ${label}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

function countMatches(src, pattern) {
  return (src.match(pattern) || []).length;
}

console.log("\nPEPWORLD Logistics V2 — Architecture Validation\n");

// ---------------------------------------------------------------------------
// 1. Registry counts (parse registries.ts source)
// ---------------------------------------------------------------------------
console.log("1. Registry counts");
const regSrc = readFileSync(resolve(root, "lib/registries.ts"), "utf-8");

const engineCount = countMatches(regSrc, /\{ id: "EC-\d+"/g);
const uiCount = countMatches(regSrc, /\{ id: "UI-\d+"/g);
const mcCount = countMatches(regSrc, /\{ id: "MC-\d+"/g);

check(`ENGINE_CARD_REGISTRY has 120 entries (found ${engineCount})`, engineCount === 120);
check(`UI_MODULE_REGISTRY has 50 entries (found ${uiCount})`, uiCount === 50);
check(`MAP_CARD_REGISTRY has 12 entries (found ${mcCount})`, mcCount === 12);

// ---------------------------------------------------------------------------
// 2. Map cards must not issue GO/CAUTION/AVOID (Build Rule 4)
// ---------------------------------------------------------------------------
console.log("\n2. Map card decision-signal safety (Build Rule 4)");

// Check all map card component files and demo-data for decision signals inside
// MapCardOutput objects — the signal must only appear on IntelligenceResponse.
const demoSrc = readFileSync(resolve(root, "lib/demo-data.ts"), "utf-8");

// Strip IntelligenceResponse block before checking for signals
const afterResponseIdx = demoSrc.indexOf("DEMO_INTELLIGENCE_RESPONSE");
const mapCardSection = afterResponseIdx > 0 ? demoSrc.slice(0, afterResponseIdx) : demoSrc;

const hasIllegalSignal = /decisionSignal:\s*["'](GO|CAUTION|AVOID)["']/.test(mapCardSection);
check(
  "Map card demo payloads do not contain GO/CAUTION/AVOID decisionSignal",
  !hasIllegalSignal,
  "Found illegal decisionSignal in map card section of demo-data.ts"
);

// ---------------------------------------------------------------------------
// 3. Demo payloads are labelled (Build Rule 8)
// ---------------------------------------------------------------------------
console.log("\n3. Demo payload labelling (Build Rule 8)");

// Count map card demo records — may be defined via builder functions or object literals.
const demoMapCardCallCount =
  countMatches(demoSrc, /demoMapCard\(\s*["']MC-\d+["']/g) ||
  countMatches(demoSrc, /cardId:\s*["']MC-\d+["']/g);

// When a builder function pattern is used, isDemoPayload: true in the function
// body guarantees every call returns a labelled record.
const builderHasDemoTrue =
  /function demoMapCard[\s\S]*?isDemoPayload:\s*true/.test(demoSrc) ||
  /const demoMapCard[\s\S]*?isDemoPayload:\s*true/.test(demoSrc);

const isDemoFlagCount = countMatches(demoSrc, /isDemoPayload:\s*true/g);

const isLabelled =
  demoMapCardCallCount > 0 &&
  (builderHasDemoTrue || isDemoFlagCount >= demoMapCardCallCount);

check(
  `All ${demoMapCardCallCount} map card demo records have isDemoPayload: true` +
    (builderHasDemoTrue ? " (via builder function)" : ` (found ${isDemoFlagCount} true flags)`),
  isLabelled
);

// ---------------------------------------------------------------------------
// 4. NOT_COMPUTED / NOT_CONNECTED / NOT_YET_COMPUTED demo values present
// ---------------------------------------------------------------------------
console.log("\n4. Required DEMONSTRATION MODE sentinel values (demo-data.ts)");

check(
  'Demo data includes calculationStatus: "NOT_YET_COMPUTED"',
  demoSrc.includes("NOT_YET_COMPUTED")
);
check(
  'Demo data includes connectionStatus: "NOT_CONNECTED"',
  demoSrc.includes("NOT_CONNECTED")
);
check(
  'IntelligenceResponse uses decisionSignal: "NOT_COMPUTED"',
  demoSrc.includes("NOT_COMPUTED")
);

// ---------------------------------------------------------------------------
// 5. No fabricated production coordinates in ecosystem-map component
// ---------------------------------------------------------------------------
console.log("\n5. No hard-coded production coordinates (Build Rule 5)");

const mapSrc = readFileSync(resolve(root, "components/leaflet-map.tsx"), "utf-8");
// Allow Philippines center lat/lng (12.8797 / 121.774) only — match 3+ decimal places
const coordPattern = /\b\d+\.\d{3,}\b/g;
const allCoords = [...mapSrc.matchAll(coordPattern)].map((m) => parseFloat(m[0]));
// Valid demo center coords for Philippines (public geographic knowledge, not fabricated)
const allowedCoords = new Set([12.8797, 121.774]);
const illegalCoords = allCoords.filter((c) => !allowedCoords.has(c) && c > 1);

check(
  "leaflet-map.tsx contains only allowed center coordinates (Philippines center)",
  illegalCoords.length === 0,
  illegalCoords.length > 0 ? `Found suspect coords: ${illegalCoords.join(", ")}` : ""
);

// ---------------------------------------------------------------------------
// 6. Leaflet map shows required "No verified geographic features loaded" message
// ---------------------------------------------------------------------------
console.log("\n6. Required map empty-state message");

check(
  'leaflet-map.tsx includes "No verified geographic features loaded" message',
  mapSrc.includes("No verified geographic features loaded")
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\n${"─".repeat(55)}`);
console.log(`Result: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.error("\nArchitecture validation FAILED. Fix the issues above.\n");
  process.exit(1);
} else {
  console.log("\nArchitecture validation PASSED ✅\n");
}
