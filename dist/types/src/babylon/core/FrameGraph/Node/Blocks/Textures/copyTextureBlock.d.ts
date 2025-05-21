import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph, NodeRenderGraphBuildState } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphCopyToTextureTask } from "../../../Tasks/Texture/copyToTextureTask";
/**
 * Block used to copy a texture
 */
export declare class NodeRenderGraphCopyTextureBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphCopyToTextureTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphCopyToTextureTask;
    /**
     * Create a new NodeRenderGraphCopyTextureBlock
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
     * Gets the source input component
     */
    get source(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the destination input component
     */
    get destination(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
}
