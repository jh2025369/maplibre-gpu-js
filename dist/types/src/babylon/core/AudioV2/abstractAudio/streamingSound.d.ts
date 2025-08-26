import type { IAbstractSoundOptions, IAbstractSoundPlayOptions, IAbstractSoundStoredOptions } from "./abstractSound";
import { AbstractSound } from "./abstractSound";
import type { AudioEngineV2 } from "./audioEngineV2";
import type { _StreamingSoundInstance } from "./streamingSoundInstance";
/** @internal */
export interface IStreamingSoundOptionsBase {
    /**
     * The number of instances to preload. Defaults to 1.
     * */
    preloadCount: number;
}
/**
 * Options for creating a streaming sound.
 */
export interface IStreamingSoundOptions extends IAbstractSoundOptions, IStreamingSoundOptionsBase {
}
/**
 * Options for playing a streaming sound.
 */
export interface IStreamingSoundPlayOptions extends IAbstractSoundPlayOptions {
}
/**
 * Options stored in a streaming sound.
 * @internal
 */
export interface IStreamingSoundStoredOptions extends IAbstractSoundStoredOptions, IStreamingSoundOptionsBase {
}
/**
 * Abstract class representing a streaming sound.
 *
 * A streaming sound has a sound buffer that is loaded into memory in chunks as it is played. This allows it to be played
 * more quickly than a static sound, but it also means that it cannot have loop points or playback rate changes.
 *
 * Due to the way streaming sounds are typically implemented, there can be a significant delay when attempting to play
 * a streaming sound for the first time. To prevent this delay, it is recommended to preload instances of the sound
 * using the {@link IStreamingSoundStoredOptions.preloadCount} options, or the {@link preloadInstanceAsync} and
 * {@link preloadInstancesAsync} methods before calling the `play` method.
 *
 * Streaming sounds are created by the {@link CreateStreamingSoundAsync} function.
 */
export declare abstract class StreamingSound extends AbstractSound {
    private _preloadedInstances;
    protected abstract readonly _options: IStreamingSoundStoredOptions;
    protected constructor(name: string, engine: AudioEngineV2);
    /**
     * The number of instances to preload. Defaults to `1`.
     */
    get preloadCount(): number;
    /**
     * Returns the number of instances that have been preloaded.
     */
    get preloadCompletedCount(): number;
    /**
     * Preloads an instance of the sound.
     * @returns A promise that resolves when the instance is preloaded.
     */
    preloadInstanceAsync(): Promise<void>;
    /**
     * Preloads the given number of instances of the sound.
     * @param count - The number of instances to preload.
     * @returns A promise that resolves when all instances are preloaded.
     */
    preloadInstancesAsync(count: number): Promise<void>;
    /**
     * Plays the sound.
     * - Triggers `onEndedObservable` if played for the full duration and the `loop` option is not set.
     * @param options The options to use when playing the sound. Options set here override the sound's options.
     */
    play(options?: Partial<IStreamingSoundPlayOptions>): void;
    /**
     * Stops the sound.
     */
    stop(): void;
    protected abstract _createInstance(): _StreamingSoundInstance;
    private _addPreloadedInstance;
    private _removePreloadedInstance;
}
