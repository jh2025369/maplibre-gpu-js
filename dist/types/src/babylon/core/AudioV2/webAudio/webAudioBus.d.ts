import type { IAudioBusOptions } from "../abstractAudio/audioBus";
import { AudioBus } from "../abstractAudio/audioBus";
import type { _SpatialAudio } from "../abstractAudio/subProperties/spatialAudio";
import { _StereoAudio } from "../abstractAudio/subProperties/stereoAudio";
import { _WebAudioBusAndSoundSubGraph } from "./subNodes/webAudioBusAndSoundSubGraph";
import type { _WebAudioEngine } from "./webAudioEngine";
import type { IWebAudioInNode, IWebAudioSuperNode } from "./webAudioNode";
/** @internal */
export declare class _WebAudioBus extends AudioBus implements IWebAudioSuperNode {
    private _spatial;
    private readonly _spatialAutoUpdate;
    private readonly _spatialMinUpdateTime;
    private _stereo;
    protected _subGraph: _WebAudioBusAndSoundSubGraph;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    constructor(name: string, engine: _WebAudioEngine, options: Partial<IAudioBusOptions>);
    /** @internal */
    _initAsync(options: Partial<IAudioBusOptions>): Promise<void>;
    /** @internal */
    dispose(): void;
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get _outNode(): AudioNode;
    /** @internal */
    get spatial(): _SpatialAudio;
    /** @internal */
    get stereo(): _StereoAudio;
    /** @internal */
    getClassName(): string;
    protected _connect(node: IWebAudioInNode): boolean;
    protected _disconnect(node: IWebAudioInNode): boolean;
    private _initSpatialProperty;
    private static _SubGraph;
}
