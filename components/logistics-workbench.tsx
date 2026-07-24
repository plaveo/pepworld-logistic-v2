// components/logistics-workbench.tsx
// Main workbench shell that assembles the EcosystemMap, IntelligenceCards
// and decision signal panel.
// Build Rule 1: does not modify any live application.
// Build Rule 4: GO/CAUTION/AVOID is displayed here at workbench level, not
//               inside individual map cards.
// Build Rule 8: demo payloads are always labelled.

"use client";

import type { IntelligenceResponse } from "@/lib/types";
import { EcosystemMap } from "./ecosystem-map";
import { IntelligenceCard } from "./intelligence-card";
import { StatusPill } from "./status-pill";

interface LogisticsWorkbenchProps {
  initialResponse: IntelligenceResponse;
}

const SIGNAL_STYLE: Record<string, React.CSSProperties> = {
  GO:      { background: "#14532d", color: "#86efac", border: "1px solid #16a34a" },
  CAUTION: { background: "#713f12", color: "#fde68a", border: "1px solid #ca8a04" },
  AVOID:   { background: "#7f1d1d", color: "#fca5a5", border: "1px solid #dc2626" },
};

export function LogisticsWorkbench({ initialResponse }: LogisticsWorkbenchProps) {
  const r = initialResponse;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem 1rem 4rem" }}>
      {/* Workbench header */}
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "0.25rem" }}>
          PEPWORLD Logistics Intelligence V2
        </h1>
        <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
          Request ID: <span style={{ fontFamily: "var(--font-mono)" }}>{r.requestId}</span>
          {" · "}
          Timestamp: <span style={{ fontFamily: "var(--font-mono)" }}>{r.timestamp}</span>
        </p>
      </header>

      {/* Decision signal panel — Build Rule 4: decision lives here, not in map cards */}
      <section
        style={{
          ...SIGNAL_STYLE[r.decisionSignal],
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
        }}
        aria-label="Decision signal"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            {r.decisionSignal}
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>{r.decisionReason}</p>
          </div>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <StatusPill
            status={r.status}
            confidence={r.confidence}
            releaseState={r.releaseState}
            isDemoPayload={r.isDemoPayload}
          />
        </div>
        {r.missingInput.length > 0 && (
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
            Missing inputs: {r.missingInput.join(", ")}
          </p>
        )}
      </section>

      {/* Ecosystem map */}
      <EcosystemMap mapCardOutputs={r.mapCardOutputs} />

      {/* Map cards — Build Rule 3: 12 map cards as separate component classes */}
      <section aria-label="Map card outputs">
        <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#64748b", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Map Cards ({r.mapCardOutputs.length})
        </h2>
        {r.mapCardOutputs.map((mc) => (
          <IntelligenceCard key={mc.cardId} mapCard={mc} />
        ))}
      </section>

      {/* Footer */}
      <footer style={{ marginTop: "2rem", borderTop: "1px solid #1e293b", paddingTop: "1rem", fontSize: "0.65rem", color: "#334155" }}>
        <p>
          Build Rules enforced: (1) live app not modified · (2) no production DB writes ·
          (3) 120 engine / 50 UI / 12 map cards separate · (4) map cards explain only ·
          (5) no fabricated data · (6) integrity fields preserved · (7) lineage displayed ·
          (8) demo payloads labelled
        </p>
      </footer>
    </div>
  );
}
