// components/logistics-workbench.tsx
// Full PEPWORLD Logistics Intelligence V2 responsive workbench.
// Desktop: 3-column layout (left panel · center map · right cards).
// Mobile: map first, expandable bottom-sheet for cards.
//
// Build Rule 1: does not modify any live application.
// Build Rule 4: GO/CAUTION/AVOID (and NOT_COMPUTED) signal lives at response
//               level, never inside individual map cards.
// Build Rule 5: No fabricated coordinates — map shows "No verified geographic
//               features loaded" in demo mode.
// Build Rule 8: demo payloads are always labelled.

"use client";

import { useState, useCallback } from "react";
import type { IntelligenceResponse, MapCardOutput } from "@/lib/types";
import { LeafletMap, type LeafletMapLayer } from "./leaflet-map";
import { IntelligenceCard } from "./intelligence-card";
import { StatusPill } from "./status-pill";

interface LogisticsWorkbenchProps {
  initialResponse: IntelligenceResponse;
}

// Suggested questions shown in the left panel (demonstration only).
const SUGGESTED_QUESTIONS = [
  "What is the route capacity for NCR to Cebu?",
  "Which vehicles are available in Mindanao?",
  "Show warehouse throughput for Davao hub.",
  "What is the carrier compliance status?",
  "Are there any route hazards on RORO lanes?",
  "What demand forecast exists for Visayas region?",
];

const INITIAL_LAYERS: LeafletMapLayer[] = [
  { id: "route",     label: "Routes",     enabled: true  },
  { id: "vehicle",   label: "Vehicles",   enabled: true  },
  { id: "warehouse", label: "Warehouses", enabled: true  },
  { id: "carrier",   label: "Carriers",   enabled: false },
  { id: "order",     label: "Orders",     enabled: false },
];

// Right-panel card order per specification:
// MC01, MC02, MC03 or MC06, (ENG cards), MC04, MC05, MC07, MC08, MC09–MC12 when relevant.
const RIGHT_PANEL_ORDER = [
  "MC-001", "MC-002", "MC-003", "MC-006",
  "MC-004", "MC-005", "MC-007", "MC-008",
  "MC-009", "MC-010", "MC-011", "MC-012",
];

