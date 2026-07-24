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
| `releaseState` | `"draft" \| "review" \| "approved" \| "live" \| "deprecated"` | ✅ | Lifecycle stage |

---

## Demo Payload Contract

All demo and mock payloads must (Build Rule 8):

- Set `isDemoPayload: true` on every record
- Include a visible `[DEMO]` prefix in map card `explanation` strings
- Include a `note: "DEMO — not real data"` field in engine card `payload` objects
- Never be served to a production endpoint without explicit gating

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
| `engineCardId` | `string` | ID of the engine card that processed the record |
| `mapCardId` | `string?` | ID of the map card that consumed the engine output |

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
  "decisionSignal": "GO | CAUTION | AVOID",
  "decisionReason": "string",
  "mapCardOutputs": "MapCardOutput[]",
  "status": "RecordStatus",
  "missingInput": "string[]",
  "confidence": "ConfidenceLevel",
  "freshness": "ISO 8601 string",
  "releaseState": "ReleaseState",
  "isDemoPayload": "boolean"
}
```

**Important:** The `decisionSignal` is emitted at this response level only. Individual `MapCardOutput` records do not contain a decision signal (Build Rule 4).

---

## Production Database Access

No engine card, map card or API route in this repository may write to Zebra, CIS or any production database without an explicit approved data-connection task (Build Rule 2). Read-only access requires the same approval process.

---

## Versioning

All `EngineCardOutput` and `MapCardOutput` records carry a `version` field inherited from the `CardDescriptor` in the registry. Version bumps are required whenever the `payload` schema or `explanation` format changes.
