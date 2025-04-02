import type { MousePanHandler } from '../mouse';
import type { TouchPanHandler } from './../touch_pan';
/**
 * A {@link DragPanHandler} options object
 */
export type DragPanOptions = {
    /**
     * factor used to scale the drag velocity
     * @defaultValue 0
     */
    linearity?: number;
    /**
     * easing function applled to `map.panTo` when applying the drag.
     * @param t - the easing function
     * @defaultValue bezier(0, 0, 0.3, 1)
     */
    easing?: (t: number) => number;
    /**
     * the maximum value of the drag velocity.
     * @defaultValue 1400
     */
    deceleration?: number;
    /**
     * the rate at which the speed reduces after the pan ends.
     * @defaultValue 2500
     */
    maxSpeed?: number;
};
/**
 * The `DragPanHandler` allows the user to pan the map by clicking and dragging
 * the cursor.
 *
 * @group Handlers
 */
export declare class DragPanHandler {
    _el: HTMLElement;
    _mousePan: MousePanHandler;
    _touchPan: TouchPanHandler;
    _inertiaOptions: DragPanOptions | boolean;
    /** @internal */
    constructor(el: HTMLElement, mousePan: MousePanHandler, touchPan: TouchPanHandler);
    /**
     * Enables the "drag to pan" interaction.
     *
     * @param options - Options object
     * @example
     * ```ts
     *   map.dragPan.enable();
     *   map.dragPan.enable({
     *      linearity: 0.3,
     *      easing: bezier(0, 0, 0.3, 1),
     *      maxSpeed: 1400,
     *      deceleration: 2500,
     *   });
     * ```
     */
    enable(options?: DragPanOptions | boolean): void;
    /**
     * Disables the "drag to pan" interaction.
     *
     * @example
     * ```ts
     * map.dragPan.disable();
     * ```
     */
    disable(): void;
    /**
     * Returns a Boolean indicating whether the "drag to pan" interaction is enabled.
     *
     * @returns `true` if the "drag to pan" interaction is enabled.
     */
    isEnabled(): boolean;
    /**
     * Returns a Boolean indicating whether the "drag to pan" interaction is active, i.e. currently being used.
     *
     * @returns `true` if the "drag to pan" interaction is active.
     */
    isActive(): boolean;
}
