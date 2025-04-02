import type { ClickZoomHandler } from '../click_zoom';
import type { TapZoomHandler } from './../tap_zoom';
/**
 * The `DoubleClickZoomHandler` allows the user to zoom the map at a point by
 * double clicking or double tapping.
 *
 * @group Handlers
 */
export declare class DoubleClickZoomHandler {
    _clickZoom: ClickZoomHandler;
    _tapZoom: TapZoomHandler;
    /** @internal */
    constructor(clickZoom: ClickZoomHandler, TapZoom: TapZoomHandler);
    /**
     * Enables the "double click to zoom" interaction.
     *
     * @example
     * ```ts
     * map.doubleClickZoom.enable();
     * ```
     */
    enable(): void;
    /**
     * Disables the "double click to zoom" interaction.
     *
     * @example
     * ```ts
     * map.doubleClickZoom.disable();
     * ```
     */
    disable(): void;
    /**
     * Returns a Boolean indicating whether the "double click to zoom" interaction is enabled.
     *
     * @returns `true` if the "double click to zoom" interaction is enabled.
     */
    isEnabled(): boolean;
    /**
     * Returns a Boolean indicating whether the "double click to zoom" interaction is active, i.e. currently being used.
     *
     * @returns `true` if the "double click to zoom" interaction is active.
     */
    isActive(): boolean;
}
