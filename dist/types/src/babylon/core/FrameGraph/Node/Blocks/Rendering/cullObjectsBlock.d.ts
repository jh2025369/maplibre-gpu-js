import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphCullObjectsTask } from "../../../Tasks/Rendering/cullObjectsTask";
/**
 * Block that culls a list of objects
 */
export declare class NodeRenderGraphCullObjectsBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphCullObjectsTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphCullObjectsTask;
    /**
     * Create a new NodeRenderGraphCullObjectsBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the objects input component
     */
    get objects(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
