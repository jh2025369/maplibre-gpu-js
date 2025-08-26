import { OverscaledTileID } from './tile_id';
import type { Tile } from './tile';
/**
 * @internal
 * A [least-recently-used cache](http://en.wikipedia.org/wiki/Cache_algorithms)
 * with hash lookup made possible by keeping a list of keys in parallel to
 * an array of dictionary of values
 */
export declare class TileCache {
    max: number;
    data: {
        [key: string]: Array<{
            value: Tile;
            timeout: ReturnType<typeof setTimeout>;
        }>;
    };
    order: Array<string>;
    onRemove: (element: Tile) => void;
    /**
     * @param max - number of permitted values
     * @param onRemove - callback called with items when they expire
     */
    constructor(max: number, onRemove: (element: Tile) => void);
    /**
     * Clear the cache
     *
     * @returns this cache
     */
    reset(): this;
    /**
     * Add a key, value combination to the cache, trimming its size if this pushes
     * it over max length.
     *
     * @param tileID - lookup key for the item
     * @param data - tile data
     *
     * @returns this cache
     */
    add(tileID: OverscaledTileID, data: Tile, expiryTimeout: number | void): this;
    /**
     * Determine whether the value attached to `key` is present
     *
     * @param tileID - the key to be looked-up
     * @returns whether the cache has this value
     */
    has(tileID: OverscaledTileID): boolean;
    /**
     * Get the value attached to a specific key and remove data from cache.
     * If the key is not found, returns `null`
     *
     * @param tileID - the key to look up
     * @returns the tile data, or null if it isn't found
     */
    getAndRemove(tileID: OverscaledTileID): Tile;
    _getAndRemoveByKey(key: string): Tile;
    getByKey(key: string): Tile;
    /**
     * Get the value attached to a specific key without removing data
     * from the cache. If the key is not found, returns `null`
     *
     * @param tileID - the key to look up
     * @returns the tile data, or null if it isn't found
     */
    get(tileID: OverscaledTileID): Tile;
    /**
     * Remove a key/value combination from the cache.
     *
     * @param tileID - the key for the pair to delete
     * @param value - If a value is provided, remove that exact version of the value.
     * @returns this cache
     */
    remove(tileID: OverscaledTileID, value?: {
        value: Tile;
        timeout: ReturnType<typeof setTimeout>;
    }): this;
    /**
     * Change the max size of the cache.
     *
     * @param max - the max size of the cache
     * @returns this cache
     */
    setMaxSize(max: number): TileCache;
    /**
     * Remove entries that do not pass a filter function. Used for removing
     * stale tiles from the cache.
     *
     * @param filterFn - Determines whether the tile is filtered. If the supplied function returns false, the tile will be filtered out.
     */
    filter(filterFn: (tile: Tile) => boolean): void;
}
