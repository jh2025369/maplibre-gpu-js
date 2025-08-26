import type { _AbstractAudioSubGraph } from "../../abstractAudio/subNodes/abstractAudioSubGraph";
import { _SpatialAudio } from "../../abstractAudio/subProperties/spatialAudio";
/** @internal */
export declare class _SpatialWebAudio extends _SpatialAudio {
    private _updaterComponent;
    /** @internal */
    constructor(subGraph: _AbstractAudioSubGraph, autoUpdate: boolean, minUpdateTime: number);
    /** @internal */
    get minUpdateTime(): number;
    /** @internal */
    set minUpdateTime(value: number);
    /** @internal */
    dispose(): void;
}
