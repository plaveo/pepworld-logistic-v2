// components/logistics-workbench.tsx
// Responsive V2 workbench: desktop left/center/right; mobile map-first bottom sheet.
// Visualization-only: no GO/CAUTION/AVOID, no CIS, no Zebra V2.

"use client";

import { useCallback, useState } from "react";
import type { IntelligenceResponse, MapCardOutput } from "@/lib/types";
import { LeafletMap, type LeafletMapLayer } from "./leaflet-map";
import { IntelligenceCard } from "./intelligence-card";
import { StatusPill } from "./status-pill";
import type {
  EcosystemRelationshipPayload,
  RelationshipLine,
  TerritoryPolygon,
  RelationshipType,
  TerritoryType,
} from "@/lib/ecosystem-relationship";

interface LogisticsWorkbenchProps {
  initialResponse: IntelligenceResponse;
  ecosystemRelationshipPayload?: EcosystemRelationshipPayload | null;
}

const SUGGESTED_QUESTIONS = [
  "Which refrigerated warehouses are connected to Manila Port?",
  "What route evidence is available for the selected connection?",
  "Which logistics nodes are inside the selected territory?",
  "What data is missing for this map answer?",
  "What alternative routes or facilities are recorded?",
  "What support dependencies are available near the selected node?",
];

const INITIAL_LAYERS: LeafletMapLayer[] = [
  { id: "port", label: "Ports", enabled: true },
  { id: "airport", label: "Airports", enabled: true },
  { id: "warehouse", label: "Warehouses", enabled: true },
  { id: "road", label: "Roads", enabled: true },
  { id: "industrial-zone", label: "Industrial zones", enabled: false },
  { id: "market", label: "Markets", enabled: false },
  { id: "workforce", label: "Workforce areas", enabled: false },
  { id: "support", label: "Support services", enabled: false },
];

const RELATIONSHIP_TYPE_LABELS: Record<RelationshipType, string> = {
  road:                      "Road",
  "cargo-flow":              "Cargo Flow",
  "supply-chain-dependency": "Supply Chain Dependency",
  support:                   "Support",
  economic:                  "Economic",
  workforce:                 "Workforce",
  utility:                   "Utility",
  market:                    "Market",
  alternative:               "Alternative",
  risk:                      "Risk",
  connectivity:              "Connectivity",
};

const ALL_RELATIONSHIP_TYPES: RelationshipType[] = [
  "road",
  "cargo-flow",
  "supply-chain-dependency",
  "support",
  "economic",
  "workforce",
  "utility",
  "market",
  "alternative",
  "risk",
  "connectivity",
];

const TERRITORY_TYPE_LABELS: Record<TerritoryType, string> = {
  province:            "Province",
  city:                "City",
  "industrial-zone":   "Industrial Zone",
  "economic-zone":     "Economic Zone",
  "port-area":         "Port Area",
  "airport-area":      "Airport Area",
  "logistics-cluster": "Logistics Cluster",
  "service-area":      "Service Area",
  "risk-area":         "Risk Area",
  "market-area":       "Market Area",
};

const ALL_TERRITORY_TYPES: TerritoryType[] = [
  "province",
  "city",
  "industrial-zone",
  "economic-zone",
  "port-area",
  "airport-area",
  "logistics-cluster",
  "service-area",
  "risk-area",
  "market-area",
];

const RIGHT_PANEL_ORDER = [
  "MC01",
  "MC02",
  "MC03",
  "MC06",
  "MC04",
  "MC05",
  "MC07",
  "MC08",
  "MC09",
  "MC10",
  "MC11",
  "MC12",
];

const CARD_SLOT_LABEL: Record<string, string> = {
  MC01: "MC01 · Map Answer",
  MC02: "MC02 · Selected Connection",
  MC03: "MC03 · Route Intelligence",
  MC04: "MC04 · Node Intelligence",
  MC05: "MC05 · Ecosystem Context",
  MC06: "MC06 · Territory and Coverage",
  MC07: "MC07 · Data Condition",
  MC08: "MC08 · Evidence and Lineage",
  MC09: "MC09 · Compatibility",
  MC10: "MC10 · Capacity and Availability",
  MC11: "MC11 · Alternatives",
  MC12: "MC12 · Dependency and Support",
};

