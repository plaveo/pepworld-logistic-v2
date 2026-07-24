// components/leaflet-map.tsx
// Philippine Logistics Ecosystem Map using Leaflet + OpenStreetMap.
// Build Rule 5: Never fabricate coordinates. Only the Philippines center is
//               hard-coded here. Entity markers are derived from verified
//               engine outputs only. In DEMO MODE coordinates are absent and
//               the message "No verified geographic features loaded" is shown.
// Build Rule 8: Demo mode is always labelled visibly.

"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMapType } from "leaflet";

import type { MapCardOutput } from "@/lib/types";

// Philippines geographic center (public knowledge, not fabricated data).
const PH_CENTER: [number, number] = [12.8797, 121.774];
const PH_ZOOM = 6;

export interface LeafletMapLayer {
  id: string;
  label: string;
  enabled: boolean;
}

interface LeafletMapProps {
  mapCardOutputs: MapCardOutput[];
  layers: LeafletMapLayer[];
  selectedNodeId?: string | null;
}

export function LeafletMap({ mapCardOutputs, layers, selectedNodeId }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMapType | null>(null);
  const [hasVerifiedCoords, setHasVerifiedCoords] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Dynamically import Leaflet so it never runs on the server.
    async function initMap() {
      const L = await import("leaflet");

      // Inject Leaflet CSS if not already present.
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      // Destroy any existing map instance (React strict-mode double-mount).
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      if (!containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: PH_CENTER,
        zoom: PH_ZOOM,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Build Rule 5: only add markers if verified coordinates exist in the
      // engine outputs. Demo payloads never carry real coordinates.
      let coordsFound = false;

      for (const card of mapCardOutputs) {
        const enabledLayerIds = layers.filter((l) => l.enabled).map((l) => l.id);

        for (const engine of card.engineOutputs) {
          const payload = engine.payload as Record<string, unknown>;

          // Only add markers for verified, non-demo coordinates.
          if (
            engine.isDemoPayload === false &&
            typeof payload.lat === "number" &&
            typeof payload.lng === "number"
          ) {
            const type = String(payload.type ?? "node");
            if (!enabledLayerIds.includes(type)) continue;

            coordsFound = true;
            L.marker([payload.lat as number, payload.lng as number])
              .addTo(map)
              .bindPopup(
                `<strong>${String(payload.label ?? engine.cardId)}</strong><br/>` +
                `Source: ${engine.cardId}<br/>` +
                `Confidence: ${engine.confidence}`
              );
          }
        }
      }

      setHasVerifiedCoords(coordsFound);
    }

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapCardOutputs, layers, selectedNodeId]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Leaflet container */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", background: "#0f172a" }}
        aria-label="Philippine logistics ecosystem map"
      />

      {/* Empty-state overlay — Build Rule 5 */}
      {!hasVerifiedCoords && (
        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15,23,42,0.85)",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "0.4rem 1rem",
            fontSize: "0.75rem",
            color: "#94a3b8",
            zIndex: 1000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
          role="status"
        >
          No verified geographic features loaded
        </div>
      )}

      {/* Demo label — Build Rule 8 */}
      <div
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          background: "#4c1d95",
          color: "#ddd6fe",
          fontSize: "0.65rem",
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: "9999px",
          zIndex: 1000,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        ⚠ DEMO — No verified coordinates
      </div>

      {/* Map legend */}
      <div
        style={{
          position: "absolute",
          bottom: "0.75rem",
          right: "0.5rem",
          background: "rgba(15,23,42,0.9)",
          border: "1px solid #334155",
          borderRadius: "6px",
          padding: "0.5rem 0.75rem",
          fontSize: "0.7rem",
          color: "#94a3b8",
          zIndex: 1000,
          lineHeight: 1.8,
        }}
        aria-label="Map legend"
      >
        <div style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: "0.25rem" }}>Legend</div>
        {layers.map((layer) => (
          <div key={layer.id} style={{ opacity: layer.enabled ? 1 : 0.4 }}>
            {LAYER_ICON[layer.id] ?? "●"} {layer.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const LAYER_ICON: Record<string, string> = {
  route:     "🛣",
  vehicle:   "🚚",
  warehouse: "🏭",
  carrier:   "📦",
  order:     "📋",
};
