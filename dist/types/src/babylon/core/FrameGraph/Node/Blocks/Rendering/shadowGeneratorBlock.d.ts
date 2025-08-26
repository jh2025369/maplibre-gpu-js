import type { Scene, FrameGraph } from "core/index";
import { NodeRenderGraphBaseShadowGeneratorBlock } from "./baseShadowGeneratorBlock";
/**
 * Block that generate shadows through a shadow generator
 */
export declare class NodeRenderGraphShadowGeneratorBlock extends NodeRenderGraphBaseShadowGeneratorBlock {
    /**
     * Create a new NodeRenderGraphShadowGeneratorBlock
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
}
