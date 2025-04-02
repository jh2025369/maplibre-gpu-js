import type Point from '@mapbox/point-geometry';
import { DragMoveStateManager } from './drag_move_state_manager';
import { Handler } from '../handler_manager';
interface DragMovementResult {
    bearingDelta?: number;
    pitchDelta?: number;
    around?: Point;
    panDelta?: Point;
}
export interface DragPanResult extends DragMovementResult {
    around: Point;
    panDelta: Point;
}
export interface DragRotateResult extends DragMovementResult {
    bearingDelta: number;
}
export interface DragPitchResult extends DragMovementResult {
    pitchDelta: number;
}
type DragMoveFunction<T extends DragMovementResult> = (lastPoint: Point, point: Point) => T;
export interface DragMoveHandler<T extends DragMovementResult, E extends Event> extends Handler {
    dragStart: (e: E, point: Point) => void;
    dragMove: (e: E, point: Point) => T | void;
    dragEnd: (e: E) => void;
    getClickTolerance: () => number;
}
export type DragMoveHandlerOptions<T, E extends Event> = {
    /**
     * If the movement is shorter than this value, consider it a click.
     */
    clickTolerance: number;
    /**
     * The move function to run on a valid movement.
     */
    move: DragMoveFunction<T>;
    /**
     * A class used to manage the state of the drag event - start, checking valid moves, end. See the class documentation for more details.
     */
    moveStateManager: DragMoveStateManager<E>;
    /**
     * A method used to assign the dragStart, dragMove, and dragEnd methods to the relevant event handlers, as well as assigning the contextmenu handler
     * @param handler - the handler
     */
    assignEvents: (handler: DragMoveHandler<T, E>) => void;
    /**
     * Should the move start on the "start" event, or should it start on the first valid move.
     */
    activateOnStart?: boolean;
    /**
     * If true, handler will be enabled during construction
     */
    enable?: boolean;
};
/**
 * A generic class to create handlers for drag events, from both mouse and touch events.
 */
export declare class DragHandler<T extends DragMovementResult, E extends Event> implements DragMoveHandler<T, E> {
    contextmenu?: Handler['contextmenu'];
    mousedown?: Handler['mousedown'];
    mousemoveWindow?: Handler['mousemoveWindow'];
    mouseup?: Handler['mouseup'];
    touchstart?: Handler['touchstart'];
    touchmoveWindow?: Handler['touchmoveWindow'];
    touchend?: Handler['touchend'];
    _clickTolerance: number;
    _moveFunction: DragMoveFunction<T>;
    _activateOnStart: boolean;
    _active: boolean;
    _enabled: boolean;
    _moved: boolean;
    _lastPoint: Point | null;
    _moveStateManager: DragMoveStateManager<E>;
    constructor(options: DragMoveHandlerOptions<T, E>);
    reset(e?: E): void;
    _move(...params: Parameters<DragMoveFunction<T>>): T;
    dragStart(e: E, point: Point): any;
    dragStart(e: E, point: Point[]): any;
    dragMove(e: E, point: Point): any;
    dragMove(e: E, point: Point[]): any;
    dragEnd(e: E): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    isActive(): boolean;
    getClickTolerance(): number;
}
export {};
