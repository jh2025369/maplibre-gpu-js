import { LngLat } from '../geo/lng_lat';
import type Point from '@mapbox/point-geometry';
import type { Transform } from '../geo/transform';
/**
 * Given a LngLat, prior projected position, and a transform, return a new LngLat shifted
 * n × 360° east or west for some n ≥ 0 such that:
 *
 * * the projected location of the result is on screen, if possible, and secondarily:
 * * the difference between the projected location of the result and the prior position
 *   is minimized.
 *
 * The object is to preserve perceived object constancy for Popups and Markers as much as
 * possible; they should avoid shifting large distances across the screen, even when the
 * map center changes by ±360° due to automatic wrapping, and when about to go off screen,
 * should wrap just enough to avoid doing so.
 */
export declare function smartWrap(lngLat: LngLat, priorPos: Point, transform: Transform): LngLat;
