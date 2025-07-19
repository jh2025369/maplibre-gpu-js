import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphBlackAndWhiteTask } from "core/FrameGraph/Tasks/PostProcesses/blackAndWhiteTask";
/**
 * Block that implements the black and white post process
 */
export declare class NodeRenderGraphBlackAndWhitePostProcessBlock extends NodeRenderGraphBlock {
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
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode(): number;
    set sourceSamplingMode(value: number);
    /** Degree of conversion to black and white (default: 1 - full b&w conversion) */
    get degree(): number;
    set degree(value: number);
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
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
