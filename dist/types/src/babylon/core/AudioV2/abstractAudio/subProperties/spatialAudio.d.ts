import type { Quaternion, Vector3 } from "../../../Maths/math.vector";
import type { Node } from "../../../node";
import type { Nullable } from "../../../types";
import { SpatialAudioAttachmentType } from "../../spatialAudioAttachmentType";
import type { _AbstractAudioSubGraph } from "../subNodes/abstractAudioSubGraph";
import { AbstractSpatialAudio } from "./abstractSpatialAudio";
/** @internal */
export declare abstract class _SpatialAudio extends AbstractSpatialAudio {
    private _coneInnerAngle;
    private _coneOuterAngle;
    private _coneOuterVolume;
    private _distanceModel;
    private _maxDistance;
    private _minDistance;
    private _panningModel;
    private _position;
    private _rolloffFactor;
    private _rotation;
    private _rotationQuaternion;
    private _subGraph;
    /** @internal */
    constructor(subGraph: _AbstractAudioSubGraph);
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
    get distanceModel(): DistanceModelType;
    set distanceModel(value: DistanceModelType);
    /** @internal */
    get isAttached(): boolean;
    /** @internal */
    get maxDistance(): number;
    set maxDistance(value: number);
    /** @internal */
    get minDistance(): number;
    set minDistance(value: number);
    /** @internal */
    get panningModel(): PanningModelType;
    set panningModel(value: PanningModelType);
    /** @internal */
    get position(): Vector3;
    set position(value: Vector3);
    /** @internal */
    get rolloffFactor(): number;
    set rolloffFactor(value: number);
    /** @internal */
    get rotation(): Vector3;
    set rotation(value: Vector3);
    /** @internal */
    get rotationQuaternion(): Quaternion;
    set rotationQuaternion(value: Quaternion);
    /**
     * Attaches to a scene node.
     *
     * Detaches automatically before attaching to the given scene node.
     * If `sceneNode` is `null` it is the same as calling `detach()`.
     *
     * @param sceneNode The scene node to attach to, or `null` to detach.
     * @param useBoundingBox Whether to use the bounding box of the node for positioning. Defaults to `false`.
     * @param attachmentType Whether to attach to the node's position and/or rotation. Defaults to `PositionAndRotation`.
     */
    attach(sceneNode: Nullable<Node>, useBoundingBox?: boolean, attachmentType?: SpatialAudioAttachmentType): void;
    /**
     * Detaches from the scene node if attached.
     */
    detach(): void;
    /** @internal */
    update(): void;
    private _updatePosition;
    private _updateRotation;
}
