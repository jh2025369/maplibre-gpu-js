import type Point from '@mapbox/point-geometry';
import type { Map } from '../map';
import { TransformProvider } from './transform-provider';
import { Handler } from '../handler_manager';
/**
 * The `ClickZoomHandler` allows the user to zoom the map at a point by double clicking
 * It is used by other handlers
 */
export declare class ClickZoomHandler implements Handler {
    _tr: TransformProvider;
    _enabled: boolean;
    _active: boolean;
    /** @internal */
    constructor(map: Map);
    reset(): void;
    dblclick(e: MouseEvent, point: Point): {
        cameraAnimation: (map: Map) => void;
    };
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    isActive(): boolean;
}
