// lib/demo-data.ts
// ⚠️  DEMO PAYLOAD — All data in this file is fabricated for demonstration
// purposes only. It does NOT represent real capacity, availability, utilization,
// route time, coordinates, verification or evidence.
// Build Rule 8: isDemoPayload is always true on every record in this file.

import type {
  IntelligenceResponse,
  EngineCardOutput,
  MapCardOutput,
  SourceLineage,
} from "./types";

// ---------------------------------------------------------------------------
// Shared demo lineage builder
// ---------------------------------------------------------------------------
function demoLineage(
  engineCardId: string,
  mapCardId?: string
): SourceLineage {
  return {
    rawRecordId: "DEMO-RAW-00001",
    source: "DEMO_SOURCE",
    capturedAt: "2024-01-01T00:00:00.000Z",
    transformSteps: ["ingest", "normalise", "score"],
    engineCardId,
    mapCardId,
  };
}

// ---------------------------------------------------------------------------
// Demo engine card outputs
// ---------------------------------------------------------------------------
export const DEMO_ROUTE_CAPACITY_OUTPUT: EngineCardOutput = {
  cardId: "EC-001",
  cardName: "RouteCapacityEngine",
  version: "1.0.0",
  status: "active",
  missingInput: [],
  confidence: "high",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  payload: {
    // ⚠️ DEMO: not real capacity data
    routeId: "DEMO-ROUTE-001",
    capacityUnits: 100,
    capacityUsed: 72,
    note: "DEMO — not real data",
  },
  lineage: demoLineage("EC-001"),
  isDemoPayload: true,
};

export const DEMO_ROUTE_AVAILABILITY_OUTPUT: EngineCardOutput = {
  cardId: "EC-002",
  cardName: "RouteAvailabilityEngine",
  version: "1.0.0",
  status: "active",
  missingInput: [],
  confidence: "high",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  payload: {
    // ⚠️ DEMO: not real availability data
    routeId: "DEMO-ROUTE-001",
    openSlots: 3,
    note: "DEMO — not real data",
  },
  lineage: demoLineage("EC-002"),
  isDemoPayload: true,
};

export const DEMO_VEHICLE_STATUS_OUTPUT: EngineCardOutput = {
  cardId: "EC-025",
  cardName: "VehicleStatusEngine",
  version: "1.0.0",
  status: "active",
  missingInput: [],
  confidence: "medium",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  payload: {
    // ⚠️ DEMO: not real vehicle data
    vehicleId: "DEMO-VEH-001",
    operationalStatus: "available",
    note: "DEMO — not real data",
  },
  lineage: demoLineage("EC-025"),
  isDemoPayload: true,
};

export const DEMO_DATA_QUALITY_OUTPUT: EngineCardOutput = {
  cardId: "EC-114",
  cardName: "SystemDataQualityEngine",
  version: "1.0.0",
  status: "active",
  missingInput: [],
  confidence: "high",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  payload: {
    // ⚠️ DEMO: not real quality scores
    completenessScore: 0.95,
    note: "DEMO — not real data",
  },
  lineage: demoLineage("EC-114"),
  isDemoPayload: true,
};

// ---------------------------------------------------------------------------
// Demo map card outputs
// Build Rule 4: map cards explain results only — no GO/CAUTION/AVOID here.
// ---------------------------------------------------------------------------
export const DEMO_ROUTE_MAP_CARD: MapCardOutput = {
  cardId: "MC-001",
  cardName: "RouteIntelligenceMapCard",
  version: "1.0.0",
  explanation:
    "[DEMO] Route DEMO-ROUTE-001 shows 72% capacity utilisation with 3 open slots. " +
    "No conflicts or hazards detected. Confidence: HIGH. " +
    "Source: DEMO_SOURCE — not real evidence.",
  engineOutputs: [DEMO_ROUTE_CAPACITY_OUTPUT, DEMO_ROUTE_AVAILABILITY_OUTPUT],
  lineage: [
    demoLineage("EC-001", "MC-001"),
    demoLineage("EC-002", "MC-001"),
  ],
  status: "active",
  missingInput: [],
  confidence: "high",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  isDemoPayload: true,
};

export const DEMO_VEHICLE_MAP_CARD: MapCardOutput = {
  cardId: "MC-002",
  cardName: "VehicleIntelligenceMapCard",
  version: "1.0.0",
  explanation:
    "[DEMO] Vehicle DEMO-VEH-001 is available and operational. " +
    "No maintenance flags. Confidence: MEDIUM. " +
    "Source: DEMO_SOURCE — not real evidence.",
  engineOutputs: [DEMO_VEHICLE_STATUS_OUTPUT],
  lineage: [demoLineage("EC-025", "MC-002")],
  status: "active",
  missingInput: [],
  confidence: "medium",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  isDemoPayload: true,
};

export const DEMO_DATA_QUALITY_MAP_CARD: MapCardOutput = {
  cardId: "MC-011",
  cardName: "DataQualityMapCard",
  version: "1.0.0",
  explanation:
    "[DEMO] Data completeness score is 95%. All required integrity fields " +
    "(status, missingInput, confidence, freshness, releaseState) are present. " +
    "Source: DEMO_SOURCE — not real evidence.",
  engineOutputs: [DEMO_DATA_QUALITY_OUTPUT],
  lineage: [demoLineage("EC-114", "MC-011")],
  status: "active",
  missingInput: [],
  confidence: "high",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  isDemoPayload: true,
};

// ---------------------------------------------------------------------------
// Full demo intelligence response
// ---------------------------------------------------------------------------
export const DEMO_INTELLIGENCE_RESPONSE: IntelligenceResponse = {
  requestId: "DEMO-REQ-00001",
  timestamp: "2024-01-01T00:00:00.000Z",
  // GO decision made at response level, NOT inside map cards (Build Rule 4)
  decisionSignal: "GO",
  decisionReason:
    "[DEMO] Route capacity available, vehicle operational, data quality high. " +
    "All checks passed on demo data — not real evidence.",
  mapCardOutputs: [
    DEMO_ROUTE_MAP_CARD,
    DEMO_VEHICLE_MAP_CARD,
    DEMO_DATA_QUALITY_MAP_CARD,
  ],
  status: "active",
  missingInput: [],
  confidence: "high",
  freshness: "2024-01-01T00:00:00.000Z",
  releaseState: "live",
  isDemoPayload: true,
};
