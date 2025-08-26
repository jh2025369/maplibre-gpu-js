import { Tile } from './tile';
import { Evented } from '../util/evented';
import { TileCache } from './tile_cache';
import Point from '@mapbox/point-geometry';
import { OverscaledTileID } from './tile_id';
import { SourceFeatureState } from './source_state';
import type { Source } from './source';
import type { Map } from '../ui/map';
import type { Style } from '../style/style';
import type { Dispatcher } from '../util/dispatcher';
import type { Transform } from '../geo/transform';
import type { TileState } from './tile';
import type { SourceSpecification } from '@maplibre/maplibre-gl-style-spec';
import { Terrain } from '../render/terrain';
import { WebGPUEngine } from 'core/Engines/webgpuEngine';
/**
 * @internal
 * `SourceCache` is responsible for
 *
 *  - creating an instance of `Source`
 *  - forwarding events from `Source`
 *  - caching tiles loaded from an instance of `Source`
 *  - loading the tiles needed to render a given viewport
 *  - unloading the cached tiles not needed to render a given viewport
 */
export declare class SourceCache extends Evented {
    id: string;
    dispatcher: Dispatcher;
    map: Map;
    style: Style;
    _source: Source;
    /**
     * @internal
     * signifies that the TileJSON is loaded if applicable.
     * if the source type does not come with a TileJSON, the flag signifies the
     * source data has loaded (i.e geojson has been tiled on the worker and is ready)
     */
    _sourceLoaded: boolean;
    _sourceErrored: boolean;
    _tiles: {
        [_: string]: Tile;
    };
    _prevLng: number;
    _cache: TileCache;
    _timers: {
        [_ in any]: ReturnType<typeof setTimeout>;
    };
    _cacheTimers: {
        [_ in any]: ReturnType<typeof setTimeout>;
    };
    _maxTileCacheSize: number;
    _maxTileCacheZoomLevels: number;
    _paused: boolean;
    _shouldReloadOnResume: boolean;
    _coveredTiles: {
        [_: string]: boolean;
    };
    transform: Transform;
    terrain: Terrain;
    used: boolean;
    usedForTerrain: boolean;
    tileSize: number;
    _state: SourceFeatureState;
    _loadedParentTiles: {
        [_: string]: Tile;
    };
    _didEmitContent: boolean;
    _updated: boolean;
    static maxUnderzooming: number;
    static maxOverzooming: number;
    constructor(id: string, options: SourceSpecification, dispatcher: Dispatcher);
    onAdd(map: Map): void;
    onRemove(map: Map): void;
    /**
     * Return true if no tile data is pending, tiles will not change unless
     * an additional API call is received.
     */
    loaded(): boolean;
    getSource(): Source;
    pause(): void;
    resume(): void;
    _loadTile(tile: Tile, id: string, state: TileState): Promise<void>;
    _unloadTile(tile: Tile): void;
    _abortTile(tile: Tile): void;
    serialize(): any;
    prepare(engine: WebGPUEngine): void;
    /**
     * Return all tile ids ordered with z-order, and cast to numbers
     */
    getIds(): Array<string>;
    getRenderableIds(symbolLayer?: boolean): Array<string>;
    hasRenderableParent(tileID: OverscaledTileID): boolean;
    _isIdRenderable(id: string, symbolLayer?: boolean): boolean;
    reload(): void;
    _reloadTile(id: string, state: TileState): Promise<void>;
    _tileLoaded(tile: Tile, id: string, previousState: TileState): void;
    /**
    * For raster terrain source, backfill DEM to eliminate visible tile boundaries
    */
    _backfillDEM(tile: Tile): void;
    /**
     * Get a specific tile by TileID
     */
    getTile(tileID: OverscaledTileID): Tile;
    /**
     * Get a specific tile by id
     */
    getTileByID(id: string): Tile;
    /**
     * For a given set of tiles, retain children that are loaded and have a zoom
     * between `zoom` (exclusive) and `maxCoveringZoom` (inclusive)
     */
    _retainLoadedChildren(idealTiles: {
        [_ in any]: OverscaledTileID;
    }, zoom: number, maxCoveringZoom: number, retain: {
        [_ in any]: OverscaledTileID;
    }): void;
    /**
     * Find a loaded parent of the given tile (up to minCoveringZoom)
     */
    findLoadedParent(tileID: OverscaledTileID, minCoveringZoom: number): Tile;
    _getLoadedTile(tileID: OverscaledTileID): Tile;
    /**
     * Resizes the tile cache based on the current viewport's size
     * or the maxTileCacheSize option passed during map creation
     *
     * Larger viewports use more tiles and need larger caches. Larger viewports
     * are more likely to be found on devices with more memory and on pages where
     * the map is more important.
     */
    updateCacheSize(transform: Transform): void;
    handleWrapJump(lng: number): void;
    /**
     * Removes tiles that are outside the viewport and adds new tiles that
     * are inside the viewport.
     */
    update(transform: Transform, terrain?: Terrain): void;
    releaseSymbolFadeTiles(): void;
    _updateRetainedTiles(idealTileIDs: Array<OverscaledTileID>, zoom: number): {
        [_: string]: OverscaledTileID;
    };
    _updateLoadedParentTileCache(): void;
    /**
     * Add a tile, given its coordinate, to the pyramid.
     */
    _addTile(tileID: OverscaledTileID): Tile;
    _setTileReloadTimer(id: string, tile: Tile): void;
    /**
     * Remove a tile, given its id, from the pyramid
     */
    _removeTile(id: string): void;
    /** @internal */
    private _dataHandler;
    /**
     * Remove all tiles from this pyramid
     */
    clearTiles(): void;
    /**
     * Search through our current tiles and attempt to find the tiles that
     * cover the given bounds.
     * @param pointQueryGeometry - coordinates of the corners of bounding rectangle
     * @returns result items have `{tile, minX, maxX, minY, maxY}`, where min/max bounding values are the given bounds transformed in into the coordinate space of this tile.
     */
    tilesIn(pointQueryGeometry: Array<Point>, maxPitchScaleFactor: number, has3DLayer: boolean): any[];
    getVisibleCoordinates(symbolLayer?: boolean): Array<OverscaledTileID>;
    hasTransition(): boolean;
    /**
     * Set the value of a particular state for a feature
     */
    setFeatureState(sourceLayer: string, featureId: number | string, state: any): void;
    /**
     * Resets the value of a particular state key for a feature
     */
    removeFeatureState(sourceLayer?: string, featureId?: number | string, key?: string): void;
    /**
     * Get the entire state object for a feature
     */
    getFeatureState(sourceLayer: string, featureId: number | string): import("@maplibre/maplibre-gl-style-spec").FeatureState;
    /**
     * Sets the set of keys that the tile depends on. This allows tiles to
     * be reloaded when their dependencies change.
     */
    setDependencies(tileKey: string, namespace: string, dependencies: Array<string>): void;
    /**
     * Reloads all tiles that depend on the given keys.
     */
    reloadTilesForDependencies(namespaces: Array<string>, keys: Array<string>): void;
}
