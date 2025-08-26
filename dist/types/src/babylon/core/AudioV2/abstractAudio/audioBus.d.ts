import type { Nullable } from "../../types";
import type { IAbstractAudioBusOptions } from "./abstractAudioBus";
import { AbstractAudioBus } from "./abstractAudioBus";
import type { AudioEngineV2 } from "./audioEngineV2";
import type { MainAudioBus } from "./mainAudioBus";
import type { AbstractSpatialAudio, ISpatialAudioOptions } from "./subProperties/abstractSpatialAudio";
import type { AbstractStereoAudio, IStereoAudioOptions } from "./subProperties/abstractStereoAudio";
export type PrimaryAudioBus = MainAudioBus | AudioBus;
/**
 * Options for creating an audio bus.
 */
export interface IAudioBusOptions extends IAbstractAudioBusOptions, ISpatialAudioOptions, IStereoAudioOptions {
    /**
     * The output bus of the audio bus. Defaults to the audio engine's default main bus.
     * @see {@link AudioEngineV2.defaultMainBus}
     */
    outBus: PrimaryAudioBus;
}
/**
 * Abstract class for an audio bus that has spatial audio and stereo output capabilities.
 *
 * Instances of this class can be connected to other audio buses.
 *
 * Audio buses are created by the {@link CreateAudioBusAsync} function.
 */
export declare abstract class AudioBus extends AbstractAudioBus {
    private _outBus;
    protected constructor(name: string, engine: AudioEngineV2);
    /**
     * The output bus of the audio bus. Defaults to the audio engine's default main bus.
     */
    get outBus(): Nullable<PrimaryAudioBus>;
    set outBus(outBus: Nullable<PrimaryAudioBus>);
    /**
     * The spatial features of the audio bus.
     */
    abstract readonly spatial: AbstractSpatialAudio;
    /**
     * The stereo features of the audio bus.
     */
    abstract readonly stereo: AbstractStereoAudio;
    /**
     * Releases associated resources.
     */
    dispose(): void;
    private _onOutBusDisposed;
}
