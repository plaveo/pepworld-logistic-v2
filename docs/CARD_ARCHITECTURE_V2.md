# Card Architecture V2

## Overview

PEPWORLD Logistics Intelligence V2 uses a three-tier card architecture to separate computation, presentation and decision-making concerns.

---

## Tier 1 — Engine Cards (120 total)

Engine cards are the atomic computation units of the system. Each card is an independent component class that:

- Reads from a single verified data source (Zebra, CIS, WMS, OMS, GPS feeds, etc.)
- Produces an `EngineCardOutput` with the full set of integrity fields
- Never fabricates any value (capacity, availability, utilization, route time, coordinates, verification or evidence)
- Tags its output with `isDemoPayload: true` when operating on mock data

### Integrity fields (preserved on every `EngineCardOutput`)

| Field | Type | Description |
|---|---|---|
| `status` | `RecordStatus` | Current record health |
| `missingInput` | `string[]` | Absent required input signals |
| `confidence` | `ConfidenceLevel` | Data confidence rating |
| `freshness` | ISO 8601 string | Timestamp of last verified data update |
| `releaseState` | `ReleaseState` | Lifecycle stage of this card output |

### Domain groups

| Range | Domain |
|---|---|
| EC-001–EC-020 | Route Intelligence |
| EC-021–EC-040 | Vehicle Intelligence |
| EC-041–EC-060 | Warehouse Intelligence |
| EC-061–EC-080 | Carrier Intelligence |
| EC-081–EC-100 | Demand & Order Intelligence |
| EC-101–EC-120 | Network & System Intelligence |

---

## Tier 2 — Map Cards (12 total)

Map cards aggregate engine card outputs and produce human-readable explanations. Each map card:

- Accepts one or more `EngineCardOutput` records
- Produces a `MapCardOutput` with an `explanation` string
- **Does NOT emit a `GO` / `CAUTION` / `AVOID` signal** — decisions are made at the workbench level only
- Preserves all integrity fields from its engine inputs
- Displays full source lineage when evidence is available

| ID | Name | Domain |
|---|---|---|
| MC-001 | RouteIntelligenceMapCard | Route capacity, availability, utilisation |
| MC-002 | VehicleIntelligenceMapCard | Vehicle status, location, compliance |
| MC-003 | WarehouseIntelligenceMapCard | Warehouse capacity, throughput, alerts |
| MC-004 | CarrierIntelligenceMapCard | Carrier performance, SLA, availability |
| MC-005 | OrderIntelligenceMapCard | Order priority, exceptions, delivery |
| MC-006 | DemandIntelligenceMapCard | Demand forecast, volatility |
| MC-007 | NetworkIntelligenceMapCard | Network congestion, capacity |
| MC-008 | ComplianceMapCard | Regulatory compliance across domains |
| MC-009 | CostIntelligenceMapCard | Cost aggregation across domains |
| MC-010 | RiskIntelligenceMapCard | Composite risk scores |
| MC-011 | DataQualityMapCard | Data freshness, confidence, missing inputs |
| MC-012 | LineageMapCard | Full source lineage explorer |

---

## Tier 3 — UI Modules (50 total)

UI modules are the presentational layer. Each module:

- Accepts a single `EngineCardOutput` or `MapCardOutput`
- Renders the integrity fields and payload in a specific visual format
- Never makes or implies a logistics decision

UI modules are grouped by domain to mirror the engine card domains:

- UI-001–UI-010: Route modules
- UI-011–UI-020: Vehicle modules
- UI-021–UI-030: Warehouse modules
- UI-031–UI-040: Carrier modules
- UI-041–UI-050: Order, Network and System modules

---

## Decision Flow

```
Raw Data Sources
     │
     ▼
Engine Cards (120) ── produce EngineCardOutput (with integrity fields)
     │
     ▼
Map Cards (12) ──── produce MapCardOutput (explanation only, no decision)
     │
     ▼
Workbench ────────── emits GO / CAUTION / AVOID + decisionReason
     │
     ▼
UI Modules (50) ──── render results to operator
```

---

## Build Rules Reference

See [AGENTS.md](../AGENTS.md) for the full rule set.
