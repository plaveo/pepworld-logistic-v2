# Ecosystem Relationship Layer

## Purpose

The Ecosystem Relationship Layer is the next approved visual intelligence layer in PEPWORLD Logistics Intelligence V2, built after Road Mapping and Node Selection. It provides visualization of registered logistics relationships and territory polygons on the Philippine Logistics Ecosystem Map.

This layer is **visualization-only**. It does not calculate operational conclusions, connect to external data sources, or issue GO/CAUTION/AVOID signals.

---

## Scope

This layer adds:
- Verified relationship lines (polylines) between registered logistics nodes
- Verified territory polygons overlaid on the base map
- Relationship type layer controls
- Territory type layer controls
- Independent selection state for nodes, relationships, and territories
- Node expansion: visual emphasis of related relationships, nodes, and territories when a node is selected
- Dynamic map legend reflecting only active, renderable layers
- Safe empty states for all panels

---

## Architecture

**Integration boundary (sequential):**

```
Verified staging payload
  → Map Foundation (coordinate validation, shared geo utilities)
  → Node and Road Selection (existing LeafletMap + LogisticsWorkbench)
  → Ecosystem Relationship Layer  ← THIS BUILD
  → Territory Context
  → CIS execution (future approved build)
```

**Source files:**

| File | Role |
|---|---|
| `lib/map-foundation.ts` | Shared coordinate validation utilities |
| `lib/ecosystem-relationship.ts` | Type contracts, payload interface, validation functions |
| `components/leaflet-map.tsx` | Map rendering: relationships, territories, node expansion, selection |
| `components/logistics-workbench.tsx` | State management, layer controls, selection panels |
| `docs/ECOSYSTEM_RELATIONSHIP_LAYER.md` | This document |

---

## Relationship Contracts

### `RelationshipType`

One of:
`road` | `cargo-flow` | `supply-chain-dependency` | `support` | `economic` | `workforce` | `utility` | `market` | `alternative` | `risk` | `connectivity`

### `RelationshipLine`

```typescript
interface RelationshipLine {
  id: string;
  relationshipType: RelationshipType;
  fromNodeId: string;
  toNodeId: string;
  coordinates: LatLng[];       // [lat, lng][], minimum 2 entries
  verified: boolean;
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  sourceId: string;
  description?: string;
  isDemoPayload: boolean;
}
```

**Rendering rules:**
- `coordinates` must contain at least 2 valid LatLng pairs.
- `fromNodeId` and `toNodeId` must be different strings.
- A relationship renders only when `verified === true`.
- Records with `isDemoPayload === true` must never be rendered as live verified data.
- Missing node connections must not be inferred or fabricated.

---

## Territory Contracts

### `TerritoryType`

One of:
`province` | `city` | `industrial-zone` | `economic-zone` | `port-area` | `airport-area` | `logistics-cluster` | `service-area` | `risk-area` | `market-area`

### `TerritoryPolygon`

```typescript
interface TerritoryPolygon {
  id: string;
  label: string;
  territoryType: TerritoryType;
  coordinates: LatLng[];       // [lat, lng][], minimum 3 entries
  verified: boolean;
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  sourceId: string;
  description?: string;
  isDemoPayload: boolean;
}
```

**Rendering rules:**
- `coordinates` must contain at least 3 valid LatLng pairs.
- A territory renders only when `verified === true`.
- Records with `isDemoPayload === true` must never be rendered as live verified data.
- Invalid polygons must not be auto-closed with invented coordinates.

### `EcosystemRelationshipPayload`

```typescript
interface EcosystemRelationshipPayload {
  relationships: RelationshipLine[];
  territories: TerritoryPolygon[];
  isDemoPayload: boolean;
}
```

---

## Validation Rules

All validation functions are fail-safe: invalid or malformed records are silently dropped without crashing the interface.

