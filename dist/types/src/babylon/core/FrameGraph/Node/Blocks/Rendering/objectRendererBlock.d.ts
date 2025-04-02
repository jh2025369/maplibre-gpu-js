import type { Scene, FrameGraph } from "core/index";
import { NodeRenderGraphBaseObjectRendererBlock } from "./baseObjectRendererBlock";
/**
 * Block that render objects to a render target
 */
export declare class NodeRenderGraphObjectRendererBlock extends NodeRenderGraphBaseObjectRendererBlock {
    /**
     * Create a new NodeRenderGraphObjectRendererBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param doNotChangeAspectRatio True (default) to not change the aspect ratio of the scene in the RTT
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, doNotChangeAspectRatio?: boolean);
    /** True (default) to not change the aspect ratio of the scene in the RTT */
    get doNotChangeAspectRatio(): boolean;
    set doNotChangeAspectRatio(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
}
