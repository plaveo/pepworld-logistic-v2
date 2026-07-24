# Data Contract V2

## Purpose

This document defines the data contract between all producers and consumers within PEPWORLD Logistics Intelligence V2. Every engine card, map card and API response must conform to this contract.

---

## Core Integrity Fields

All records flowing through the system — from raw ingestion to map output — **must** carry the following five fields at every layer (Build Rule 6):

| Field | TypeScript Type | Required | Description |
|---|---|---|---|
| `status` | `"active" \| "stale" \| "missing" \| "error" \| "pending"` | ✅ | Current health of the record |
| `missingInput` | `string[]` | ✅ | Names of absent required input signals. Empty array if none. |
| `confidence` | `"high" \| "medium" \| "low" \| "unverified"` | ✅ | Confidence level of the data |
| `freshness` | `string` (ISO 8601) | ✅ | Timestamp of last verified data update |
| `releaseState` | `"draft" \| "review" \| "approved" \| "deprecated"` | ✅ | Lifecycle stage — `"live"` is not a valid scaffold value |

---

## Connection and Calculation State Fields

| Field | TypeScript Type | Description |
|---|---|---|
| `connectionStatus` | `ConnectionStatus` | Current data-source connection state |
| `calculationStatus` | `CalculationStatus` | Current computation state |

**Approved `ConnectionStatus` values:**

| Value | Meaning |
|---|---|
| `NOT_CONNECTED` | No data source is attached |
| `STAGING_CONNECTED` | Connected to staging environment only |
| `CIS_VALIDATED` | CIS validation passed |
| `RELEASED_SIGNAL_CONNECTED` | Released signal feed is attached |
| `ACCESS_RESTRICTED` | Connection exists but access is restricted |

**Approved `CalculationStatus` values:**

| Value | Meaning |
|---|---|
| `NOT_YET_COMPUTED` | No released engine computation run |
| `COMPUTED` | Calculation completed |
| `PARTIAL` | Partial result — some inputs missing |
| `FAILED` | Calculation failed |
| `INCOMPLETE_INPUT` | Required inputs are absent |

---

## Demo Payload Contract

All demo and mock payloads must (Build Rule 8):

- Set `isDemoPayload: true` on every record
- Include a visible `[DEMONSTRATION]` prefix in map card `explanation` strings
- Use `decisionSignal: "NOT_COMPUTED"` — never GO, CAUTION or AVOID
- Use `null` for all operational fields (capacity, utilization, availability, travelTime, routeDistance, coordinates)
- Use empty arrays for `engineResults`, `evidence`, `verifiedMatches`, `lineage`, `engineOutputs`
- Display the banner: **DEMONSTRATION MODE — No Zebra, CIS, engine, route, capacity, availability, or operational data is connected.**

---

## Fabrication Prohibition

The following values must **never** be fabricated (Build Rule 5):

- Capacity (route, vehicle, warehouse, carrier)
- Availability (slots, bays, vehicles)
- Utilization percentages
- Route time or transit time
- Coordinates or geographic positions
- Verification status or evidence references

If a value cannot be sourced from a verified record, the engine card must:
1. Set `status: "missing"` or `status: "error"`
2. Add the missing field name to `missingInput`
3. Set `confidence: "unverified"`

---

## Source Lineage Contract

When evidence is available, every `EngineCardOutput` and `MapCardOutput` must carry a `SourceLineage` record (Build Rule 7):

| Field | Type | Description |
|---|---|---|
| `rawRecordId` | `string` | ID of the originating raw record |
| `source` | `string` | System name of the data source |
| `capturedAt` | ISO 8601 string | When the raw record was captured |
| `transformSteps` | `string[]` | Ordered list of transform stage names |
| `engineCardId` | `string` | ID of the engine card (ENG001–ENG120) that processed the record |
| `mapCardId` | `string?` | ID of the map card (MC01–MC12) that consumed the engine output |

---

## API Contract

### `POST /api/intelligence`

**Request body:**

```json
{
  "routeId": "string (optional)",
  "vehicleId": "string (optional)",
  "timestamp": "ISO 8601 string (required)",
  "context": "object (optional)"
}
```

**Response body (`IntelligenceResponse`):**

```json
{
  "requestId": "string",
  "timestamp": "ISO 8601 string",
  "decisionSignal": "NOT_COMPUTED",
  "decisionReason": "No released engine computation is connected. Demonstration payload only.",
  "answerStatus": "NOT_YET_COMPUTED",
  "mapCardOutputs": "MapCardOutput[]",
  "status": "RecordStatus",
  "missingInput": "string[]",
  "confidence": "unverified",
  "freshness": "string",
  "releaseState": "draft",
  "connectionStatus": "NOT_CONNECTED",
  "calculationStatus": "NOT_YET_COMPUTED",
  "isDemoPayload": true
}
```

**Important:** The `decisionSignal` is emitted at this response level only. Individual `MapCardOutput` records do not contain a decision signal (Build Rule 4). In scaffold state the signal is always `NOT_COMPUTED`.

---

## Production Database Access

No engine card, map card or API route in this repository may write to Zebra, CIS or any production database without an explicit approved data-connection task (Build Rule 2). Read-only access requires the same approval process.

---

## Versioning

All `EngineCardOutput` and `MapCardOutput` records carry a `version` field. Version bumps are required whenever the `payload` schema or `explanation` format changes.
