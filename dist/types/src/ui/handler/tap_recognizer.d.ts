import Point from '@mapbox/point-geometry';
export declare const MAX_TAP_INTERVAL = 500;
export declare const MAX_DIST = 30;
export declare class SingleTapRecognizer {
    numTouches: number;
    centroid: Point;
    startTime: number;
    aborted: boolean;
    touches: {
        [k in number | string]: Point;
    };
    constructor(options: {
        numTouches: number;
    });
    reset(): void;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): Point;
}
export declare class TapRecognizer {
    singleTap: SingleTapRecognizer;
    numTaps: number;
    lastTime: number;
    lastTap: Point;
    count: number;
    constructor(options: {
        numTaps: number;
        numTouches: number;
    });
    reset(): void;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): Point;
}
