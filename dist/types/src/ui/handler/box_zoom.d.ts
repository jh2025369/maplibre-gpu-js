import { TransformProvider } from './transform-provider';
import type { Map } from '../map';
import type Point from '@mapbox/point-geometry';
import { Handler } from '../handler_manager';
/**
 * The `BoxZoomHandler` allows the user to zoom the map to fit within a bounding box.
 * The bounding box is defined by clicking and holding `shift` while dragging the cursor.
 *
 * @group Handlers
 */
export declare class BoxZoomHandler implements Handler {
    _map: Map;
    _tr: TransformProvider;
    _el: HTMLElement;
    _container: HTMLElement;
    _enabled: boolean;
    _active: boolean;
    _startPos: Point;
    _lastPos: Point;
    _box: HTMLElement;
    _clickTolerance: number;
    /** @internal */
    constructor(map: Map, options: {
        clickTolerance: number;
    });
    /**
     * Returns a Boolean indicating whether the "box zoom" interaction is enabled.
     *
     * @returns `true` if the "box zoom" interaction is enabled.
     */
    isEnabled(): boolean;
    /**
     * Returns a Boolean indicating whether the "box zoom" interaction is active, i.e. currently being used.
     *
     * @returns `true` if the "box zoom" interaction is active.
     */
    isActive(): boolean;
    /**
     * Enables the "box zoom" interaction.
     *
     * @example
     * ```ts
     * map.boxZoom.enable();
     * ```
     */
    enable(): void;
    /**
     * Disables the "box zoom" interaction.
     *
     * @example
     * ```ts
     * map.boxZoom.disable();
     * ```
     */
    disable(): void;
    mousedown(e: MouseEvent, point: Point): void;
    mousemoveWindow(e: MouseEvent, point: Point): void;
    mouseupWindow(e: MouseEvent, point: Point): {
        cameraAnimation: (map: any) => any;
    };
    keydown(e: KeyboardEvent): void;
    reset(): void;
    _fireEvent(type: string, e: any): Map;
}
