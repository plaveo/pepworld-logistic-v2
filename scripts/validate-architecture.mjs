#!/usr/bin/env node
// scripts/validate-architecture.mjs
// Validates the locked PEPWORLD Logistics V2 architecture constraints.
// Fails on any of the 12 critical violations listed below.

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

const registrySrc = readFileSync(resolve(root, "lib/registries.ts"), "utf8");
const typesSrc     = readFileSync(resolve(root, "lib/types.ts"),      "utf8");
const demoSrc      = readFileSync(resolve(root, "lib/demo-data.ts"),  "utf8");

// Pattern for valid engine IDs: ENG followed by exactly three digits.
const ENGINE_ID_PATTERN = /id:\s*"ENG\d{3}"/g;

// ---------------------------------------------------------------------------
// Rule 1 — Engine count must be exactly 120
// ---------------------------------------------------------------------------
console.log("\nRule 1 — Engine count exactly 120");
const engineIds = (registrySrc.match(ENGINE_ID_PATTERN) || []);
if (engineIds.length === 120) {
  pass(`ENGINE_CARD_REGISTRY: ${engineIds.length} engine entries (expected 120)`);
} else {
  fail(`ENGINE_CARD_REGISTRY: ${engineIds.length} engine entries — expected exactly 120`);
}

