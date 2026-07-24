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
    capturedAt: "NOT_YET_COMPUTED",
    transformSteps: ["NOT_YET_COMPUTED"],
    engineCardId,
    mapCardId,
  };
}

// ---------------------------------------------------------------------------
// Shared demo engine output builder
// ---------------------------------------------------------------------------
function demoEngine(
  cardId: string,
  cardName: string,
  mapCardId: string
): EngineCardOutput {
  return {
    cardId,
    cardName,
    version: "1.0.0",
    status: "pending",
    missingInput: ["live_data_connection"],
    confidence: "unverified",
    freshness: "NOT_YET_COMPUTED",
    releaseState: "draft",
    payload: {
      calculationStatus: "NOT_YET_COMPUTED",
      connectionStatus: "NOT_CONNECTED",
      note: "⚠️ DEMO — not real data. No live connection.",
    },
    lineage: demoLineage(cardId, mapCardId),
    isDemoPayload: true,
  };
}

// ---------------------------------------------------------------------------
// Shared demo map card builder
// ---------------------------------------------------------------------------
function demoMapCard(
  cardId: string,
  cardName: string,
  explanation: string,
  engineIds: Array<{ id: string; name: string }>
): MapCardOutput {
  return {
    cardId,
    cardName,
    explanation: `[DEMO] ${explanation} No live data connected. All values are NOT_YET_COMPUTED.`,
    engineOutputs: engineIds.map((e) => demoEngine(e.id, e.name, cardId)),
    lineage: engineIds.map((e) => demoLineage(e.id, cardId)),
    status: "pending",
    missingInput: ["live_data_connection"],
    confidence: "unverified",
    freshness: "NOT_YET_COMPUTED",
    releaseState: "draft",
    isDemoPayload: true,
    connectionStatus: "NOT_CONNECTED",
    calculationStatus: "NOT_YET_COMPUTED",
  };
}

