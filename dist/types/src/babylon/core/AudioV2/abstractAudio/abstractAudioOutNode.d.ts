import type { Nullable } from "../../types";
import type { IAudioParameterRampOptions } from "../audioParameter";
import type { AudioNodeType } from "./abstractAudioNode";
import { AbstractNamedAudioNode } from "./abstractAudioNode";
import type { AudioEngineV2 } from "./audioEngineV2";
import type { _AbstractAudioSubGraph } from "./subNodes/abstractAudioSubGraph";
import type { IVolumeAudioOptions } from "./subNodes/volumeAudioSubNode";
import type { AbstractAudioAnalyzer, IAudioAnalyzerOptions } from "./subProperties/abstractAudioAnalyzer";
/** @internal */
export interface IAbstractAudioOutNodeOptions extends IAudioAnalyzerOptions, IVolumeAudioOptions {
}
/**
 * Abstract class representing and audio output node with an analyzer and volume control.
 */
export declare abstract class AbstractAudioOutNode extends AbstractNamedAudioNode {
    private _analyzer;
    protected abstract _subGraph: _AbstractAudioSubGraph;
    protected constructor(name: string, engine: AudioEngineV2, nodeType: AudioNodeType);
    /**
     * The analyzer features of the bus.
     */
    get analyzer(): AbstractAudioAnalyzer;
    /**
     * The audio output volume.
     */
    get volume(): number;
    set volume(value: number);
    /**
     * Releases associated resources.
     */
    dispose(): void;
    /**
     * Sets the audio output volume with optional ramping.
     * If the duration is 0 then the volume is set immediately, otherwise it is ramped to the new value over the given duration using the given shape.
     * If a ramp is already in progress then the volume is not set and an error is thrown.
     * @param value The value to set the volume to.
     * @param options The options to use for ramping the volume change.
     */
    setVolume(value: number, options?: Nullable<Partial<IAudioParameterRampOptions>>): void;
}
