// lib/ecosystem-relationship.ts
// Strict TypeScript contracts for the Ecosystem Relationship Layer and Territory Foundation.
// Visualization-only layer: no GO/CAUTION/AVOID, no CIS, no Zebra V2, no operational values.
// Build Rule 5: Never fabricate coordinates.
// Build Rule 7: Only verified records may render.
// Build Rule 8: Demo records must never be treated as live verified records.

import type { ConfidenceLevel, ReleaseState } from "./types";
import { isValidLatLng, areValidCoordinates, type LatLng } from "./map-foundation";

// ─── Relationship and Territory type unions ──────────────────────────────────

export type RelationshipType =
  | "road"
  | "cargo-flow"
  | "supply-chain-dependency"
  | "support"
  | "economic"
  | "workforce"
  | "utility"
  | "market"
  | "alternative"
  | "risk"
  | "connectivity";

export type TerritoryType =
  | "province"
  | "city"
  | "industrial-zone"
  | "economic-zone"
  | "port-area"
  | "airport-area"
  | "logistics-cluster"
  | "service-area"
  | "risk-area"
  | "market-area";

// ─── Relationship line contract ──────────────────────────────────────────────

/**
 * A verified relationship line between two registered logistics nodes.
 *
 * Rendering rules:
 * - `coordinates` must contain at least 2 valid LatLng pairs.
 * - `fromNodeId` and `toNodeId` must differ.
 * - The relationship may render only when `verified === true`.
 * - Demo records (`isDemoPayload === true`) must never be rendered as live data.
 * - Missing node connections must not be inferred.
 */
export interface RelationshipLine {
  id: string;
  relationshipType: RelationshipType;
  fromNodeId: string;
  toNodeId: string;
  /** Ordered list of [lat, lng] pairs that define the line path (min 2). */
  coordinates: LatLng[];
  verified: boolean;
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  sourceId: string;
  description?: string;
  isDemoPayload: boolean;
}

// ─── Territory polygon contract ───────────────────────────────────────────────

/**
 * A verified territory polygon.
 *
 * Rendering rules:
 * - `coordinates` must contain at least 3 valid LatLng pairs.
 * - The territory may render only when `verified === true`.
 * - Demo records must never be rendered as live data.
 * - Invalid polygons must not be auto-closed with invented coordinates.
 */
export interface TerritoryPolygon {
  id: string;
  label: string;
  territoryType: TerritoryType;
  /** Ordered list of [lat, lng] pairs defining the polygon boundary (min 3). */
  coordinates: LatLng[];
  verified: boolean;
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  sourceId: string;
  description?: string;
  isDemoPayload: boolean;
}

// ─── Payload contract ────────────────────────────────────────────────────────

/**
 * The full ecosystem relationship payload delivered to the map.
 * All fields are visualization-only; no computation is performed.
 */
export interface EcosystemRelationshipPayload {
  relationships: RelationshipLine[];
  territories: TerritoryPolygon[];
  isDemoPayload: boolean;
}

// ─── Validation utilities ────────────────────────────────────────────────────

/**
 * Returns true if a relationship line is safe to render.
 *
 * Requirements:
 * - `verified` must be true
 * - `isDemoPayload` must be false (demo data must not be treated as live)
 * - `fromNodeId` and `toNodeId` must differ
 * - `coordinates` must contain at least 2 valid LatLng entries
 *
 * Fails safely: returns false (never throws) for malformed or incomplete records.
 */
export function isRenderableRelationship(rel: unknown): rel is RelationshipLine {
  try {
    if (!rel || typeof rel !== "object") return false;
    const r = rel as Partial<RelationshipLine>;
    if (r.verified !== true) return false;
    if (r.isDemoPayload !== false) return false;
    if (typeof r.fromNodeId !== "string" || typeof r.toNodeId !== "string") return false;
    if (r.fromNodeId === r.toNodeId) return false;
    if (!Array.isArray(r.coordinates) || r.coordinates.length < 2) return false;
    if (!areValidCoordinates(r.coordinates)) return false;
    if (typeof r.id !== "string" || !r.id) return false;
    if (typeof r.sourceId !== "string") return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns true if a territory polygon is safe to render.
 *
 * Requirements:
 * - `verified` must be true
 * - `isDemoPayload` must be false
 * - `coordinates` must contain at least 3 valid LatLng entries
 *
 * Fails safely: returns false (never throws) for malformed or incomplete records.
 */
export function isRenderableTerritory(territory: unknown): territory is TerritoryPolygon {
  try {
    if (!territory || typeof territory !== "object") return false;
    const t = territory as Partial<TerritoryPolygon>;
    if (t.verified !== true) return false;
    if (t.isDemoPayload !== false) return false;
    if (!Array.isArray(t.coordinates) || t.coordinates.length < 3) return false;
    if (!areValidCoordinates(t.coordinates)) return false;
    if (typeof t.id !== "string" || !t.id) return false;
    if (typeof t.label !== "string") return false;
    if (typeof t.sourceId !== "string") return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns only the renderable relationships from the array.
 * Invalid records are silently dropped (fail-safe).
 */
export function filterRenderableRelationships(
  relationships: RelationshipLine[]
): RelationshipLine[] {
  return relationships.filter(isRenderableRelationship);
}

/**
 * Returns only the renderable territories from the array.
 * Invalid records are silently dropped (fail-safe).
 */
export function filterRenderableTerritories(
  territories: TerritoryPolygon[]
): TerritoryPolygon[] {
  return territories.filter(isRenderableTerritory);
}

/**
 * Returns all renderable relationships where `fromNodeId` or `toNodeId`
 * matches the given node ID. Only registered records from the payload are
 * returned; connections are never inferred.
 */
export function getRelationshipsForNode(
  relationships: RelationshipLine[],
  nodeId: string
): RelationshipLine[] {
  return filterRenderableRelationships(relationships).filter(
    (r) => r.fromNodeId === nodeId || r.toNodeId === nodeId
  );
}

/**
 * Returns the set of node IDs directly connected to the given node
 * through renderable relationships. Only registered records are examined;
 * connections are never inferred.
 */
export function getConnectedNodeIds(
  relationships: RelationshipLine[],
  nodeId: string
): string[] {
  const connected = new Set<string>();
  for (const r of getRelationshipsForNode(relationships, nodeId)) {
    if (r.fromNodeId !== nodeId) connected.add(r.fromNodeId);
    if (r.toNodeId !== nodeId) connected.add(r.toNodeId);
  }
  return Array.from(connected);
}

/**
 * Returns all renderable territories that are explicitly linked to a given
 * node by sourceId convention (`territory.sourceId === nodeId`) or by
 * description containing the nodeId. Only registered records are returned;
 * territory membership is never inferred from geometry.
 *
 * Note: The specific linkage field is implementation-defined by the data
 * producer.  This function uses `sourceId` as the primary key. If your
 * payload uses a different linkage field, extend this function accordingly.
 */
export function getTerritoriesForNode(
  territories: TerritoryPolygon[],
  nodeId: string
): TerritoryPolygon[] {
  return filterRenderableTerritories(territories).filter(
    (t) => t.sourceId === nodeId
  );
}

// ─── Re-export coordinate helpers for consumers ──────────────────────────────

export { isValidLatLng, areValidCoordinates };
export type { LatLng };
