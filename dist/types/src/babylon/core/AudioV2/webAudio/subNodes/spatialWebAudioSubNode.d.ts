import { Quaternion, Vector3 } from "../../../Maths/math.vector";
import { _SpatialAudioSubNode } from "../../abstractAudio/subNodes/spatialAudioSubNode";
import type { _WebAudioEngine } from "../webAudioEngine";
import type { IWebAudioInNode } from "../webAudioNode";
/** @internal */
export declare function _CreateSpatialAudioSubNodeAsync(engine: _WebAudioEngine): Promise<_SpatialAudioSubNode>;
/** @internal */
export declare class _SpatialWebAudioSubNode extends _SpatialAudioSubNode {
    private _lastPosition;
    private _lastRotation;
    private _lastRotationQuaternion;
    private _orientationX;
    private _orientationY;
    private _orientationZ;
    private _positionX;
    private _positionY;
    private _positionZ;
    /** @internal */
    readonly engine: _WebAudioEngine;
    /** @internal */
    readonly position: Vector3;
    /** @internal */
    readonly rotation: Vector3;
    /** @internal */
    readonly rotationQuaternion: Quaternion;
    /** @internal */
    readonly node: PannerNode;
    /** @internal */
    constructor(engine: _WebAudioEngine);
    /** @internal */
    dispose(): void;
    /** @internal */
    get coneInnerAngle(): number;
    set coneInnerAngle(value: number);
    /** @internal */
    get coneOuterAngle(): number;
    set coneOuterAngle(value: number);
    /** @internal */
    get coneOuterVolume(): number;
    set coneOuterVolume(value: number);
    /** @internal */
    get distanceModel(): "linear" | "inverse" | "exponential";
    set distanceModel(value: "linear" | "inverse" | "exponential");
    /** @internal */
    get minDistance(): number;
    set minDistance(value: number);
    /** @internal */
    get maxDistance(): number;
    set maxDistance(value: number);
    /** @internal */
    get panningModel(): "equalpower" | "HRTF";
    set panningModel(value: "equalpower" | "HRTF");
    /** @internal */
    get rolloffFactor(): number;
    set rolloffFactor(value: number);
    /** @internal */
    get _inNode(): AudioNode;
    /** @internal */
    get _outNode(): AudioNode;
    /** @internal */
    _updatePosition(): void;
    /** @internal */
    _updateRotation(): void;
    protected _connect(node: IWebAudioInNode): boolean;
    protected _disconnect(node: IWebAudioInNode): boolean;
    /** @internal */
    getClassName(): string;
}
