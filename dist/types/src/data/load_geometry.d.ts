import type Point from '@mapbox/point-geometry';
import type { VectorTileFeature } from '@mapbox/vector-tile';
/**
 * Loads a geometry from a VectorTileFeature and scales it to the common extent
 * used internally.
 * @param feature - the vector tile feature to load
 */
export declare function loadGeometry(feature: VectorTileFeature): Array<Array<Point>>;
