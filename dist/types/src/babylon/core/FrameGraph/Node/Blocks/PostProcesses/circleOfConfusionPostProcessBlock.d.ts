import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { FrameGraphCircleOfConfusionTask } from "core/FrameGraph/Tasks/PostProcesses/circleOfConfusionTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the circle of confusion post process
 */
export declare class NodeRenderGraphCircleOfConfusionPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphCircleOfConfusionTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphCircleOfConfusionTask;
    /**
     * Create a new NodeRenderGraphCircleOfConfusionPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Sampling mode used to sample from the depth texture */
    get depthSamplingMode(): number;
    set depthSamplingMode(value: number);
    /** Max lens size in scene units/1000 (eg. millimeter). Standard cameras are 50mm. The diameter of the resulting aperture can be computed by lensSize/fStop. */
    get lensSize(): number;
    set lensSize(value: number);
    /** F-Stop of the effect's camera. The diameter of the resulting aperture can be computed by lensSize/fStop */
    get fStop(): number;
    set fStop(value: number);
    /** Distance away from the camera to focus on in scene units/1000 (eg. millimeter) */
    get focusDistance(): number;
    set focusDistance(value: number);
    /** Focal length of the effect's camera in scene units/1000 (eg. millimeter) */
    get focalLength(): number;
    set focalLength(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry view depth input component
     */
    get geomViewDepth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
