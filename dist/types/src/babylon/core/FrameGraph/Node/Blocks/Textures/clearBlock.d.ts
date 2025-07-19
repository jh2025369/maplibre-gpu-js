import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph, NodeRenderGraphBuildState } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { Color4 } from "../../../../Maths/math.color";
import { FrameGraphClearTextureTask } from "../../../Tasks/Texture/clearTextureTask";
/**
 * Block used to clear a texture
 */
export declare class NodeRenderGraphClearBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphClearTextureTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphClearTextureTask;
    /**
     * Create a new NodeRenderGraphClearBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Gets or sets the clear color */
    get color(): Color4;
    set color(value: Color4);
    /** Gets or sets a boolean indicating whether the color part of the texture should be cleared. */
    get clearColor(): boolean;
    set clearColor(value: boolean);
    /** Gets or sets a boolean indicating whether the depth part of the texture should be cleared. */
    get clearDepth(): boolean;
    set clearDepth(value: boolean);
    /** Gets or sets a boolean indicating whether the stencil part of the texture should be cleared. */
    get clearStencil(): boolean;
    set clearStencil(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the texture input component
     */
    get texture(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the depth texture input component
     */
    get depth(): NodeRenderGraphConnectionPoint;
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
