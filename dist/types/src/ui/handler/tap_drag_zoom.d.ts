import { Handler } from '../handler_manager';
import { TapRecognizer } from './tap_recognizer';
import type Point from '@mapbox/point-geometry';
/**
 * A `TapDragZoomHandler` allows the user to zoom the map at a point by double tapping. It also allows the user pan the map by dragging.
 */
export declare class TapDragZoomHandler implements Handler {
    _enabled: boolean;
    _active: boolean;
    _swipePoint: Point;
    _swipeTouch: number;
    _tapTime: number;
    _tapPoint: Point;
    _tap: TapRecognizer;
    constructor();
    reset(): void;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
        zoomDelta: number;
    };
    touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchcancel(): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    isActive(): boolean;
}
