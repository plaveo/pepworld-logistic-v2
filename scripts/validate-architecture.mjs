#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const registry = readFileSync(resolve(root, "lib/registries.ts"), "utf8");
const demo = readFileSync(resolve(root, "lib/demo-data.ts"), "utf8");
const types = readFileSync(resolve(root, "lib/types.ts"), "utf8");
const workbench = readFileSync(
  resolve(root, "components/logistics-workbench.tsx"),
  "utf8"
);

const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const engineIds = [...registry.matchAll(/id:\s*"(ENG\d{3})"/g)].map((match) => match[1]);
const uiIds = [...registry.matchAll(/id:\s*"(UI\d{2})"/g)].map((match) => match[1]);
const mapIds = [...registry.matchAll(/id:\s*"(MC\d{2})"/g)].map((match) => match[1]);

const expectedEngines = Array.from(
  { length: 120 },
  (_, index) => `ENG${String(index + 1).padStart(3, "0")}`
);
const expectedUi = Array.from(
  { length: 50 },
  (_, index) => `UI${String(index + 1).padStart(2, "0")}`
);
const expectedMap = Array.from(
  { length: 12 },
  (_, index) => `MC${String(index + 1).padStart(2, "0")}`
);

assert(engineIds.length === 120, `Expected 120 engines, found ${engineIds.length}`);
assert(JSON.stringify(engineIds) === JSON.stringify(expectedEngines), "ENG001–ENG120 sequence is incomplete or out of order");
assert(!/id:\s*"EC-\d+"/.test(registry), "Retired EC- engine IDs remain");
assert(uiIds.length === 50, `Expected 50 UI modules, found ${uiIds.length}`);
assert(JSON.stringify(uiIds) === JSON.stringify(expectedUi), "UI01–UI50 sequence is incomplete or out of order");
assert(mapIds.length === 12, `Expected 12 map cards, found ${mapIds.length}`);
assert(JSON.stringify(mapIds) === JSON.stringify(expectedMap), "MC01–MC12 sequence is incomplete or out of order");

const requiredMapNames = [
  "Map Answer",
  "Selected Connection",
  "Route Intelligence",
  "Node Intelligence",
  "Ecosystem Context",
  "Territory and Coverage",
  "Data Condition",
  "Evidence and Lineage",
  "Compatibility",
  "Capacity and Availability",
  "Alternatives",
  "Dependency and Support",
];
for (const name of requiredMapNames) {
  assert(registry.includes(`displayName: "${name}"`), `Missing map card: ${name}`);
}

assert(!/releaseState:\s*"live"/.test(registry + demo), 'releaseState "live" remains');
assert(!/\|\s*"live"/.test(types), '"live" remains in ReleaseState');
assert(!/decisionSignal:\s*"(GO|CAUTION|AVOID)"/.test(demo), "Demo emits GO, CAUTION or AVOID");
assert(/decisionSignal:\s*"NOT_COMPUTED"/.test(demo), "Demo does not use NOT_COMPUTED");
assert(!/decisionAuthority:\s*true/.test(registry + demo), "A map card has decision authority");
assert(!/(capacityUnits|capacityUsed|openSlots|utilization|travelTime|routeDistance)\s*:\s*\d+/.test(demo), "Demo includes fabricated operational values");
assert(!/(verified Zebra|verified GPS|WMS records|telematics data|dispatch system|real-time vehicle)/i.test(registry), "Engine registry claims a production connection");
assert(workbench.includes('"MC01"') && workbench.includes('"MC12"'), "Workbench does not use MC01–MC12");

if (errors.length > 0) {
  console.error("Architecture validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Architecture validation passed.");
console.log("120 engines · 50 UI modules · 12 map cards · demo NOT_COMPUTED");
