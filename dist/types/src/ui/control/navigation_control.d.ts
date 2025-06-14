import Point from '@mapbox/point-geometry';
import { MousePitchHandler, MouseRotateHandler } from '../handler/mouse';
import { OneFingerTouchPitchHandler, OneFingerTouchRotateHandler } from '../handler/one_finger_touch_drag';
import type { Map } from '../map';
import type { IControl } from './control';
/**
 * The {@link NavigationControl} options object
 */
type NavigationControlOptions = {
    /**
     * If `true` the compass button is included.
     */
    showCompass?: boolean;
    /**
     * If `true` the zoom-in and zoom-out buttons are included.
     */
    showZoom?: boolean;
    /**
     * If `true` the pitch is visualized by rotating X-axis of compass.
     */
    visualizePitch?: boolean;
};
/**
 * A `NavigationControl` control contains zoom buttons and a compass.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let nav = new NavigationControl();
 * map.addControl(nav, 'top-left');
 * ```
 * @see [Display map navigation controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigation/)
 */
export declare class NavigationControl implements IControl {
    _map: Map;
    options: NavigationControlOptions;
    _container: HTMLElement;
    _zoomInButton: HTMLButtonElement;
    _zoomOutButton: HTMLButtonElement;
    _compass: HTMLButtonElement;
    _compassIcon: HTMLElement;
    _handler: MouseRotateWrapper;
    /**
     * @param options - the control's options
     */
    constructor(options?: NavigationControlOptions);
    _updateZoomButtons: () => void;
    _rotateCompassArrow: () => void;
    /** {@inheritDoc IControl.onAdd} */
    onAdd(map: Map): HTMLElement;
    /** {@inheritDoc IControl.onRemove} */
    onRemove(): void;
    _createButton(className: string, fn: (e?: any) => unknown): HTMLButtonElement;
    _setButtonTitle: (button: HTMLButtonElement, title: 'ZoomIn' | 'ZoomOut' | 'ResetBearing') => void;
}
declare class MouseRotateWrapper {
    map: Map;
    _clickTolerance: number;
    element: HTMLElement;
    mouseRotate: MouseRotateHandler;
    touchRotate: OneFingerTouchRotateHandler;
    mousePitch: MousePitchHandler;
    touchPitch: OneFingerTouchPitchHandler;
    _startPos: Point;
    _lastPos: Point;
    constructor(map: Map, element: HTMLElement, pitch?: boolean);
    startMouse(e: MouseEvent, point: Point): void;
    startTouch(e: TouchEvent, point: Point): void;
    moveMouse(e: MouseEvent, point: Point): void;
    moveTouch(e: TouchEvent, point: Point): void;
    off(): void;
    offTemp(): void;
    mousedown: (e: MouseEvent) => void;
    mousemove: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    touchstart: (e: TouchEvent) => void;
    touchmove: (e: TouchEvent) => void;
    touchend: (e: TouchEvent) => void;
    reset: () => void;
}
export {};