| Function | Purpose |
|---|---|
| `isRenderableRelationship(rel)` | Returns true if the relationship passes all rendering preconditions |
| `isRenderableTerritory(territory)` | Returns true if the territory passes all rendering preconditions |
| `filterRenderableRelationships(rels)` | Returns only renderable relationships from an array |
| `filterRenderableTerritories(territories)` | Returns only renderable territories from an array |
| `getRelationshipsForNode(rels, nodeId)` | Returns all renderable relationships connected to a given node |
| `getConnectedNodeIds(rels, nodeId)` | Returns the set of node IDs directly connected to a node |
| `getTerritoriesForNode(territories, nodeId)` | Returns territories explicitly linked to a node via `sourceId` |

Coordinate validation is shared from `lib/map-foundation.ts`:
- `isValidLatitude(value)` — checks finite WGS-84 latitude (−90 to 90)
- `isValidLongitude(value)` — checks finite WGS-84 longitude (−180 to 180)
- `isValidLatLng(value)` — checks a [lat, lng] tuple
- `areValidCoordinates(array)` — checks that every entry in an array is a valid LatLng

---

## Relationship Rendering Flow

1. Receive `ecosystemRelationshipPayload` prop.
2. Call `filterRenderableRelationships()` — invalid, unverified, or demo records are dropped.
3. For each renderable relationship:
   - Check if the corresponding `RelationshipType` is enabled in `relationshipLayerState`.
   - If disabled, skip.
   - Render as a Leaflet polyline using `RELATIONSHIP_STYLE[rel.relationshipType]`.
   - Bind popup showing: RelationshipType, FromNodeID, ToNodeID, SourceID, Confidence, Freshness, ReleaseState.
   - Attach `onRelationshipSelect` handler.
4. If a relationship is selected (`selectedRelationshipId`): apply `RELATIONSHIP_SELECTED_STYLE` (heavier weight, full opacity).
5. If a node is selected: dim relationships not connected to that node.
6. Collect all coordinates for bounds fitting.

---

## Territory Rendering Flow

1. Receive `ecosystemRelationshipPayload` prop.
2. Call `filterRenderableTerritories()` — invalid, unverified, or demo records are dropped.
3. For each renderable territory:
   - Check if the corresponding `TerritoryType` is enabled in `territoryLayerState`.
   - If disabled, skip.
   - Render as a Leaflet polygon using `TERRITORY_STYLE[territory.territoryType]` with restrained fill opacity so roads, nodes, and relationships remain visible.
   - Bind popup showing: TerritoryLabel, TerritoryType, SourceID, Confidence, Freshness, ReleaseState.
   - Attach `onTerritorySelect` handler.
4. If a territory is selected: apply `TERRITORY_SELECTED_STYLE` (higher fill opacity, heavier border).
5. If a node is selected: dim territories not linked to that node.
6. Collect all coordinates for bounds fitting.

---

## Node Expansion Flow

When a node is selected (`selectedNodeId` is set):

1. Call `getRelationshipsForNode(relationships, selectedNodeId)` — relationships connected to the selected node.
2. Call `getConnectedNodeIds(relationships, selectedNodeId)` — IDs of directly connected nodes.
3. Call `getTerritoriesForNode(territories, selectedNodeId)` — territories linked by `sourceId`.
4. Visually emphasize connected relationships (full opacity).
5. Visually emphasize connected nodes (full marker opacity).
6. Visually emphasize linked territories (full fill opacity).
7. Dim all other map objects.

**Rules:**
- Only registered records present in the payload are used.
- New relationships are never calculated or inferred.
- Nearest-node connections are never generated.

---

## Selection-State Flow

Three independent selection states exist:
- `selectedNodeId: string | null`
- `selectedRelationshipId: string | null`
- `selectedTerritoryId: string | null`

Selecting one category does not destroy verified data from another. Each selection has a dedicated clear control.

**Selection triggers:**
- Node: click on a map marker → `onNodeSelect(nodeId)`
- Relationship: click on a polyline → `onRelationshipSelect(rel.id)`
- Territory: click on a polygon → `onTerritorySelect(territory.id)`
- Clicking the map background → `onClearSelection()` clears node selection

