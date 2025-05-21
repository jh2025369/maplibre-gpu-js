import { Evented } from '../util/evented';
import { MapMouseEvent } from '../ui/events';
import { LngLat } from '../geo/lng_lat';
import Point from '@mapbox/point-geometry';
import type { PositionAnchor } from './anchor';
import type { Map } from './map';
import type { LngLatLike } from '../geo/lng_lat';
import type { PointLike } from './camera';
/**
 * A pixel offset specified as:
 *
 * - a single number specifying a distance from the location
 * - a {@link PointLike} specifying a constant offset
 * - an object of {@link Point}s specifying an offset for each anchor position
 *
 * Negative offsets indicate left and up.
 */
export type Offset = number | PointLike | {
    [_ in PositionAnchor]: PointLike;
};
/**
 * The {@link Popup} options object
 */
export type PopupOptions = {
    /**
     * If `true`, a close button will appear in the top right corner of the popup.
     * @defaultValue true
     */
    closeButton?: boolean;
    /**
     * If `true`, the popup will closed when the map is clicked.
     * @defaultValue true
     */
    closeOnClick?: boolean;
    /**
     * If `true`, the popup will closed when the map moves.
     * @defaultValue false
     */
    closeOnMove?: boolean;
    /**
     * If `true`, the popup will try to focus the first focusable element inside the popup.
     * @defaultValue true
     */
    focusAfterOpen?: boolean;
    /**
     * A string indicating the part of the Popup that should
     * be positioned closest to the coordinate set via {@link Popup#setLngLat}.
     * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`,
     * `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset the anchor will be
     * dynamically set to ensure the popup falls within the map container with a preference
     * for `'bottom'`.
     */
    anchor?: PositionAnchor;
    /**
     * A pixel offset applied to the popup's location
     */
    offset?: Offset;
    /**
     * Space-separated CSS class names to add to popup container
     */
    className?: string;
    /**
     * A string that sets the CSS property of the popup's maximum width, eg `'300px'`.
     * To ensure the popup resizes to fit its content, set this property to `'none'`.
     * Available values can be found here: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
     * @defaultValue '240px'
     */
    maxWidth?: string;
    /**
     * If `true`, rounding is disabled for placement of the popup, allowing for
     * subpixel positioning and smoother movement when the popup is translated.
     * @defaultValue false
     */
    subpixelPositioning?: boolean;
};
/**
 * A popup component.
 *
 * @group Markers and Controls
 *
 *
 * @example
 * Create a popup
 * ```ts
 * let popup = new Popup();
 * // Set an event listener that will fire
 * // any time the popup is opened
 * popup.on('open', function(){
 *   console.log('popup was opened');
 * });
 * ```
 *
 * @example
 * Create a popup
 * ```ts
 * let popup = new Popup();
 * // Set an event listener that will fire
 * // any time the popup is closed
 * popup.on('close', function(){
 *   console.log('popup was closed');
 * });
 * ```
 *
 * @example
 * ```ts
 * let markerHeight = 50, markerRadius = 10, linearOffset = 25;
 * let popupOffsets = {
 *  'top': [0, 0],
 *  'top-left': [0,0],
 *  'top-right': [0,0],
 *  'bottom': [0, -markerHeight],
 *  'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 *  'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 *  'left': [markerRadius, (markerHeight - markerRadius) * -1],
 *  'right': [-markerRadius, (markerHeight - markerRadius) * -1]
 *  };
 * let popup = new Popup({offset: popupOffsets, className: 'my-class'})
 *   .setLngLat(e.lngLat)
 *   .setHTML("<h1>Hello World!</h1>")
 *   .setMaxWidth("300px")
 *   .addTo(map);
 * ```
 * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/popup/)
 * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-hover/)
 * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-click/)
 * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/set-popup/)
 *
 * ### Events
 *
 * @event `open` Fired when the popup is opened manually or programmatically. `popup` object that was opened
 *
 * @event `close` Fired when the popup is closed manually or programmatically. `popup` object that was closed
 */