// ---------------------------------------------------------------------------
// Rule 2 — ENG001 through ENG120 must all be present in exact sequence
// ---------------------------------------------------------------------------
console.log("\nRule 2 — ENG001–ENG120 all present");
const missingEngines = [];
for (let i = 1; i <= 120; i++) {
  const id = `ENG${String(i).padStart(3, "0")}`;
  if (!registrySrc.includes(`"${id}"`)) {
    missingEngines.push(id);
  }
}
if (missingEngines.length === 0) {
  pass("ENG001–ENG120 all present in engine registry");
} else {
  fail(`Missing engine IDs: ${missingEngines.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Rule 3 — No active engine ID may begin with EC-
// ---------------------------------------------------------------------------
console.log("\nRule 3 — No EC- engine IDs");
const ecIds = (registrySrc.match(/id:\s*"EC-\d+"/g) || []);
if (ecIds.length === 0) {
  pass("No EC- engine IDs found in registry (correct)");
} else {
  fail(`Found ${ecIds.length} retired EC- engine ID(s) still active: ${ecIds.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Rule 4 — UI module count must be exactly 50
// ---------------------------------------------------------------------------
console.log("\nRule 4 — UI module count exactly 50");
const uiCount = (registrySrc.match(/id:\s*"UI-\d+"/g) || []).length;
if (uiCount === 50) {
  pass(`UI_MODULE_REGISTRY: ${uiCount} UI modules (expected 50)`);
} else {
  fail(`UI_MODULE_REGISTRY: ${uiCount} UI modules — expected exactly 50`);
}

// ---------------------------------------------------------------------------
// Rule 5 — Map-card count must be exactly 12
// ---------------------------------------------------------------------------
console.log("\nRule 5 — Map-card count exactly 12");
const mapIds = (registrySrc.match(/id:\s*"MC\d{2}"/g) || []);
if (mapIds.length === 12) {
  pass(`MAP_CARD_REGISTRY: ${mapIds.length} map cards (expected 12)`);
} else {
  fail(`MAP_CARD_REGISTRY: ${mapIds.length} map cards — expected exactly 12`);
}

// ---------------------------------------------------------------------------
// Rule 6 — Approved MC01–MC12 cards must all be present
// ---------------------------------------------------------------------------
console.log("\nRule 6 — MC01–MC12 all present");
const approvedMapCards = [
  "MC01","MC02","MC03","MC04","MC05","MC06",
  "MC07","MC08","MC09","MC10","MC11","MC12",
];
const missingMapCards = approvedMapCards.filter((id) => !registrySrc.includes(`"${id}"`));
if (missingMapCards.length === 0) {
  pass("All approved map cards MC01–MC12 are present");
} else {
  fail(`Missing approved map card IDs: ${missingMapCards.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Rule 7 — Retired generic map-card names must not remain active
// ---------------------------------------------------------------------------
console.log("\nRule 7 — No retired generic map-card names active");
const retiredNames = [
  "RouteIntelligenceMapCard",
  "VehicleIntelligenceMapCard",
  "WarehouseIntelligenceMapCard",
  "CarrierIntelligenceMapCard",
  "OrderIntelligenceMapCard",
  "DemandIntelligenceMapCard",
  "NetworkIntelligenceMapCard",
  "ComplianceMapCard",
  "CostIntelligenceMapCard",
  "RiskIntelligenceMapCard",
  "DataQualityMapCard",
  "LineageMapCard",
];
const foundRetired = retiredNames.filter((name) => registrySrc.includes(name));
if (foundRetired.length === 0) {
  pass("No retired generic map-card names found in registry");
} else {
  fail(`Retired map-card names still active: ${foundRetired.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Rule 8 — No component may have releaseState "live"
// ---------------------------------------------------------------------------
console.log('\nRule 8 — No releaseState "live" anywhere');
const liveInRegistry = /releaseState:\s*["']live["']/.test(registrySrc);
const liveInDemo     = /releaseState:\s*["']live["']/.test(demoSrc);
const liveInTypes    = /["|']\s*live\s*["|']/.test(
  (typesSrc.match(/export type ReleaseState[\s\S]*?;/) || [""])[0]
);
if (liveInTypes) {
  fail('"live" is still present in ReleaseState type definition — must be removed');
} else {
  pass('"live" is not in the ReleaseState type definition');
}
if (liveInRegistry) {
  fail('releaseState "live" found in lib/registries.ts');
} else {
  pass('No releaseState "live" in lib/registries.ts');
}
if (liveInDemo) {
  fail('releaseState "live" found in lib/demo-data.ts');
} else {
  pass('No releaseState "live" in lib/demo-data.ts');
}

// ---------------------------------------------------------------------------
// Rule 9 — Demo response must not return GO, CAUTION, or AVOID
// ---------------------------------------------------------------------------
console.log("\nRule 9 — Demo decisionSignal must be NOT_COMPUTED");
const goMatch      = /decisionSignal:\s*["']GO["']/.test(demoSrc);
const cautionMatch = /decisionSignal:\s*["']CAUTION["']/.test(demoSrc);
const avoidMatch   = /decisionSignal:\s*["']AVOID["']/.test(demoSrc);
if (goMatch || cautionMatch || avoidMatch) {
  fail(`Demo response contains a forbidden decisionSignal — GO: ${goMatch}, CAUTION: ${cautionMatch}, AVOID: ${avoidMatch}`);
} else {
  pass("Demo response does not return GO, CAUTION, or AVOID");
}
const notComputedMatch = /decisionSignal:\s*["']NOT_COMPUTED["']/.test(demoSrc);
if (notComputedMatch) {
  pass('Demo decisionSignal is "NOT_COMPUTED" (correct)');
} else {
  fail('Demo decisionSignal is not set to "NOT_COMPUTED"');
}

// ---------------------------------------------------------------------------
// Rule 10 — Demo operational values must not contain fabricated numbers
// ---------------------------------------------------------------------------
console.log("\nRule 10 — No fabricated operational numbers in demo");
const fabricatedPatterns = [
  /(?:capacityUnits|capacityUsed|openSlots|utilization|completenessScore|travelTime|routeDistance)\s*:\s*\d+/,
];
const fabricated = fabricatedPatterns.filter((p) => p.test(demoSrc));
if (fabricated.length === 0) {
  pass("No fabricated operational numbers found in demo data");
} else {
  fail(`Fabricated operational values found in demo data (${fabricated.length} pattern(s) matched)`);
}

// ---------------------------------------------------------------------------
// Rule 11 — No map card may have decisionAuthority: true
// ---------------------------------------------------------------------------
console.log("\nRule 11 — No map card has decisionAuthority: true");
const decisionAuthorityTrue = /decisionAuthority:\s*true/.test(registrySrc);
if (decisionAuthorityTrue) {
  fail("A map card has decisionAuthority: true — must always be false (Build Rule 4)");
} else {
  pass("No map card has decisionAuthority: true (correct)");
}

// ---------------------------------------------------------------------------
// Rule 12 — No engine claims an active production data connection
// ---------------------------------------------------------------------------
console.log("\nRule 12 — No engine claims active production data connection");
const productionClaims = [
  /verified Zebra/i,
  /verified GPS/i,
  /WMS records/i,
  /telematics data/i,
  /dispatch system/i,
  /real-time vehicle/i,
  /live.*data/i,
  /contract connection/i,
];
const foundClaims = productionClaims.filter((p) => p.test(registrySrc));
if (foundClaims.length === 0) {
  pass("No active production data connection claims found in engine registry");
} else {
  fail(`Engine registry contains ${foundClaims.length} production data connection claim(s)`);
}

// ---------------------------------------------------------------------------
// Build Rules 4 & 6 — MapCardOutput must not carry decisionSignal
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 4 — MapCardOutput must not carry decisionSignal");
const mapCardOutputMatch = typesSrc.match(
  /export interface MapCardOutput \{([\s\S]*?)\}/
);
if (!mapCardOutputMatch) {
  fail("MapCardOutput interface not found in lib/types.ts");
} else {
  const block = mapCardOutputMatch[1];
  if (/decisionSignal/.test(block)) {
    fail("MapCardOutput contains a decisionSignal field — decisions must be emitted at workbench level only");
  } else {
    pass("MapCardOutput does not contain decisionSignal");
  }
}

// ---------------------------------------------------------------------------
// Build Rule 6 — Integrity fields preserved on EngineCardOutput & MapCardOutput
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 6 — Integrity fields preserved");

/**
 * Recursively collects all field declarations visible on a TypeScript interface,
 * following `extends` chains.
 *
 * @param {string} src        - Full source text of the TypeScript file.
 * @param {string} ifaceName  - Name of the interface to collect fields from.
 * @param {Set<string>} visited - Guards against circular inheritance (should be omitted by callers).
 * @returns {string} Concatenated body text of the interface and all its base interfaces.
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

const integrityFields = ["status", "missingInput", "confidence", "freshness", "releaseState"];
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
// Build Rule 8 — isDemoPayload present on all output interfaces
// ---------------------------------------------------------------------------
console.log("\nBuild Rule 8 — isDemoPayload on all output interfaces");
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
