import type { Node } from "../../../node";
import type { Nullable } from "../../../types";
import { SpatialAudioAttachmentType } from "../../spatialAudioAttachmentType";
import { _SpatialAudioAttacherComponent } from "../components/spatialAudioAttacherComponent";
import type { ISpatialAudioListenerOptions } from "./abstractSpatialAudioListener";
import { AbstractSpatialAudioListener } from "./abstractSpatialAudioListener";
/** @internal */
export declare abstract class _SpatialAudioListener extends AbstractSpatialAudioListener {
    protected _attacherComponent: Nullable<_SpatialAudioAttacherComponent>;
    protected constructor();
    /** @internal */
    get isAttached(): boolean;
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
    dispose(): void;
    /** @internal */
    setOptions(options: Partial<ISpatialAudioListenerOptions>): void;
    abstract _updatePosition(): void;
    abstract _updateRotation(): void;
}
