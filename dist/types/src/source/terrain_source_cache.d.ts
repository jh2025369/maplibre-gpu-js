import { OverscaledTileID } from './tile_id';
import { Tile } from './tile';
import { Evented } from '../util/evented';
import type { Transform } from '../geo/transform';
import type { SourceCache } from '../source/source_cache';
import { Terrain } from '../render/terrain';
/**
 * @internal
 * This class is a helper for the Terrain-class, it:
 *   - loads raster-dem tiles
 *   - manages all renderToTexture tiles.
 *   - caches previous rendered tiles.
 *   - finds all necessary renderToTexture tiles for a OverscaledTileID area
 *   - finds the corresponding raster-dem tile for OverscaledTileID
 */
export declare class TerrainSourceCache extends Evented {
    /**
     * source-cache for the raster-dem source.
     */
    sourceCache: SourceCache;
    /**
     * stores all render-to-texture tiles.
     */
    _tiles: {
        [_: string]: Tile;
    };
    /**
     * contains a list of tileID-keys for the current scene. (only for performance)
     */
    _renderableTilesKeys: Array<string>;
    /**
     * raster-dem-tile for a TileID cache.
     */
    _sourceTileCache: {
        [_: string]: string;
    };
    /**
     * minimum zoomlevel to render the terrain.
     */
    minzoom: number;
    /**
     * maximum zoomlevel to render the terrain.
     */
    maxzoom: number;
    /**
     * render-to-texture tileSize in scene.
     */
    tileSize: number;
    /**
     * raster-dem tiles will load for performance the actualZoom - deltaZoom zoom-level.
     */
    deltaZoom: number;
    constructor(sourceCache: SourceCache);
    destruct(): void;
    /**
     * Load Terrain Tiles, create internal render-to-texture tiles, free GPU memory.
     * @param transform - the operation to do
     * @param terrain - the terrain
     */
    update(transform: Transform, terrain: Terrain): void;
    /**
     * Free render to texture cache
     * @param tileID - optional, free only corresponding to tileID.
     */
    freeRtt(tileID?: OverscaledTileID): void;
    /**
     * get a list of tiles, which are loaded and should be rendered in the current scene
     * @returns the renderable tiles
     */
    getRenderableTiles(): Array<Tile>;
    /**
     * get terrain tile by the TileID key
     * @param id - the tile id
     * @returns the tile
     */
    getTileByID(id: string): Tile;
    /**
     * Searches for the corresponding current renderable terrain-tiles
     * @param tileID - the tile to look for
     * @returns the tiles that were found
     */
    getTerrainCoords(tileID: OverscaledTileID): Record<string, OverscaledTileID>;
    /**
     * find the covering raster-dem tile
     * @param tileID - the tile to look for
     * @param searchForDEM - Optinal parameter to search for (parent) souretiles with loaded dem.
     * @returns the tile
     */
    getSourceTile(tileID: OverscaledTileID, searchForDEM?: boolean): Tile;
    /**
     * get a list of tiles, loaded after a specific time. This is used to update depth & coords framebuffers.
     * @param time - the time
     * @returns the relevant tiles
     */
    tilesAfterTime(time?: number): Array<Tile>;
}
