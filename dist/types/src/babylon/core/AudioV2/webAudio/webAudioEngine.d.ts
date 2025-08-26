import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import type { AbstractNamedAudioNode } from "../abstractAudio/abstractAudioNode";
import type { AbstractSoundSource, ISoundSourceOptions } from "../abstractAudio/abstractSoundSource";
import type { AudioBus, IAudioBusOptions } from "../abstractAudio/audioBus";
import type { AudioEngineV2State, IAudioEngineV2Options } from "../abstractAudio/audioEngineV2";
import { AudioEngineV2 } from "../abstractAudio/audioEngineV2";
import type { IMainAudioBusOptions, MainAudioBus } from "../abstractAudio/mainAudioBus";
import type { IStaticSoundOptions, StaticSound } from "../abstractAudio/staticSound";
import type { IStaticSoundBufferOptions, StaticSoundBuffer } from "../abstractAudio/staticSoundBuffer";
import type { IStreamingSoundOptions, StreamingSound } from "../abstractAudio/streamingSound";
import type { AbstractSpatialAudioListener } from "../abstractAudio/subProperties/abstractSpatialAudioListener";
import type { IAudioParameterRampOptions } from "../audioParameter";
import { _WebAudioMainOut } from "./webAudioMainOut";
/**
 * Options for creating a v2 audio engine that uses the WebAudio API.
 */
export interface IWebAudioEngineOptions extends IAudioEngineV2Options {
    /**
     * The audio context to be used by the engine.
     */
    audioContext: AudioContext;
    /**
     * The default UI's parent element. Defaults to the last created graphics engine's canvas if it exists; otherwise the HTML document's body.
     */
    defaultUIParentElement?: HTMLElement;
    /**
     * Set to `true` to disable the default UI. Defaults to `false`.
     */
    disableDefaultUI?: boolean;
    /**
     * Set to `true` to automatically resume the audio context when the user interacts with the page. Defaults to `true`.
     */
    resumeOnInteraction: boolean;
    /**
     * Set to `true` to automatically resume the audio context when the browser pauses audio playback. Defaults to `true`.
     */
    resumeOnPause: boolean;
    /**
     * The interval in milliseconds to try resuming audio playback when `resumeOnPause` is `true`. Defaults to `1000`.
     */
    resumeOnPauseRetryInterval: number;
}
/**
 * Creates a new v2 audio engine that uses the WebAudio API.
 * @param options - The options for creating the audio engine.
 * @returns A promise that resolves with the created audio engine.
 */
export declare function CreateAudioEngineAsync(options?: Partial<IWebAudioEngineOptions>): Promise<AudioEngineV2>;
/** @internal */
export declare class _WebAudioEngine extends AudioEngineV2 {
    private _audioContextStarted;
    private _invalidFormats;
    private _isUpdating;
    private readonly _isUsingOfflineAudioContext;
    private _listener;
    private readonly _listenerAutoUpdate;
    private readonly _listenerMinUpdateTime;
    private _mainOut;
    private _pauseCalled;
    private _resumeOnInteraction;
    private _resumeOnPause;
    private _resumeOnPauseRetryInterval;
    private _resumeOnPauseTimerId;
    private _resumePromise;
    private _silentHtmlAudio;
    private _unmuteUI;
    private _updateObservable;
    private readonly _validFormats;
    private _volume;
    /** @internal */
    readonly _audioContext: AudioContext;
    /** @internal */
    readonly isReadyPromise: Promise<void>;
    /** @internal */
    stateChangedObservable: Observable<string>;
    /** @internal */
    userGestureObservable: Observable<void>;
    /** @internal */
    constructor(options?: Partial<IWebAudioEngineOptions>);
    /** @internal */
    _initAsync(options: Partial<IWebAudioEngineOptions>): Promise<void>;
    /** @internal */
    get currentTime(): number;
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get mainOut(): _WebAudioMainOut;
    /** @internal */
    get listener(): AbstractSpatialAudioListener;
    /** @internal */
    get state(): AudioEngineV2State;
    /** @internal */
    get volume(): number;
    /** @internal */
    set volume(value: number);
    /** @internal */
    createBusAsync(name: string, options?: Partial<IAudioBusOptions>): Promise<AudioBus>;
    /** @internal */
    createMainBusAsync(name: string, options?: Partial<IMainAudioBusOptions>): Promise<MainAudioBus>;
    /** @internal */
    createMicrophoneSoundSourceAsync(name: string, options?: Partial<ISoundSourceOptions>): Promise<AbstractSoundSource>;
    /** @internal */
    createSoundAsync(name: string, source: ArrayBuffer | AudioBuffer | StaticSoundBuffer | string | string[], options?: Partial<IStaticSoundOptions>): Promise<StaticSound>;
    /** @internal */
    createSoundBufferAsync(source: ArrayBuffer | AudioBuffer | StaticSoundBuffer | string | string[], options?: Partial<IStaticSoundBufferOptions>): Promise<StaticSoundBuffer>;
    /** @internal */
    createSoundSourceAsync(name: string, source: AudioNode, options?: Partial<ISoundSourceOptions>): Promise<AbstractSoundSource>;
    /** @internal */
    createStreamingSoundAsync(name: string, source: HTMLMediaElement | string | string[], options?: Partial<IStreamingSoundOptions>): Promise<StreamingSound>;
    /** @internal */
    dispose(): void;
    /** @internal */
    flagInvalidFormat(format: string): void;
    /** @internal */
    isFormatValid(format: string): boolean;
    /** @internal */
    pauseAsync(): Promise<void>;
    /** @internal */
    resumeAsync(): Promise<void>;
    /** @internal */
    setVolume(value: number, options?: Nullable<Partial<IAudioParameterRampOptions>>): void;
    /** @internal */
    _addMainBus(mainBus: MainAudioBus): void;
    /** @internal */
    _removeMainBus(mainBus: MainAudioBus): void;
    /** @internal */
    _addNode(node: AbstractNamedAudioNode): void;
    /** @internal */
    _removeNode(node: AbstractNamedAudioNode): void;
    /** @internal */
    _addUpdateObserver(callback: () => void): void;
    _removeUpdateObserver(callback: () => void): void;
    private _initAudioContextAsync;
    private _onAudioContextStateChange;
    private _onUserGestureAsync;
    private _resolveIsReadyPromise;
    private _startUpdating;
    private _update;
}
