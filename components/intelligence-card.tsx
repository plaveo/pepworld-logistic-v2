// components/intelligence-card.tsx
// Map cards explain geography, connections, evidence and data condition.
// They never issue GO / CAUTION / AVOID.

"use client";

import type { MapCardOutput } from "@/lib/types";
import { StatusPill } from "./status-pill";

interface IntelligenceCardProps {
  mapCard: MapCardOutput;
  defaultExpanded?: boolean;
}

export function IntelligenceCard({
  mapCard,
  defaultExpanded = false,
}: IntelligenceCardProps) {
  return (
    <section className="card" aria-label={`Map card: ${mapCard.cardName}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "0.5rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.7rem",
              color: "#64748b",
              fontFamily: "var(--font-mono)",
            }}
          >
            {mapCard.cardId} · v{mapCard.version} · {mapCard.category}
          </span>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>
            {mapCard.cardName}
          </h3>
        </div>
        <StatusPill
          status={mapCard.status}
          confidence={mapCard.confidence}
          releaseState={mapCard.releaseState}
          isDemoPayload={mapCard.isDemoPayload}
        />
      </div>

      <p style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: 1.6 }}>
        {mapCard.explanation}
      </p>

      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "2px 12px",
          fontSize: "0.72rem",
          color: "#94a3b8",
          marginTop: "0.75rem",
        }}
      >
        <dt>Connection</dt>
        <dd>{mapCard.connectionStatus}</dd>
        <dt>Calculation</dt>
        <dd>{mapCard.calculationStatus}</dd>
        <dt>Freshness</dt>
        <dd>{mapCard.freshness}</dd>
        {mapCard.missingInput.length > 0 && (
          <>
            <dt>Missing</dt>
            <dd>{mapCard.missingInput.join(", ")}</dd>
          </>
        )}
      </dl>

      {mapCard.lineage.length > 0 && (
        <details open={defaultExpanded} style={{ marginTop: "0.75rem" }}>
          <summary style={{ fontSize: "0.75rem", color: "#64748b", cursor: "pointer" }}>
            Evidence and lineage ({mapCard.lineage.length})
          </summary>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
            {mapCard.lineage.map((lineage, index) => (
              <li key={`${lineage.rawRecordId}-${index}`}>
                {lineage.source} → {lineage.rawRecordId} → {lineage.engineCardId}
              </li>
            ))}
          </ul>
        </details>
      )}

      {mapCard.engineOutputs.length > 0 && (
        <details open={defaultExpanded} style={{ marginTop: "0.75rem" }}>
          <summary style={{ fontSize: "0.75rem", color: "#64748b", cursor: "pointer" }}>
            Relevant engine results ({mapCard.engineOutputs.length})
          </summary>
          <ul>
            {mapCard.engineOutputs.map((engine) => (
              <li key={engine.cardId}>
                {engine.cardId} — {engine.calculationStatus}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