const SIGNAL_STYLE: Record<string, React.CSSProperties> = {
  GO: { background: "#14532d", color: "#86efac", border: "1px solid #16a34a" },
  CAUTION: { background: "#713f12", color: "#fde68a", border: "1px solid #ca8a04" },
  AVOID: { background: "#7f1d1d", color: "#fca5a5", border: "1px solid #dc2626" },
  NOT_COMPUTED: {
    background: "#1e293b",
    color: "#94a3b8",
    border: "1px solid #334155",
  },
};

function sortMapCards(cards: MapCardOutput[]): MapCardOutput[] {
  return [...cards].sort(
    (a, b) => RIGHT_PANEL_ORDER.indexOf(a.cardId) - RIGHT_PANEL_ORDER.indexOf(b.cardId)
  );
}

function buildInitialRelationshipLayerState(): Partial<Record<RelationshipType, boolean>> {
  const state: Partial<Record<RelationshipType, boolean>> = {};
  for (const type of ALL_RELATIONSHIP_TYPES) {
    state[type] = true;
  }
  return state;
}

function buildInitialTerritoryLayerState(): Partial<Record<TerritoryType, boolean>> {
  const state: Partial<Record<TerritoryType, boolean>> = {};
  for (const type of ALL_TERRITORY_TYPES) {
    state[type] = true;
  }
  return state;
}