function sortMapCards(cards: MapCardOutput[]): MapCardOutput[] {
  return [...cards].sort((a, b) => {
    const ai = RIGHT_PANEL_ORDER.indexOf(a.cardId);
    const bi = RIGHT_PANEL_ORDER.indexOf(b.cardId);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

// Slot labels for right panel per approved spec.
const CARD_SLOT_LABEL: Record<string, string> = {
  "MC-001": "MC01 · Map Answer",
  "MC-002": "MC02 · Selected Connection",
  "MC-003": "MC03 · Route Intelligence",
  "MC-004": "MC04 · Node Intelligence",
  "MC-005": "MC05 · Ecosystem Context",
  "MC-006": "MC06 · Territory and Coverage",
  "MC-007": "MC07 · Data Condition",
  "MC-008": "MC08 · Evidence (Compliance)",
  "MC-009": "MC09 · Cost Intelligence",
  "MC-010": "MC10 · Risk Intelligence",
  "MC-011": "MC11 · Data Quality",
  "MC-012": "MC12 · Lineage",
};

const SIGNAL_STYLE: Record<string, React.CSSProperties> = {
  GO:           { background: "#14532d", color: "#86efac", border: "1px solid #16a34a" },
  CAUTION:      { background: "#713f12", color: "#fde68a", border: "1px solid #ca8a04" },
  AVOID:        { background: "#7f1d1d", color: "#fca5a5", border: "1px solid #dc2626" },
  NOT_COMPUTED: { background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" },
};

export function LogisticsWorkbench({ initialResponse }: LogisticsWorkbenchProps) {
  const [response, setResponse] = useState(initialResponse);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [layers, setLayers] = useState<LeafletMapLayer[]>(INITIAL_LAYERS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const r = response;
  const sortedCards = sortMapCards(r.mapCardOutputs);
  const signalStyle = SIGNAL_STYLE[r.decisionSignal] ?? SIGNAL_STYLE.NOT_COMPUTED;

  const handleSubmit = useCallback(() => {
    const q = question.trim();
    if (!q) return;
    // DEMO MODE: just log question to history; do not connect to any API.
    setHistory((prev) => [q, ...prev].slice(0, 20));
    setQuestion("");
    // Response stays as demo payload (Build Rule 2).
    setResponse((prev) => ({
      ...prev,
      requestId: `DEMO-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }));
  }, [question]);

  const handleSuggested = useCallback((q: string) => {
    setQuestion(q);
  }, []);

  const handleClear = useCallback(() => {
    setQuestion("");
    setHistory([]);
    setResponse(initialResponse);
    setSelectedNodeId(null);
  }, [initialResponse]);

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  }, []);

  // ---------------------------------------------------------------------------
  // Left panel content
  // ---------------------------------------------------------------------------
  const leftPanel = (
    <aside
      className="v2-left-panel"
      aria-label="Question and controls"
    >
      {/* Question input */}
      <section className="v2-panel-section">
        <h2 className="v2-section-title">Ask a Question</h2>
        <textarea
          className="v2-textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
          }}
          placeholder="e.g. What is the route capacity for NCR to Cebu?"
          rows={3}
          aria-label="Logistics question input"
        />
        <button
          className="v2-btn-primary"
          onClick={handleSubmit}
          disabled={!question.trim()}
        >
          Ask (Demo)
        </button>
        <p className="v2-hint">⚠ Demo mode — no live connection</p>
      </section>

      {/* Suggested questions */}
      <section className="v2-panel-section">
        <h2 className="v2-section-title">Suggested Questions</h2>
        <ul className="v2-suggestion-list">
          {SUGGESTED_QUESTIONS.map((q) => (
            <li key={q}>
              <button
                className="v2-suggestion-btn"
                onClick={() => handleSuggested(q)}
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Layer controls */}
      <section className="v2-panel-section">
        <h2 className="v2-section-title">Layer Controls</h2>
        <ul className="v2-layer-list">
          {layers.map((layer) => (
            <li key={layer.id} className="v2-layer-item">
              <label className="v2-layer-label">
                <input
                  type="checkbox"
                  checked={layer.enabled}
                  onChange={() => toggleLayer(layer.id)}
                  className="v2-checkbox"
                />
                {LAYER_ICON[layer.id] ?? "●"} {layer.label}
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Question history */}
      {history.length > 0 && (
        <section className="v2-panel-section">
          <h2 className="v2-section-title">Question History</h2>
          <ol className="v2-history-list">
            {history.map((q, i) => (
              <li key={i} className="v2-history-item">
                <button
                  className="v2-suggestion-btn"
                  onClick={() => handleSuggested(q)}
                >
                  {q}
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Clear / reset */}
      <section className="v2-panel-section">
        <button className="v2-btn-secondary" onClick={handleClear}>
          Clear &amp; Reset
        </button>
      </section>
    </aside>
  );

  // ---------------------------------------------------------------------------
  // Center panel (map)
  // ---------------------------------------------------------------------------
  const centerPanel = (
    <div className="v2-center-panel" aria-label="Map panel">
      {/* Decision signal strip */}
      <div
        className="v2-signal-strip"
        style={signalStyle}
        aria-label="Decision signal"
      >
        <span className="v2-signal-label">{r.decisionSignal}</span>
        <span className="v2-signal-reason">{r.decisionReason}</span>
        <StatusPill
          status={r.status}
          confidence={r.confidence}
          releaseState={r.releaseState}
          isDemoPayload={r.isDemoPayload}
        />
      </div>

      {/* Map area */}
      <div className="v2-map-area">
        <LeafletMap
          mapCardOutputs={r.mapCardOutputs}
          layers={layers}
          selectedNodeId={selectedNodeId}
        />
      </div>

      {/* Selected node state */}
      {selectedNodeId && (
        <div className="v2-selected-node" aria-label="Selected node">
          <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
            Selected: <strong>{selectedNodeId}</strong>
          </span>
          <button
            className="v2-clear-selection"
            onClick={() => setSelectedNodeId(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );

  // ---------------------------------------------------------------------------
  // Right panel (card stack)
  // ---------------------------------------------------------------------------
  const rightPanel = (
    <aside className="v2-right-panel" aria-label="Intelligence cards">
      <h2 className="v2-section-title" style={{ padding: "0 0 0.5rem" }}>
        Intelligence Cards
      </h2>
      {sortedCards.map((mc) => (
        <div key={mc.cardId} className="v2-card-wrapper">
          {CARD_SLOT_LABEL[mc.cardId] && (
            <div className="v2-card-slot-label">
              {CARD_SLOT_LABEL[mc.cardId]}
            </div>
          )}
          <IntelligenceCard mapCard={mc} />
        </div>
      ))}
    </aside>
  );

  // ---------------------------------------------------------------------------
  // Mobile bottom-sheet toggle (map stays visible)
  // ---------------------------------------------------------------------------
  const mobileSheet = (
    <div className={`v2-bottom-sheet${sheetOpen ? " v2-bottom-sheet--open" : ""}`}>
      <div className="v2-sheet-handle-bar">
        <button
          className="v2-sheet-toggle"
          aria-expanded={sheetOpen}
          aria-label={sheetOpen ? "Collapse cards" : "Expand cards"}
          onClick={() => setSheetOpen((v) => !v)}
        >
          {sheetOpen ? "▼ Hide cards" : "▲ Show cards"}
        </button>
      </div>
      {sheetOpen && (
        <div className="v2-sheet-content">
          {/* Mobile card order per spec */}
          {sortedCards.map((mc) => (
            <div key={mc.cardId} className="v2-card-wrapper">
              {CARD_SLOT_LABEL[mc.cardId] && (
                <div className="v2-card-slot-label">
                  {CARD_SLOT_LABEL[mc.cardId]}
                </div>
              )}
              <IntelligenceCard mapCard={mc} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Desktop 3-column layout */}
      <div className="v2-workbench">
        {leftPanel}
        {centerPanel}
        {rightPanel}
      </div>

      {/* Mobile layout: map + bottom-sheet */}
      <div className="v2-mobile-workbench">
        {/* Decision strip */}
        <div
          className="v2-signal-strip"
          style={signalStyle}
          aria-label="Decision signal"
        >
          <span className="v2-signal-label">{r.decisionSignal}</span>
          <span className="v2-signal-reason">{r.decisionReason}</span>
        </div>

        {/* Full-width map */}
        <div className="v2-mobile-map">
          <LeafletMap
            mapCardOutputs={r.mapCardOutputs}
            layers={layers}
            selectedNodeId={selectedNodeId}
          />
        </div>

        {/* Bottom-sheet (map remains visible while sheet is open) */}
        {mobileSheet}
      </div>

      {/* Footer — always visible */}
      <footer className="v2-footer">
        <p>
          Build Rules: (1) live app not modified · (2) no production DB ·
          (3) 120 ENG / 50 UI / 12 MC separate · (4) map cards explain only ·
          (5) no fabricated data · (6) integrity fields preserved ·
          (7) lineage shown · (8) demo labelled
        </p>
        <p>
          Request: <code>{r.requestId}</code> ·{" "}
          Release: <code>{r.releaseState}</code>
        </p>
      </footer>
    </>
  );
}

const LAYER_ICON: Record<string, string> = {
  route:     "🛣",
  vehicle:   "🚚",
  warehouse: "🏭",
  carrier:   "📦",
  order:     "📋",
};

