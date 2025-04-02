import { DragMoveHandler, DragRotateResult, DragPitchResult } from './drag_handler';
export interface OneFingerTouchRotateHandler extends DragMoveHandler<DragRotateResult, TouchEvent> {
}
export interface OneFingerTouchPitchHandler extends DragMoveHandler<DragPitchResult, TouchEvent> {
}
export declare const generateOneFingerTouchRotationHandler: ({ enable, clickTolerance, bearingDegreesPerPixelMoved }: {
    clickTolerance: number;
    bearingDegreesPerPixelMoved?: number;
    enable?: boolean;
}) => OneFingerTouchRotateHandler;
export declare const generateOneFingerTouchPitchHandler: ({ enable, clickTolerance, pitchDegreesPerPixelMoved }: {
    clickTolerance: number;
    pitchDegreesPerPixelMoved?: number;
    enable?: boolean;
}) => OneFingerTouchPitchHandler;
