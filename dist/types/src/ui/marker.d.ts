import { LngLat } from '../geo/lng_lat';
import Point from '@mapbox/point-geometry';
import type { PositionAnchor } from './anchor';
import { Evented } from '../util/evented';
import type { Map } from './map';
import { Popup } from './popup';
import type { LngLatLike } from '../geo/lng_lat';
import type { MapMouseEvent, MapTouchEvent } from './events';
import type { PointLike } from './camera';
/**
 * Alignment options of rotation and pitch
 */
type Alignment = 'map' | 'viewport' | 'auto';
/**
 * The {@link Marker} options object
 */
type MarkerOptions = {
    /**
     * DOM element to use as a marker. The default is a light blue, droplet-shaped SVG marker.
     */
    element?: HTMLElement;
    /**
     * Space-separated CSS class names to add to marker element.
     */
    className?: string;
    /**
     * The offset in pixels as a {@link PointLike} object to apply relative to the element's center. Negatives indicate left and up.
     */
    offset?: PointLike;
    /**
     * A string indicating the part of the Marker that should be positioned closest to the coordinate set via {@link Marker#setLngLat}.
     * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`.
     * @defaultValue 'center'
     * */
    anchor?: PositionAnchor;
    /**
     * The color to use for the default marker if options.element is not provided. The default is light blue.
     * @defaultValue '#3FB1CE'
     */
    color?: string;
    /**
     * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of `41px` and a width of `27px`.
     * @defaultValue 1
     */
    scale?: number;
    /**
     * A boolean indicating whether or not a marker is able to be dragged to a new position on the map.
     * @defaultValue false
     */
    draggable?: boolean;
    /**
     * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance.
     * @defaultValue 0
     */
    clickTolerance?: number;
    /**
     * The rotation angle of the marker in degrees, relative to its respective `rotationAlignment` setting. A positive value will rotate the marker clockwise.
     * @defaultValue 0
     */
    rotation?: number;
    /**
     * `map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations. `auto` is equivalent to `viewport`.
     * @defaultValue 'auto'
     */
    rotationAlignment?: Alignment;
    /**
     * `map` aligns the `Marker` to the plane of the map. `viewport` aligns the `Marker` to the plane of the viewport. `auto` automatically matches the value of `rotationAlignment`.
     * @defaultValue 'auto'
     */
    pitchAlignment?: Alignment;
    /**
     * Marker's opacity when it's in clear view (not behind 3d terrain)
     * @defaultValue 1
     */
    opacity?: string;
    /**
     * Marker's opacity when it's behind 3d terrain
     * @defaultValue 0.2
     */
    opacityWhenCovered?: string;
};
/**
 * Creates a marker component
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let marker = new Marker()
 *   .setLngLat([30.5, 50.5])
 *   .addTo(map);
 * ```
 *
 * @example
 * Set options
 * ```ts
 * let marker = new Marker({
 *     color: "#FFFFFF",
 *     draggable: true
 *   }).setLngLat([30.5, 50.5])
 *   .addTo(map);
 * ```
 * @see [Add custom icons with Markers](https://maplibre.org/maplibre-gl-js/docs/examples/custom-marker-icons/)
 * @see [Create a draggable Marker](https://maplibre.org/maplibre-gl-js/docs/examples/drag-a-marker/)
 *
 * ### Events
 *
 * @event `dragstart` Fired when dragging starts, `marker` object that is being dragged
 *
 * @event `drag` Fired while dragging. `marker` object that is being dragged
 *
 * @event `dragend` Fired when the marker is finished being dragged, `marker` object that was dragged
 */
