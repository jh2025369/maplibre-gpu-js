import { Handler } from '../handler_manager';
import type { Map } from '../map';
/**
 * The {@link CooperativeGesturesHandler} options object for the gesture settings
 */
export type GestureOptions = boolean;
/**
 * A `CooperativeGestureHandler` is a control that adds cooperative gesture info when user tries to zoom in/out.
 *
 * @group Handlers
 *
 * @example
 * ```ts
 * const map = new Map({
 *   cooperativeGestures: true
 * });
 * ```
 * @see [Example: cooperative gestures](https://maplibre.org/maplibre-gl-js-docs/example/cooperative-gestures/)
 **/
export declare class CooperativeGesturesHandler implements Handler {
    _options: GestureOptions;
    _map: Map;
    _container: HTMLElement;
    /**
     * This is the key that will allow to bypass the cooperative gesture protection
     */
    _bypassKey: 'metaKey' | 'ctrlKey';
    _enabled: boolean;
    constructor(map: Map, options: GestureOptions);
    isActive(): boolean;
    reset(): void;
    _setupUI(): void;
    _destoryUI(): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    touchmove(e: TouchEvent): void;
    wheel(e: WheelEvent): void;
    _onCooperativeGesture(showNotification: boolean): void;
}
