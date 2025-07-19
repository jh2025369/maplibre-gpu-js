import type { Scene, FrameGraph } from "core/index";
import { FrameGraphTAAObjectRendererTask } from "core/FrameGraph/Tasks/Rendering/taaObjectRendererTask";
import { NodeRenderGraphBaseObjectRendererBlock } from "./baseObjectRendererBlock";
/**
 * Block that render objects with temporal anti-aliasing to a render target
 */
export declare class NodeRenderGraphTAAObjectRendererBlock extends NodeRenderGraphBaseObjectRendererBlock {
    protected _frameGraphTask: FrameGraphTAAObjectRendererTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphTAAObjectRendererTask;
    /**
     * Create a new NodeRenderGraphTAAObjectRendererBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param doNotChangeAspectRatio True (default) to not change the aspect ratio of the scene in the RTT
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, doNotChangeAspectRatio?: boolean);
    /** True (default) to not change the aspect ratio of the scene in the RTT */
    get doNotChangeAspectRatio(): boolean;
    set doNotChangeAspectRatio(value: boolean);
    /** Number of accumulated samples */
    get samples(): number;
    set samples(value: number);
    /** The factor used to blend the history frame with current frame */
    get factor(): number;
    set factor(value: number);
    /** Indicates if depth testing must be enabled or disabled */
    get disableOnCameraMove(): boolean;
    set disableOnCameraMove(value: boolean);
    /** Indicates if TAA must be enabled or disabled */
    get disableTAA(): boolean;
    set disableTAA(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
