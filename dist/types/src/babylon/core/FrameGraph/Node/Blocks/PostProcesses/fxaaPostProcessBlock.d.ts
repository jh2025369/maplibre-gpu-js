import type { Scene, FrameGraph } from "core/index";
import { FrameGraphFXAATask } from "core/FrameGraph/Tasks/PostProcesses/fxaaTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the FXAA post process
 */
export declare class NodeRenderGraphFXAAPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphFXAATask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphFXAATask;
    /**
     * Create a new FXAA post-process block
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
