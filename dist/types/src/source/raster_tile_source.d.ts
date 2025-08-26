import { Evented } from '../util/evented';
import { TileBounds } from './tile_bounds';
import type { Source } from './source';
import type { OverscaledTileID } from './tile_id';
import type { Map } from '../ui/map';
import type { Dispatcher } from '../util/dispatcher';
import type { Tile } from './tile';
import type { RasterSourceSpecification, RasterDEMSourceSpecification } from '@maplibre/maplibre-gl-style-spec';
/**
 * A source containing raster tiles (See the [Style Specification](https://maplibre.org/maplibre-style-spec/) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('raster-source', {
 *     'type': 'raster',
 *     'tiles': ['https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'],
 *     'tileSize': 256,
 * });
 * ```
 *
 * @example
 * ```ts
 * map.addSource('wms-test-source', {
 *      'type': 'raster',
 * // use the tiles option to specify a WMS tile source URL
 *      'tiles': [
 *          'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
 *      ],
 *      'tileSize': 256
 * });
 * ```
 * @see [Add a raster tile source](https://maplibre.org/maplibre-gl-js/docs/examples/map-tiles/)
 * @see [Add a WMS source](https://maplibre.org/maplibre-gl-js/docs/examples/wms/)
 * @see [Display a satellite map](https://maplibre.org/maplibre-gl-js/docs/examples/satellite-map/)
 */
export declare class RasterTileSource extends Evented implements Source {
    type: 'raster' | 'raster-dem';
    id: string;
    minzoom: number;
    maxzoom: number;
    url: string;
    scheme: string;
    tileSize: number;
    bounds: [number, number, number, number];
    tileBounds: TileBounds;
    roundZoom: boolean;
    dispatcher: Dispatcher;
    map: Map;
    tiles: Array<string>;
    _loaded: boolean;
    _options: RasterSourceSpecification | RasterDEMSourceSpecification;
    _tileJSONRequest: AbortController;
    constructor(id: string, options: RasterSourceSpecification | RasterDEMSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
    load(): Promise<void>;
    loaded(): boolean;
    onAdd(map: Map): void;
    onRemove(): void;
    setSourceProperty(callback: Function): void;
    /**
     * Sets the source `tiles` property and re-renders the map.
     *
     * @param tiles - An array of one or more tile source URLs, as in the raster tiles spec (See the [Style Specification](https://maplibre.org/maplibre-style-spec/)
     * @returns `this`
     */
    setTiles(tiles: Array<string>): this;
    /**
     * Sets the source `url` property and re-renders the map.
     *
     * @param url - A URL to a TileJSON resource. Supported protocols are `http:` and `https:`.
     * @returns `this`
     */
    setUrl(url: string): this;
    serialize(): RasterSourceSpecification | RasterDEMSourceSpecification;
    hasTile(tileID: OverscaledTileID): boolean;
    loadTile(tile: Tile): Promise<void>;
    abortTile(tile: Tile): Promise<void>;
    unloadTile(tile: Tile): Promise<void>;
    hasTransition(): boolean;
}
