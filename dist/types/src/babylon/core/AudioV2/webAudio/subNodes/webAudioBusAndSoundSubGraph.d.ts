import type { Nullable } from "../../../types";
import type { AbstractAudioNode } from "../../abstractAudio/abstractAudioNode";
import type { _AbstractAudioSubNode } from "../../abstractAudio/subNodes/abstractAudioSubNode";
import type { IVolumeAudioOptions } from "../../abstractAudio/subNodes/volumeAudioSubNode";
import type { ISpatialAudioOptions } from "../../abstractAudio/subProperties/abstractSpatialAudio";
import type { IStereoAudioOptions } from "../../abstractAudio/subProperties/abstractStereoAudio";
import { _WebAudioBaseSubGraph } from "./webAudioBaseSubGraph";
/** @internal */
export interface IWebAudioBusAndSoundSubGraphOptions extends ISpatialAudioOptions, IStereoAudioOptions, IVolumeAudioOptions {
}
/** @internal */
export declare abstract class _WebAudioBusAndSoundSubGraph extends _WebAudioBaseSubGraph {
    private _rootNode;
    protected abstract readonly _upstreamNodes: Nullable<Set<AbstractAudioNode>>;
    protected _inputNode: Nullable<AudioNode>;
    /** @internal */
    initAsync(options: Partial<IWebAudioBusAndSoundSubGraphOptions>): Promise<void>;
    /** @internal */
    get _inNode(): Nullable<AudioNode>;
    protected _createSubNode(name: string): Promise<_AbstractAudioSubNode>;
    protected _onSubNodesChanged(): void;
}
