import { _AudioAnalyzerSubNode } from "../../abstractAudio/subNodes/audioAnalyzerSubNode";
import type { AudioAnalyzerFFTSizeType } from "../../abstractAudio/subProperties/abstractAudioAnalyzer";
import type { _WebAudioEngine } from "../webAudioEngine";
import type { IWebAudioInNode } from "../webAudioNode";
/** @internal */
export declare function _CreateAudioAnalyzerSubNodeAsync(engine: _WebAudioEngine): Promise<_AudioAnalyzerSubNode>;
/** @internal */
export declare class _WebAudioAnalyzerSubNode extends _AudioAnalyzerSubNode implements IWebAudioInNode {
    private readonly _analyzerNode;
    private _byteFrequencyData;
    private _floatFrequencyData;
    /** @internal */
    constructor(engine: _WebAudioEngine);
    /** @internal */
    get fftSize(): AudioAnalyzerFFTSizeType;
    set fftSize(value: AudioAnalyzerFFTSizeType);
    /** @internal */
    get _inNode(): AudioNode;
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
    getClassName(): string;
    /** @internal */
    getByteFrequencyData(): Uint8Array;
    /** @internal */
    getFloatFrequencyData(): Float32Array;
    private _clearArrays;
}
