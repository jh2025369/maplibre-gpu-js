import type { TwoFingersTouchZoomHandler, TwoFingersTouchRotateHandler, AroundCenterOptions } from '../two_fingers_touch';
import type { TapDragZoomHandler } from '../tap_drag_zoom';
/**
 * The `TwoFingersTouchZoomRotateHandler` allows the user to zoom and rotate the map by
 * pinching on a touchscreen.
 *
 * They can zoom with one finger by double tapping and dragging. On the second tap,
 * hold the finger down and drag up or down to zoom in or out.
 *
 * @group Handlers
 */
export declare class TwoFingersTouchZoomRotateHandler {
    _el: HTMLElement;
    _touchZoom: TwoFingersTouchZoomHandler;
    _touchRotate: TwoFingersTouchRotateHandler;
    _tapDragZoom: TapDragZoomHandler;
    _rotationDisabled: boolean;
    _enabled: boolean;
    /** @internal */
    constructor(el: HTMLElement, touchZoom: TwoFingersTouchZoomHandler, touchRotate: TwoFingersTouchRotateHandler, tapDragZoom: TapDragZoomHandler);
    /**
     * Enables the "pinch to rotate and zoom" interaction.
     *
     * @param options - Options object.
     *
     * @example
     * ```ts
     * map.touchZoomRotate.enable();
     * map.touchZoomRotate.enable({ around: 'center' });
     * ```
     */
    enable(options?: AroundCenterOptions | boolean | null): void;
    /**
     * Disables the "pinch to rotate and zoom" interaction.
     *
     * @example
     * ```ts
     * map.touchZoomRotate.disable();
     * ```
     */
    disable(): void;
    /**
     * Returns a Boolean indicating whether the "pinch to rotate and zoom" interaction is enabled.
     *
     * @returns `true` if the "pinch to rotate and zoom" interaction is enabled.
     */
    isEnabled(): boolean;
    /**
     * Returns true if the handler is enabled and has detected the start of a zoom/rotate gesture.
     *
     * @returns `true` if the handler is active, `false` otherwise
     */
    isActive(): boolean;
    /**
     * Disables the "pinch to rotate" interaction, leaving the "pinch to zoom"
     * interaction enabled.
     *
     * @example
     * ```ts
     * map.touchZoomRotate.disableRotation();
     * ```
     */
    disableRotation(): void;
    /**
     * Enables the "pinch to rotate" interaction.
     *
     * @example
     * ```ts
     * map.touchZoomRotate.enable();
     * map.touchZoomRotate.enableRotation();
     * ```
     */
    enableRotation(): void;
}
