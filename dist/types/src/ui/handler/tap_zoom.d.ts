import { TapRecognizer } from './tap_recognizer';
import type Point from '@mapbox/point-geometry';
import type { Map } from '../map';
import { TransformProvider } from './transform-provider';
import { Handler } from '../handler_manager';
/**
 * A `TapZoomHandler` allows the user to zoom the map at a point by double tapping
 */
export declare class TapZoomHandler implements Handler {
    _tr: TransformProvider;
    _enabled: boolean;
    _active: boolean;
    _zoomIn: TapRecognizer;
    _zoomOut: TapRecognizer;
    constructor(map: Map);
    reset(): void;
    touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
    touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
        cameraAnimation: (map: Map) => Map;
    };
    touchcancel(): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    isActive(): boolean;
}
