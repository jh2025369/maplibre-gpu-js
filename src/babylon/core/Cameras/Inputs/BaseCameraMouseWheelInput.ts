import type { Nullable } from "../../types";
import { serialize } from "../../Misc/decorators";
import type { Observer } from "../../Misc/observable";
import { Observable } from "../../Misc/observable";
import type { Camera } from "../../Cameras/camera";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { PointerInfo } from "../../Events/pointerEvents";
import { PointerEventTypes } from "../../Events/pointerEvents";
import type { IWheelEvent } from "../../Events/deviceInputEvents";
import { EventConstants } from "../../Events/deviceInputEvents";
import { Tools } from "../../Misc/tools";

/**
 * Base class for mouse wheel input..
 * See FollowCameraMouseWheelInput in src/Cameras/Inputs/freeCameraMouseWheelInput.ts
 * for example usage.
 */
export abstract class BaseCameraMouseWheelInput implements ICameraInput<Camera> {
    /**
     * Defines the camera the input is attached to.
     */
    public abstract camera: Camera;

    /**
     * How fast is the camera moves in relation to X axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    @serialize()
    public wheelPrecisionX = 3.0;

    /**
     * How fast is the camera moves in relation to Y axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    @serialize()
    public wheelPrecisionY = 3.0;

    /**
     * How fast is the camera moves in relation to Z axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    @serialize()
    public wheelPrecisionZ = 3.0;

    /**
     * Observable for when a mouse wheel move event occurs.
     */
    public onChangedObservable = new Observable<{ wheelDeltaX: number; wheelDeltaY: number; wheelDeltaZ: number }>();

    private _wheel: Nullable<(pointer: PointerInfo) => void>;
    private _observer: Nullable<Observer<PointerInfo>>;

    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls
     *   should call preventdefault().
     *   (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    public attachControl(noPreventDefault?: boolean): void {
        noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);

        this._wheel = (pointer) => {
            // sanity check - this should be a PointerWheel event.
            if (pointer.type !== PointerEventTypes.POINTERWHEEL) {
                return;
            }

            const event = <IWheelEvent>pointer.event;

            const platformScale = event.deltaMode === EventConstants.DOM_DELTA_LINE ? this._ffMultiplier : 1; // If this happens to be set to DOM_DELTA_LINE, adjust accordingly

            this._wheelDeltaX += (this.wheelPrecisionX * platformScale * event.deltaX) / this._normalize;
            this._wheelDeltaY -= (this.wheelPrecisionY * platformScale * event.deltaY) / this._normalize;
            this._wheelDeltaZ += (this.wheelPrecisionZ * platformScale * event.deltaZ) / this._normalize;

            if (event.preventDefault) {
                if (!noPreventDefault) {
                    event.preventDefault();
                }
            }
        };

        this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._wheel, PointerEventTypes.POINTERWHEEL);
    }

    /**
     * Detach the current controls from the specified dom element.
     */
    public detachControl(): void {
        if (this._observer) {
            this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer);
            this._observer = null;
            this._wheel = null;
        }
        if (this.onChangedObservable) {
            this.onChangedObservable.clear();
        }
    }

    /**
     * Called for each rendered frame.
     */
    public checkInputs(): void {
        this.onChangedObservable.notifyObservers({
            wheelDeltaX: this._wheelDeltaX,
            wheelDeltaY: this._wheelDeltaY,
            wheelDeltaZ: this._wheelDeltaZ,
        });

        // Clear deltas.
        this._wheelDeltaX = 0;
        this._wheelDeltaY = 0;
        this._wheelDeltaZ = 0;
    }

    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    public getClassName(): string {
        return "BaseCameraMouseWheelInput";
    }

    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    public getSimpleName(): string {
        return "mousewheel";
    }

    /**
     * Incremental value of multiple mouse wheel movements of the X axis.
     * Should be zero-ed when read.
     */
    protected _wheelDeltaX: number = 0;

    /**
     * Incremental value of multiple mouse wheel movements of the Y axis.
     * Should be zero-ed when read.
     */
    protected _wheelDeltaY: number = 0;

    /**
     * Incremental value of multiple mouse wheel movements of the Z axis.
     * Should be zero-ed when read.
     */
    protected _wheelDeltaZ: number = 0;

    /**
     * Firefox uses a different scheme to report scroll distances to other
     * browsers. Rather than use complicated methods to calculate the exact
     * multiple we need to apply, let's just cheat and use a constant.
     * https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
     * https://stackoverflow.com/questions/20110224/what-is-the-height-of-a-line-in-a-wheel-event-deltamode-dom-delta-line
     */
    private readonly _ffMultiplier = 12;

    /**
     * Different event attributes for wheel data fall into a few set ranges.
     * Some relevant but dated date here:
     * https://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers
     */
    private readonly _normalize = 120;
}
