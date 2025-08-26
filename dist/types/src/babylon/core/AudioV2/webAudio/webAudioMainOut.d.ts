import type { Nullable } from "../../types";
import { _MainAudioOut } from "../abstractAudio/mainAudioOut";
import type { IAudioParameterRampOptions } from "../audioParameter";
import type { _WebAudioEngine } from "./webAudioEngine";
import type { IWebAudioInNode } from "./webAudioNode";
/** @internal */
export declare class _WebAudioMainOut extends _MainAudioOut implements IWebAudioInNode {
    private _destinationNode;
    private _gainNode;
    private _volume;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    constructor(engine: _WebAudioEngine);
    /** @internal */
    dispose(): void;
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get volume(): number;
    /** @internal */
    set volume(value: number);
    /** @internal */
    getClassName(): string;
    /** @internal */
    setVolume(value: number, options?: Nullable<Partial<IAudioParameterRampOptions>>): void;
}
