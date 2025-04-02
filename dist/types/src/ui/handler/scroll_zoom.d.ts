import { LngLat } from '../../geo/lng_lat';
import { TransformProvider } from './transform-provider';
import type { Map } from '../map';
import type Point from '@mapbox/point-geometry';
import type { AroundCenterOptions } from './two_fingers_touch';
import { Handler } from '../handler_manager';
/**
 * The `ScrollZoomHandler` allows the user to zoom the map by scrolling.
 *
 * @group Handlers
 */
export declare class ScrollZoomHandler implements Handler {
    _map: Map;
    _tr: TransformProvider;
    _enabled: boolean;
    _active: boolean;
    _zooming: boolean;
    _aroundCenter: boolean;
    _around: LngLat;
    _aroundPoint: Point;
    _type: 'wheel' | 'trackpad' | null;
    _lastValue: number;
    _timeout: ReturnType<typeof setTimeout>;
    _finishTimeout: ReturnType<typeof setTimeout>;
    _lastWheelEvent: any;
    _lastWheelEventTime: number;
    _startZoom: number;
    _targetZoom: number;
    _delta: number;
    _easing: ((a: number) => number);
    _prevEase: {
        start: number;
        duration: number;
        easing: (_: number) => number;
    };
    _frameId: boolean;
    _triggerRenderFrame: () => void;
    _defaultZoomRate: number;
    _wheelZoomRate: number;
    /** @internal */
    constructor(map: Map, triggerRenderFrame: () => void);
    /**
     * Set the zoom rate of a trackpad
     * @param zoomRate - 1/100 The rate used to scale trackpad movement to a zoom value.
     * @example
     * Speed up trackpad zoom
     * ```ts
     * map.scrollZoom.setZoomRate(1/25);
     * ```
     */
    setZoomRate(zoomRate: number): void;
    /**
     * Set the zoom rate of a mouse wheel
     * @param wheelZoomRate - 1/450 The rate used to scale mouse wheel movement to a zoom value.
     * @example
     * Slow down zoom of mouse wheel
     * ```ts
     * map.scrollZoom.setWheelZoomRate(1/600);
     * ```
     */
    setWheelZoomRate(wheelZoomRate: number): void;
    /**
     * Returns a Boolean indicating whether the "scroll to zoom" interaction is enabled.
     * @returns `true` if the "scroll to zoom" interaction is enabled.
     */
    isEnabled(): boolean;
    isActive(): boolean;
    isZooming(): boolean;
    /**
     * Enables the "scroll to zoom" interaction.
     *
     * @param options - Options object.
     * @example
     * ```ts
     * map.scrollZoom.enable();
     * map.scrollZoom.enable({ around: 'center' })
     * ```
     */
    enable(options?: AroundCenterOptions | boolean): void;
    /**
     * Disables the "scroll to zoom" interaction.
     *
     * @example
     * ```ts
     * map.scrollZoom.disable();
     * ```
     */
    disable(): void;
    wheel(e: WheelEvent): void;
    _onTimeout: (initialEvent: MouseEvent) => void;
    _start(e: MouseEvent): void;
    renderFrame(): {
        noInertia: boolean;
        needsRenderFrame: boolean;
        zoomDelta: number;
        around: Point;
        originalEvent: any;
    };
    _smoothOutEasing(duration: number): (t: number) => number;
    reset(): void;
}
