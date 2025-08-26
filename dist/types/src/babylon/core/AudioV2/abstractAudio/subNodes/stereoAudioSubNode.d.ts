import type { Nullable } from "../../../types";
import type { AudioEngineV2 } from "../../abstractAudio/audioEngineV2";
import { _AbstractAudioSubNode } from "../../abstractAudio/subNodes/abstractAudioSubNode";
import type { IStereoAudioOptions } from "../../abstractAudio/subProperties/abstractStereoAudio";
import { _StereoAudioDefaults } from "../../abstractAudio/subProperties/abstractStereoAudio";
import type { _AbstractAudioSubGraph } from "./abstractAudioSubGraph";
/** @internal */
export declare abstract class _StereoAudioSubNode extends _AbstractAudioSubNode {
    protected constructor(engine: AudioEngineV2);
    abstract pan: number;
    /** @internal */
    setOptions(options: Partial<IStereoAudioOptions>): void;
}
/** @internal */
export declare function _GetStereoAudioSubNode(subGraph: _AbstractAudioSubGraph): Nullable<_StereoAudioSubNode>;
/** @internal */
export declare function _SetStereoAudioProperty<K extends keyof typeof _StereoAudioDefaults>(subGraph: _AbstractAudioSubGraph, property: K, value: _StereoAudioSubNode[K]): void;
