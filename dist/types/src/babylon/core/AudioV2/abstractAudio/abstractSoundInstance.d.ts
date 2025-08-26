import { Observable } from "../../Misc/observable";
import { SoundState } from "../soundState";
import { AbstractAudioNode } from "./abstractAudioNode";
import type { AbstractSound, IAbstractSoundPlayOptions, IAbstractSoundPlayOptionsBase } from "./abstractSound";
/**
 * Options for creating a sound instance.
 * @internal
 * */
export interface IAbstractSoundInstanceOptions extends IAbstractSoundPlayOptionsBase {
}
/** @internal */
export declare abstract class _AbstractSoundInstance extends AbstractAudioNode {
    protected _sound: AbstractSound;
    protected _state: SoundState;
    /** Observable triggered when the sound instance's playback ends */
    readonly onEndedObservable: Observable<_AbstractSoundInstance>;
    /** Observable triggered if the sound instance encounters an error and can not be played */
    readonly onErrorObservable: Observable<any>;
    /** Observable triggered when the sound instance's state changes */
    readonly onStateChangedObservable: Observable<_AbstractSoundInstance>;
    protected abstract readonly _options: IAbstractSoundInstanceOptions;
    protected constructor(sound: AbstractSound);
    abstract currentTime: number;
    abstract readonly startTime: number;
    /** The playback state of the sound instance */
    get state(): SoundState;
    /** @internal */
    dispose(): void;
    abstract play(options: Partial<IAbstractSoundPlayOptions>): void;
    abstract pause(): void;
    abstract resume(): void;
    abstract stop(): void;
    protected _setState(value: SoundState): void;
}