export declare class Marker extends Evented {
    _map: Map;
    _anchor: PositionAnchor;
    _offset: Point;
    _element: HTMLElement;
    _popup: Popup;
    _lngLat: LngLat;
    _pos: Point;
    _flatPos: Point;
    _color: string;
    _scale: number;
    _defaultMarker: boolean;
    _draggable: boolean;
    _clickTolerance: number;
    _isDragging: boolean;
    _state: 'inactive' | 'pending' | 'active';
    _positionDelta: Point;
    _pointerdownPos: Point;
    _rotation: number;
    _pitchAlignment: Alignment;
    _rotationAlignment: Alignment;
    _originalTabIndex: string;
    _opacity: string;
    _opacityWhenCovered: string;
    _opacityTimeout: ReturnType<typeof setTimeout>;
    /**
     * @param options - the options
     */
    constructor(options?: MarkerOptions);
    /**
     * Attaches the `Marker` to a `Map` object.
     * @param map - The MapLibre GL JS map to add the marker to.
     * @returns `this`
     * @example
     * ```ts
     * let marker = new Marker()
     *   .setLngLat([30.5, 50.5])
     *   .addTo(map); // add the marker to the map
     * ```
     */
    addTo(map: Map): this;
    /**
     * Removes the marker from a map
     * @example
     * ```ts
     * let marker = new Marker().addTo(map);
     * marker.remove();
     * ```
     * @returns `this`
     */
    remove(): this;
    /**
     * Get the marker's geographical location.
     *
     * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
     * set by `setLngLat` because `Marker` wraps the anchor longitude across copies of the world to keep
     * the marker on screen.
     *
     * @returns A {@link LngLat} describing the marker's location.
     * @example
     * ```ts
     * // Store the marker's longitude and latitude coordinates in a variable
     * let lngLat = marker.getLngLat();
     * // Print the marker's longitude and latitude values in the console
     * console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )
     * ```
     * @see [Create a draggable Marker](https://maplibre.org/maplibre-gl-js/docs/examples/drag-a-marker/)
     */
    getLngLat(): LngLat;
    /**
     * Set the marker's geographical position and move it.
     * @param lnglat - A {@link LngLat} describing where the marker should be located.
     * @returns `this`
     * @example
     * Create a new marker, set the longitude and latitude, and add it to the map
     * ```ts
     * new Marker()
     *   .setLngLat([-65.017, -16.457])
     *   .addTo(map);
     * ```
     * @see [Add custom icons with Markers](https://maplibre.org/maplibre-gl-js/docs/examples/custom-marker-icons/)
     * @see [Create a draggable Marker](https://maplibre.org/maplibre-gl-js/docs/examples/drag-a-marker/)
     */
    setLngLat(lnglat: LngLatLike): this;
    /**
     * Returns the `Marker`'s HTML element.
     * @returns element
     */
    getElement(): HTMLElement;
    /**
     * Binds a {@link Popup} to the {@link Marker}.
     * @param popup - An instance of the {@link Popup} class. If undefined or null, any popup
     * set on this {@link Marker} instance is unset.
     * @returns `this`
     * @example
     * ```ts
     * let marker = new Marker()
     *  .setLngLat([0, 0])
     *  .setPopup(new Popup().setHTML("<h1>Hello World!</h1>")) // add popup
     *  .addTo(map);
     * ```
     * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/set-popup/)
     */
    setPopup(popup?: Popup | null): this;
    _onKeyPress: (e: KeyboardEvent) => void;
    _onMapClick: (e: MapMouseEvent) => void;
    /**
     * Returns the {@link Popup} instance that is bound to the {@link Marker}.
     * @returns popup
     * @example
     * ```ts
     * let marker = new Marker()
     *  .setLngLat([0, 0])
     *  .setPopup(new Popup().setHTML("<h1>Hello World!</h1>"))
     *  .addTo(map);
     *
     * console.log(marker.getPopup()); // return the popup instance
     * ```
     */
    getPopup(): Popup;
    /**
     * Opens or closes the {@link Popup} instance that is bound to the {@link Marker}, depending on the current state of the {@link Popup}.
     * @returns `this`
     * @example
     * ```ts
     * let marker = new Marker()
     *  .setLngLat([0, 0])
     *  .setPopup(new Popup().setHTML("<h1>Hello World!</h1>"))
     *  .addTo(map);
     *
     * marker.togglePopup(); // toggle popup open or closed
     * ```
     */
    togglePopup(): this;
    _updateOpacity(force?: boolean): void;
    _update: (e?: {
        type: 'move' | 'moveend' | 'terrain' | 'render';
    }) => void;
    /**
     * Get the marker's offset.
     * @returns The marker's screen coordinates in pixels.
     */
    getOffset(): Point;
    /**
     * Sets the offset of the marker
     * @param offset - The offset in pixels as a {@link PointLike} object to apply relative to the element's center. Negatives indicate left and up.
     * @returns `this`
     */
    setOffset(offset: PointLike): this;
    /**
     * Adds a CSS class to the marker element.
     *
     * @param className - on-empty string with CSS class name to add to marker element
     *
     * @example
     * ```
     * let marker = new Marker()
     * marker.addClassName('some-class')
     * ```
     */
    addClassName(className: string): void;
    /**
     * Removes a CSS class from the marker element.
     *
     * @param className - Non-empty string with CSS class name to remove from marker element
     *
     * @example
     * ```ts
     * let marker = new Marker()
     * marker.removeClassName('some-class')
     * ```
     */
    removeClassName(className: string): void;
    /**
     * Add or remove the given CSS class on the marker element, depending on whether the element currently has that class.
     *
     * @param className - Non-empty string with CSS class name to add/remove
     *
     * @returns if the class was removed return false, if class was added, then return true
     *
     * @example
     * ```ts
     * let marker = new Marker()
     * marker.toggleClassName('toggleClass')
     * ```
     */
    toggleClassName(className: string): boolean;
    _onMove: (e: MapMouseEvent | MapTouchEvent) => void;
    _onUp: () => void;
    _addDragHandler: (e: MapMouseEvent | MapTouchEvent) => void;
    /**
     * Sets the `draggable` property and functionality of the marker
     * @param shouldBeDraggable - Turns drag functionality on/off
     * @returns `this`
     */
    setDraggable(shouldBeDraggable?: boolean): this;
    /**
     * Returns true if the marker can be dragged
     * @returns True if the marker is draggable.
     */
    isDraggable(): boolean;
    /**
     * Sets the `rotation` property of the marker.
     * @param rotation - The rotation angle of the marker (clockwise, in degrees), relative to its respective {@link Marker#setRotationAlignment} setting.
     * @returns `this`
     */
    setRotation(rotation?: number): this;
    /**
     * Returns the current rotation angle of the marker (in degrees).
     * @returns The current rotation angle of the marker.
     */
    getRotation(): number;
    /**
     * Sets the `rotationAlignment` property of the marker.
     * @param alignment - Sets the `rotationAlignment` property of the marker. defaults to 'auto'
     * @returns `this`
     */
    setRotationAlignment(alignment?: Alignment): this;
    /**
     * Returns the current `rotationAlignment` property of the marker.
     * @returns The current rotational alignment of the marker.
     */
    getRotationAlignment(): Alignment;
    /**
     * Sets the `pitchAlignment` property of the marker.
     * @param alignment - Sets the `pitchAlignment` property of the marker. If alignment is 'auto', it will automatically match `rotationAlignment`.
     * @returns `this`
     */
    setPitchAlignment(alignment?: Alignment): this;
    /**
     * Returns the current `pitchAlignment` property of the marker.
     * @returns The current pitch alignment of the marker in degrees.
     */
    getPitchAlignment(): Alignment;
    /**
     * Sets the `opacity` and `opacityWhenCovered` properties of the marker.
     * When called without arguments, resets opacity and opacityWhenCovered to defaults
     * @param opacity - Sets the `opacity` property of the marker.
     * @param opacityWhenCovered - Sets the `opacityWhenCovered` property of the marker.
     * @returns `this`
     */
    setOpacity(opacity?: string, opacityWhenCovered?: string): this;
}
export {};
