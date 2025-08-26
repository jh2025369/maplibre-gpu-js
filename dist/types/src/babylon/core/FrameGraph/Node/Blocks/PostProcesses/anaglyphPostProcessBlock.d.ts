import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { FrameGraphAnaglyphTask } from "core/FrameGraph/Tasks/PostProcesses/anaglyphTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the anaglyph post process
 */
export declare class NodeRenderGraphAnaglyphPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphAnaglyphTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphAnaglyphTask;
    /**
     * Create a new NodeRenderAnaglyphPostProcessBlock
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
     * Gets the left texture input component
     */
    get leftTexture(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
}
