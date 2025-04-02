import { DragMoveHandler, DragPanResult, DragRotateResult, DragPitchResult } from './drag_handler';
/**
 * `MousePanHandler` allows the user to pan the map by clicking and dragging
 */
export interface MousePanHandler extends DragMoveHandler<DragPanResult, MouseEvent> {
}
/**
 * `MouseRotateHandler` allows the user to rotate the map by clicking and dragging
 */
export interface MouseRotateHandler extends DragMoveHandler<DragRotateResult, MouseEvent> {
}
/**
 * `MousePitchHandler` allows the user to zoom the map by pitching
 */
export interface MousePitchHandler extends DragMoveHandler<DragPitchResult, MouseEvent> {
}
export declare const generateMousePanHandler: ({ enable, clickTolerance, }: {
    clickTolerance: number;
    enable?: boolean;
}) => MousePanHandler;
export declare const generateMouseRotationHandler: ({ enable, clickTolerance, bearingDegreesPerPixelMoved }: {
    clickTolerance: number;
    bearingDegreesPerPixelMoved?: number;
    enable?: boolean;
}) => MouseRotateHandler;
export declare const generateMousePitchHandler: ({ enable, clickTolerance, pitchDegreesPerPixelMoved }: {
    clickTolerance: number;
    pitchDegreesPerPixelMoved?: number;
    enable?: boolean;
}) => MousePitchHandler;
