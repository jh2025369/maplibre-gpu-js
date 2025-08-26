import type { IMainAudioBusOptions } from "../abstractAudio/mainAudioBus";
import { MainAudioBus } from "../abstractAudio/mainAudioBus";
import { _WebAudioBaseSubGraph } from "./subNodes/webAudioBaseSubGraph";
import type { _WebAudioEngine } from "./webAudioEngine";
import type { IWebAudioInNode, IWebAudioSuperNode } from "./webAudioNode";
/** @internal */
export declare class _WebAudioMainBus extends MainAudioBus implements IWebAudioSuperNode {
    protected _subGraph: _WebAudioBaseSubGraph;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    constructor(name: string, engine: _WebAudioEngine);
    /** @internal */
    _initAsync(options: Partial<IMainAudioBusOptions>): Promise<void>;
    /** @internal */
    dispose(): void;
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get _outNode(): AudioNode;
    protected _connect(node: IWebAudioInNode): boolean;
    protected _disconnect(node: IWebAudioInNode): boolean;
    /** @internal */
    getClassName(): string;
    private static _SubGraph;
}
