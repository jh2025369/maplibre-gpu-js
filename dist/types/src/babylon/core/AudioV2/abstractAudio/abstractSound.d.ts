import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import { SoundState } from "../soundState";
import type { _AbstractSoundInstance } from "./abstractSoundInstance";
import { AbstractSoundSource, type ISoundSourceOptions } from "./abstractSoundSource";
import type { AudioEngineV2 } from "./audioEngineV2";
import type { IVolumeAudioOptions } from "./subNodes/volumeAudioSubNode";
/** @internal */
export interface IAbstractSoundOptionsBase {
    /**
     * Whether the sound should start playing automatically. Defaults to `false`.
     */
    autoplay: boolean;
    /**
     * The maximum number of instances that can play at the same time. Defaults to `Infinity`.
     */
    maxInstances: number;
}
/** @internal */
export interface IAbstractSoundPlayOptionsBase {
    /**
     * Whether the sound should loop. Defaults to `false`.
     */
    loop: boolean;
    /**
     * The time within the sound buffer to start playing at, in seconds. Defaults to `0`.
     */
    startOffset: number;
}
/**
 * Options for creating a sound.
 */
export interface IAbstractSoundOptions extends IAbstractSoundOptionsBase, IAbstractSoundPlayOptions, ISoundSourceOptions {
}
/**
 * Options for playing a sound.
 */
export interface IAbstractSoundPlayOptions extends IAbstractSoundPlayOptionsBase, IVolumeAudioOptions {
}
/**
 * Options stored in a sound.
 * @internal
 */
export interface IAbstractSoundStoredOptions extends IAbstractSoundOptionsBase, IAbstractSoundPlayOptionsBase {
}
/**
 * Abstract class representing a sound in the audio engine.
 */
export declare abstract class AbstractSound extends AbstractSoundSource {
    private _newestInstance;
    private _privateInstances;
    private _state;
    protected _instances: ReadonlySet<_AbstractSoundInstance>;
    protected abstract readonly _options: IAbstractSoundStoredOptions;
    /**
     * Observable for when the sound stops playing.
     */
    readonly onEndedObservable: Observable<AbstractSound>;
    protected constructor(name: string, engine: AudioEngineV2);
    /**
     * Whether the sound should start playing automatically. Defaults to `false`.
     */
    get autoplay(): boolean;
    /**
     * The current playback time of the sound, in seconds.
     */
    get currentTime(): number;
    set currentTime(value: number);
    /**
     * Whether the sound should loop. Defaults to `false`.
     */
    get loop(): boolean;
    set loop(value: boolean);
    /**
     * The maximum number of instances that can play at the same time. Defaults to `Infinity`.
     */
    get maxInstances(): number;
    set maxInstances(value: number);
    /**
     * The time within the sound buffer to start playing at, in seconds. Defaults to `0`.
     */
    get startOffset(): number;
    set startOffset(value: number);
    /**
     * The state of the sound.
     */
    get state(): SoundState;
    /**
     * Releases associated resources.
     */
    dispose(): void;
    /**
     * Plays the sound.
     * - Triggers `onEndedObservable` if played for the full duration and the `loop` option is not set.
     * @param options The options to use when playing the sound. Options set here override the sound's options.
     */
    abstract play(options?: Partial<IAbstractSoundPlayOptions>): void;
    /**
     * Pauses the sound.
     */
    pause(): void;
    /**
     * Resumes the sound.
     */
    resume(): void;
    /**
     * Stops the sound.
     * - Triggers `onEndedObservable` if the sound is playing.
     */
    abstract stop(): void;
    protected _beforePlay(instance: _AbstractSoundInstance): void;
    protected _afterPlay(instance: _AbstractSoundInstance): void;
    protected _getNewestInstance(): Nullable<_AbstractSoundInstance>;
    protected _setState(state: SoundState): void;
    protected abstract _createInstance(): _AbstractSoundInstance;
    protected _stopExcessInstances(): void;
    private _onInstanceEnded;
}
