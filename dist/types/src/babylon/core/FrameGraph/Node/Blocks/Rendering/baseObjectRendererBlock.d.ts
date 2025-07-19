import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph, FrameGraphObjectRendererTask } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
/**
 * @internal
 */
export declare class NodeRenderGraphBaseObjectRendererBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphObjectRendererTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphObjectRendererTask;
    /**
     * Create a new NodeRenderGraphBaseObjectRendererBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Indicates if depth testing must be enabled or disabled */
    get depthTest(): boolean;
    set depthTest(value: boolean);
    /** Indicates if depth writing must be enabled or disabled */
    get depthWrite(): boolean;
    set depthWrite(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the destination texture input component
     */
    get destination(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the depth texture input component
     */
    get depth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the objects input component
     */
    get objects(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the dependencies input component
     */
    get dependencies(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output depth component
     */
    get outputDepth(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