// ---------------------------------------------------------------------------
// MC-001 RouteIntelligenceMapCard — Map Answer
// ---------------------------------------------------------------------------
export const DEMO_MC001: MapCardOutput = demoMapCard(
  "MC-001",
  "RouteIntelligenceMapCard",
  "Route capacity, availability and utilisation are NOT_YET_COMPUTED. Awaiting verified Zebra route records.",
  [
    { id: "EC-001", name: "RouteCapacityEngine" },
    { id: "EC-002", name: "RouteAvailabilityEngine" },
    { id: "EC-003", name: "RouteUtilizationEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-002 VehicleIntelligenceMapCard — Selected Connection
// ---------------------------------------------------------------------------
export const DEMO_MC002: MapCardOutput = demoMapCard(
  "MC-002",
  "VehicleIntelligenceMapCard",
  "Vehicle status, availability and compliance are NOT_YET_COMPUTED. Awaiting verified fleet telematics.",
  [
    { id: "EC-021", name: "VehicleCapacityEngine" },
    { id: "EC-022", name: "VehicleAvailabilityEngine" },
    { id: "EC-025", name: "VehicleStatusEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-003 WarehouseIntelligenceMapCard — Route Intelligence (node detail)
// ---------------------------------------------------------------------------
export const DEMO_MC003: MapCardOutput = demoMapCard(
  "MC-003",
  "WarehouseIntelligenceMapCard",
  "Warehouse capacity, throughput and dwell time are NOT_YET_COMPUTED. Awaiting verified WMS records.",
  [
    { id: "EC-041", name: "WarehouseCapacityEngine" },
    { id: "EC-042", name: "WarehouseAvailabilityEngine" },
    { id: "EC-045", name: "WarehouseUtilizationEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-004 CarrierIntelligenceMapCard — Node Intelligence
// ---------------------------------------------------------------------------
export const DEMO_MC004: MapCardOutput = demoMapCard(
  "MC-004",
  "CarrierIntelligenceMapCard",
  "Carrier performance, compliance and capacity are NOT_YET_COMPUTED. Awaiting verified carrier records.",
  [
    { id: "EC-061", name: "CarrierCapacityEngine" },
    { id: "EC-062", name: "CarrierAvailabilityEngine" },
    { id: "EC-065", name: "CarrierPerformanceEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-005 OrderIntelligenceMapCard — Ecosystem Context
// ---------------------------------------------------------------------------
export const DEMO_MC005: MapCardOutput = demoMapCard(
  "MC-005",
  "OrderIntelligenceMapCard",
  "Order priority, exception status and delivery timeline are NOT_YET_COMPUTED. Awaiting verified order records.",
  [
    { id: "EC-081", name: "OrderStatusEngine" },
    { id: "EC-082", name: "OrderPriorityEngine" },
    { id: "EC-083", name: "OrderExceptionEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-006 DemandIntelligenceMapCard — Territory and Coverage
// ---------------------------------------------------------------------------
export const DEMO_MC006: MapCardOutput = demoMapCard(
  "MC-006",
  "DemandIntelligenceMapCard",
  "Demand forecast and volatility across territory and coverage zones are NOT_YET_COMPUTED. Awaiting verified demand signals.",
  [
    { id: "EC-091", name: "DemandForecastEngine" },
    { id: "EC-092", name: "DemandVolatilityEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-007 NetworkIntelligenceMapCard — Data Condition
// ---------------------------------------------------------------------------
export const DEMO_MC007: MapCardOutput = demoMapCard(
  "MC-007",
  "NetworkIntelligenceMapCard",
  "Network congestion, capacity and flow scores are NOT_YET_COMPUTED. Awaiting verified network topology data.",
  [
    { id: "EC-101", name: "NetworkCongestionEngine" },
    { id: "EC-102", name: "NetworkCapacityEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-008 ComplianceMapCard — (shown when relevant)
// ---------------------------------------------------------------------------
export const DEMO_MC008: MapCardOutput = demoMapCard(
  "MC-008",
  "ComplianceMapCard",
  "Route, vehicle and carrier compliance status are NOT_YET_COMPUTED. Awaiting verified regulatory records.",
  [
    { id: "EC-012", name: "RouteComplianceEngine" },
    { id: "EC-029", name: "VehicleComplianceEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-009 CostIntelligenceMapCard — (shown when relevant)
// ---------------------------------------------------------------------------
export const DEMO_MC009: MapCardOutput = demoMapCard(
  "MC-009",
  "CostIntelligenceMapCard",
  "Cost aggregation across route, fuel and carrier charges are NOT_YET_COMPUTED. Awaiting verified cost records.",
  [
    { id: "EC-010", name: "RouteFuelEngine" },
    { id: "EC-014", name: "RouteCostEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-010 RiskIntelligenceMapCard — (shown when relevant)
// ---------------------------------------------------------------------------
export const DEMO_MC010: MapCardOutput = demoMapCard(
  "MC-010",
  "RiskIntelligenceMapCard",
  "Composite risk scores from route hazard, delay and breakdown evidence are NOT_YET_COMPUTED. Awaiting verified risk data.",
  [
    { id: "EC-008", name: "RouteHazardEngine" },
    { id: "EC-015", name: "RouteRiskScoreEngine" },
    { id: "EC-033", name: "VehicleBreakdownEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-011 DataQualityMapCard — (always shown)
// ---------------------------------------------------------------------------
export const DEMO_MC011: MapCardOutput = demoMapCard(
  "MC-011",
  "DataQualityMapCard",
  "Data completeness, freshness and confidence scores are NOT_YET_COMPUTED. No live data connection established.",
  [
    { id: "EC-111", name: "DataCompletenessEngine" },
    { id: "EC-114", name: "SystemDataQualityEngine" },
  ]
);

// ---------------------------------------------------------------------------
// MC-012 LineageMapCard — Evidence and Lineage
// ---------------------------------------------------------------------------
export const DEMO_MC012: MapCardOutput = demoMapCard(
  "MC-012",
  "LineageMapCard",
  "Full source lineage from raw record to map output is NOT_YET_COMPUTED. No verified evidence available in demo mode.",
  [
    { id: "EC-119", name: "LineageTrackerEngine" },
    { id: "EC-120", name: "AuditTrailEngine" },
  ]
);

// ---------------------------------------------------------------------------
// Full demo intelligence response — DEMONSTRATION MODE
// Build Rule 4: decisionSignal lives on the response, NOT inside map cards.
// ---------------------------------------------------------------------------
export const DEMO_INTELLIGENCE_RESPONSE: IntelligenceResponse = {
  requestId: "DEMO-REQ-00001",
  timestamp: "NOT_YET_COMPUTED",
  // NOT_COMPUTED — no live data connected (Build Rule 2 / Build Rule 8)
  decisionSignal: "NOT_COMPUTED",
  decisionReason:
    "[DEMO] No live Zebra, CIS, GPS, WMS or production database connection. " +
    "All engine outputs are NOT_YET_COMPUTED. This is a demonstration payload only.",
  mapCardOutputs: [
    DEMO_MC001,
    DEMO_MC002,
    DEMO_MC003,
    DEMO_MC004,
    DEMO_MC005,
    DEMO_MC006,
    DEMO_MC007,
    DEMO_MC008,
    DEMO_MC009,
    DEMO_MC010,
    DEMO_MC011,
    DEMO_MC012,
  ],
  status: "pending",
  missingInput: ["live_data_connection"],
  confidence: "unverified",
  freshness: "NOT_YET_COMPUTED",
  releaseState: "draft",
  isDemoPayload: true,
};

// Legacy named exports kept for API route compatibility
export const DEMO_ROUTE_MAP_CARD = DEMO_MC001;
export const DEMO_VEHICLE_MAP_CARD = DEMO_MC002;
export const DEMO_DATA_QUALITY_MAP_CARD = DEMO_MC011;

