import type { Scene, FrameGraph } from "core/index";
import { FrameGraphBlackAndWhiteTask } from "core/FrameGraph/Tasks/PostProcesses/blackAndWhiteTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the black and white post process
 */
export declare class NodeRenderGraphBlackAndWhitePostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphBlackAndWhiteTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphBlackAndWhiteTask;
    /**
     * Create a new BlackAndWhitePostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Degree of conversion to black and white (default: 1 - full b&w conversion) */
    get degree(): number;
    set degree(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
