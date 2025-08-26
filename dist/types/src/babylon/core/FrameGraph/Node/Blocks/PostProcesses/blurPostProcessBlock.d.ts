import type { Scene, FrameGraph } from "core/index";
import { FrameGraphBlurTask } from "core/FrameGraph/Tasks/PostProcesses/blurTask";
import { Vector2 } from "core/Maths/math.vector";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the blur post process
 */
export declare class NodeRenderGraphBlurPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphBlurTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphBlurTask;
    /**
     * Create a new NodeRenderGraphBlurPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** The direction in which to blur the image */
    get direction(): Vector2;
    set direction(value: Vector2);
    /** Length in pixels of the blur sample region */
    get kernel(): number;
    set kernel(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
