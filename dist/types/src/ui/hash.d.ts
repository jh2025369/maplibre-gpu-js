import type { Map } from './map';
/**
 * Adds the map's position to its page's location hash.
 * Passed as an option to the map object.
 *
 * @group Markers and Controls
 */
export declare class Hash {
    _map: Map;
    _hashName: string;
    constructor(hashName?: string | null);
    /**
     * Map element to listen for coordinate changes
     *
     * @param map - The map object
     * @returns `this`
     */
    addTo(map: Map): this;
    /**
     * Removes hash
     *
     * @returns `this`
     */
    remove(): this;
    getHashString(mapFeedback?: boolean): string;
    _getCurrentHash: () => any;
    _onHashChange: () => boolean;
    _updateHashUnthrottled: () => void;
    /**
     * Mobile Safari doesn't allow updating the hash more than 100 times per 30 seconds.
     */
    _updateHash: () => ReturnType<typeof setTimeout>;
}