export function LogisticsWorkbench({
  initialResponse,
  ecosystemRelationshipPayload,
}: LogisticsWorkbenchProps) {
  const [response, setResponse] = useState(initialResponse);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [layers, setLayers] = useState<LeafletMapLayer[]>(INITIAL_LAYERS);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Independent selection state per category.
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<string | null>(null);
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);

  // Layer visibility state.
  const [relationshipLayerState, setRelationshipLayerState] = useState<
    Partial<Record<RelationshipType, boolean>>
  >(buildInitialRelationshipLayerState);

  const [territoryLayerState, setTerritoryLayerState] = useState<
    Partial<Record<TerritoryType, boolean>>
  >(buildInitialTerritoryLayerState);

  const sortedCards = sortMapCards(response.mapCardOutputs);
  const signalStyle =
    SIGNAL_STYLE[response.decisionSignal] ?? SIGNAL_STYLE.NOT_COMPUTED;

  const submitQuestion = useCallback(() => {
    const value = question.trim();
    if (!value) return;
    setHistory((previous) => [value, ...previous].slice(0, 20));
    setQuestion("");
    setResponse((previous) => ({
      ...previous,
      requestId: `DEMO-${Date.now()}`,
      timestamp: new Date().toISOString(),
      decisionSignal: "NOT_COMPUTED",
      answerStatus: "NOT_YET_COMPUTED",
    }));
  }, [question]);

  const toggleLayer = useCallback((id: string) => {
    setLayers((previous) =>
      previous.map((layer) =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  }, []);

  // Selection handlers.
  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const clearNodeSelection = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleRelationshipSelect = useCallback((id: string) => {
    setSelectedRelationshipId(id);
  }, []);

  const clearRelationshipSelection = useCallback(() => {
    setSelectedRelationshipId(null);
  }, []);

  const handleTerritorySelect = useCallback((id: string) => {
    setSelectedTerritoryId(id);
  }, []);

  const clearTerritorySelection = useCallback(() => {
    setSelectedTerritoryId(null);
  }, []);

  // Layer toggle handlers.
  const toggleRelationshipType = useCallback((type: RelationshipType) => {
    setRelationshipLayerState((previous) => ({
      ...previous,
      [type]: previous[type] === false,
    }));
  }, []);

  const toggleTerritoryType = useCallback((type: TerritoryType) => {
    setTerritoryLayerState((previous) => ({
      ...previous,
      [type]: previous[type] === false,
    }));
  }, []);

  // Derived data for selection panels.
  const selectedRelationship: RelationshipLine | null =
    selectedRelationshipId && ecosystemRelationshipPayload
      ? ecosystemRelationshipPayload.relationships.find(
          (r) => r.id === selectedRelationshipId
        ) ?? null
      : null;

  const selectedTerritory: TerritoryPolygon | null =
    selectedTerritoryId && ecosystemRelationshipPayload
      ? ecosystemRelationshipPayload.territories.find(
          (t) => t.id === selectedTerritoryId
        ) ?? null
      : null;

  // Card stack (right panel).
  const cardStack = (
    <>
      {sortedCards.map((card) => (
        <div key={card.cardId} className="v2-card-wrapper">
          <div className="v2-card-slot-label">{CARD_SLOT_LABEL[card.cardId]}</div>
          <IntelligenceCard mapCard={card} />
        </div>
      ))}
    </>
  );

  const leftPanel = (
    <aside className="v2-left-panel" aria-label="Question and layer controls">
      <section className="v2-panel-section">
        <h2 className="v2-section-title">Ask a Map Question</h2>
        <textarea
          className="v2-textarea"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              submitQuestion();
            }
          }}
          placeholder="Ask about a port, airport, warehouse, route, territory or support node."
          rows={4}
        />
        <button
          className="v2-btn-primary"
          onClick={submitQuestion}
          disabled={!question.trim()}
        >
          Submit Question
        </button>
        <p className="v2-hint">Demonstration mode — no operational data connected.</p>
      </section>

      <section className="v2-panel-section">
        <h2 className="v2-section-title">Suggested Questions</h2>
        <ul className="v2-suggestion-list">
          {SUGGESTED_QUESTIONS.map((item) => (
            <li key={item}>
              <button className="v2-suggestion-btn" onClick={() => setQuestion(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="v2-panel-section">
        <h2 className="v2-section-title">Layers</h2>
        <ul className="v2-layer-list">
          {layers.map((layer) => (
            <li key={layer.id} className="v2-layer-item">
              <label className="v2-layer-label">
                <input
                  className="v2-checkbox"
                  type="checkbox"
                  checked={layer.enabled}
                  onChange={() => toggleLayer(layer.id)}
                />
                {layer.label}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="v2-panel-section">
        <h2 className="v2-section-title">Ecosystem Relationships</h2>
        {ecosystemRelationshipPayload ? (
          <ul className="v2-layer-list">
            {ALL_RELATIONSHIP_TYPES.map((type) => (
              <li key={type} className="v2-layer-item">
                <label className="v2-layer-label">
                  <input
                    className="v2-checkbox"
                    type="checkbox"
                    checked={relationshipLayerState[type] !== false}
                    onChange={() => toggleRelationshipType(type)}
                    aria-label={`Toggle ${RELATIONSHIP_TYPE_LABELS[type]} relationships`}
                  />
                  {RELATIONSHIP_TYPE_LABELS[type]}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="v2-hint">No verified ecosystem relationships loaded.</p>
        )}
      </section>

      <section className="v2-panel-section">
        <h2 className="v2-section-title">Territories</h2>
        {ecosystemRelationshipPayload ? (
          <ul className="v2-layer-list">
            {ALL_TERRITORY_TYPES.map((type) => (
              <li key={type} className="v2-layer-item">
                <label className="v2-layer-label">
                  <input
                    className="v2-checkbox"
                    type="checkbox"
                    checked={territoryLayerState[type] !== false}
                    onChange={() => toggleTerritoryType(type)}
                    aria-label={`Toggle ${TERRITORY_TYPE_LABELS[type]} territories`}
                  />
                  {TERRITORY_TYPE_LABELS[type]}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="v2-hint">No verified territories loaded.</p>
        )}
      </section>

      {selectedNodeId && (
        <section className="v2-panel-section">
          <h2 className="v2-section-title">Selected Node</h2>
          <p style={{ fontSize: "0.78rem", color: "#e2e8f0", marginBottom: "0.5rem" }}>
            {selectedNodeId}
          </p>
          <button
            className="v2-btn-secondary"
            onClick={clearNodeSelection}
            style={{ fontSize: "0.75rem" }}
          >
            Clear node selection
          </button>
        </section>
      )}

      <section className="v2-panel-section">
        <h2 className="v2-section-title">Selected Relationship</h2>
        {selectedRelationship ? (
          <div style={{ fontSize: "0.78rem", color: "#e2e8f0", lineHeight: 1.7 }}>
            <div><strong>Type:</strong> {selectedRelationship.relationshipType}</div>
            <div><strong>From Node:</strong> {selectedRelationship.fromNodeId}</div>
            <div><strong>To Node:</strong> {selectedRelationship.toNodeId}</div>
            <div><strong>Source ID:</strong> {selectedRelationship.sourceId}</div>
            <div><strong>Confidence:</strong> {selectedRelationship.confidence}</div>
            <div><strong>Freshness:</strong> {selectedRelationship.freshness}</div>
            <div><strong>Release State:</strong> {selectedRelationship.releaseState}</div>
            <button
              className="v2-btn-secondary"
              onClick={clearRelationshipSelection}
              style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}
            >
              Clear relationship selection
            </button>
          </div>
        ) : (
          <p className="v2-hint">No verified ecosystem relationship selected.</p>
        )}
      </section>

      <section className="v2-panel-section">
        <h2 className="v2-section-title">Selected Territory</h2>
        {selectedTerritory ? (
          <div style={{ fontSize: "0.78rem", color: "#e2e8f0", lineHeight: 1.7 }}>
            <div><strong>Label:</strong> {selectedTerritory.label}</div>
            <div><strong>Type:</strong> {selectedTerritory.territoryType}</div>
            <div><strong>Source ID:</strong> {selectedTerritory.sourceId}</div>
            <div><strong>Confidence:</strong> {selectedTerritory.confidence}</div>
            <div><strong>Freshness:</strong> {selectedTerritory.freshness}</div>
            <div><strong>Release State:</strong> {selectedTerritory.releaseState}</div>
            <button
              className="v2-btn-secondary"
              onClick={clearTerritorySelection}
              style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}
            >
              Clear territory selection
            </button>
          </div>
        ) : (
          <p className="v2-hint">No verified territory selected.</p>
        )}
      </section>

      {history.length > 0 && (
        <section className="v2-panel-section">
          <h2 className="v2-section-title">Question History</h2>
          <ol className="v2-history-list">
            {history.map((item, index) => (
              <li key={`${item}-${index}`} className="v2-history-item">
                <button className="v2-suggestion-btn" onClick={() => setQuestion(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="v2-panel-section">
        <button
          className="v2-btn-secondary"
          onClick={() => {
            setQuestion("");
            setHistory([]);
            setResponse(initialResponse);
            setSelectedNodeId(null);
            setSelectedRelationshipId(null);
            setSelectedTerritoryId(null);
            setLayers(INITIAL_LAYERS);
            setRelationshipLayerState(buildInitialRelationshipLayerState());
            setTerritoryLayerState(buildInitialTerritoryLayerState());
          }}
        >
          Clear and Reset
        </button>
      </section>
    </aside>
  );

  const sharedMapProps = {
    mapCardOutputs: response.mapCardOutputs,
    layers,
    selectedNodeId,
    onNodeSelect: handleNodeSelect,
    onClearSelection: clearNodeSelection,
    ecosystemRelationshipPayload: ecosystemRelationshipPayload ?? null,
    relationshipLayerState,
    territoryLayerState,
    selectedRelationshipId,
    selectedTerritoryId,
    onRelationshipSelect: handleRelationshipSelect,
    onTerritorySelect: handleTerritorySelect,
    onClearRelationshipSelection: clearRelationshipSelection,
    onClearTerritorySelection: clearTerritorySelection,
  };

  const mapPanel = (
    <div className="v2-center-panel" aria-label="Philippine Logistics Ecosystem Map">
      <div className="v2-signal-strip" style={signalStyle}>
        <span className="v2-signal-label">{response.decisionSignal}</span>
        <span className="v2-signal-reason">{response.decisionReason}</span>
        <StatusPill
          status={response.status}
          confidence={response.confidence}
          releaseState={response.releaseState}
          isDemoPayload={response.isDemoPayload}
        />
      </div>
      <div className="v2-map-area">
        <LeafletMap {...sharedMapProps} />
      </div>
    </div>
  );

  return (
    <>
      <div className="v2-workbench">
        {leftPanel}
        {mapPanel}
        <aside className="v2-right-panel" aria-label="Map intelligence cards">
          <h2 className="v2-section-title">Map Intelligence Result Bundle</h2>
          {cardStack}
        </aside>
      </div>

      <div className="v2-mobile-workbench">
        <div className="v2-mobile-map">
          <LeafletMap {...sharedMapProps} />
        </div>

        <div className={`v2-bottom-sheet${sheetOpen ? " v2-bottom-sheet--open" : ""}`}>
          <div className="v2-sheet-handle-bar">
            <button
              className="v2-sheet-toggle"
              onClick={() => setSheetOpen((current) => !current)}
              aria-expanded={sheetOpen}
            >
              {sheetOpen ? "Hide intelligence cards" : "Show intelligence cards"}
            </button>
          </div>
          {sheetOpen && <div className="v2-sheet-content">{cardStack}</div>}
        </div>
      </div>

      <footer className="v2-footer">
        ENG001–ENG120 · UI01–UI50 · MC01–MC12 · No live connection · NOT_COMPUTED
      </footer>
    </>
  );
}
