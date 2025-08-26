import { Evented } from '../util/evented';
import { TileBounds } from './tile_bounds';
import type { Source } from './source';
import type { OverscaledTileID } from './tile_id';
import type { Map } from '../ui/map';
import type { Dispatcher } from '../util/dispatcher';
import type { Tile } from './tile';
import type { VectorSourceSpecification, PromoteIdSpecification } from '@maplibre/maplibre-gl-style-spec';
export type VectorTileSourceOptions = VectorSourceSpecification & {
    collectResourceTiming?: boolean;
    tileSize?: number;
};
/**
 * A source containing vector tiles in [Mapbox Vector Tile format](https://docs.mapbox.com/vector-tiles/reference/).
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *     type: 'vector',
 *     url: 'https://demotiles.maplibre.org/tiles/tiles.json'
 * });
 * ```
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *     type: 'vector',
 *     tiles: ['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt'],
 *     minzoom: 6,
 *     maxzoom: 14
 * });
 * ```
 *
 * @example
 * ```ts
 * map.getSource('some id').setUrl("https://demotiles.maplibre.org/tiles/tiles.json");
 * ```
 *
 * @example
 * ```ts
 * map.getSource('some id').setTiles(['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt']);
 * ```
 * @see [Add a vector tile source](https://maplibre.org/maplibre-gl-js/docs/examples/vector-source/)
 */
export declare class VectorTileSource extends Evented implements Source {
    type: 'vector';
    id: string;
    minzoom: number;
    maxzoom: number;
    url: string;
    scheme: string;
    tileSize: number;
    promoteId: PromoteIdSpecification;
    _options: VectorSourceSpecification;
    _collectResourceTiming: boolean;
    dispatcher: Dispatcher;
    map: Map;
    bounds: [number, number, number, number];
    tiles: Array<string>;
    tileBounds: TileBounds;
    reparseOverscaled: boolean;
    isTileClipped: boolean;
    _tileJSONRequest: AbortController;
    _loaded: boolean;
    constructor(id: string, options: VectorTileSourceOptions, dispatcher: Dispatcher, eventedParent: Evented);
    load(): Promise<void>;
    loaded(): boolean;
    hasTile(tileID: OverscaledTileID): boolean;
    onAdd(map: Map): void;
    setSourceProperty(callback: Function): void;
    /**
     * Sets the source `tiles` property and re-renders the map.
     *
     * @param tiles - An array of one or more tile source URLs, as in the TileJSON spec.
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
    onRemove(): void;
    serialize(): VectorSourceSpecification;
    loadTile(tile: Tile): Promise<void>;
    private _afterTileLoadWorkerResponse;
    abortTile(tile: Tile): Promise<void>;
    unloadTile(tile: Tile): Promise<void>;
    hasTransition(): boolean;
}
