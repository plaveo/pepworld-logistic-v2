// components/ecosystem-map.tsx
// Visual representation of the logistics ecosystem showing active routes,
// vehicles and warehouses derived from map card outputs.
// Build Rule 5: Never fabricate coordinates — positions are derived from
// verified engine card outputs only. In demo mode, placeholder markers are
// used and clearly labelled.

"use client";

import type { MapCardOutput } from "@/lib/types";
import { StatusPill } from "./status-pill";

interface EcosystemNode {
  id: string;
  label: string;
  type: "route" | "vehicle" | "warehouse" | "carrier" | "order";
  status: string;
  isDemoPayload: boolean;
  confidence: string;
}

interface EcosystemMapProps {
  mapCardOutputs: MapCardOutput[];
}

function extractNodes(mapCardOutputs: MapCardOutput[]): EcosystemNode[] {
  const nodes: EcosystemNode[] = [];

  for (const card of mapCardOutputs) {
    for (const engine of card.engineOutputs) {
      const payload = engine.payload as Record<string, unknown>;

      if (payload.routeId) {
        nodes.push({
          id: String(payload.routeId),
          label: String(payload.routeId),
          type: "route",
          status: engine.status,
          isDemoPayload: engine.isDemoPayload,
          confidence: engine.confidence,
        });
      }
      if (payload.vehicleId) {
        nodes.push({
          id: String(payload.vehicleId),
          label: String(payload.vehicleId),
          type: "vehicle",
          status: engine.status,
          isDemoPayload: engine.isDemoPayload,
          confidence: engine.confidence,
        });
      }
      if (payload.warehouseId) {
        nodes.push({
          id: String(payload.warehouseId),
          label: String(payload.warehouseId),
          type: "warehouse",
          status: engine.status,
          isDemoPayload: engine.isDemoPayload,
          confidence: engine.confidence,
        });
      }
    }
  }

  // Deduplicate by id
  const seen = new Set<string>();
  return nodes.filter((n) => {
    if (seen.has(n.id)) return false;
    seen.add(n.id);
    return true;
  });
}

const TYPE_ICON: Record<EcosystemNode["type"], string> = {
  route:     "🛣",
  vehicle:   "🚚",
  warehouse: "🏭",
  carrier:   "📦",
  order:     "📋",
};

export function EcosystemMap({ mapCardOutputs }: EcosystemMapProps) {
  const nodes = extractNodes(mapCardOutputs);
  const hasNodes = nodes.length > 0;

  return (
    <section
      style={{
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
      aria-label="Logistics Ecosystem Map"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>
          Ecosystem Map
        </h2>
        {/* Build Rule 8: label demo map visibly */}
        <span style={{ fontSize: "0.7rem", color: "#7c3aed", fontWeight: 700 }}>
          ⚠ DEMO — No verified coordinates
        </span>
      </div>

      {!hasNodes && (
        <p style={{ color: "#475569", fontSize: "0.875rem" }}>
          No entities resolved from current map card outputs.
        </p>
      )}

      {hasNodes && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "0.5rem",
          }}
          role="list"
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              role="listitem"
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "6px",
                padding: "0.5rem 0.75rem",
              }}
            >
              <div style={{ fontSize: "1.25rem", marginBottom: "4px" }}>
                {TYPE_ICON[node.type]}
              </div>
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#94a3b8" }}>
                {node.label}
              </div>
              <div style={{ marginTop: "4px" }}>
                <StatusPill
                  status={node.status as never}
                  confidence={node.confidence as never}
                  isDemoPayload={node.isDemoPayload}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: "0.75rem", fontSize: "0.65rem", color: "#334155" }}>
        Build Rule 5: Coordinates, availability and capacity shown here are never
        fabricated. In demo mode all entity data is derived solely from demo payloads.
      </p>
    </section>
  );
}
