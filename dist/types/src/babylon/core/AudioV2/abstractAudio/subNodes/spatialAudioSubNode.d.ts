import type { Quaternion, Vector3 } from "../../../Maths/math.vector";
import type { Node } from "../../../node";
import type { Nullable } from "../../../types";
import type { SpatialAudioAttachmentType } from "../../spatialAudioAttachmentType";
import type { AudioEngineV2 } from "../audioEngineV2";
import type { ISpatialAudioOptions } from "../subProperties/abstractSpatialAudio";
import { _SpatialAudioDefaults } from "../subProperties/abstractSpatialAudio";
import type { _AbstractAudioSubGraph } from "./abstractAudioSubGraph";
import { _AbstractAudioSubNode } from "./abstractAudioSubNode";
/** @internal */
export declare abstract class _SpatialAudioSubNode extends _AbstractAudioSubNode {
    private _attacherComponent;
    protected constructor(engine: AudioEngineV2);
    abstract coneInnerAngle: number;
    abstract coneOuterAngle: number;
    abstract coneOuterVolume: number;
    abstract distanceModel: DistanceModelType;
    abstract maxDistance: number;
    abstract minDistance: number;
    abstract panningModel: PanningModelType;
    abstract position: Vector3;
    abstract rolloffFactor: number;
    abstract rotation: Vector3;
    abstract rotationQuaternion: Quaternion;
    abstract _inNode: AudioNode;
    /** @internal */
    get isAttached(): boolean;
    /** @internal */
    attach(sceneNode: Nullable<Node>, useBoundingBox: boolean, attachmentType: SpatialAudioAttachmentType): void;
    /** @internal */
    detach(): void;
    /** @internal */
    dispose(): void;
    /** @internal */
    setOptions(options: Partial<ISpatialAudioOptions>): void;
    /** @internal */
    update(): void;
    abstract _updatePosition(): void;
    abstract _updateRotation(): void;
}
/** @internal */
export declare function _GetSpatialAudioSubNode(subGraph: _AbstractAudioSubGraph): Nullable<_SpatialAudioSubNode>;
/** @internal */
export declare function _SetSpatialAudioProperty<K extends keyof typeof _SpatialAudioDefaults>(subGraph: _AbstractAudioSubGraph, property: K, value: _SpatialAudioSubNode[K]): void;
