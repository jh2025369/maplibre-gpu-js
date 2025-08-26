import type { Scene, FrameGraph } from "core/index";
import { FrameGraphPassCubeTask, FrameGraphPassTask } from "core/FrameGraph/Tasks/PostProcesses/passTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the pass post process
 */
export declare class NodeRenderGraphPassPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphPassTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphPassTask;
    /**
     * Create a new NodeRenderGraphPassPostProcessBlock
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
/**
 * Block that implements the pass cube post process
 */
export declare class NodeRenderGraphPassCubePostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphPassCubeTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphPassCubeTask;
    /**
     * Create a new NodeRenderGraphPassCubePostProcessBlock
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
