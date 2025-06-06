import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphExtractHighlightsTask } from "core/FrameGraph/Tasks/PostProcesses/extractHighlightsTask";
/**
 * Block that implements the extract highlights post process
 */
export declare class NodeRenderGraphExtractHighlightsPostProcessBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphExtractHighlightsTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphExtractHighlightsTask;
    /**
     * Create a new ExtractHighlightsPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode(): number;
    set sourceSamplingMode(value: number);
    /** The luminance threshold, pixels below this value will be set to black. */
    get threshold(): number;
    set threshold(value: number);
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
