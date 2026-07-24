#!/usr/bin/env node
// scripts/validate-architecture.mjs
// Validates the locked PEPWORLD Logistics V2 architecture constraints.
// Build Rule 3: 120 engine cards, 50 UI modules and 12 map cards must exist
//               as separate registry entries.
// Build Rule 4: MapCardOutput must never carry a decisionSignal field.
// Build Rule 6: Five integrity fields must be present on all output interfaces.

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function pass(msg) {
  console.log(`  ✅  ${msg}`);
  passed++;
}

function fail(msg) {
  console.error(`  ❌  ${msg}`);
  failed++;
}

// ---------------------------------------------------------------------------
// 1. Registry counts — Build Rule 3
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 3 — Registry counts");

const registrySrc = readFileSync(resolve(root, "lib/registries.ts"), "utf8");

const engineCount = (registrySrc.match(/id:\s*"EC-\d+"/g) || []).length;
const mapCount    = (registrySrc.match(/id:\s*"MC-\d+"/g) || []).length;
const uiCount     = (registrySrc.match(/id:\s*"UI-\d+"/g) || []).length;

if (engineCount === 120) {
  pass(`ENGINE_CARD_REGISTRY: ${engineCount} engine cards (expected 120)`);
} else {
  fail(`ENGINE_CARD_REGISTRY: ${engineCount} engine cards — expected exactly 120`);
}

if (mapCount === 12) {
  pass(`MAP_CARD_REGISTRY: ${mapCount} map cards (expected 12)`);
} else {
  fail(`MAP_CARD_REGISTRY: ${mapCount} map cards — expected exactly 12`);
}

if (uiCount === 50) {
  pass(`UI_MODULE_REGISTRY: ${uiCount} UI modules (expected 50)`);
} else {
  fail(`UI_MODULE_REGISTRY: ${uiCount} UI modules — expected exactly 50`);
}

// ---------------------------------------------------------------------------
// 2. MapCardOutput must not carry decisionSignal — Build Rule 4
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 4 — MapCardOutput must not carry decisionSignal");

const typesSrc = readFileSync(resolve(root, "lib/types.ts"), "utf8");

// Extract only the MapCardOutput interface block
const mapCardOutputMatch = typesSrc.match(
  /export interface MapCardOutput \{([\s\S]*?)\}/
);
if (!mapCardOutputMatch) {
  fail("MapCardOutput interface not found in lib/types.ts");
} else {
  const mapCardBlock = mapCardOutputMatch[1];
  if (/decisionSignal/.test(mapCardBlock)) {
    fail("MapCardOutput contains a decisionSignal field — decisions must be emitted at workbench level only");
  } else {
    pass("MapCardOutput does not contain decisionSignal (correct: decisions live at workbench level)");
  }
}

// ---------------------------------------------------------------------------
// 3. Integrity fields on EngineCardOutput and MapCardOutput — Build Rule 6
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 6 — Integrity fields preserved");

const integrityFields = ["status", "missingInput", "confidence", "freshness", "releaseState"];

/**
 * Collect all fields visible on an interface, following `extends` chains.
 * This handles interfaces that inherit fields from a base interface.
 */
function collectFields(src, ifaceName, visited = new Set()) {
  if (visited.has(ifaceName)) return "";
  visited.add(ifaceName);

  const ifaceMatch = src.match(
    new RegExp(`export interface ${ifaceName}(?:\\s+extends\\s+([\\w,\\s]+))?\\s*\\{([\\s\\S]*?)\\}`)
  );
  if (!ifaceMatch) return "";

  let fields = ifaceMatch[2] || "";
  const extendsClause = ifaceMatch[1];
  if (extendsClause) {
    for (const base of extendsClause.split(",").map((s) => s.trim())) {
      fields += collectFields(src, base, visited);
    }
  }
  return fields;
}

for (const iface of ["EngineCardOutput", "MapCardOutput"]) {
  const allFields = collectFields(typesSrc, iface);
  if (!allFields) {
    fail(`${iface} interface not found in lib/types.ts`);
    continue;
  }
  const missing = integrityFields.filter((f) => !new RegExp(`\\b${f}\\b`).test(allFields));
  if (missing.length === 0) {
    pass(`${iface} carries all five integrity fields`);
  } else {
    fail(`${iface} is missing integrity fields: ${missing.join(", ")}`);
  }
}

// ---------------------------------------------------------------------------
// 4. MapCardOutput must carry version field — Data Contract
// ---------------------------------------------------------------------------
console.log("\nData Contract — MapCardOutput version field");

const mapCardBlock2 = (typesSrc.match(/export interface MapCardOutput \{([\s\S]*?)\}/) || [])[1] || "";
if (/\bversion\b/.test(mapCardBlock2)) {
  pass("MapCardOutput carries version field");
} else {
  fail("MapCardOutput is missing the version field required by the Data Contract");
}

// ---------------------------------------------------------------------------
// 5. isDemoPayload labeling — Build Rule 8
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 8 — isDemoPayload present on output interfaces");

for (const iface of ["EngineCardOutput", "MapCardOutput", "IntelligenceResponse"]) {
  const ifaceMatch = typesSrc.match(
    new RegExp(`export interface ${iface}[^{]*\\{([\\s\\S]*?)\\}`)
  );
  if (!ifaceMatch) {
    fail(`${iface} not found`);
    continue;
  }
  if (/isDemoPayload/.test(ifaceMatch[1])) {
    pass(`${iface} carries isDemoPayload`);
  } else {
    fail(`${iface} is missing isDemoPayload`);
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\n${"─".repeat(60)}`);
console.log(`Architecture validation: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  console.error(`\nARCHITECTURE VALIDATION FAILED — ${failed} constraint(s) violated.\n`);
  process.exit(1);
} else {
  console.log(`\nARCHITECTURE VALIDATION PASSED — all constraints satisfied.\n`);
  process.exit(0);
}
