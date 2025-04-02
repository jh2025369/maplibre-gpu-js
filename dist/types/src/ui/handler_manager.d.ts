import { Event } from '../util/evented';
import { Map, CompleteMapOptions } from './map';
import { HandlerInertia } from './handler_inertia';
import Point from '@mapbox/point-geometry';
/**
 * Handlers interpret dom events and return camera changes that should be
 * applied to the map (`HandlerResult`s). The camera changes are all deltas.
 * The handler itself should have no knowledge of the map's current state.
 * This makes it easier to merge multiple results and keeps handlers simpler.
 * For example, if there is a mousedown and mousemove, the mousePan handler
 * would return a `panDelta` on the mousemove.
 */
export interface Handler {
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    /**
     * This is used to indicate if the handler is currently active or not.
     * In case a handler is active, it will block other handlers from gettting the relevant events.
     * There is an allow list of handlers that can be active at the same time, which is configured when adding a handler.
     */
    isActive(): boolean;
    /**
     * `reset` can be called by the manager at any time and must reset everything to it's original state
     */
    reset(): void;
    readonly touchstart?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
    readonly touchmove?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
    readonly touchmoveWindow?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
    readonly touchend?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
    readonly touchcancel?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
    readonly mousedown?: (e: MouseEvent, point: Point) => HandlerResult | void;
    readonly mousemove?: (e: MouseEvent, point: Point) => HandlerResult | void;
    readonly mousemoveWindow?: (e: MouseEvent, point: Point) => HandlerResult | void;
    readonly mouseup?: (e: MouseEvent, point: Point) => HandlerResult | void;
    readonly mouseupWindow?: (e: MouseEvent, point: Point) => HandlerResult | void;
    readonly dblclick?: (e: MouseEvent, point: Point) => HandlerResult | void;
    readonly contextmenu?: (e: MouseEvent) => HandlerResult | void;
    readonly wheel?: (e: WheelEvent, point: Point) => HandlerResult | void;
    readonly keydown?: (e: KeyboardEvent) => HandlerResult | void;
    readonly keyup?: (e: KeyboardEvent) => HandlerResult | void;
    /**
     * `renderFrame` is the only non-dom event. It is called during render
     * frames and can be used to smooth camera changes (see scroll handler).
     */
    readonly renderFrame?: () => HandlerResult | void;
}
/**
 * All handler methods that are called with events can optionally return a `HandlerResult`.
 */
export type HandlerResult = {
    panDelta?: Point;
    zoomDelta?: number;
    bearingDelta?: number;
    pitchDelta?: number;
    /**
     * the point to not move when changing the camera
     */
    around?: Point | null;
    /**
     * same as above, except for pinch actions, which are given higher priority
     */
    pinchAround?: Point | null;
    /**
     * A method that can fire a one-off easing by directly changing the map's camera.
     */
    cameraAnimation?: (map: Map) => any;
    /**
     * The last three properties are needed by only one handler: scrollzoom.
     * The DOM event to be used as the `originalEvent` on any camera change events.
     */
    originalEvent?: Event;
    /**
     * Makes the manager trigger a frame, allowing the handler to return multiple results over time (see scrollzoom).
     */
    needsRenderFrame?: boolean;
    /**
     * The camera changes won't get recorded for inertial zooming.
     */
    noInertia?: boolean;
};
export type EventInProgress = {
    handlerName: string;
    originalEvent: Event;
};
export type EventsInProgress = {
    zoom?: EventInProgress;
    pitch?: EventInProgress;
    rotate?: EventInProgress;
    drag?: EventInProgress;
};
export declare class HandlerManager {
    _map: Map;
    _el: HTMLElement;
    _handlers: Array<{
        handlerName: string;
        handler: Handler;
        allowed: Array<string>;
    }>;
    _eventsInProgress: EventsInProgress;
    _frameId: number;
    _inertia: HandlerInertia;
    _bearingSnap: number;
    _handlersById: {
        [x: string]: Handler;
    };
    _updatingCamera: boolean;
    _changes: Array<[HandlerResult, EventsInProgress, {
        [handlerName: string]: Event;
    }]>;
    _terrainMovement: boolean;
    _zoom: {
        handlerName: string;
    };
    _previousActiveHandlers: {
        [x: string]: Handler;
    };
    _listeners: Array<[
        Window | Document | HTMLElement,
        string,
        {
            passive?: boolean;
            capture?: boolean;
        } | undefined
    ]>;
    constructor(map: Map, options: CompleteMapOptions);
    destroy(): void;
    _addDefaultHandlers(options: CompleteMapOptions): void;
    _add(handlerName: string, handler: Handler, allowed?: Array<string>): void;
    stop(allowEndAnimation: boolean): void;
    isActive(): boolean;
    isZooming(): boolean;
    isRotating(): boolean;
    isMoving(): boolean;
    _blockedByActive(activeHandlers: {
        [x: string]: Handler;
    }, allowed: Array<string>, myName: string): boolean;
    handleWindowEvent: (e: {
        type: 'mousemove' | 'mouseup' | 'touchmove';
    }) => void;
    _getMapTouches(touches: TouchList): TouchList;
    handleEvent: (e: Event, eventName?: keyof Handler) => void;
    mergeHandlerResult(mergedHandlerResult: HandlerResult, eventsInProgress: EventsInProgress, handlerResult: HandlerResult, name: string, e?: UIEvent): void;
    _applyChanges(): void;
    _updateMapTransform(combinedResult: HandlerResult, combinedEventsInProgress: EventsInProgress, deactivatedHandlers: {
        [handlerName: string]: Event;
    }): void;
    _fireEvents(newEventsInProgress: EventsInProgress, deactivatedHandlers: {
        [handlerName: string]: Event;
    }, allowEndAnimation: boolean): void;
    _fireEvent(type: string, e?: Event): void;
    _requestFrame(): number;
    _triggerRenderFrame(): void;
}
