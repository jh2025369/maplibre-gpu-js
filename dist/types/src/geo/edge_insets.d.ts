import Point from '@mapbox/point-geometry';
/**
 * An `EdgeInset` object represents screen space padding applied to the edges of the viewport.
 * This shifts the apprent center or the vanishing point of the map. This is useful for adding floating UI elements
 * on top of the map and having the vanishing point shift as UI elements resize.
 *
 * @group Geography and Geometry
 */
export declare class EdgeInsets {
    /**
     * @defaultValue 0
     */
    top: number;
    /**
     * @defaultValue 0
     */
    bottom: number;
    /**
     * @defaultValue 0
     */
    left: number;
    /**
     * @defaultValue 0
     */
    right: number;
    constructor(top?: number, bottom?: number, left?: number, right?: number);
    /**
     * Interpolates the inset in-place.
     * This maintains the current inset value for any inset not present in `target`.
     * @param start - interpolation start
     * @param target - interpolation target
     * @param t - interpolation step/weight
     * @returns the insets
     */
    interpolate(start: PaddingOptions | EdgeInsets, target: PaddingOptions, t: number): EdgeInsets;
    /**
     * Utility method that computes the new apprent center or vanishing point after applying insets.
     * This is in pixels and with the top left being (0.0) and +y being downwards.
     *
     * @param width - the width
     * @param height - the height
     * @returns the point
     */
    getCenter(width: number, height: number): Point;
    equals(other: PaddingOptions): boolean;
    clone(): EdgeInsets;
    /**
     * Returns the current state as json, useful when you want to have a
     * read-only representation of the inset.
     *
     * @returns state as json
     */
    toJSON(): PaddingOptions;
}
/**
 * Options for setting padding on calls to methods such as {@link Map#fitBounds}, {@link Map#fitScreenCoordinates}, and {@link Map#setPadding}. Adjust these options to set the amount of padding in pixels added to the edges of the canvas. Set a uniform padding on all edges or individual values for each edge. All properties of this object must be
 * non-negative integers.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let bbox = [[-79, 43], [-73, 45]];
 * map.fitBounds(bbox, {
 *   padding: {top: 10, bottom:25, left: 15, right: 5}
 * });
 * ```
 *
 * @example
 * ```ts
 * let bbox = [[-79, 43], [-73, 45]];
 * map.fitBounds(bbox, {
 *   padding: 20
 * });
 * ```
 * @see [Fit to the bounds of a LineString](https://maplibre.org/maplibre-gl-js/docs/examples/zoomto-linestring/)
 * @see [Fit a map to a bounding box](https://maplibre.org/maplibre-gl-js/docs/examples/fitbounds/)
 */
export type PaddingOptions = {
    /**
     * Padding in pixels from the top of the map canvas.
     */
    top: number;
    /**
     * Padding in pixels from the bottom of the map canvas.
     */
    bottom: number;
    /**
     * Padding in pixels from the left of the map canvas.
     */
    right: number;
    /**
     * Padding in pixels from the right of the map canvas.
     */
    left: number;
};
