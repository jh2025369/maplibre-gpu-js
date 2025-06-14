import { LngLatBounds, LngLatBoundsLike } from '../geo/lng_lat_bounds';
import type { CanonicalTileID } from './tile_id';
export declare class TileBounds {
    bounds: LngLatBounds;
    minzoom: number;
    maxzoom: number;
    constructor(bounds: [number, number, number, number], minzoom?: number | null, maxzoom?: number | null);
    validateBounds(bounds: [number, number, number, number]): LngLatBoundsLike;
    contains(tileID: CanonicalTileID): boolean;
}
