// lib/demo-data.ts
// ⚠️  DEMONSTRATION PAYLOAD — No Zebra, CIS, engine, route, capacity, availability,
// or operational data is connected. All records in this file use NOT_COMPUTED /
// NOT_CONNECTED / null values. isDemoPayload is true on every record.
// Build Rule 8: demo payloads must be visibly labelled.
// Build Rule 5: no capacity, availability, utilization, route time, coordinates,
//               verification or evidence values are fabricated here.

import type {
  IntelligenceResponse,
  MapCardOutput,
} from "./types";

// ---------------------------------------------------------------------------
// Demo map card outputs — no engine outputs, no lineage, no operational values
// ---------------------------------------------------------------------------
const DEMO_MAP_ANSWER: MapCardOutput = {
  cardId: "MC01",
  cardName: "MapAnswer",
  version: "1.0.0",
  explanation:
    "[DEMONSTRATION] No released engine computation is connected. " +
    "Decision signal and all operational values are NOT_COMPUTED. " +
    "Source: DEMO_PAYLOAD — not real evidence.",
  engineOutputs: [],
  lineage: [],
  status: "pending",
  missingInput: ["all_engine_connections"],
  confidence: "unverified",
  freshness: "NOT_CONNECTED",
  releaseState: "draft",
  isDemoPayload: true,
};

const DEMO_DATA_CONDITION: MapCardOutput = {
  cardId: "MC07",
  cardName: "DataCondition",
  version: "1.0.0",
  explanation:
    "[DEMONSTRATION] No data sources are connected. " +
    "Capacity, availability, utilization, route time, coordinates and verification " +
    "fields are null. Source: DEMO_PAYLOAD — not real evidence.",
  engineOutputs: [],
  lineage: [],
  status: "pending",
  missingInput: ["all_engine_connections"],
  confidence: "unverified",
  freshness: "NOT_CONNECTED",
  releaseState: "draft",
  isDemoPayload: true,
};

const DEMO_EVIDENCE_LINEAGE: MapCardOutput = {
  cardId: "MC08",
  cardName: "EvidenceandLineage",
  version: "1.0.0",
  explanation:
    "[DEMONSTRATION] No evidence records or lineage are available. " +
    "Engine results, verified matches and evidence arrays are empty. " +
    "Source: DEMO_PAYLOAD — not real evidence.",
  engineOutputs: [],
  lineage: [],
  status: "pending",
  missingInput: ["all_engine_connections"],
  confidence: "unverified",
  freshness: "NOT_CONNECTED",
  releaseState: "draft",
  isDemoPayload: true,
};

// ---------------------------------------------------------------------------
// Full demo intelligence response — every operational field is null or empty
// ---------------------------------------------------------------------------
export const DEMO_INTELLIGENCE_RESPONSE: IntelligenceResponse = {
  requestId: "DEMO-REQ-00001",
  timestamp: "NOT_CONNECTED",
  decisionSignal: "NOT_COMPUTED",
  decisionReason:
    "No released engine computation is connected. Demonstration payload only.",
  answerStatus: "NOT_YET_COMPUTED",
  mapCardOutputs: [
    DEMO_MAP_ANSWER,
    DEMO_DATA_CONDITION,
    DEMO_EVIDENCE_LINEAGE,
  ],
  status: "pending",
  missingInput: ["all_engine_connections"],
  confidence: "unverified",
  freshness: "NOT_CONNECTED",
  releaseState: "draft",
  connectionStatus: "NOT_CONNECTED",
  calculationStatus: "NOT_YET_COMPUTED",
  isDemoPayload: true,
};
