import type { AudioAnalyzerFFTSizeType } from "../../abstractAudio/subProperties/abstractAudioAnalyzer";
import { AbstractAudioAnalyzer } from "../../abstractAudio/subProperties/abstractAudioAnalyzer";
import type { _AbstractAudioSubGraph } from "../subNodes/abstractAudioSubGraph";
/** @internal */
export declare function _GetEmptyByteFrequencyData(): Uint8Array;
/** @internal */
export declare function _GetEmptyFloatFrequencyData(): Float32Array;
/** @internal */
export declare class _AudioAnalyzer extends AbstractAudioAnalyzer {
    private _fftSize;
    private _maxDecibels;
    private _minDecibels;
    private _smoothing;
    private _subGraph;
    /** @internal */
    constructor(subGraph: _AbstractAudioSubGraph);
    /** @internal */
    get fftSize(): AudioAnalyzerFFTSizeType;
    set fftSize(value: AudioAnalyzerFFTSizeType);
    /** @internal */
    get isEnabled(): boolean;
    /** @internal */
    get minDecibels(): number;
    set minDecibels(value: number);
    /** @internal */
    get maxDecibels(): number;
    set maxDecibels(value: number);
    /** @internal */
    get smoothing(): number;
    set smoothing(value: number);
    /** @internal */
    dispose(): void;
    /** @internal */
    enableAsync(): Promise<void>;
    /** @internal */
    getByteFrequencyData(): Uint8Array;
    /** @internal */
    getFloatFrequencyData(): Float32Array;
}
