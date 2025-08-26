import type { Node } from "../../../node";
import type { Nullable } from "../../../types";
import { SpatialAudioAttachmentType } from "../../spatialAudioAttachmentType";
import type { _SpatialAudioSubNode } from "../subNodes/spatialAudioSubNode";
import type { _SpatialAudioListener } from "../subProperties/spatialAudioListener";
/**
 * Provides a common interface for attaching an audio listener or source to a specific entity, ensuring only one entity
 * is attached at a time.
 * @internal
 */
export declare class _SpatialAudioAttacherComponent {
    /** @internal */
    private _attachmentType;
    private readonly _position;
    private readonly _rotationQuaternion;
    private _sceneNode;
    private readonly _spatialAudioNode;
    private _useBoundingBox;
    /** @internal */
    constructor(spatialAudioNode: _SpatialAudioSubNode | _SpatialAudioListener);
    /**
     * Returns `true` if attached to a scene node; otherwise returns `false`.
     */
    get isAttached(): boolean;
    /**
     * Attaches to a scene node.
     *
     * Detaches automatically before attaching to the given scene node.
     * If `sceneNode` is `null` it is the same as calling `detach()`.
     *
     * @param sceneNode The scene node to attach to, or `null` to detach.
     * @param useBoundingBox Whether to use the scene node's bounding box for positioning. Defaults to `false`.
     * @param attachmentType Whether to attach to the scene node's position and/or rotation. Defaults to `PositionAndRotation`.
     */
    attach(sceneNode: Nullable<Node>, useBoundingBox: boolean, attachmentType: SpatialAudioAttachmentType): void;
    /**
     * Detaches from the scene node if attached.
     */
    detach(): void;
    /**
     * Releases associated resources.
     */
    dispose: () => void;
    /**
     * Updates the position and rotation of the associated audio engine object in the audio rendering graph.
     *
     * This is called automatically by default and only needs to be called manually if automatic updates are disabled.
     */
    update(): void;
}