export declare class Popup extends Evented {
    _map: Map;
    options: PopupOptions;
    _content: HTMLElement;
    _container: HTMLElement;
    _closeButton: HTMLButtonElement;
    _tip: HTMLElement;
    _lngLat: LngLat;
    _trackPointer: boolean;
    _pos: Point;
    _flatPos: Point;
    /**
     * @param options - the options
     */
    constructor(options?: PopupOptions);
    /**
     * Adds the popup to a map.
     *
     * @param map - The MapLibre GL JS map to add the popup to.
     * @returns `this`
     * @example
     * ```ts
     * new Popup()
     *   .setLngLat([0, 0])
     *   .setHTML("<h1>Null Island</h1>")
     *   .addTo(map);
     * ```
     * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/popup/)
     * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-hover/)
     * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-click/)
     * @see [Show polygon information on click](https://maplibre.org/maplibre-gl-js/docs/examples/polygon-popup-on-click/)
     */
    addTo(map: Map): this;
    /**
     * @returns `true` if the popup is open, `false` if it is closed.
     */
    isOpen(): boolean;
    /**
     * Removes the popup from the map it has been added to.
     *
     * @example
     * ```ts
     * let popup = new Popup().addTo(map);
     * popup.remove();
     * ```
     * @returns `this`
     */
    remove: () => this;
    /**
     * Returns the geographical location of the popup's anchor.
     *
     * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
     * set by `setLngLat` because `Popup` wraps the anchor longitude across copies of the world to keep
     * the popup on screen.
     *
     * @returns The geographical location of the popup's anchor.
     */
    getLngLat(): LngLat;
    /**
     * Sets the geographical location of the popup's anchor, and moves the popup to it. Replaces trackPointer() behavior.
     *
     * @param lnglat - The geographical location to set as the popup's anchor.
     * @returns `this`
     */
    setLngLat(lnglat: LngLatLike): this;
    /**
     * Tracks the popup anchor to the cursor position on screens with a pointer device (it will be hidden on touchscreens). Replaces the `setLngLat` behavior.
     * For most use cases, set `closeOnClick` and `closeButton` to `false`.
     * @example
     * ```ts
     * let popup = new Popup({ closeOnClick: false, closeButton: false })
     *   .setHTML("<h1>Hello World!</h1>")
     *   .trackPointer()
     *   .addTo(map);
     * ```
     * @returns `this`
     */
    trackPointer(): this;
    /**
     * Returns the `Popup`'s HTML element.
     * @example
     * Change the `Popup` element's font size
     * ```ts
     * let popup = new Popup()
     *   .setLngLat([-96, 37.8])
     *   .setHTML("<p>Hello World!</p>")
     *   .addTo(map);
     * let popupElem = popup.getElement();
     * popupElem.style.fontSize = "25px";
     * ```
     * @returns element
     */
    getElement(): HTMLElement;
    /**
     * Sets the popup's content to a string of text.
     *
     * This function creates a [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) node in the DOM,
     * so it cannot insert raw HTML. Use this method for security against XSS
     * if the popup content is user-provided.
     *
     * @param text - Textual content for the popup.
     * @returns `this`
     * @example
     * ```ts
     * let popup = new Popup()
     *   .setLngLat(e.lngLat)
     *   .setText('Hello, world!')
     *   .addTo(map);
     * ```
     */
    setText(text: string): this;
    /**
     * Sets the popup's content to the HTML provided as a string.
     *
     * This method does not perform HTML filtering or sanitization, and must be
     * used only with trusted content. Consider {@link Popup#setText} if
     * the content is an untrusted text string.
     *
     * @param html - A string representing HTML content for the popup.
     * @returns `this`
     * @example
     * ```ts
     * let popup = new Popup()
     *   .setLngLat(e.lngLat)
     *   .setHTML("<h1>Hello World!</h1>")
     *   .addTo(map);
     * ```
     * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/popup/)
     * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-hover/)
     * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/popup-on-click/)
     * @see [Attach a popup to a marker instance](https://maplibre.org/maplibre-gl-js/docs/examples/set-popup/)
     */
    setHTML(html: string): this;
    /**
     * Returns the popup's maximum width.
     *
     * @returns The maximum width of the popup.
     */
    getMaxWidth(): string;
    /**
     * Sets the popup's maximum width. This is setting the CSS property `max-width`.
     * Available values can be found here: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
     *
     * @param maxWidth - A string representing the value for the maximum width.
     * @returns `this`
     */
    setMaxWidth(maxWidth: string): this;
    /**
     * Sets the popup's content to the element provided as a DOM node.
     *
     * @param htmlNode - A DOM node to be used as content for the popup.
     * @returns `this`
     * @example
     * Create an element with the popup content
     * ```ts
     * let div = document.createElement('div');
     * div.innerHTML = 'Hello, world!';
     * let popup = new Popup()
     *   .setLngLat(e.lngLat)
     *   .setDOMContent(div)
     *   .addTo(map);
     * ```
     */
    setDOMContent(htmlNode: Node): this;
    /**
     * Adds a CSS class to the popup container element.
     *
     * @param className - Non-empty string with CSS class name to add to popup container
     *
     * @example
     * ```ts
     * let popup = new Popup()
     * popup.addClassName('some-class')
     * ```
     */
    addClassName(className: string): this;
    /**
     * Removes a CSS class from the popup container element.
     *
     * @param className - Non-empty string with CSS class name to remove from popup container
     *
     * @example
     * ```ts
     * let popup = new Popup()
     * popup.removeClassName('some-class')
     * ```
     */
    removeClassName(className: string): this;
    /**
     * Sets the popup's offset.
     *
     * @param offset - Sets the popup's offset.
     * @returns `this`
     */
    setOffset(offset?: Offset): this;
    /**
     * Add or remove the given CSS class on the popup container, depending on whether the container currently has that class.
     *
     * @param className - Non-empty string with CSS class name to add/remove
     *
     * @returns if the class was removed return false, if class was added, then return true, undefined if there is no container
     *
     * @example
     * ```ts
     * let popup = new Popup()
     * popup.toggleClassName('toggleClass')
     * ```
     */
    toggleClassName(className: string): boolean | undefined;
    /**
     * Set the option to allow subpixel positioning of the popup by passing a boolean
     *
     * @param value - When boolean is true, subpixel positioning is enabled for the popup.
     *
     * @example
     * ```ts
     * let popup = new Popup()
     * popup.setSubpixelPositioning(true);
     * ```
     */
    setSubpixelPositioning(value: boolean): void;
    _createCloseButton(): void;
    _onMouseUp: (event: MapMouseEvent) => void;
    _onMouseMove: (event: MapMouseEvent) => void;
    _onDrag: (event: MapMouseEvent) => void;
    _update: (cursor?: Point) => void;
    _focusFirstElement(): void;
    _onClose: () => void;
}
