// lib/registries.ts
// Registries for the 120 engine cards, 50 UI modules, and 12 map cards.
// Build Rule 3: each card type is kept as a separate registry.

import type { CardDescriptor, EngineRegistryEntry, MapCardRegistryEntry } from "./types";

// ---------------------------------------------------------------------------
// ENGINE CARD REGISTRY — 120 entries
// IDs: ENG001–ENG120
// Official engine titles are PENDING. No names, formulas, calculations,
// data sources or live connections are recorded until officially supplied.
// ---------------------------------------------------------------------------
export const ENGINE_CARD_REGISTRY: EngineRegistryEntry[] = [
  { id: "ENG001", displayName: "ENG001", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG002", displayName: "ENG002", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG003", displayName: "ENG003", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG004", displayName: "ENG004", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG005", displayName: "ENG005", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG006", displayName: "ENG006", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG007", displayName: "ENG007", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG008", displayName: "ENG008", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG009", displayName: "ENG009", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG010", displayName: "ENG010", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG011", displayName: "ENG011", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG012", displayName: "ENG012", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG013", displayName: "ENG013", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG014", displayName: "ENG014", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG015", displayName: "ENG015", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG016", displayName: "ENG016", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG017", displayName: "ENG017", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG018", displayName: "ENG018", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG019", displayName: "ENG019", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG020", displayName: "ENG020", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG021", displayName: "ENG021", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG022", displayName: "ENG022", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG023", displayName: "ENG023", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG024", displayName: "ENG024", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG025", displayName: "ENG025", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG026", displayName: "ENG026", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG027", displayName: "ENG027", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG028", displayName: "ENG028", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG029", displayName: "ENG029", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG030", displayName: "ENG030", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG031", displayName: "ENG031", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG032", displayName: "ENG032", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG033", displayName: "ENG033", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG034", displayName: "ENG034", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG035", displayName: "ENG035", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG036", displayName: "ENG036", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG037", displayName: "ENG037", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG038", displayName: "ENG038", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG039", displayName: "ENG039", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG040", displayName: "ENG040", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG041", displayName: "ENG041", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG042", displayName: "ENG042", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG043", displayName: "ENG043", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG044", displayName: "ENG044", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG045", displayName: "ENG045", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG046", displayName: "ENG046", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG047", displayName: "ENG047", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG048", displayName: "ENG048", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG049", displayName: "ENG049", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG050", displayName: "ENG050", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG051", displayName: "ENG051", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG052", displayName: "ENG052", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG053", displayName: "ENG053", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG054", displayName: "ENG054", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG055", displayName: "ENG055", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG056", displayName: "ENG056", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG057", displayName: "ENG057", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG058", displayName: "ENG058", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG059", displayName: "ENG059", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG060", displayName: "ENG060", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG061", displayName: "ENG061", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG062", displayName: "ENG062", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG063", displayName: "ENG063", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG064", displayName: "ENG064", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG065", displayName: "ENG065", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG066", displayName: "ENG066", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG067", displayName: "ENG067", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG068", displayName: "ENG068", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG069", displayName: "ENG069", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG070", displayName: "ENG070", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG071", displayName: "ENG071", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG072", displayName: "ENG072", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG073", displayName: "ENG073", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG074", displayName: "ENG074", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG075", displayName: "ENG075", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG076", displayName: "ENG076", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG077", displayName: "ENG077", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG078", displayName: "ENG078", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG079", displayName: "ENG079", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG080", displayName: "ENG080", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG081", displayName: "ENG081", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG082", displayName: "ENG082", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG083", displayName: "ENG083", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG084", displayName: "ENG084", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG085", displayName: "ENG085", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG086", displayName: "ENG086", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG087", displayName: "ENG087", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG088", displayName: "ENG088", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG089", displayName: "ENG089", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG090", displayName: "ENG090", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG091", displayName: "ENG091", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG092", displayName: "ENG092", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG093", displayName: "ENG093", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG094", displayName: "ENG094", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG095", displayName: "ENG095", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG096", displayName: "ENG096", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG097", displayName: "ENG097", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG098", displayName: "ENG098", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG099", displayName: "ENG099", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG100", displayName: "ENG100", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG101", displayName: "ENG101", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG102", displayName: "ENG102", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG103", displayName: "ENG103", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG104", displayName: "ENG104", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG105", displayName: "ENG105", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG106", displayName: "ENG106", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG107", displayName: "ENG107", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG108", displayName: "ENG108", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG109", displayName: "ENG109", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG110", displayName: "ENG110", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG111", displayName: "ENG111", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG112", displayName: "ENG112", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG113", displayName: "ENG113", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG114", displayName: "ENG114", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG115", displayName: "ENG115", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG116", displayName: "ENG116", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG117", displayName: "ENG117", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG118", displayName: "ENG118", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG119", displayName: "ENG119", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" },
  { id: "ENG120", displayName: "ENG120", titleStatus: "PENDING_OFFICIAL_TITLE", connectionStatus: "NOT_CONNECTED", calculationStatus: "NOT_YET_COMPUTED", releaseState: "draft" }
];

// ---------------------------------------------------------------------------
// MAP CARD REGISTRY — 12 entries
// Approved IDs: MC01–MC12
// Build Rule 4: decisionAuthority is always false.
// Map cards explain geography, connections, evidence and data condition only.
// ---------------------------------------------------------------------------
export const MAP_CARD_REGISTRY: MapCardRegistryEntry[] = [
  // CORE MAP CARDS (MC01–MC08)
  { id: "MC01", displayName: "MapAnswer",              category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC02", displayName: "SelectedConnection",     category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC03", displayName: "RouteIntelligence",      category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC04", displayName: "NodeIntelligence",       category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC05", displayName: "EcosystemContext",       category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC06", displayName: "TerritoryandCoverage",   category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC07", displayName: "DataCondition",          category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC08", displayName: "EvidenceandLineage",     category: "CORE",        decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  // CONDITIONAL MAP CARDS (MC09–MC12)
  { id: "MC09", displayName: "Compatibility",          category: "CONDITIONAL", decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC10", displayName: "CapacityandAvailability",category: "CONDITIONAL", decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC11", displayName: "Alternatives",           category: "CONDITIONAL", decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
  { id: "MC12", displayName: "DependencyandSupport",   category: "CONDITIONAL", decisionAuthority: false, connectionStatus: "NOT_CONNECTED", releaseState: "draft" },
];

// ---------------------------------------------------------------------------
// UI MODULE REGISTRY — 50 entries
// ---------------------------------------------------------------------------
export const UI_MODULE_REGISTRY: CardDescriptor[] = [
  { id: "UI-001", name: "RouteCapacityModule", version: "1.0.0", description: "Displays route capacity status.", releaseState: "draft" },
  { id: "UI-002", name: "RouteAvailabilityModule", version: "1.0.0", description: "Shows route slot availability.", releaseState: "draft" },
  { id: "UI-003", name: "RouteUtilizationModule", version: "1.0.0", description: "Visualises route utilization percentage.", releaseState: "draft" },
  { id: "UI-004", name: "RouteTimelineModule", version: "1.0.0", description: "Timeline view for route events.", releaseState: "draft" },
  { id: "UI-005", name: "RouteMapModule", version: "1.0.0", description: "Renders route coordinates on map canvas.", releaseState: "draft" },
  { id: "UI-006", name: "RouteAlertModule", version: "1.0.0", description: "Displays active route alerts.", releaseState: "draft" },
  { id: "UI-007", name: "RouteCostModule", version: "1.0.0", description: "Shows route cost breakdown.", releaseState: "draft" },
  { id: "UI-008", name: "RouteComplianceModule", version: "1.0.0", description: "Compliance status panel for routes.", releaseState: "draft" },
  { id: "UI-009", name: "RouteRiskModule", version: "1.0.0", description: "Risk indicator panel for routes.", releaseState: "draft" },
  { id: "UI-010", name: "RouteAuditModule", version: "1.0.0", description: "Audit trail panel for route decisions.", releaseState: "draft" },
  { id: "UI-011", name: "VehicleStatusModule", version: "1.0.0", description: "Vehicle operational status display.", releaseState: "draft" },
  { id: "UI-012", name: "VehicleLocationModule", version: "1.0.0", description: "Vehicle location panel.", releaseState: "draft" },
  { id: "UI-013", name: "VehicleCapacityModule", version: "1.0.0", description: "Vehicle load capacity indicator.", releaseState: "draft" },
  { id: "UI-014", name: "VehicleMaintenanceModule", version: "1.0.0", description: "Maintenance due alert panel.", releaseState: "draft" },
  { id: "UI-015", name: "VehicleComplianceModule", version: "1.0.0", description: "Vehicle certification compliance view.", releaseState: "draft" },
  { id: "UI-016", name: "VehicleDriverModule", version: "1.0.0", description: "Driver assignment panel.", releaseState: "draft" },
  { id: "UI-017", name: "VehicleFuelModule", version: "1.0.0", description: "Fuel level and consumption view.", releaseState: "draft" },
  { id: "UI-018", name: "VehicleIncidentModule", version: "1.0.0", description: "Incident history panel for vehicle.", releaseState: "draft" },
  { id: "UI-019", name: "VehicleHistoryModule", version: "1.0.0", description: "Trip history panel for vehicle.", releaseState: "draft" },
  { id: "UI-020", name: "VehicleAuditModule", version: "1.0.0", description: "Audit trail panel for vehicle assessments.", releaseState: "draft" },
  { id: "UI-021", name: "WarehouseCapacityModule", version: "1.0.0", description: "Warehouse storage capacity view.", releaseState: "draft" },
  { id: "UI-022", name: "WarehouseInventoryModule", version: "1.0.0", description: "Inventory level display.", releaseState: "draft" },
  { id: "UI-023", name: "WarehouseThroughputModule", version: "1.0.0", description: "Throughput metrics panel.", releaseState: "draft" },
  { id: "UI-024", name: "WarehouseDockModule", version: "1.0.0", description: "Dock availability schedule view.", releaseState: "draft" },
  { id: "UI-025", name: "WarehouseAlertModule", version: "1.0.0", description: "Warehouse alert notification panel.", releaseState: "draft" },
  { id: "UI-026", name: "WarehouseCostModule", version: "1.0.0", description: "Warehousing cost breakdown panel.", releaseState: "draft" },
  { id: "UI-027", name: "WarehouseComplianceModule", version: "1.0.0", description: "Regulatory compliance status panel.", releaseState: "draft" },
  { id: "UI-028", name: "WarehouseStaffModule", version: "1.0.0", description: "Staffing level indicator.", releaseState: "draft" },
  { id: "UI-029", name: "WarehouseForecastModule", version: "1.0.0", description: "Demand forecast display panel.", releaseState: "draft" },
  { id: "UI-030", name: "WarehouseAuditModule", version: "1.0.0", description: "Audit trail panel for warehouse records.", releaseState: "draft" },
  { id: "UI-031", name: "CarrierPerformanceModule", version: "1.0.0", description: "Carrier on-time performance dashboard.", releaseState: "draft" },
  { id: "UI-032", name: "CarrierAvailabilityModule", version: "1.0.0", description: "Carrier lane availability view.", releaseState: "draft" },
  { id: "UI-033", name: "CarrierRateModule", version: "1.0.0", description: "Contract rate card display.", releaseState: "draft" },
  { id: "UI-034", name: "CarrierComplianceModule", version: "1.0.0", description: "Carrier compliance certificate panel.", releaseState: "draft" },
  { id: "UI-035", name: "CarrierTrackingModule", version: "1.0.0", description: "Carrier tracking event feed.", releaseState: "draft" },
  { id: "UI-036", name: "CarrierSLAModule", version: "1.0.0", description: "SLA compliance scorecard.", releaseState: "draft" },
  { id: "UI-037", name: "CarrierRiskModule", version: "1.0.0", description: "Carrier risk assessment view.", releaseState: "draft" },
  { id: "UI-038", name: "CarrierInvoiceModule", version: "1.0.0", description: "Invoice reconciliation panel.", releaseState: "draft" },
  { id: "UI-039", name: "CarrierClaimModule", version: "1.0.0", description: "Claims tracking panel.", releaseState: "draft" },
  { id: "UI-040", name: "CarrierAuditModule", version: "1.0.0", description: "Audit trail panel for carrier assessments.", releaseState: "draft" },
  { id: "UI-041", name: "OrderQueueModule", version: "1.0.0", description: "Active order queue display.", releaseState: "draft" },
  { id: "UI-042", name: "OrderStatusModule", version: "1.0.0", description: "Order fulfilment status tracker.", releaseState: "draft" },
  { id: "UI-043", name: "OrderExceptionModule", version: "1.0.0", description: "Order exception alert panel.", releaseState: "draft" },
  { id: "UI-044", name: "OrderCostModule", version: "1.0.0", description: "Order cost breakdown view.", releaseState: "draft" },
  { id: "UI-045", name: "OrderDeliveryModule", version: "1.0.0", description: "Delivery confirmation and POD panel.", releaseState: "draft" },
  { id: "UI-046", name: "OrderTraceModule", version: "1.0.0", description: "End-to-end order trace view.", releaseState: "draft" },
  { id: "UI-047", name: "NetworkCongestionModule", version: "1.0.0", description: "Network congestion heatmap.", releaseState: "draft" },
  { id: "UI-048", name: "SystemHealthModule", version: "1.0.0", description: "Integration system health dashboard.", releaseState: "draft" },
  { id: "UI-049", name: "SystemFreshnessModule", version: "1.0.0", description: "Data freshness indicator across all feeds.", releaseState: "draft" },
  { id: "UI-050", name: "SystemLineageModule", version: "1.0.0", description: "Source lineage explorer panel.", releaseState: "draft" }
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------
export function getEngineCard(id: string): EngineRegistryEntry | undefined {
  return ENGINE_CARD_REGISTRY.find((c) => c.id === id);
}

export function getMapCard(id: string): MapCardRegistryEntry | undefined {
  return MAP_CARD_REGISTRY.find((c) => c.id === id);
}

export function getUIModule(id: string): CardDescriptor | undefined {
  return UI_MODULE_REGISTRY.find((c) => c.id === id);
}
