import { LngLat } from '../geo/lng_lat';
import Point from '@mapbox/point-geometry';
import { Evented } from '../util/evented';
import { Terrain } from '../render/terrain';
import type { Transform } from '../geo/transform';
import type { LngLatLike } from '../geo/lng_lat';
import type { LngLatBoundsLike } from '../geo/lng_lat_bounds';
import type { TaskID } from '../util/task_queue';
import type { PaddingOptions } from '../geo/edge_insets';
import { Painter } from '../render/painter';
/**
 * A [Point](https://github.com/mapbox/point-geometry) or an array of two numbers representing `x` and `y` screen coordinates in pixels.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let p1 = new Point(-77, 38); // a PointLike which is a Point
 * let p2 = [-77, 38]; // a PointLike which is an array of two numbers
 * ```
 */
export type PointLike = Point | [number, number];
/**
 * A helper to allow require of at least one propery
 */
export type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
/**
 * Options common to {@link Map#jumpTo}, {@link Map#easeTo}, and {@link Map#flyTo}, controlling the desired location,
 * zoom, bearing, and pitch of the camera. All properties are optional, and when a property is omitted, the current
 * camera value for that property will remain unchanged.
 *
 * @example
 * Set the map's initial perspective with CameraOptions
 * ```ts
 * let map = new Map({
 *   container: 'map',
 *   style: 'https://demotiles.maplibre.org/style.json',
 *   center: [-73.5804, 45.53483],
 *   pitch: 60,
 *   bearing: -60,
 *   zoom: 10
 * });
 * ```
 * @see [Set pitch and bearing](https://maplibre.org/maplibre-gl-js/docs/examples/set-perspective/)
 * @see [Jump to a series of locations](https://maplibre.org/maplibre-gl-js/docs/examples/jump-to/)
 * @see [Fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/flyto/)
 * @see [Display buildings in 3D](https://maplibre.org/maplibre-gl-js/docs/examples/3d-buildings/)
 */
export type CameraOptions = CenterZoomBearing & {
    /**
     * The desired pitch in degrees. The pitch is the angle towards the horizon
     * measured in degrees with a range between 0 and 60 degrees. For example, pitch: 0 provides the appearance
     * of looking straight down at the map, while pitch: 60 tilts the user's perspective towards the horizon.
     * Increasing the pitch value is often used to display 3D objects.
     */
    pitch?: number;
    /**
     * If `zoom` is specified, `around` determines the point around which the zoom is centered.
     */
    around?: LngLatLike;
};
/**
 * Holds center, zoom and bearing properties
 */
export type CenterZoomBearing = {
    /**
     * The desired center.
     */
    center?: LngLatLike;
    /**
     * The desired zoom level.
     */
    zoom?: number;
    /**
     * The desired bearing in degrees. The bearing is the compass direction that
     * is "up". For example, `bearing: 90` orients the map so that east is up.
     */
    bearing?: number;
};
/**
 * The options object related to the {@link Map#jumpTo} method
 */
export type JumpToOptions = CameraOptions & {
    /**
     * Dimensions in pixels applied on each side of the viewport for shifting the vanishing point.
     */
    padding?: PaddingOptions;
};
/**
 * A options object for the {@link Map#cameraForBounds} method
 */
export type CameraForBoundsOptions = CameraOptions & {
    /**
     * The amount of padding in pixels to add to the given bounds.
     */
    padding?: number | RequireAtLeastOne<PaddingOptions>;
    /**
     * The center of the given bounds relative to the map's center, measured in pixels.
     * @defaultValue [0, 0]
     */
    offset?: PointLike;
    /**
     * The maximum zoom level to allow when the camera would transition to the specified bounds.
     */
    maxZoom?: number;
};
/**
 * The {@link Map#flyTo} options object
 */
