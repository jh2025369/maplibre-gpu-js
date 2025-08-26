import type { ISoundSourceOptions } from "../abstractAudio/abstractSoundSource";
import { AbstractSoundSource } from "../abstractAudio/abstractSoundSource";
import type { _SpatialAudio } from "../abstractAudio/subProperties/spatialAudio";
import { _StereoAudio } from "../abstractAudio/subProperties/stereoAudio";
import { _WebAudioBusAndSoundSubGraph } from "./subNodes/webAudioBusAndSoundSubGraph";
import type { _WebAudioEngine } from "./webAudioEngine";
import type { IWebAudioInNode } from "./webAudioNode";
/** @internal */
export declare class _WebAudioSoundSource extends AbstractSoundSource {
    private _spatial;
    private readonly _spatialAutoUpdate;
    private readonly _spatialMinUpdateTime;
    private _stereo;
    protected _subGraph: _WebAudioBusAndSoundSubGraph;
    protected _webAudioNode: AudioNode;
    /** @internal */
    _audioContext: AudioContext | OfflineAudioContext;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    constructor(name: string, webAudioNode: AudioNode, engine: _WebAudioEngine, options: Partial<ISoundSourceOptions>);
    /** @internal */
    _initAsync(options: Partial<ISoundSourceOptions>): Promise<void>;
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get _outNode(): AudioNode;
    /** @internal */
    get spatial(): _SpatialAudio;
    /** @internal */
    get stereo(): _StereoAudio;
    /** @internal */
    dispose(): void;
    /** @internal */
    getClassName(): string;
    protected _connect(node: IWebAudioInNode): boolean;
    protected _disconnect(node: IWebAudioInNode): boolean;
    private _initSpatialProperty;
    private static _SubGraph;
}
