import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph, NodeRenderGraphBuildState } from "core/index";
import { NodeRenderGraphBlock } from "../nodeRenderGraphBlock";
/**
 * Block used as a pass through
 */
export declare class NodeRenderGraphElbowBlock extends NodeRenderGraphBlock {
    /**
     * Creates a new NodeRenderGraphElbowBlock
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
     * Gets the input component
     */
    get input(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
}