export type FlyToOptions = AnimationOptions & CameraOptions & {
    /**
     * The zooming "curve" that will occur along the
     * flight path. A high value maximizes zooming for an exaggerated animation, while a low
     * value minimizes zooming for an effect closer to {@link Map#easeTo}. 1.42 is the average
     * value selected by participants in the user study discussed in
     * [van Wijk (2003)](https://www.win.tue.nl/~vanwijk/zoompan.pdf). A value of
     * `Math.pow(6, 0.25)` would be equivalent to the root mean squared average velocity. A
     * value of 1 would produce a circular motion.
     * @defaultValue 1.42
     */
    curve?: number;
    /**
     * The zero-based zoom level at the peak of the flight path. If
     * `options.curve` is specified, this option is ignored.
     */
    minZoom?: number;
    /**
     * The average speed of the animation defined in relation to
     * `options.curve`. A speed of 1.2 means that the map appears to move along the flight path
     * by 1.2 times `options.curve` screenfuls every second. A _screenful_ is the map's visible span.
     * It does not correspond to a fixed physical distance, but varies by zoom level.
     * @defaultValue 1.2
     */
    speed?: number;
    /**
     * The average speed of the animation measured in screenfuls
     * per second, assuming a linear timing curve. If `options.speed` is specified, this option is ignored.
     */
    screenSpeed?: number;
    /**
     * The animation's maximum duration, measured in milliseconds.
     * If duration exceeds maximum duration, it resets to 0.
     */
    maxDuration?: number;
    /**
     * The amount of padding in pixels to add to the given bounds.
     */
    padding?: number | RequireAtLeastOne<PaddingOptions>;
};
export type EaseToOptions = AnimationOptions & CameraOptions & {
    delayEndEvents?: number;
    padding?: number | RequireAtLeastOne<PaddingOptions>;
};
/**
 * Options for {@link Map#fitBounds} method
 */
export type FitBoundsOptions = FlyToOptions & {
    /**
     * If `true`, the map transitions using {@link Map#easeTo}. If `false`, the map transitions using {@link Map#flyTo}.
     * See those functions and {@link AnimationOptions} for information about options available.
     * @defaultValue false
     */
    linear?: boolean;
    /**
     * The center of the given bounds relative to the map's center, measured in pixels.
     * @defaultValue [0, 0]
     */
    offset?: PointLike;
    /**
     * The maximum zoom level to allow when the map view transitions to the specified bounds.
     */
    maxZoom?: number;
};
/**
 * Options common to map movement methods that involve animation, such as {@link Map#panBy} and
 * {@link Map#easeTo}, controlling the duration and easing function of the animation. All properties
 * are optional.
 *
 */
export type AnimationOptions = {
    /**
     * The animation's duration, measured in milliseconds.
     */
    duration?: number;
    /**
     * A function taking a time in the range 0..1 and returning a number where 0 is
     * the initial state and 1 is the final state.
     */
    easing?: (_: number) => number;
    /**
     * of the target center relative to real map container center at the end of animation.
     */
    offset?: PointLike;
    /**
     * If `false`, no animation will occur.
     */
    animate?: boolean;
    /**
     * If `true`, then the animation is considered essential and will not be affected by
     * [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/\@media/prefers-reduced-motion).
     */
    essential?: boolean;
    /**
     * Default false. Needed in 3D maps to let the camera stay in a constant
     * height based on sea-level. After the animation finished the zoom-level will be recalculated in respect of
     * the distance from the camera to the center-coordinate-altitude.
     */
    freezeElevation?: boolean;
};
/**
 * A callback hook that allows manipulating the camera and being notified about camera updates before they happen
 */
