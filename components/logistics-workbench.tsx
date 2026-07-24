// components/logistics-workbench.tsx
// Responsive V2 workbench: desktop left/center/right; mobile map-first bottom sheet.

"use client";

import { useCallback, useState } from "react";
import type { IntelligenceResponse, MapCardOutput } from "@/lib/types";
import { LeafletMap, type LeafletMapLayer } from "./leaflet-map";
import { IntelligenceCard } from "./intelligence-card";
import { StatusPill } from "./status-pill";

interface LogisticsWorkbenchProps {
  initialResponse: IntelligenceResponse;
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

export function LogisticsWorkbench({ initialResponse }: LogisticsWorkbenchProps) {
  const [response, setResponse] = useState(initialResponse);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [layers, setLayers] = useState<LeafletMapLayer[]>(INITIAL_LAYERS);
  const [sheetOpen, setSheetOpen] = useState(false);

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
          }}
        >
          Clear and Reset
        </button>
      </section>
    </aside>
  );

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
        <LeafletMap
          mapCardOutputs={response.mapCardOutputs}
          layers={layers}
          selectedNodeId={null}
        />
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
          <LeafletMap
            mapCardOutputs={response.mapCardOutputs}
            layers={layers}
            selectedNodeId={null}
          />
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
