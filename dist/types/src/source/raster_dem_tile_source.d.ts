import { Evented } from '../util/evented';
import { OverscaledTileID } from './tile_id';
import { RasterTileSource } from './raster_tile_source';
import '../data/dem_data';
import type { DEMEncoding } from '../data/dem_data';
import type { Source } from './source';
import type { Dispatcher } from '../util/dispatcher';
import type { Tile } from './tile';
import type { RasterDEMSourceSpecification } from '@maplibre/maplibre-gl-style-spec';
import { RGBAImage } from '../util/image';
/**
 * A source containing raster DEM tiles (See the [Style Specification](https://maplibre.org/maplibre-style-spec/) for detailed documentation of options.)
 * This source can be used to show hillshading and 3D terrain
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('raster-dem-source', {
 *      type: 'raster-dem',
 *      url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
 *      tileSize: 256
 * });
 * ```
 * @see [3D Terrain](https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/)
 */
export declare class RasterDEMTileSource extends RasterTileSource implements Source {
    encoding: DEMEncoding;
    redFactor?: number;
    greenFactor?: number;
    blueFactor?: number;
    baseShift?: number;
    constructor(id: string, options: RasterDEMSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
    loadTile(tile: Tile): Promise<void>;
    readImageNow(img: ImageBitmap | HTMLImageElement): Promise<RGBAImage | ImageData>;
    _getNeighboringTiles(tileID: OverscaledTileID): {};
    unloadTile(tile: Tile): Promise<void>;
}
