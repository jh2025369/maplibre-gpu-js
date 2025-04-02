import Point from '@mapbox/point-geometry';
import type { Map } from '../map';
import { Handler, HandlerResult } from '../handler_manager';
/**
 * An options object sent to the enable function of some of the handlers
 */
export type AroundCenterOptions = {
    /**
     * If "center" is passed, map will zoom around the center of map
     */
    around: 'center';
};
/**
 * The `TwoFingersTouchHandler`s allows the user to zoom, pitch and rotate the map using two fingers
 *
 */
declare abstract class TwoFingersTouchHandler implements Handler {
    _enabled?: boolean;
    _active?: boolean;
    _firstTwoTouches?: [number, number];
    _vector?: Point;
    _startVector?: Point;
    _aroundCenter?: boolean;
    /** @internal */
    constructor();
    reset(): void;
    abstract _start(points: [Point, Point]): void;
    abstract _move(points: [Point, Point], pinchAround: Point | null, e: TouchEvent): HandlerResult | void;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | void;
    touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchcancel(): void;
    /**
     * Enables the "drag to pitch" interaction.
     *
     * @example
     * ```ts
     * map.touchPitch.enable();
     * ```
     */
    enable(options?: AroundCenterOptions | boolean | null): void;
    /**
     * Disables the "drag to pitch" interaction.
     *
     * @example
     * ```ts
     * map.touchPitch.disable();
     * ```
     */
    disable(): void;
    /**
     * Returns a Boolean indicating whether the "drag to pitch" interaction is enabled.
     *
     * @returns  `true` if the "drag to pitch" interaction is enabled.
     */
    isEnabled(): boolean;
    /**
     * Returns a Boolean indicating whether the "drag to pitch" interaction is active, i.e. currently being used.
     *
     * @returns `true` if the "drag to pitch" interaction is active.
     */
    isActive(): boolean;
}
/**
 * The `TwoFingersTouchHandler`s allows the user to zoom the map two fingers
 *
 * @group Handlers
 */
export declare class TwoFingersTouchZoomHandler extends TwoFingersTouchHandler {
    _distance?: number;
    _startDistance?: number;
    reset(): void;
    _start(points: [Point, Point]): void;
    _move(points: [Point, Point], pinchAround: Point | null): HandlerResult | void;
}
/**
 * The `TwoFingersTouchHandler`s allows the user to rotate the map two fingers
 *
 * @group Handlers
 */
export declare class TwoFingersTouchRotateHandler extends TwoFingersTouchHandler {
    _minDiameter?: number;
    reset(): void;
    _start(points: [Point, Point]): void;
    _move(points: [Point, Point], pinchAround: Point | null, _e: TouchEvent): HandlerResult | void;
    _isBelowThreshold(vector: Point): boolean;
}
/**
 * The `TwoFingersTouchPitchHandler` allows the user to pitch the map by dragging up and down with two fingers.
 *
 * @group Handlers
 */
export declare class TwoFingersTouchPitchHandler extends TwoFingersTouchHandler {
    _valid?: boolean;
    _firstMove?: number;
    _lastPoints?: [Point, Point];
    _map: Map;
    _currentTouchCount: number;
    constructor(map: Map);
    reset(): void;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    _start(points: [Point, Point]): void;
    _move(points: [Point, Point], center: Point | null, e: TouchEvent): HandlerResult | void;
    gestureBeginsVertically(vectorA: Point, vectorB: Point, timeStamp: number): boolean | undefined;
}
export {};
