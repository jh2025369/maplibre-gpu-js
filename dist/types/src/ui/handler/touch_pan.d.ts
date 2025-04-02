import Point from '@mapbox/point-geometry';
import { Handler } from '../handler_manager';
import type { Map } from '../map';
/**
 * A `TouchPanHandler` allows the user to pan the map using touch gestures.
 */
export declare class TouchPanHandler implements Handler {
    _enabled: boolean;
    _active: boolean;
    _touches: {
        [k in string | number]: Point;
    };
    _clickTolerance: number;
    _sum: Point;
    _map: Map;
    constructor(options: {
        clickTolerance: number;
    }, map: Map);
    reset(): void;
    minTouchs(): 1 | 2;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
        around: Point;
        panDelta: Point;
    };
    touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
        around: Point;
        panDelta: Point;
    };
    touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchcancel(): void;
    _calculateTransform(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
        around: Point;
        panDelta: Point;
    };
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    isActive(): boolean;
}
