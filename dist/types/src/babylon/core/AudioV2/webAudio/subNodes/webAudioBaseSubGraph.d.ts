import type { Nullable } from "../../../types";
import type { AbstractAudioNode } from "../../abstractAudio/abstractAudioNode";
import { _AbstractAudioSubGraph } from "../../abstractAudio/subNodes/abstractAudioSubGraph";
import type { _AbstractAudioSubNode } from "../../abstractAudio/subNodes/abstractAudioSubNode";
import type { IVolumeAudioOptions } from "../../abstractAudio/subNodes/volumeAudioSubNode";
import type { IAudioAnalyzerOptions } from "../../abstractAudio/subProperties/abstractAudioAnalyzer";
import type { IWebAudioSuperNode } from "../webAudioNode";
/**
 * Options for creating a WebAudioBaseSubGraph.
 */
export interface IWebAudioBaseSubGraphOptions extends IAudioAnalyzerOptions, IVolumeAudioOptions {
}
/** @internal */
export declare abstract class _WebAudioBaseSubGraph extends _AbstractAudioSubGraph {
    protected _owner: IWebAudioSuperNode;
    protected _outputNode: Nullable<AudioNode>;
    /** @internal */
    constructor(owner: IWebAudioSuperNode);
    /** @internal */
    initAsync(options: Partial<IWebAudioBaseSubGraphOptions>): Promise<void>;
    protected abstract readonly _downstreamNodes: Nullable<Set<AbstractAudioNode>>;
    /** @internal */
    get _inNode(): Nullable<AudioNode>;
    /** @internal */
    get _outNode(): Nullable<AudioNode>;
    protected _createSubNode(name: string): Promise<_AbstractAudioSubNode>;
    protected _onSubNodesChanged(): void;
}
