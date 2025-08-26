import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph, NodeRenderGraphBuildState } from "core/index";
import { NodeRenderGraphBlock } from "../nodeRenderGraphBlock";
import { FrameGraphCopyToBackbufferColorTask } from "../../Tasks/Texture/copyToBackbufferColorTask";
/**
 * Block used to generate the final graph
 */
export declare class NodeRenderGraphOutputBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphCopyToBackbufferColorTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphCopyToBackbufferColorTask;
    /**
     * Create a new NodeRenderGraphOutputBlock
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
     * Gets the texture input component
     */
    get texture(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
}
