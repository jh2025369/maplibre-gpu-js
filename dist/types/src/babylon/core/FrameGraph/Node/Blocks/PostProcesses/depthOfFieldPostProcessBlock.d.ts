import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphDepthOfFieldTask } from "../../../Tasks/PostProcesses/depthOfFieldTask";
import { ThinDepthOfFieldEffectBlurLevel } from "core/PostProcesses/thinDepthOfFieldEffect";
/**
 * Block that implements the depth of field post process
 */
export declare class NodeRenderGraphDepthOfFieldPostProcessBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphDepthOfFieldTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphDepthOfFieldTask;
    /**
     * Create a new NodeRenderGraphDepthOfFieldPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param blurLevel The quality of the depth of field effect (default: ThinDepthOfFieldEffectBlurLevel.Low)
     * @param hdr If high dynamic range textures should be used (default: false)
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, blurLevel?: ThinDepthOfFieldEffectBlurLevel, hdr?: boolean);
    private _createTask;
    /** The quality of the blur effect */
    get blurLevel(): ThinDepthOfFieldEffectBlurLevel;
    set blurLevel(value: ThinDepthOfFieldEffectBlurLevel);
    /** If high dynamic range textures should be used */
    get hdr(): boolean;
    set hdr(value: boolean);
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode(): number;
    set sourceSamplingMode(value: number);
    /** Sampling mode used to sample from the depth texture */
    get depthSamplingMode(): number;
    set depthSamplingMode(value: number);
    /** The focal the length of the camera used in the effect in scene units/1000 (eg. millimeter). */
    get focalLength(): number;
    set focalLength(value: number);
    /** F-Stop of the effect's camera. The diameter of the resulting aperture can be computed by lensSize/fStop. */
    get fStop(): number;
    set fStop(value: number);
    /** Distance away from the camera to focus on in scene units/1000 (eg. millimeter). */
    get focusDistance(): number;
    set focusDistance(value: number);
    /** Max lens size in scene units/1000 (eg. millimeter). Standard cameras are 50mm. The diameter of the resulting aperture can be computed by lensSize/fStop. */
    get lensSize(): number;
    set lensSize(value: number);
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
     * Gets the geometry view depth input component
     */
    get geomViewDepth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the destination input component
     */
    get destination(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
