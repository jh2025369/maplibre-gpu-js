import type { Nullable } from "../../../types";
import type { IAudioParameterRampOptions } from "../../audioParameter";
import type { _WebAudioEngine } from "../webAudioEngine";
/** @internal */
export declare class _WebAudioParameterComponent {
    private _deferredRampOptions;
    private _deferredTargetValue;
    private _isObservingUpdates;
    private _rampEndTime;
    private _engine;
    private _param;
    private _targetValue;
    /** @internal */
    constructor(engine: _WebAudioEngine, param: AudioParam);
    /** @internal */
    get isRamping(): boolean;
    /** @internal */
    get targetValue(): number;
    set targetValue(value: number);
    /** @internal */
    get value(): number;
    /** @internal */
    dispose(): void;
    /**
     * Sets the target value of the audio parameter with an optional ramping duration and shape.
     *
     * If a ramp is close to finishing, it will wait for the ramp to finish before setting the new value; otherwise it
     * will throw an error because of a bug in Firefox that prevents active ramps from being cancelled with
     * `cancelScheduledValues`. See https://bugzilla.mozilla.org/show_bug.cgi?id=1752775. Other browsers do not have
     * this issue, but we throw an error in all browsers to ensure consistent behavior.
     *
     * There are other similar WebAudio APIs for ramping parameters, (e.g. `linearRampToValueAtTime` and
     * `exponentialRampToValueAtTime`) but they don't work in Firefox and Meta Quest Chrome.
     *
     * It may be better in the long run to implement our own ramping logic with a WASM audio worklet instead of using
     * `setValueCurveAtTime`. Another alternative is to use `setValueAtTime` wtih a custom shape, but that will
     * probably be a performance hit to maintain quality at audio rates.
     *
     * @internal
     */
    setTargetValue(value: number, options?: Nullable<Partial<IAudioParameterRampOptions>>): void;
    private _deferRamp;
    private _applyDeferredRamp;
    private _clearDeferredRamp;
}
