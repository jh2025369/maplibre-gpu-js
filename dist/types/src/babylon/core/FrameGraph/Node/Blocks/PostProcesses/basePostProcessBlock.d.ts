import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraphTextureHandle, FrameGraph, FrameGraphTask } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
interface IPostProcessLike {
    sourceSamplingMode: number;
    sourceTexture: FrameGraphTextureHandle;
    targetTexture?: FrameGraphTextureHandle;
    outputTexture: FrameGraphTextureHandle;
}
/**
 * @internal
 */
export declare class NodeRenderGraphBasePostProcessBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: IPostProcessLike & FrameGraphTask;
    /**
     * Create a new NodeRenderGraphBasePostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    protected _finalizeInputOutputRegistering(): void;
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode(): number;
    set sourceSamplingMode(value: number);
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
     * Gets the target input component
     */
    get target(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
export {};
