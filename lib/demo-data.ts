// lib/demo-data.ts
// DEMONSTRATION MODE: no Zebra, CIS, engine, route, capacity, availability,
// coordinates, operational result or evidence is connected.

import type {
  IntelligenceResponse,
  MapCardCategory,
  MapCardOutput,
} from "./types";

function createDemoMapCard(
  cardId: string,
  cardName: string,
  category: MapCardCategory
): MapCardOutput {
  return {
    cardId,
    cardName,
    version: "2.0.0",
    category,
    decisionAuthority: false,
    explanation:
      "No released engine computation is connected. Demonstration structure only.",
    payload: {},
    engineOutputs: [],
    lineage: [],
    status: "pending",
    missingInput: ["released_engine_results"],
    confidence: "unverified",
    freshness: "NOT_CONNECTED",
    releaseState: "draft",
    connectionStatus: "NOT_CONNECTED",
    calculationStatus: "NOT_YET_COMPUTED",
    isDemoPayload: true,
  };
}

export const DEMO_MAP_CARDS: MapCardOutput[] = [
  createDemoMapCard("MC01", "Map Answer", "CORE"),
  createDemoMapCard("MC02", "Selected Connection", "CORE"),
  createDemoMapCard("MC03", "Route Intelligence", "CORE"),
  createDemoMapCard("MC04", "Node Intelligence", "CORE"),
  createDemoMapCard("MC05", "Ecosystem Context", "CORE"),
  createDemoMapCard("MC06", "Territory and Coverage", "CORE"),
  createDemoMapCard("MC07", "Data Condition", "CORE"),
  createDemoMapCard("MC08", "Evidence and Lineage", "CORE"),
  createDemoMapCard("MC09", "Compatibility", "CONDITIONAL"),
  createDemoMapCard("MC10", "Capacity and Availability", "CONDITIONAL"),
  createDemoMapCard("MC11", "Alternatives", "CONDITIONAL"),
  createDemoMapCard("MC12", "Dependency and Support", "CONDITIONAL"),
];

export const DEMO_INTELLIGENCE_RESPONSE: IntelligenceResponse = {
  requestId: "DEMO-REQ-00001",
  timestamp: "NOT_CONNECTED",
  decisionSignal: "NOT_COMPUTED",
  decisionReason:
    "No released engine computation is connected. Demonstration payload only.",
  answerStatus: "NOT_YET_COMPUTED",
  mapCardOutputs: DEMO_MAP_CARDS,
  status: "pending",
  missingInput: ["released_engine_results"],
  confidence: "unverified",
  freshness: "NOT_CONNECTED",
  releaseState: "draft",
  connectionStatus: "NOT_CONNECTED",
  calculationStatus: "NOT_YET_COMPUTED",
  isDemoPayload: true,
};
