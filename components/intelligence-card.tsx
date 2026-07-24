// components/intelligence-card.tsx
// Renders a single MapCardOutput with its explanation, integrity fields,
// and engine-output lineage.
// Build Rule 4: map cards explain results only — no decision signals here.
// Build Rule 6: all integrity fields are displayed.
// Build Rule 7: source lineage is shown when evidence is available.
// Build Rule 8: demo payloads are visibly labelled.

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
    <section
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
      aria-label={`Map card: ${mapCard.cardName}`}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
            {mapCard.cardId}
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

      {/* Explanation — Build Rule 4: map cards explain, not decide */}
      <p style={{ fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "0.75rem", lineHeight: 1.6 }}>
        {mapCard.explanation}
      </p>

      {/* Integrity fields — Build Rule 6 */}
      <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 12px", fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.75rem" }}>
        <dt>Freshness</dt>
        <dd style={{ fontFamily: "var(--font-mono)", color: "#cbd5e1" }}>{mapCard.freshness}</dd>
        {mapCard.missingInput.length > 0 && (
          <>
            <dt style={{ color: "#fca5a5" }}>Missing</dt>
            <dd style={{ color: "#fca5a5" }}>{mapCard.missingInput.join(", ")}</dd>
          </>
        )}
      </dl>

      {/* Source lineage — Build Rule 7 */}
      {mapCard.lineage.length > 0 && (
        <details open={defaultExpanded} style={{ marginBottom: "0.75rem" }}>
          <summary style={{ fontSize: "0.75rem", color: "#64748b", cursor: "pointer" }}>
            Source Lineage ({mapCard.lineage.length} record{mapCard.lineage.length !== 1 ? "s" : ""})
          </summary>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem", listStyle: "none" }}>
            {mapCard.lineage.map((l, i) => (
              <li
                key={i}
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  color: "#475569",
                  borderLeft: "2px solid #334155",
                  paddingLeft: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                raw:{l.rawRecordId} → {l.source} [{l.capturedAt}] →{" "}
                {l.transformSteps.join(" → ")} → {l.engineCardId}
                {l.mapCardId ? ` → ${l.mapCardId}` : ""}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Engine outputs summary */}
      {mapCard.engineOutputs.length > 0 && (
        <details open={defaultExpanded}>
          <summary style={{ fontSize: "0.75rem", color: "#64748b", cursor: "pointer" }}>
            Engine Outputs ({mapCard.engineOutputs.length})
          </summary>
          <ul style={{ marginTop: "0.5rem", listStyle: "none" }}>
            {mapCard.engineOutputs.map((e) => (
              <li
                key={e.cardId}
                style={{
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  background: "#0f172a",
                  borderRadius: "4px",
                  marginBottom: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", color: "#64748b" }}>
                  {e.cardId}
                </span>
                <span style={{ color: "#94a3b8" }}>{e.cardName}</span>
                <StatusPill
                  status={e.status}
                  confidence={e.confidence}
                  isDemoPayload={e.isDemoPayload}
                />
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