export type CameraUpdateTransformFunction = (next: {
    center: LngLat;
    zoom: number;
    pitch: number;
    bearing: number;
    elevation: number;
}) => {
    center?: LngLat;
    zoom?: number;
    pitch?: number;
    bearing?: number;
    elevation?: number;
};
export declare abstract class Camera extends Evented {
    transform: Transform;
    terrain: Terrain;
    painter: Painter;
    _moving: boolean;
    _zooming: boolean;
    _rotating: boolean;
    _pitching: boolean;
    _padding: boolean;
    _bearingSnap: number;
    _easeStart: number;
    _easeOptions: {
        duration?: number;
        easing?: (_: number) => number;
    };
    _easeId: string | void;
    _onEaseFrame: (_: number) => void;
    _onEaseEnd: (easeId?: string) => void;
    _easeFrameId: TaskID;
    /**
     * @internal
     * holds the geographical coordinate of the target
     */
    _elevationCenter: LngLat;
    /**
     * @internal
     * holds the targ altitude value, = center elevation of the target.
     * This value may changes during flight, because new terrain-tiles loads during flight.
     */
    _elevationTarget: number;
    /**
     * @internal
     * holds the start altitude value, = center elevation before animation begins
     * this value will recalculated during flight in respect of changing _elevationTarget values,
     * so the linear interpolation between start and target keeps smooth and without jumps.
     */
    _elevationStart: number;
    /**
     * @internal
     * Saves the current state of the elevation freeze - this is used during map movement to prevent "rocky" camera movement.
     */
    _elevationFreeze: boolean;
    /**
     * @internal
     * Used to track accumulated changes during continuous interaction
     */
    _requestedCameraState?: Transform;
    /**
     * A callback used to defer camera updates or apply arbitrary constraints.
     * If specified, this Camera instance can be used as a stateless component in React etc.
     */
    transformCameraUpdate: CameraUpdateTransformFunction | null;
    abstract _requestRenderFrame(a: () => void): TaskID;
    abstract _cancelRenderFrame(_: TaskID): void;
    constructor(transform: Transform, options: {
        bearingSnap: number;
    });
    /**
     * Returns the map's geographical centerpoint.
     *
     * @returns The map's geographical centerpoint.
     * @example
     * Return a LngLat object such as `{lng: 0, lat: 0}`
     * ```ts
     * let center = map.getCenter();
     * // access longitude and latitude values directly
     * let {lng, lat} = map.getCenter();
     * ```
     */
    getCenter(): LngLat;
    /**
     * Sets the map's geographical centerpoint. Equivalent to `jumpTo({center: center})`.
     *
     * Triggers the following events: `movestart` and `moveend`.
     *
     * @param center - The centerpoint to set.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * map.setCenter([-74, 38]);
     * ```
     */
    setCenter(center: LngLatLike, eventData?: any): this;
    /**
     * Pans the map by the specified offset.
     *
     * Triggers the following events: `movestart` and `moveend`.
     *
     * @param offset - `x` and `y` coordinates by which to pan the map.
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/game-controls/)
     */
    panBy(offset: PointLike, options?: AnimationOptions, eventData?: any): this;
    /**
     * Pans the map to the specified location with an animated transition.
     *
     * Triggers the following events: `movestart` and `moveend`.
     *
     * @param lnglat - The location to pan the map to.
     * @param options - Options describing the destination and animation of the transition.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * map.panTo([-74, 38]);
     * // Specify that the panTo animation should last 5000 milliseconds.
     * map.panTo([-74, 38], {duration: 5000});
     * ```
     * @see [Update a feature in realtime](https://maplibre.org/maplibre-gl-js/docs/examples/live-update-feature/)
     */
    panTo(lnglat: LngLatLike, options?: AnimationOptions, eventData?: any): this;
    /**
     * Returns the map's current zoom level.
     *
     * @returns The map's current zoom level.
     * @example
     * ```ts
     * map.getZoom();
     * ```
     */
    getZoom(): number;
    /**
     * Sets the map's zoom level. Equivalent to `jumpTo({zoom: zoom})`.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
     *
     * @param zoom - The zoom level to set (0-20).
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * Zoom to the zoom level 5 without an animated transition
     * ```ts
     * map.setZoom(5);
     * ```
     */
    setZoom(zoom: number, eventData?: any): this;
    /**
     * Zooms the map to the specified zoom level, with an animated transition.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
     *
     * @param zoom - The zoom level to transition to.
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * // Zoom to the zoom level 5 without an animated transition
     * map.zoomTo(5);
     * // Zoom to the zoom level 8 with an animated transition
     * map.zoomTo(8, {
     *   duration: 2000,
     *   offset: [100, 50]
     * });
     * ```
     */
    zoomTo(zoom: number, options?: AnimationOptions | null, eventData?: any): this;
    /**
     * Increases the map's zoom level by 1.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
     *
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * Zoom the map in one level with a custom animation duration
     * ```ts
     * map.zoomIn({duration: 1000});
     * ```
     */
    zoomIn(options?: AnimationOptions, eventData?: any): this;
    /**
     * Decreases the map's zoom level by 1.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
     *
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * Zoom the map out one level with a custom animation offset
     * ```ts
     * map.zoomOut({offset: [80, 60]});
     * ```
     */
    zoomOut(options?: AnimationOptions, eventData?: any): this;
    /**
     * Returns the map's current bearing. The bearing is the compass direction that is "up"; for example, a bearing
     * of 90° orients the map so that east is up.
     *
     * @returns The map's current bearing.
     * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/game-controls/)
     */
    getBearing(): number;
    /**
     * Sets the map's bearing (rotation). The bearing is the compass direction that is "up"; for example, a bearing
     * of 90° orients the map so that east is up.
     *
     * Equivalent to `jumpTo({bearing: bearing})`.
     *
     * Triggers the following events: `movestart`, `moveend`, and `rotate`.
     *
     * @param bearing - The desired bearing.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * Rotate the map to 90 degrees
     * ```ts
     * map.setBearing(90);
     * ```
     */
    setBearing(bearing: number, eventData?: any): this;
    /**
     * Returns the current padding applied around the map viewport.
     *
     * @returns The current padding around the map viewport.
     */
    getPadding(): PaddingOptions;
    /**
     * Sets the padding in pixels around the viewport.
     *
     * Equivalent to `jumpTo({padding: padding})`.
     *
     * Triggers the following events: `movestart` and `moveend`.
     *
     * @param padding - The desired padding.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * Sets a left padding of 300px, and a top padding of 50px
     * ```ts
     * map.setPadding({ left: 300, top: 50 });
     * ```
     */
    setPadding(padding: PaddingOptions, eventData?: any): this;
    /**
     * Rotates the map to the specified bearing, with an animated transition. The bearing is the compass direction
     * that is "up"; for example, a bearing of 90° orients the map so that east is up.
     *
     * Triggers the following events: `movestart`, `moveend`, and `rotate`.
     *
     * @param bearing - The desired bearing.
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     */
    rotateTo(bearing: number, options?: AnimationOptions, eventData?: any): this;
    /**
     * Rotates the map so that north is up (0° bearing), with an animated transition.
     *
     * Triggers the following events: `movestart`, `moveend`, and `rotate`.
     *
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     */
    resetNorth(options?: AnimationOptions, eventData?: any): this;
    /**
     * Rotates and pitches the map so that north is up (0° bearing) and pitch is 0°, with an animated transition.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, `pitchend`, and `rotate`.
     *
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     */
    resetNorthPitch(options?: AnimationOptions, eventData?: any): this;
    /**
     * Snaps the map so that north is up (0° bearing), if the current bearing is close enough to it (i.e. within the
     * `bearingSnap` threshold).
     *
     * Triggers the following events: `movestart`, `moveend`, and `rotate`.
     *
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     */
    snapToNorth(options?: AnimationOptions, eventData?: any): this;
    /**
     * Returns the map's current pitch (tilt).
     *
     * @returns The map's current pitch, measured in degrees away from the plane of the screen.
     */
    getPitch(): number;
    /**
     * Sets the map's pitch (tilt). Equivalent to `jumpTo({pitch: pitch})`.
     *
     * Triggers the following events: `movestart`, `moveend`, `pitchstart`, and `pitchend`.
     *
     * @param pitch - The pitch to set, measured in degrees away from the plane of the screen (0-60).
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     */
    setPitch(pitch: number, eventData?: any): this;
    /**
     * @param bounds - Calculate the center for these bounds in the viewport and use
     * the highest zoom level up to and including `Map#getMaxZoom()` that fits
     * in the viewport. LngLatBounds represent a box that is always axis-aligned with bearing 0.
     * @param options - Options object
     * @returns If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`.
     * If map is unable to fit, method will warn and return undefined.
     * @example
     * ```ts
     * let bbox = [[-79, 43], [-73, 45]];
     * let newCameraTransform = map.cameraForBounds(bbox, {
     *   padding: {top: 10, bottom:25, left: 15, right: 5}
     * });
     * ```
     */
    cameraForBounds(bounds: LngLatBoundsLike, options?: CameraForBoundsOptions): CenterZoomBearing;
    /**
     * @internal
     * Calculate the center of these two points in the viewport and use
     * the highest zoom level up to and including `Map#getMaxZoom()` that fits
     * the points in the viewport at the specified bearing.
     * @param p0 - First point
     * @param p1 - Second point
     * @param bearing - Desired map bearing at end of animation, in degrees
     * @param options - the camera options
     * @returns If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`.
     *      If map is unable to fit, method will warn and return undefined.
     * @example
     * ```ts
     * let p0 = [-79, 43];
     * let p1 = [-73, 45];
     * let bearing = 90;
     * let newCameraTransform = map._cameraForBoxAndBearing(p0, p1, bearing, {
     *   padding: {top: 10, bottom:25, left: 15, right: 5}
     * });
     * ```
     */
    _cameraForBoxAndBearing(p0: LngLatLike, p1: LngLatLike, bearing: number, options?: CameraForBoundsOptions): CenterZoomBearing;
    /**
     * Pans and zooms the map to contain its visible area within the specified geographical bounds.
     * This function will also reset the map's bearing to 0 if bearing is nonzero.
     *
     * Triggers the following events: `movestart` and `moveend`.
     *
     * @param bounds - Center these bounds in the viewport and use the highest
     * zoom level up to and including `Map#getMaxZoom()` that fits them in the viewport.
     * @param options - Options supports all properties from {@link AnimationOptions} and {@link CameraOptions} in addition to the fields below.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * let bbox = [[-79, 43], [-73, 45]];
     * map.fitBounds(bbox, {
     *   padding: {top: 10, bottom:25, left: 15, right: 5}
     * });
     * ```
     * @see [Fit a map to a bounding box](https://maplibre.org/maplibre-gl-js/docs/examples/fitbounds/)
     */
    fitBounds(bounds: LngLatBoundsLike, options?: FitBoundsOptions, eventData?: any): this;
    /**
     * Pans, rotates and zooms the map to to fit the box made by points p0 and p1
     * once the map is rotated to the specified bearing. To zoom without rotating,
     * pass in the current map bearing.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend` and `rotate`.
     *
     * @param p0 - First point on screen, in pixel coordinates
     * @param p1 - Second point on screen, in pixel coordinates
     * @param bearing - Desired map bearing at end of animation, in degrees
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * let p0 = [220, 400];
     * let p1 = [500, 900];
     * map.fitScreenCoordinates(p0, p1, map.getBearing(), {
     *   padding: {top: 10, bottom:25, left: 15, right: 5}
     * });
     * ```
     * @see Used by {@link BoxZoomHandler}
     */
    fitScreenCoordinates(p0: PointLike, p1: PointLike, bearing: number, options?: FitBoundsOptions, eventData?: any): this;
    _fitInternal(calculatedOptions?: CenterZoomBearing, options?: FitBoundsOptions, eventData?: any): this;
    /**
     * Changes any combination of center, zoom, bearing, and pitch, without
     * an animated transition. The map will retain its current values for any
     * details not specified in `options`.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
     * `pitch`, `pitchend`, and `rotate`.
     *
     * @param options - Options object
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * // jump to coordinates at current zoom
     * map.jumpTo({center: [0, 0]});
     * // jump with zoom, pitch, and bearing options
     * map.jumpTo({
     *   center: [0, 0],
     *   zoom: 8,
     *   pitch: 45,
     *   bearing: 90
     * });
     * ```
     * @see [Jump to a series of locations](https://maplibre.org/maplibre-gl-js/docs/examples/jump-to/)
     * @see [Update a feature in realtime](https://maplibre.org/maplibre-gl-js/docs/examples/live-update-feature/)
     */
    jumpTo(options: JumpToOptions, eventData?: any): this;
    /**
     * Calculates pitch, zoom and bearing for looking at `newCenter` with the camera position being `newCenter`
     * and returns them as {@link CameraOptions}.
     * @param from - The camera to look from
     * @param altitudeFrom - The altitude of the camera to look from
     * @param to - The center to look at
     * @param altitudeTo - Optional altitude of the center to look at. If none given the ground height will be used.
     * @returns the calculated camera options
     */
    calculateCameraOptionsFromTo(from: LngLat, altitudeFrom: number, to: LngLat, altitudeTo?: number): CameraOptions;
    /**
     * Changes any combination of `center`, `zoom`, `bearing`, `pitch`, and `padding` with an animated transition
     * between old and new values. The map will retain its current values for any
     * details not specified in `options`.
     *
     * Note: The transition will happen instantly if the user has enabled
     * the `reduced motion` accessibility feature enabled in their operating system,
     * unless `options` includes `essential: true`.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
     * `pitch`, `pitchend`, and `rotate`.
     *
     * @param options - Options describing the destination and animation of the transition.
     * Accepts {@link CameraOptions} and {@link AnimationOptions}.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/game-controls/)
     */
    easeTo(options: EaseToOptions & {
        easeId?: string;
        noMoveStart?: boolean;
    }, eventData?: any): this;
    _prepareEase(eventData: any, noMoveStart: boolean, currently?: any): void;
    _prepareElevation(center: LngLat): void;
    _updateElevation(k: number): void;
    _finalizeElevation(): void;
    /**
     * @internal
     * Called when the camera is about to be manipulated.
     * If `transformCameraUpdate` is specified, a copy of the current transform is created to track the accumulated changes.
     * This underlying transform represents the "desired state" proposed by input handlers / animations / UI controls.
     * It may differ from the state used for rendering (`this.transform`).
     * @returns Transform to apply changes to
     */
    _getTransformForUpdate(): Transform;
    /**
     * @internal
     * Called after the camera is done being manipulated.
     * @param tr - the requested camera end state
     * Call `transformCameraUpdate` if present, and then apply the "approved" changes.
     */
    _applyUpdatedTransform(tr: Transform): void;
    _fireMoveEvents(eventData?: any): void;
    _afterEase(eventData?: any, easeId?: string): void;
    /**
     * Changes any combination of center, zoom, bearing, and pitch, animating the transition along a curve that
     * evokes flight. The animation seamlessly incorporates zooming and panning to help
     * the user maintain her bearings even after traversing a great distance.
     *
     * Note: The animation will be skipped, and this will behave equivalently to `jumpTo`
     * if the user has the `reduced motion` accessibility feature enabled in their operating system,
     * unless 'options' includes `essential: true`.
     *
     * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
     * `pitch`, `pitchend`, and `rotate`.
     *
     * @param options - Options describing the destination and animation of the transition.
     * Accepts {@link CameraOptions}, {@link AnimationOptions},
     * and the following additional options.
     * @param eventData - Additional properties to be added to event objects of events triggered by this method.
     * @returns `this`
     * @example
     * ```ts
     * // fly with default options to null island
     * map.flyTo({center: [0, 0], zoom: 9});
     * // using flyTo options
     * map.flyTo({
     *   center: [0, 0],
     *   zoom: 9,
     *   speed: 0.2,
     *   curve: 1,
     *   easing(t) {
     *     return t;
     *   }
     * });
     * ```
     * @see [Fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/flyto/)
     * @see [Slowly fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/flyto-options/)
     * @see [Fly to a location based on scroll position](https://maplibre.org/maplibre-gl-js/docs/examples/scroll-fly-to/)
     */
    flyTo(options: FlyToOptions, eventData?: any): this;
    isEasing(): boolean;
    /**
     * Stops any animated transition underway.
     *
     * @returns `this`
     */
    stop(): this;
    _stop(allowGestures?: boolean, easeId?: string): this;
    _ease(frame: (_: number) => void, finish: () => void, options: {
        animate?: boolean;
        duration?: number;
        easing?: (_: number) => number;
    }): void;
    _renderFrameCallback: () => void;
    _normalizeBearing(bearing: number, currentBearing: number): number;
    _normalizeCenter(center: LngLat): void;
    /**
     * Get the elevation difference between a given point
     * and a point that is currently in the middle of the screen.
     * This method should be used for proper positioning of custom 3d objects, as explained [here](https://maplibre.org/maplibre-gl-js/docs/examples/add-3d-model-with-terrain/)
     * Returns null if terrain is not enabled.
     * This method is subject to change in Maplibre GL JS v5.
     * @param lngLatLike - [x,y] or LngLat coordinates of the location
     * @returns elevation offset in meters
     */
    queryTerrainElevation(lngLatLike: LngLatLike): number | null;
}
