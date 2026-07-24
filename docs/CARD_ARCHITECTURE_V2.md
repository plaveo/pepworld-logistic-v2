# Card Architecture V2

## Overview

PEPWORLD Logistics Intelligence V2 uses a three-tier card architecture to separate computation, presentation and decision-making concerns.

---

## Tier 1 — Engine Cards (120 total)

Engine cards are the atomic computation units of the system. Each card is an independent component class identified by an official ENG ID.

**Scaffold state:** Official engine titles are PENDING. No names, formulas, calculations, data sources or live connections are recorded until officially supplied.

- Produces an `EngineCardOutput` with the full set of integrity fields
- Never fabricates any value (capacity, availability, utilization, route time, coordinates, verification or evidence)
- Tags its output with `isDemoPayload: true` when operating on demonstration data
- `connectionStatus` is `NOT_CONNECTED` until an approved data-connection task is implemented
- `calculationStatus` is `NOT_YET_COMPUTED` until a released engine is connected

### Integrity fields (preserved on every `EngineCardOutput`)

| Field | Type | Description |
|---|---|---|
| `status` | `RecordStatus` | Current record health |
| `missingInput` | `string[]` | Absent required input signals |
| `confidence` | `ConfidenceLevel` | Data confidence rating |
| `freshness` | ISO 8601 string | Timestamp of last verified data update |
| `releaseState` | `ReleaseState` | Lifecycle stage — scaffold engines are `draft` |

### Engine ID sequence

| Range | Status |
|---|---|
| ENG001–ENG120 | Registered scaffold (PENDING_OFFICIAL_TITLE) |

---

## Tier 2 — Map Cards (12 total)

Map cards aggregate engine card outputs and produce human-readable explanations. Each map card:

- Accepts one or more `EngineCardOutput` records
- Produces a `MapCardOutput` with an `explanation` string
- **Does NOT emit a `GO` / `CAUTION` / `AVOID` signal** — decisions are made at the workbench level only
- `decisionAuthority` is always `false`
- Preserves all integrity fields from its engine inputs
- Displays full source lineage when evidence is available

| ID | Display Name | Category |
|---|---|---|
| MC01 | MapAnswer | CORE |
| MC02 | SelectedConnection | CORE |
| MC03 | RouteIntelligence | CORE |
| MC04 | NodeIntelligence | CORE |
| MC05 | EcosystemContext | CORE |
| MC06 | TerritoryandCoverage | CORE |
| MC07 | DataCondition | CORE |
| MC08 | EvidenceandLineage | CORE |
| MC09 | Compatibility | CONDITIONAL |
| MC10 | CapacityandAvailability | CONDITIONAL |
| MC11 | Alternatives | CONDITIONAL |
| MC12 | DependencyandSupport | CONDITIONAL |

---

## Tier 3 — UI Modules (50 total)

UI modules are the presentational layer. Each module:

- Accepts a single `EngineCardOutput` or `MapCardOutput`
- Renders the integrity fields and payload in a specific visual format
- Never makes or implies a logistics decision
- All modules are `releaseState: "draft"` in the scaffold state

UI modules are grouped by domain to mirror the engine card domains:

- UI-001–UI-010: Route modules
- UI-011–UI-020: Vehicle modules
- UI-021–UI-030: Warehouse modules
- UI-031–UI-040: Carrier modules
- UI-041–UI-050: Order, Network and System modules

---

## Decision Flow

```
Raw Data Sources (NOT CONNECTED in scaffold state)
     │
     ▼
Engine Cards (120, ENG001–ENG120) ── produce EngineCardOutput (integrity fields)
     │
     ▼
Map Cards (12, MC01–MC12) ────────── produce MapCardOutput (explanation only, no decision)
     │
     ▼
Workbench ──────────────────────────── emits decisionSignal (NOT_COMPUTED until engines released)
     │
     ▼
UI Modules (50) ─────────────────────── render results to operator
```

---

## Scaffold Release States

No scaffold component is marked `live`. Approved `ReleaseState` values for this scaffold:

| Value | Meaning |
|---|---|
| `draft` | Registered but not yet reviewed or connected |
| `review` | Under active review — not released |
| `approved` | Approved but not yet deployed |
| `deprecated` | Retired from active use |

---

## Build Rules Reference

See [AGENTS.md](../AGENTS.md) for the full rule set.
