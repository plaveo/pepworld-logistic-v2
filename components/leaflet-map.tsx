// components/leaflet-map.tsx
// Philippine Logistics Ecosystem Map using Leaflet + OpenStreetMap.
// Build Rule 5: Never fabricate coordinates. Only the Philippines center is
//               hard-coded here. Entity markers are derived from verified
//               engine outputs only. In DEMO MODE coordinates are absent and
//               the message "No verified geographic features loaded" is shown.
// Build Rule 8: Demo mode is always labelled visibly.
// Visualization-only: no GO/CAUTION/AVOID, no CIS, no Zebra V2.

"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMapType, Polyline, Polygon, LineCapShape } from "leaflet";

import type { MapCardOutput } from "@/lib/types";
import type {
  EcosystemRelationshipPayload,
  RelationshipLine,
  TerritoryPolygon,
  RelationshipType,
  TerritoryType,
} from "@/lib/ecosystem-relationship";
import {
  filterRenderableRelationships,
  filterRenderableTerritories,
  getRelationshipsForNode,
  getConnectedNodeIds,
  getTerritoriesForNode,
} from "@/lib/ecosystem-relationship";

// Philippines geographic center (public knowledge, not fabricated data).
const PH_CENTER: [number, number] = [12.8797, 121.774];
const PH_ZOOM = 6;

// ─── Layer interface ─────────────────────────────────────────────────────────

export interface LeafletMapLayer {
  id: string;
  label: string;
  enabled: boolean;
}

// ─── Centralized style maps ───────────────────────────────────────────────────

// Relationship line styles — no decision meaning encoded in color.
// Styles vary by weight, opacity, dashArray, and lineCap only.
const RELATIONSHIP_STYLE: Record<
  RelationshipType,
  { color: string; weight: number; opacity: number; dashArray?: string; lineCap?: LineCapShape }
> = {
  road:                    { color: "#94a3b8", weight: 3, opacity: 0.8 },
  "cargo-flow":            { color: "#7dd3fc", weight: 2, opacity: 0.7, dashArray: "6 4" },
  "supply-chain-dependency": { color: "#86efac", weight: 2, opacity: 0.7, dashArray: "4 4" },
  support:                 { color: "#fda4af", weight: 2, opacity: 0.65, dashArray: "3 5" },
  economic:                { color: "#fde68a", weight: 2, opacity: 0.65, dashArray: "8 4" },
  workforce:               { color: "#d8b4fe", weight: 1, opacity: 0.6,  dashArray: "4 6" },
  utility:                 { color: "#6ee7b7", weight: 1, opacity: 0.6,  dashArray: "2 6" },
  market:                  { color: "#fdba74", weight: 2, opacity: 0.65 },
  alternative:             { color: "#a5b4fc", weight: 1, opacity: 0.55, dashArray: "6 6" },
  risk:                    { color: "#f87171", weight: 2, opacity: 0.6,  dashArray: "3 3" },
  connectivity:            { color: "#67e8f9", weight: 1, opacity: 0.55 },
};

const RELATIONSHIP_SELECTED_STYLE = {
  weight: 5,
  opacity: 1.0,
  dashArray: undefined as string | undefined,
  lineCap: undefined as LineCapShape | undefined,
};

// Territory polygon styles — restrained fill opacity so roads/nodes remain visible.
const TERRITORY_STYLE: Record<
  TerritoryType,
  { color: string; fillColor: string; fillOpacity: number; weight: number; opacity: number }
> = {
  province:          { color: "#94a3b8", fillColor: "#334155", fillOpacity: 0.12, weight: 1, opacity: 0.6 },
  city:              { color: "#7dd3fc", fillColor: "#0284c7", fillOpacity: 0.10, weight: 1, opacity: 0.6 },
  "industrial-zone": { color: "#86efac", fillColor: "#16a34a", fillOpacity: 0.10, weight: 1, opacity: 0.6 },
  "economic-zone":   { color: "#fde68a", fillColor: "#ca8a04", fillOpacity: 0.10, weight: 1, opacity: 0.6 },
  "port-area":       { color: "#67e8f9", fillColor: "#0891b2", fillOpacity: 0.12, weight: 1, opacity: 0.7 },
  "airport-area":    { color: "#d8b4fe", fillColor: "#7c3aed", fillOpacity: 0.10, weight: 1, opacity: 0.6 },
  "logistics-cluster": { color: "#fdba74", fillColor: "#ea580c", fillOpacity: 0.10, weight: 1, opacity: 0.6 },
  "service-area":    { color: "#a5b4fc", fillColor: "#6366f1", fillOpacity: 0.08, weight: 1, opacity: 0.5 },
  "risk-area":       { color: "#f87171", fillColor: "#dc2626", fillOpacity: 0.08, weight: 1, opacity: 0.5 },
  "market-area":     { color: "#fda4af", fillColor: "#e11d48", fillOpacity: 0.08, weight: 1, opacity: 0.5 },
};

