import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphBloomTask } from "../../../Tasks/PostProcesses/bloomTask";
/**
 * Block that implements the bloom post process
 */
export declare class NodeRenderGraphBloomPostProcessBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphBloomTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphBloomTask;
    /**
     * Create a new NodeRenderGraphBloomPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param hdr If high dynamic range textures should be used (default: false)
     * @param bloomScale The scale of the bloom effect (default: 0.5)
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, hdr?: boolean, bloomScale?: number);
    private _createTask;
    /** The quality of the blur effect */
    get bloomScale(): number;
    set bloomScale(value: number);
    /** If high dynamic range textures should be used */
    get hdr(): boolean;
    set hdr(value: boolean);
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode(): number;
    set sourceSamplingMode(value: number);
    /** The luminance threshold to find bright areas of the image to bloom. */
    get threshold(): number;
    set threshold(value: number);
    /** The strength of the bloom. */
    get weight(): number;
    set weight(value: number);
    /** Specifies the size of the bloom blur kernel, relative to the final output size */
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
