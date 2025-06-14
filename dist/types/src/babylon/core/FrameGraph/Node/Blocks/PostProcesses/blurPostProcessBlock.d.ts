import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphBlurTask } from "core/FrameGraph/Tasks/PostProcesses/blurTask";
import { Vector2 } from "core/Maths/math.vector";
/**
 * Block that implements the blur post process
 */
export declare class NodeRenderGraphBlurPostProcessBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphBlurTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphBlurTask;
    /**
     * Create a new NodeRenderGraphBlurPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode(): number;
    set sourceSamplingMode(value: number);
    /** The direction in which to blur the image */
    get direction(): Vector2;
    set direction(value: Vector2);
    /** Length in pixels of the blur sample region */
    get kernel(): number;
    set kernel(value: number);
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
