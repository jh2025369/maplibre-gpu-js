import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { FrameGraphMotionBlurTask } from "core/FrameGraph/Tasks/PostProcesses/motionBlurTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the motion blur post process
 */
export declare class NodeRenderGraphMotionBlurPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphMotionBlurTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphMotionBlurTask;
    /**
     * Create a new NodeRenderGraphMotionBlurPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Defines how much the image is blurred by the movement. */
    get motionStrength(): number;
    set motionStrength(value: number);
    /** Gets the number of iterations that are used for motion blur quality. */
    get motionBlurSamples(): number;
    set motionBlurSamples(value: number);
    /** Gets whether or not the motion blur post-process is in object based mode. */
    get isObjectBased(): boolean;
    set isObjectBased(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry velocity input component
     */
    get geomVelocity(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry view depth input component
     */
    get geomViewDepth(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
