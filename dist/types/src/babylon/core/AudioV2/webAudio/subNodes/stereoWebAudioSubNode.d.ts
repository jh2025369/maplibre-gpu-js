import { _StereoAudioSubNode } from "../../abstractAudio/subNodes/stereoAudioSubNode";
import type { _WebAudioEngine } from "../webAudioEngine";
import type { IWebAudioInNode } from "../webAudioNode";
/** @internal */
export declare function _CreateStereoAudioSubNodeAsync(engine: _WebAudioEngine): Promise<_StereoAudioSubNode>;
/** @internal */
export declare class _StereoWebAudioSubNode extends _StereoAudioSubNode {
    private _pan;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    readonly node: StereoPannerNode;
    /** @internal */
    constructor(engine: _WebAudioEngine);
    /** @internal */
    dispose(): void;
    /** @internal */
    get pan(): number;
    /** @internal */
    set pan(value: number);
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get _outNode(): AudioNode;
    /** @internal */
    getClassName(): string;
    protected _connect(node: IWebAudioInNode): boolean;
    protected _disconnect(node: IWebAudioInNode): boolean;
}
