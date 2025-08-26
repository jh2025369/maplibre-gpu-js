import type { Scene, FrameGraph, NodeRenderGraphConnectionPoint, NodeRenderGraphBuildState } from "core/index";
import { NodeRenderGraphBaseShadowGeneratorBlock } from "./baseShadowGeneratorBlock";
import { FrameGraphCascadedShadowGeneratorTask } from "../../../Tasks/Rendering/csmShadowGeneratorTask";
/**
 * Block that generates shadows through a shadow generator
 */
export declare class NodeRenderGraphCascadedShadowGeneratorBlock extends NodeRenderGraphBaseShadowGeneratorBlock {
    protected _frameGraphTask: FrameGraphCascadedShadowGeneratorTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphCascadedShadowGeneratorTask;
    /**
     * Create a new NodeRenderGraphCascadedShadowGeneratorBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Sets the number of cascades */
    get numCascades(): number;
    set numCascades(value: number);
    /** Gets or sets a value indicating whether the shadow generator should display the cascades. */
    get debug(): boolean;
    set debug(value: boolean);
    /** Gets or sets a value indicating whether the shadow generator should stabilize the cascades. */
    get stabilizeCascades(): boolean;
    set stabilizeCascades(value: boolean);
    /** Gets or sets the lambda parameter of the shadow generator. */
    get lambda(): number;
    set lambda(value: number);
    /** Gets or sets the cascade blend percentage. */
    get cascadeBlendPercentage(): number;
    set cascadeBlendPercentage(value: number);
    /** Gets or sets a value indicating whether the shadow generator should use depth clamping. */
    get depthClamp(): boolean;
    set depthClamp(value: boolean);
    /** Gets or sets a value indicating whether the shadow generator should automatically calculate the depth bounds. */
    get autoCalcDepthBounds(): boolean;
    set autoCalcDepthBounds(value: boolean);
    /** Defines the refresh rate of the min/max computation used when autoCalcDepthBounds is set to true. */
    get autoCalcDepthBoundsRefreshRate(): number;
    set autoCalcDepthBoundsRefreshRate(value: number);
    /** Gets or sets the maximum shadow Z value. */
    get shadowMaxZ(): number;
    set shadowMaxZ(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry (view / normalized view) depth component
     */
    get geomDepth(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