const TERRITORY_SELECTED_STYLE = { fillOpacity: 0.25, weight: 2, opacity: 1.0 };

// ─── Props ───────────────────────────────────────────────────────────────────

interface LeafletMapProps {
  mapCardOutputs: MapCardOutput[];
  layers: LeafletMapLayer[];
  selectedNodeId?: string | null;
  onNodeSelect?: (nodeId: string) => void;
  onClearSelection?: () => void;
  ecosystemRelationshipPayload?: EcosystemRelationshipPayload | null;
  relationshipLayerState?: Partial<Record<RelationshipType, boolean>>;
  territoryLayerState?: Partial<Record<TerritoryType, boolean>>;
  selectedRelationshipId?: string | null;
  selectedTerritoryId?: string | null;
  onRelationshipSelect?: (id: string) => void;
  onTerritorySelect?: (id: string) => void;
  onClearRelationshipSelection?: () => void;
  onClearTerritorySelection?: () => void;
  mapCardOutputsForBounds?: MapCardOutput[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LeafletMap({
  mapCardOutputs,
  layers,
  selectedNodeId,
  onNodeSelect,
  onClearSelection,
  ecosystemRelationshipPayload,
  relationshipLayerState,
  territoryLayerState,
  selectedRelationshipId,
  selectedTerritoryId,
  onRelationshipSelect,
  onTerritorySelect,
  onClearRelationshipSelection: _onClearRelationshipSelection,
  onClearTerritorySelection: _onClearTerritorySelection,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMapType | null>(null);
  const [hasVerifiedCoords, setHasVerifiedCoords] = useState(false);

  // Track rendered Leaflet layers so we can update styles without full re-init.
  const relationshipLayersRef = useRef<Map<string, Polyline>>(new Map());
  const territoryLayersRef = useRef<Map<string, Polygon>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

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
      relationshipLayersRef.current.clear();
      territoryLayersRef.current.clear();

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

      // ── Node markers (from mapCardOutputs) ──────────────────────────────
      // Build Rule 5: only add markers if verified coordinates exist.
      let coordsFound = false;
      const enabledLayerIds = layers.filter((l) => l.enabled).map((l) => l.id);
      const allBoundsLatLngs: [number, number][] = [];

      for (const card of mapCardOutputs) {
        for (const engine of card.engineOutputs) {
          const payload = engine.payload as Record<string, unknown>;

          if (
            engine.isDemoPayload === false &&
            typeof payload.lat === "number" &&
            typeof payload.lng === "number"
          ) {
            const type = String(payload.type ?? "node");
            if (!enabledLayerIds.includes(type)) continue;

            coordsFound = true;
            const latLng: [number, number] = [payload.lat as number, payload.lng as number];
            allBoundsLatLngs.push(latLng);

            const isConnected =
              selectedNodeId != null &&
              getConnectedNodeIds(
                ecosystemRelationshipPayload?.relationships ?? [],
                selectedNodeId
              ).includes(engine.cardId);

            const isSelected = engine.cardId === selectedNodeId;
            const opacity = selectedNodeId && !isSelected && !isConnected ? 0.35 : 1.0;

            const marker = L.marker(latLng, { opacity });
            marker.addTo(map);
            marker.bindPopup(
              `<strong>${String(payload.label ?? engine.cardId)}</strong><br/>` +
              `Source: ${engine.cardId}<br/>` +
              `Confidence: ${engine.confidence}`
            );
            if (onNodeSelect) {
              marker.on("click", () => onNodeSelect(engine.cardId));
            }
          }
        }
      }

      // ── Relationship polylines ───────────────────────────────────────────
      const relationships = filterRenderableRelationships(
        ecosystemRelationshipPayload?.relationships ?? []
      );

      const nodeIdsConnectedToSelected = selectedNodeId
        ? getConnectedNodeIds(ecosystemRelationshipPayload?.relationships ?? [], selectedNodeId)
        : [];

      for (const rel of relationships) {
        const layerEnabled = relationshipLayerState?.[rel.relationshipType] !== false;
        if (!layerEnabled) continue;

        const isSelected = rel.id === selectedRelationshipId;
        const isConnectedToSelectedNode =
          selectedNodeId != null &&
          (rel.fromNodeId === selectedNodeId || rel.toNodeId === selectedNodeId);
        const isDimmed =
          (selectedNodeId != null && !isConnectedToSelectedNode) ||
          (selectedRelationshipId != null && !isSelected);

        const baseStyle = RELATIONSHIP_STYLE[rel.relationshipType] ?? RELATIONSHIP_STYLE.road;
        const style = isSelected
          ? {
              ...baseStyle,
              ...RELATIONSHIP_SELECTED_STYLE,
              dashArray: undefined,
            }
          : {
              ...baseStyle,
              opacity: isDimmed ? baseStyle.opacity * 0.3 : baseStyle.opacity,
            };

        const latLngs = rel.coordinates as [number, number][];
        latLngs.forEach((ll) => allBoundsLatLngs.push(ll));

        const polyline = L.polyline(latLngs, style);
        polyline.addTo(map);
        polyline.bindPopup(
          `<strong>Relationship</strong><br/>` +
          `Type: ${rel.relationshipType}<br/>` +
          `From: ${rel.fromNodeId}<br/>` +
          `To: ${rel.toNodeId}<br/>` +
          `Source ID: ${rel.sourceId}<br/>` +
          `Confidence: ${rel.confidence}<br/>` +
          `Freshness: ${rel.freshness}<br/>` +
          `Release State: ${rel.releaseState}`
        );

        if (onRelationshipSelect) {
          polyline.on("click", (e) => {
            // Prevent the map click from also firing.
            (e as unknown as { originalEvent: Event }).originalEvent.stopPropagation?.();
            onRelationshipSelect(rel.id);
            polyline.openPopup();
          });
        }

        relationshipLayersRef.current.set(rel.id, polyline);
        coordsFound = true;
      }

      // ── Territory polygons ────────────────────────────────────────────────
      const territories = filterRenderableTerritories(
        ecosystemRelationshipPayload?.territories ?? []
      );

      const territoriesForSelectedNode = selectedNodeId
        ? getTerritoriesForNode(ecosystemRelationshipPayload?.territories ?? [], selectedNodeId)
            .map((t) => t.id)
        : [];

      for (const territory of territories) {
        const layerEnabled = territoryLayerState?.[territory.territoryType] !== false;
        if (!layerEnabled) continue;

        const isSelected = territory.id === selectedTerritoryId;
        const isLinkedToSelectedNode =
          selectedNodeId != null && territoriesForSelectedNode.includes(territory.id);
        const isDimmed =
          (selectedNodeId != null && !isLinkedToSelectedNode) ||
          (selectedTerritoryId != null && !isSelected);

        const baseStyle = TERRITORY_STYLE[territory.territoryType] ?? TERRITORY_STYLE.province;
        const style = isSelected
          ? { ...baseStyle, ...TERRITORY_SELECTED_STYLE }
          : {
              ...baseStyle,
              fillOpacity: isDimmed ? baseStyle.fillOpacity * 0.3 : baseStyle.fillOpacity,
              opacity: isDimmed ? baseStyle.opacity * 0.3 : baseStyle.opacity,
            };

        const latLngs = territory.coordinates as [number, number][];
        latLngs.forEach((ll) => allBoundsLatLngs.push(ll));

        const polygon = L.polygon(latLngs, style);
        polygon.addTo(map);
        polygon.bindPopup(
          `<strong>${territory.label}</strong><br/>` +
          `Type: ${territory.territoryType}<br/>` +
          `Source ID: ${territory.sourceId}<br/>` +
          `Confidence: ${territory.confidence}<br/>` +
          `Freshness: ${territory.freshness}<br/>` +
          `Release State: ${territory.releaseState}`
        );

        if (onTerritorySelect) {
          polygon.on("click", (e) => {
            (e as unknown as { originalEvent: Event }).originalEvent.stopPropagation?.();
            onTerritorySelect(territory.id);
            polygon.openPopup();
          });
        }

        territoryLayersRef.current.set(territory.id, polygon);
        coordsFound = true;
      }

      // ── Bounds fitting ────────────────────────────────────────────────────
      // Fit to verified nodes + roads + relationships + territories.
      // If nothing renderable exists, keep Philippines default center/zoom.
      if (allBoundsLatLngs.length >= 2) {
        try {
          map.fitBounds(allBoundsLatLngs as [number, number][], { padding: [30, 30] });
        } catch {
          // Silently keep default bounds.
        }
      }

      setHasVerifiedCoords(coordsFound);

      // ── Dismiss active selection when clicking the map background ────────
      if (onClearSelection) {
        map.on("click", onClearSelection);
      }

      // Void unused variables to satisfy the linter while keeping the
      // variables in scope for future expansion.
      void nodeIdsConnectedToSelected;
    }

    initMap();

    const relLayersSnapshot = relationshipLayersRef.current;
    const terrLayersSnapshot = territoryLayersRef.current;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      relLayersSnapshot.clear();
      terrLayersSnapshot.clear();
    };
  }, [
    mapCardOutputs,
    layers,
    selectedNodeId,
    onNodeSelect,
    onClearSelection,
    ecosystemRelationshipPayload,
    relationshipLayerState,
    territoryLayerState,
    selectedRelationshipId,
    selectedTerritoryId,
    onRelationshipSelect,
    onTerritorySelect,
  ]);

  // ─── Derived legend data ────────────────────────────────────────────────

  const activeRelationshipTypes = ecosystemRelationshipPayload
    ? filterRenderableRelationships(ecosystemRelationshipPayload.relationships)
        .filter((r) => relationshipLayerState?.[r.relationshipType] !== false)
        .map((r) => r.relationshipType)
    : [];
  const uniqueActiveRelTypes = Array.from(new Set(activeRelationshipTypes));

  const activeTerrTypes = ecosystemRelationshipPayload
    ? filterRenderableTerritories(ecosystemRelationshipPayload.territories)
        .filter((t) => territoryLayerState?.[t.territoryType] !== false)
        .map((t) => t.territoryType)
    : [];
  const uniqueActiveTerrTypes = Array.from(new Set(activeTerrTypes));

  const enabledNodeLayers = layers.filter((l) => l.enabled);

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

      {/* Dynamic map legend */}
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
          maxHeight: "50vh",
          overflowY: "auto",
        }}
        aria-label="Map legend"
      >
        <div style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: "0.25rem" }}>Legend</div>

        {/* Nodes */}
        {enabledNodeLayers.length > 0 && (
          <>
            <div style={{ fontWeight: 600, color: "#cbd5e1", marginTop: "0.25rem" }}>Nodes</div>
            {enabledNodeLayers.map((layer) => (
              <div key={layer.id}>
                {LAYER_ICON[layer.id] ?? "●"} {layer.label}
              </div>
            ))}
          </>
        )}

        {/* Roads — shown when road layer is enabled */}
        {layers.some((l) => l.id === "road" && l.enabled) && (
          <>
            <div style={{ fontWeight: 600, color: "#cbd5e1", marginTop: "0.25rem" }}>Roads</div>
            <div>🛣 Roads</div>
          </>
        )}

        {/* Relationships */}
        {uniqueActiveRelTypes.length > 0 && (
          <>
            <div style={{ fontWeight: 600, color: "#cbd5e1", marginTop: "0.25rem" }}>Relationships</div>
            {uniqueActiveRelTypes.map((type) => (
              <div key={type} style={{ color: RELATIONSHIP_STYLE[type]?.color ?? "#94a3b8" }}>
                — {type}
              </div>
            ))}
          </>
        )}

        {/* Territories */}
        {uniqueActiveTerrTypes.length > 0 && (
          <>
            <div style={{ fontWeight: 600, color: "#cbd5e1", marginTop: "0.25rem" }}>Territories</div>
            {uniqueActiveTerrTypes.map((type) => (
              <div key={type} style={{ color: TERRITORY_STYLE[type]?.color ?? "#94a3b8" }}>
                ▭ {type}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const LAYER_ICON: Record<string, string> = {
  port:      "⚓",
  airport:   "✈",
  warehouse: "🏭",
  road:      "🛣",
  route:     "🛣",
  vehicle:   "🚚",
  carrier:   "📦",
  order:     "📋",
};
