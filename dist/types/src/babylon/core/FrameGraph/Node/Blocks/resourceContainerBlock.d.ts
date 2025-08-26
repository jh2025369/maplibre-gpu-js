import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../nodeRenderGraphBlock";
/**
 * Block used as a resource (textures, buffers) container
 */
export declare class NodeRenderGraphResourceContainerBlock extends NodeRenderGraphBlock {
    /**
     * Creates a new NodeRenderGraphResourceContainerBlock
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
     * Gets the resource0 component
     */
    get resource0(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource1 component
     */
    get resource1(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource2 component
     */
    get resource2(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource3 component
     */
    get resource3(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource4 component
     */
    get resource4(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource5 component
     */
    get resource5(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource6 component
     */
    get resource6(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the resource7 component
     */
    get resource7(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
}
