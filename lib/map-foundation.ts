// lib/map-foundation.ts
// Shared geographic validation utilities for the PEPWORLD Logistics V2 map layers.
// Build Rule 5: Never fabricate coordinates.
// Build Rule 7: Only verified records may be used for geographic rendering.

import type { ConfidenceLevel, ReleaseState } from "./types";

/**
 * A geographic coordinate pair [latitude, longitude].
 * Both values must be finite numbers within valid WGS-84 ranges.
 */
export type LatLng = [number, number];

/**
 * Returns true if a value is a finite, valid WGS-84 latitude (−90 to 90).
 */
export function isValidLatitude(value: unknown): value is number {
  return typeof value === "number" && isFinite(value) && value >= -90 && value <= 90;
}

/**
 * Returns true if a value is a finite, valid WGS-84 longitude (−180 to 180).
 */
export function isValidLongitude(value: unknown): value is number {
  return typeof value === "number" && isFinite(value) && value >= -180 && value <= 180;
}

/**
 * Returns true if the given value is a valid [lat, lng] coordinate pair.
 * Both latitude and longitude must be valid finite WGS-84 numbers.
 */
export function isValidLatLng(value: unknown): value is LatLng {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    isValidLatitude(value[0]) &&
    isValidLongitude(value[1])
  );
}

/**
 * Returns true if every item in the array is a valid LatLng coordinate.
 */
export function areValidCoordinates(coordinates: unknown[]): coordinates is LatLng[] {
  return coordinates.every(isValidLatLng);
}

/**
 * Shared metadata fields present on all geographic feature payloads.
 */
export interface GeoFeatureBase {
  id: string;
  verified: boolean;
  confidence: ConfidenceLevel;
  freshness: string;
  releaseState: ReleaseState;
  sourceId: string;
  isDemoPayload: boolean;
}
