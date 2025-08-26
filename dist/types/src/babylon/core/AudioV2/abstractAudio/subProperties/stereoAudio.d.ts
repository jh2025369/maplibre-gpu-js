import { AbstractStereoAudio } from "../../abstractAudio/subProperties/abstractStereoAudio";
import type { _AbstractAudioSubGraph } from "../subNodes/abstractAudioSubGraph";
/** @internal */
export declare class _StereoAudio extends AbstractStereoAudio {
    private _pan;
    private _subGraph;
    /** @internal */
    constructor(subGraph: _AbstractAudioSubGraph);
    /** @internal */
    get pan(): number;
    set pan(value: number);
}