**Panel display:**
- Selected relationship panel shows: Type, FromNodeID, ToNodeID, SourceID, Confidence, Freshness, ReleaseState.
- Selected territory panel shows: Label, Type, SourceID, Confidence, Freshness, ReleaseState.
- Empty state messages are shown when nothing is selected.

---

## Layer Controls

### Relationship layer controls (left panel — "Ecosystem Relationships")

One accessible checkbox per `RelationshipType`:
Road · Cargo Flow · Supply Chain Dependency · Support · Economic · Workforce · Utility · Market · Alternative · Risk · Connectivity

Default: all enabled.

### Territory layer controls (left panel — "Territories")

One accessible checkbox per `TerritoryType`:
Province · City · Industrial Zone · Economic Zone · Port Area · Airport Area · Logistics Cluster · Service Area · Risk Area · Market Area

Default: all enabled.

### Reset behavior

The "Clear and Reset" button resets:
- `selectedNodeId` → null
- `selectedRelationshipId` → null
- `selectedTerritoryId` → null
- `layers` → `INITIAL_LAYERS`
- `relationshipLayerState` → all types enabled
- `territoryLayerState` → all types enabled
- `question` → ""
- `history` → []
- `response` → `initialResponse`

---

## Map Legend Behavior

The dynamic legend (bottom-right) shows only active, renderable items grouped by category:

- **Nodes**: enabled node layers from `layers[]`
- **Roads**: shown when the "road" layer is enabled
- **Relationships**: one entry per unique active `RelationshipType` with verified renderable records
- **Territories**: one entry per unique active `TerritoryType` with verified renderable records

Counts are not displayed (no counts permitted unless directly derived from validated renderable records). Misleading counts are prohibited.

---

## Demo / Live Data Separation

| Property | Demo | Live |
|---|---|---|
| `isDemoPayload` | `true` | `false` |
| Renders on map | **No** | Yes (if verified) |
| Treated as verified | **Never** | Only when `verified === true` |

Demo records are rejected by all `isRenderable*` validators. The demo label ("⚠ DEMO — No verified coordinates") is always visible on the map.

---

## Empty States

| Context | Message |
|---|---|
| No payload / no verified relationships | `No verified ecosystem relationships loaded.` |
| No payload / no verified territories | `No verified territories loaded.` |
| No relationship selected | `No verified ecosystem relationship selected.` |
| No territory selected | `No verified territory selected.` |
| No verified geographic features | `No verified geographic features loaded` |

Empty states do not imply failed computation. This is a visualization foundation layer.

---

## Explicit Non-Goals

This layer explicitly does **not**:

- Connect to Zebra V2
- Connect to CIS
- Calculate GO, CAUTION, or AVOID signals
- Fabricate coordinates, relationships, or territories
- Infer cargo flow
- Infer supply-chain dependencies
- Infer economic or workforce flow
- Auto-generate or close invalid polygons
- Infer node connections not present in the payload
- Convert demo data into live data
- Make any operational decisions

---

## Future Integration Boundary

When CIS execution is approved in a future build, the integration boundary will be:

```
Verified staging payload
  → Map Foundation
  → Node and Road Selection
  → Ecosystem Relationship Layer  ← CURRENT LAYER
  → Territory Context
  → CIS execution (future build)
```

No changes to the Ecosystem Relationship Layer are required or expected at that stage. The layer visualizes registered relationships; CIS execution acts on a separate computation pipeline.

---

## Locked Architecture Preserved

- ENG001–ENG120 engine registry: preserved
- UI01–UI50 UI module registry: preserved
- MC01–MC12 map card registry: preserved
- Map cards: explanation/display only; do not issue final decisions
- Application state: `NOT_COMPUTED`
- Question submission: returns `NOT_COMPUTED` / `NOT_YET_COMPUTED`
