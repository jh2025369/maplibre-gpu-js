import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../nodeRenderGraphBlock";
import { FrameGraphExecuteTask } from "../../Tasks/Misc/executeTask";
/**
 * Block used to execute a custom function in the frame graph
 */
export declare class NodeRenderGraphExecuteBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphExecuteTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphExecuteTask;
    /**
     * Creates a new NodeRenderGraphExecuteBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
}
