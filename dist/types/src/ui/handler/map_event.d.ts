import { MapMouseEvent, MapTouchEvent, MapWheelEvent } from '../events';
import { Handler } from '../handler_manager';
import type { Map } from '../map';
import type Point from '@mapbox/point-geometry';
export declare class MapEventHandler implements Handler {
    _mousedownPos: Point;
    _clickTolerance: number;
    _map: Map;
    constructor(map: Map, options: {
        clickTolerance: number;
    });
    reset(): void;
    wheel(e: WheelEvent): {};
    mousedown(e: MouseEvent, point: Point): {};
    mouseup(e: MouseEvent): void;
    click(e: MouseEvent, point: Point): void;
    dblclick(e: MouseEvent): {};
    mouseover(e: MouseEvent): void;
    mouseout(e: MouseEvent): void;
    touchstart(e: TouchEvent): {};
    touchmove(e: TouchEvent): void;
    touchend(e: TouchEvent): void;
    touchcancel(e: TouchEvent): void;
    _firePreventable(mapEvent: MapMouseEvent | MapTouchEvent | MapWheelEvent): {};
    isEnabled(): boolean;
    isActive(): boolean;
    enable(): void;
    disable(): void;
}
export declare class BlockableMapEventHandler {
    _map: Map;
    _delayContextMenu: boolean;
    _ignoreContextMenu: boolean;
    _contextMenuEvent: MouseEvent;
    constructor(map: Map);
    reset(): void;
    mousemove(e: MouseEvent): void;
    mousedown(): void;
    mouseup(): void;
    contextmenu(e: MouseEvent): void;
    isEnabled(): boolean;
    isActive(): boolean;
    enable(): void;
    disable(): void;
}
