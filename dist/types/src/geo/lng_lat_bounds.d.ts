import { LngLat } from './lng_lat';
import type { LngLatLike } from './lng_lat';
/**
 * A {@link LngLatBounds} object, an array of {@link LngLatLike} objects in [sw, ne] order,
 * or an array of numbers in [west, south, east, north] order.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let v1 = new LngLatBounds(
 *   new LngLat(-73.9876, 40.7661),
 *   new LngLat(-73.9397, 40.8002)
 * );
 * let v2 = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002])
 * let v3 = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
 * ```
 */
export type LngLatBoundsLike = LngLatBounds | [LngLatLike, LngLatLike] | [number, number, number, number];
/**
 * A `LngLatBounds` object represents a geographical bounding box,
 * defined by its southwest and northeast points in longitude and latitude.
 *
 * If no arguments are provided to the constructor, a `null` bounding box is created.
 *
 * Note that any Mapbox GL method that accepts a `LngLatBounds` object as an argument or option
 * can also accept an `Array` of two {@link LngLatLike} constructs and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatBoundsLike}.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let sw = new LngLat(-73.9876, 40.7661);
 * let ne = new LngLat(-73.9397, 40.8002);
 * let llb = new LngLatBounds(sw, ne);
 * ```
 */
export declare class LngLatBounds {
    _ne: LngLat;
    _sw: LngLat;
    /**
     * @param sw - The southwest corner of the bounding box.
     * OR array of 4 numbers in the order of  west, south, east, north
     * OR array of 2 LngLatLike: [sw,ne]
     * @param ne - The northeast corner of the bounding box.
     * @example
     * ```ts
     * let sw = new LngLat(-73.9876, 40.7661);
     * let ne = new LngLat(-73.9397, 40.8002);
     * let llb = new LngLatBounds(sw, ne);
     * ```
     * OR
     * ```ts
     * let llb = new LngLatBounds([-73.9876, 40.7661, -73.9397, 40.8002]);
     * ```
     * OR
     * ```ts
     * let llb = new LngLatBounds([sw, ne]);
     * ```
     */
    constructor(sw?: LngLatLike | [number, number, number, number] | [LngLatLike, LngLatLike], ne?: LngLatLike);
    /**
     * Set the northeast corner of the bounding box
     *
     * @param ne - a {@link LngLatLike} object describing the northeast corner of the bounding box.
     * @returns `this`
     */
    setNorthEast(ne: LngLatLike): this;
    /**
     * Set the southwest corner of the bounding box
     *
     * @param sw - a {@link LngLatLike} object describing the southwest corner of the bounding box.
     * @returns `this`
     */
    setSouthWest(sw: LngLatLike): this;
    /**
     * Extend the bounds to include a given LngLatLike or LngLatBoundsLike.
     *
     * @param obj - object to extend to
     * @returns `this`
     */
    extend(obj: LngLatLike | LngLatBoundsLike): this;
    /**
     * Returns the geographical coordinate equidistant from the bounding box's corners.
     *
     * @returns The bounding box's center.
     * @example
     * ```ts
     * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
     * llb.getCenter(); // = LngLat {lng: -73.96365, lat: 40.78315}
     * ```
     */
    getCenter(): LngLat;
    /**
     * Returns the southwest corner of the bounding box.
     *
     * @returns The southwest corner of the bounding box.
     */
    getSouthWest(): LngLat;
    /**
     * Returns the northeast corner of the bounding box.
     *
     * @returns The northeast corner of the bounding box.
     */
    getNorthEast(): LngLat;
    /**
     * Returns the northwest corner of the bounding box.
     *
     * @returns The northwest corner of the bounding box.
     */
    getNorthWest(): LngLat;
    /**
     * Returns the southeast corner of the bounding box.
     *
     * @returns The southeast corner of the bounding box.
     */
    getSouthEast(): LngLat;
    /**
     * Returns the west edge of the bounding box.
     *
     * @returns The west edge of the bounding box.
     */
    getWest(): number;
    /**
     * Returns the south edge of the bounding box.
     *
     * @returns The south edge of the bounding box.
     */
    getSouth(): number;
    /**
     * Returns the east edge of the bounding box.
     *
     * @returns The east edge of the bounding box.
     */
    getEast(): number;
    /**
     * Returns the north edge of the bounding box.
     *
     * @returns The north edge of the bounding box.
     */
    getNorth(): number;
    /**
     * Returns the bounding box represented as an array.
     *
     * @returns The bounding box represented as an array, consisting of the
     * southwest and northeast coordinates of the bounding represented as arrays of numbers.
     * @example
     * ```ts
     * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
     * llb.toArray(); // = [[-73.9876, 40.7661], [-73.9397, 40.8002]]
     * ```
     */
    toArray(): [number, number][];
    /**
     * Return the bounding box represented as a string.
     *
     * @returns The bounding box represents as a string of the format
     * `'LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))'`.
     * @example
     * ```ts
     * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
     * llb.toString(); // = "LngLatBounds(LngLat(-73.9876, 40.7661), LngLat(-73.9397, 40.8002))"
     * ```
     */
    toString(): string;
    /**
     * Check if the bounding box is an empty/`null`-type box.
     *
     * @returns True if bounds have been defined, otherwise false.
     */
    isEmpty(): boolean;
    /**
     * Check if the point is within the bounding box.
     *
     * @param lnglat - geographic point to check against.
     * @returns `true` if the point is within the bounding box.
     * @example
     * ```ts
     * let llb = new LngLatBounds(
     *   new LngLat(-73.9876, 40.7661),
     *   new LngLat(-73.9397, 40.8002)
     * );
     *
     * let ll = new LngLat(-73.9567, 40.7789);
     *
     * console.log(llb.contains(ll)); // = true
     * ```
     */
    contains(lnglat: LngLatLike): boolean;
    /**
     * Converts an array to a `LngLatBounds` object.
     *
     * If a `LngLatBounds` object is passed in, the function returns it unchanged.
     *
     * Internally, the function calls `LngLat#convert` to convert arrays to `LngLat` values.
     *
     * @param input - An array of two coordinates to convert, or a `LngLatBounds` object to return.
     * @returns A new `LngLatBounds` object, if a conversion occurred, or the original `LngLatBounds` object.
     * @example
     * ```ts
     * let arr = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
     * let llb = LngLatBounds.convert(arr); // = LngLatBounds {_sw: LngLat {lng: -73.9876, lat: 40.7661}, _ne: LngLat {lng: -73.9397, lat: 40.8002}}
     * ```
     */
    static convert(input: LngLatBoundsLike | null): LngLatBounds;
    /**
     * Returns a `LngLatBounds` from the coordinates extended by a given `radius`. The returned `LngLatBounds` completely contains the `radius`.
     *
     * @param center - center coordinates of the new bounds.
     * @param radius - Distance in meters from the coordinates to extend the bounds.
     * @returns A new `LngLatBounds` object representing the coordinates extended by the `radius`.
     * @example
     * ```ts
     * let center = new LngLat(-73.9749, 40.7736);
     * LngLatBounds.fromLngLat(100).toArray(); // = [[-73.97501862141328, 40.77351016847229], [-73.97478137858673, 40.77368983152771]]
     * ```
     */
    static fromLngLat(center: LngLat, radius?: number): LngLatBounds;
}
