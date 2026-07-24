// lib/types.ts
// Core shared types for PEPWORLD Logistics Intelligence V2.
// Build Rule 6: status, missingInput, confidence, freshness and releaseState
// must be preserved through every layer.

export type DecisionSignal = "GO" | "CAUTION" | "AVOID" | "NOT_COMPUTED";

// "live" is excluded from the scaffold release states.
// No scaffold component may be marked live until official data connections are approved.
export type ReleaseState =
  | "draft"
  | "review"
  | "approved"
  | "deprecated";

export type ConnectionStatus =
  | "NOT_CONNECTED"
  | "STAGING_CONNECTED"
  | "CIS_VALIDATED"
  | "RELEASED_SIGNAL_CONNECTED"
  | "ACCESS_RESTRICTED";

export type CalculationStatus =
  | "NOT_YET_COMPUTED"
  | "COMPUTED"
  | "PARTIAL"
  | "FAILED"
  | "INCOMPLETE_INPUT";

export type ConfidenceLevel = "high" | "medium" | "low" | "unverified";

export type RecordStatus =
  | "active"
  | "stale"
  | "missing"
  | "error"
  | "pending";

// Build Rule 6: every data record must carry these five fields.
export interface BaseRecord {
  status: RecordStatus;
  missingInput: string[];
  confidence: ConfidenceLevel;
  freshness: string; // ISO 8601 timestamp of last verified data update
  releaseState: ReleaseState;
}

// Build Rule 7: full lineage from raw record to map output.
export interface SourceLineage {
  rawRecordId: string;
  source: string;
  capturedAt: string; // ISO 8601
  transformSteps: string[];
  engineCardId: string;
  mapCardId?: string;
}

// Output produced by a single engine card.
// Build Rule 3: 120 engine cards, each a separate component class.
export interface EngineCardOutput extends BaseRecord {
  cardId: string;
  cardName: string;
  version: string;
  payload: Record<string, unknown>;
  lineage: SourceLineage;
  // Build Rule 8: demo/mock payloads must always be labeled.
  isDemoPayload: boolean;
}

// Output produced by a single map card.
// Build Rule 3: 12 map cards, each a separate component class.
// Build Rule 4: map cards explain results only — no GO/CAUTION/AVOID decisions.
export interface MapCardOutput {
  cardId: string;
  cardName: string;
  version: string;
  explanation: string;
  engineOutputs: EngineCardOutput[];
  lineage: SourceLineage[];
  // Inherited integrity fields (Build Rule 6)
  status: RecordStatus;
  missingInput: string[];
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  isDemoPayload: boolean;
}

// Full intelligence response returned by the API.
// Decisions (GO/CAUTION/AVOID/NOT_COMPUTED) are determined here, not inside map cards.
export interface IntelligenceResponse {
  requestId: string;
  timestamp: string;
  decisionSignal: DecisionSignal;
  decisionReason: string;
  answerStatus: CalculationStatus;
  mapCardOutputs: MapCardOutput[];
  // Aggregate integrity fields (Build Rule 6)
  status: RecordStatus;
  missingInput: string[];
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  connectionStatus: ConnectionStatus;
  calculationStatus: CalculationStatus;
  isDemoPayload: boolean;
}

export interface IntelligenceRequest {
  routeId?: string;
  vehicleId?: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

// Descriptor used in UI module registry.
export interface CardDescriptor {
  id: string;
  name: string;
  version: string;
  description: string;
  releaseState: ReleaseState;
}

// Scaffold entry for each of the 120 engine cards.
// Official titles, formulas and data connections are NOT recorded here
// until the official engine titles are supplied.
export interface EngineRegistryEntry {
  id: string;
  displayName: string;
  titleStatus: "PENDING_OFFICIAL_TITLE";
  connectionStatus: ConnectionStatus;
  calculationStatus: CalculationStatus;
  releaseState: ReleaseState;
}

// Descriptor for each of the 12 approved map cards.
// decisionAuthority is always false — map cards explain results only (Build Rule 4).
export interface MapCardRegistryEntry {
  id: string;
  displayName: string;
  category: "CORE" | "CONDITIONAL";
  decisionAuthority: false;
  connectionStatus: ConnectionStatus;
  releaseState: ReleaseState;
}
