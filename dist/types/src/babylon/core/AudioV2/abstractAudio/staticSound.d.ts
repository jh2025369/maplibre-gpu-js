import type { Nullable } from "../../types";
import type { IAbstractSoundOptions, IAbstractSoundPlayOptions, IAbstractSoundStoredOptions } from "./abstractSound";
import { AbstractSound } from "./abstractSound";
import type { PrimaryAudioBus } from "./audioBus";
import type { AudioEngineV2 } from "./audioEngineV2";
import type { IStaticSoundBufferOptions, StaticSoundBuffer } from "./staticSoundBuffer";
import type { _StaticSoundInstance } from "./staticSoundInstance";
/** @internal */
export interface IStaticSoundOptionsBase {
    /**
     * The amount of time to play the sound for, in seconds. Defaults to `0`.
     * - If less than or equal to `0`, the sound plays for its full duration.
     */
    duration: number;
    /**
     * The end of the loop range in seconds. Defaults to `0`.
     * - If less than or equal to `0`, the loop plays for the sound's full duration.
     * - Has no effect if {@link loop} is `false`.
     */
    loopEnd: number;
    /**
     * The start of the loop range in seconds. Defaults to `0`.
     * - If less than or equal to `0`, the loop starts at the beginning of the sound.
     * - Has no effect if {@link loop} is `false`.
     *
     */
    loopStart: number;
}
/**
 * Options stored in a static sound.
 * @internal
 */
export interface IStaticSoundStoredOptions extends IAbstractSoundStoredOptions, IStaticSoundOptionsBase {
    /**
     * The pitch of the sound, in cents. Defaults to `0`.
     * - Can be combined with {@link playbackRate}.
     */
    pitch: number;
    /**
     * The playback rate of the sound. Defaults to `1`.
     * - Can be combined with {@link pitch}.
     */
    playbackRate: number;
}
/**
 * Options for creating a static sound.
 */
export interface IStaticSoundOptions extends IAbstractSoundOptions, IStaticSoundBufferOptions, IStaticSoundStoredOptions {
}
/**
 * Options for playing a static sound.
 */
export interface IStaticSoundPlayOptions extends IAbstractSoundPlayOptions, IStaticSoundOptionsBase {
    /**
     * The time to wait before playing the sound, in seconds. Defaults to `0`.
     */
    waitTime: number;
}
/**
 * Options for stopping a static sound.
 */
export interface IStaticSoundStopOptions {
    /**
     * The time to wait before stopping the sound, in seconds. Defaults to `0`.
     */
    waitTime: number;
}
/**
 * Options for cloning a static sound.
 * - @see {@link StaticSound.clone}.
 */
export interface IStaticSoundCloneOptions {
    /**
     * Whether to clone the sound buffer when cloning the sound. Defaults to `false`.
     * - If `true`, the original sound's buffer is cloned, and the cloned sound will use its own copy.
     * - If `false`, the sound buffer is shared with the original sound.
     */
    cloneBuffer: boolean;
    /**
     * The output bus for the cloned sound. Defaults to `null`.
     * - If not set or `null`, the cloned sound uses the original sound's `outBus`.
     * @see {@link AudioEngineV2.defaultMainBus}
     */
    outBus: Nullable<PrimaryAudioBus>;
}
/**
 * Abstract class representing a static sound.
 *
 * A static sound has a sound buffer that is loaded into memory all at once. This allows it to have more capabilities
 * than a streaming sound, such as loop points and playback rate changes, but it also means that the sound must be
 * fully downloaded and decoded before it can be played, which may take a long time for sounds with long durations.
 *
 * To prevent downloading and decoding a sound multiple times, a sound's buffer can be shared with other sounds.
 * See {@link CreateSoundBufferAsync}, {@link StaticSoundBuffer} and {@link StaticSound.buffer} for more information.
 *
 * Static sounds are created by the {@link CreateSoundAsync} function.
 */
export declare abstract class StaticSound extends AbstractSound {
    protected _instances: Set<_StaticSoundInstance>;
    protected abstract readonly _options: IStaticSoundStoredOptions;
    /**
     * The sound buffer that the sound uses.
     *
     * This buffer can be shared with other static sounds.
     */
    abstract readonly buffer: StaticSoundBuffer;
    protected constructor(name: string, engine: AudioEngineV2);
    /**
     * The amount of time to play the sound for, in seconds. Defaults to `0`.
     * - If less than or equal to `0`, the sound plays for its full duration.
     */
    get duration(): number;
    set duration(value: number);
    /**
     * The start of the loop range, in seconds. Defaults to `0`.
     * - If less than or equal to `0`, the loop starts at the beginning of the sound.
     */
    get loopStart(): number;
    set loopStart(value: number);
    /**
     * The end of the loop range, in seconds. Defaults to `0`.
     * - If less than or equal to `0`, the loop plays for the sound's full duration.
     */
    get loopEnd(): number;
    set loopEnd(value: number);
    /**
     * The pitch of the sound, in cents. Defaults to `0`.
     * - Gets combined with {@link playbackRate} to determine the final pitch.
     */
    get pitch(): number;
    set pitch(value: number);
    /**
     * The playback rate of the sound. Defaults to `1`.
     * - Gets combined with {@link pitch} to determine the final playback rate.
     */
    get playbackRate(): number;
    set playbackRate(value: number);
    /**
     * Clones the sound.
     * @param options Options for cloning the sound.
     */
    abstract cloneAsync(options?: Partial<IStaticSoundCloneOptions>): Promise<StaticSound>;
    /**
     * Plays the sound.
     * - Triggers `onEndedObservable` if played for the full duration and the `loop` option is not set.
     * @param options The options to use when playing the sound. Options set here override the sound's options.
     */
    play(options?: Partial<IStaticSoundPlayOptions>): void;
    /**
     * Stops the sound.
     * - Triggers `onEndedObservable` if the sound is playing.
     * @param options - The options to use when stopping the sound.
     */
    stop(options?: Partial<IStaticSoundStopOptions>): void;
    protected abstract _createInstance(): _StaticSoundInstance;
}
