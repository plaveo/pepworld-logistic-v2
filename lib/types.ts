// lib/types.ts
// PEPWORLD Logistics Intelligence V2 — locked scaffold contracts.

export type DecisionSignal = "GO" | "CAUTION" | "AVOID" | "NOT_COMPUTED";

export type ReleaseState = "draft" | "review" | "approved" | "deprecated";

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

export type AnswerStatus =
  | "ANSWER_AVAILABLE"
  | "PARTIAL_ANSWER"
  | "AWAITING_DATA"
  | "STAGING_SIGNALS_PENDING_RELEASE"
  | "INCOMPLETE_INPUT"
  | "NOT_YET_COMPUTED"
  | "UNVERIFIED"
  | "ACCESS_RESTRICTED";

export type ConfidenceLevel = "high" | "medium" | "low" | "unverified";

export type RecordStatus = "active" | "stale" | "missing" | "error" | "pending";

export interface BaseRecord {
  status: RecordStatus;
  missingInput: string[];
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  connectionStatus: ConnectionStatus;
  calculationStatus: CalculationStatus;
}

export interface SourceLineage {
  source: string;
  sourceAuthority?: string;
  observedDate?: string | null;
  sourceUpdateDate?: string | null;
  retrievedDate?: string | null;
  rawRecordId: string;
  normalizedSignal?: string | null;
  cisReleaseStatus?: string | null;
  engineCardId: string;
  calculationOrDetectionMethod?: string | null;
  mapCardId?: string;
  connectedMapFeature?: string | null;
  capturedAt: string;
  transformSteps: string[];
}

export interface EngineCardOutput extends BaseRecord {
  cardId: string;
  cardName: string;
  version: string;
  payload: Record<string, unknown>;
  lineage: SourceLineage;
  isDemoPayload: boolean;
}

export type MapCardCategory = "CORE" | "CONDITIONAL";

export interface MapCardOutput extends BaseRecord {
  cardId: string;
  cardName: string;
  version: string;
  category: MapCardCategory;
  decisionAuthority: false;
  explanation: string;
  payload: Record<string, unknown>;
  engineOutputs: EngineCardOutput[];
  lineage: SourceLineage[];
  isDemoPayload: boolean;
}

export interface MapIntelligenceResultBundle {
  requestId: string;
  question: string;
  answerStatus: AnswerStatus;
  directMapAnswer: MapCardOutput | null;
  selectedNodes: Record<string, unknown>[];
  selectedConnection: MapCardOutput | null;
  routeIntelligence: MapCardOutput | null;
  nodeIntelligence: MapCardOutput | null;
  ecosystemContext: MapCardOutput | null;
  territoryCoverage: MapCardOutput | null;
  relevantEngineResults: EngineCardOutput[];
  dataCondition: MapCardOutput | null;
  evidenceLineage: MapCardOutput | null;
  compatibility: MapCardOutput | null;
  capacityAvailability: MapCardOutput | null;
  alternatives: MapCardOutput | null;
  dependencySupport: MapCardOutput | null;
  isDemoPayload: boolean;
  releaseState: ReleaseState;
  connectionStatus: ConnectionStatus;
}

export interface IntelligenceResponse extends BaseRecord {
  requestId: string;
  timestamp: string;
  decisionSignal: DecisionSignal;
  decisionReason: string;
  answerStatus: AnswerStatus;
  mapCardOutputs: MapCardOutput[];
  isDemoPayload: boolean;
}

export interface IntelligenceRequest {
  question?: string;
  routeId?: string;
  vehicleId?: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

export interface EngineRegistryEntry {
  id: string;
  displayName: string;
  titleStatus: "PENDING_OFFICIAL_TITLE";
  connectionStatus: ConnectionStatus;
  calculationStatus: CalculationStatus;
  releaseState: ReleaseState;
}

export interface UIModuleRegistryEntry {
  id: string;
  displayName: string;
  mappingStatus: "PENDING_OFFICIAL_MAPPING";
  decisionAuthority: false;
  releaseState: ReleaseState;
}

export interface MapCardRegistryEntry {
  id: string;
  displayName: string;
  category: MapCardCategory;
  decisionAuthority: false;
  connectionStatus: ConnectionStatus;
  releaseState: ReleaseState;
}
