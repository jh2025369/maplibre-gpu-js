import type { Nullable } from "../../../types";
import type { AudioEngineV2 } from "../audioEngineV2";
import type { AudioAnalyzerFFTSizeType, IAudioAnalyzerOptions } from "../subProperties/abstractAudioAnalyzer";
import { _AudioAnalyzerDefaults } from "../subProperties/abstractAudioAnalyzer";
import type { _AbstractAudioSubGraph } from "./abstractAudioSubGraph";
import { _AbstractAudioSubNode } from "./abstractAudioSubNode";
/** @internal */
export declare abstract class _AudioAnalyzerSubNode extends _AbstractAudioSubNode {
    protected constructor(engine: AudioEngineV2);
    abstract fftSize: AudioAnalyzerFFTSizeType;
    abstract minDecibels: number;
    abstract maxDecibels: number;
    abstract smoothing: number;
    abstract getByteFrequencyData(): Uint8Array;
    abstract getFloatFrequencyData(): Float32Array;
    /** @internal */
    setOptions(options: Partial<IAudioAnalyzerOptions>): void;
}
/** @internal */
export declare function _GetAudioAnalyzerSubNode(subGraph: _AbstractAudioSubGraph): Nullable<_AudioAnalyzerSubNode>;
/** @internal */
export declare function _SetAudioAnalyzerProperty<K extends keyof typeof _AudioAnalyzerDefaults>(subGraph: _AbstractAudioSubGraph, property: K, value: _AudioAnalyzerSubNode[K]): void;
