import type { Nullable } from "../../types";
import type { AbstractAudioNode } from "../abstractAudio/abstractAudioNode";
import type { IStaticSoundCloneOptions, IStaticSoundOptions, IStaticSoundPlayOptions, IStaticSoundStopOptions, IStaticSoundStoredOptions } from "../abstractAudio/staticSound";
import { StaticSound } from "../abstractAudio/staticSound";
import type { IStaticSoundBufferCloneOptions, IStaticSoundBufferOptions } from "../abstractAudio/staticSoundBuffer";
import { StaticSoundBuffer } from "../abstractAudio/staticSoundBuffer";
import type { IStaticSoundInstanceOptions } from "../abstractAudio/staticSoundInstance";
import { _StaticSoundInstance } from "../abstractAudio/staticSoundInstance";
import type { _SpatialAudio } from "../abstractAudio/subProperties/spatialAudio";
import { _StereoAudio } from "../abstractAudio/subProperties/stereoAudio";
import { _WebAudioBusAndSoundSubGraph } from "./subNodes/webAudioBusAndSoundSubGraph";
import type { _WebAudioEngine } from "./webAudioEngine";
import type { IWebAudioInNode, IWebAudioOutNode, IWebAudioSuperNode } from "./webAudioNode";
type StaticSoundSourceType = ArrayBuffer | AudioBuffer | StaticSoundBuffer | string | string[];
/** @internal */
export declare class _WebAudioStaticSound extends StaticSound implements IWebAudioSuperNode {
    private _buffer;
    private _spatial;
    private readonly _spatialAutoUpdate;
    private readonly _spatialMinUpdateTime;
    private _stereo;
    protected readonly _options: IStaticSoundStoredOptions;
    protected _subGraph: _WebAudioBusAndSoundSubGraph;
    /** @internal */
    _audioContext: AudioContext | OfflineAudioContext;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    constructor(name: string, engine: _WebAudioEngine, options: Partial<IStaticSoundOptions>);
    /** @internal */
    _initAsync(source: StaticSoundSourceType, options: Partial<IStaticSoundOptions>): Promise<void>;
    /** @internal */
    get buffer(): _WebAudioStaticSoundBuffer;
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get _outNode(): AudioNode;
    /** @internal */
    get spatial(): _SpatialAudio;
    /** @internal */
    get stereo(): _StereoAudio;
    /** @internal */
    cloneAsync(options?: Nullable<Partial<IStaticSoundCloneOptions>>): Promise<StaticSound>;
    /** @internal */
    dispose(): void;
    /** @internal */
    getClassName(): string;
    protected _createInstance(): _WebAudioStaticSoundInstance;
    protected _connect(node: IWebAudioInNode): boolean;
    protected _disconnect(node: IWebAudioInNode): boolean;
    private _initSpatialProperty;
    private static _SubGraph;
}
/** @internal */
export declare class _WebAudioStaticSoundBuffer extends StaticSoundBuffer {
    /** @internal */
    _audioBuffer: AudioBuffer;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    constructor(engine: _WebAudioEngine);
    _initAsync(source: StaticSoundSourceType, options: Partial<IStaticSoundBufferOptions>): Promise<void>;
    /** @internal */
    get channelCount(): number;
    /** @internal */
    get duration(): number;
    /** @internal */
    get length(): number;
    /** @internal */
    get sampleRate(): number;
    /** @internal */
    clone(options?: Nullable<Partial<IStaticSoundBufferCloneOptions>>): StaticSoundBuffer;
    private _initFromArrayBufferAsync;
    private _initFromUrlAsync;
    private _initFromUrlsAsync;
}
/** @internal */
declare class _WebAudioStaticSoundInstance extends _StaticSoundInstance implements IWebAudioOutNode {
    private _enginePlayTime;
    private _enginePauseTime;
    private _isConnected;
    private _pitch;
    private _playbackRate;
    private _sourceNode;
    private _volumeNode;
    protected readonly _options: IStaticSoundInstanceOptions;
    protected _sound: _WebAudioStaticSound;
    /** @internal */
    readonly engine: _WebAudioEngine;
    constructor(sound: _WebAudioStaticSound, options: IStaticSoundInstanceOptions);
    /** @internal */
    dispose(): void;
    /** @internal */
    get currentTime(): number;
    set currentTime(value: number);
    get _outNode(): Nullable<AudioNode>;
    /** @internal */
    set pitch(value: number);
    /** @internal */
    set playbackRate(value: number);
    /** @internal */
    get startTime(): number;
    /** @internal */
    getClassName(): string;
    /** @internal */
    play(options?: Partial<IStaticSoundPlayOptions>): void;
    /** @internal */
    pause(): void;
    /** @internal */
    resume(): void;
    /** @internal */
    stop(options?: Partial<IStaticSoundStopOptions>): void;
    protected _connect(node: AbstractAudioNode): boolean;
    protected _disconnect(node: AbstractAudioNode): boolean;
    protected _onEnded: () => void;
    private _deinitSourceNode;
    private _initSourceNode;
    private _onEngineStateChanged;
}
export {};
