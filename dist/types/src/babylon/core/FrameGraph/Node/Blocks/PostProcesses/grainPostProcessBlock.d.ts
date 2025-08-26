import type { Scene, FrameGraph } from "core/index";
import { FrameGraphGrainTask } from "core/FrameGraph/Tasks/PostProcesses/grainTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the grain post process
 */
export declare class NodeRenderGraphGrainPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphGrainTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphGrainTask;
    /**
     * Create a new grain post process block
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** The intensity of the grain added */
    get intensity(): number;
    set intensity(value: number);
    /** If the grain should be randomized on every frame */
    get animated(): boolean;
    set animated(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
