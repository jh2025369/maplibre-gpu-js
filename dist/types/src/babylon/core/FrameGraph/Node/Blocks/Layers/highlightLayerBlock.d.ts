import type { Scene, NodeRenderGraphBuildState, FrameGraph, NodeRenderGraphConnectionPoint } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphHighlightLayerTask } from "core/FrameGraph/Tasks/Layers/highlightLayerTask";
/**
 * Block that implements the highlight layer
 */
export declare class NodeRenderGraphHighlightLayerBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphHighlightLayerTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphHighlightLayerTask;
    /**
     * Create a new NodeRenderGraphHighlightLayerBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param layerTextureRatio multiplication factor applied to the main texture size to compute the size of the layer render target texture (default: 0.5)
     * @param layerTextureFixedSize defines the fixed size of the layer render target texture. Takes precedence over layerTextureRatio if provided (default: undefined)
     * @param blurTextureSizeRatio defines the factor to apply to the layer texture size to create the blur textures (default: 0.5)
     * @param isStroke should we display highlight as a solid stroke? (default: false)
     * @param layerTextureType defines the type of the layer texture (default: Constants.TEXTURETYPE_UNSIGNED_BYTE)
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, layerTextureRatio?: number, layerTextureFixedSize?: number, blurTextureSizeRatio?: number, isStroke?: boolean, layerTextureType?: number);
    private _createTask;
    /** Multiplication factor applied to the main texture size to compute the size of the layer render target texture */
    get layerTextureRatio(): number;
    set layerTextureRatio(value: number);
    /** Defines the fixed size of the layer render target texture. Takes precedence over layerTextureRatio if provided */
    get layerTextureFixedSize(): number;
    set layerTextureFixedSize(value: number);
    /** Defines the factor to apply to the layer texture size to create the blur textures */
    get blurTextureSizeRatio(): number;
    set blurTextureSizeRatio(value: number);
    /** Should we display highlight as a solid stroke? */
    get isStroke(): boolean;
    set isStroke(value: boolean);
    /** Defines the type of the layer texture */
    get layerTextureType(): number;
    set layerTextureType(value: number);
    /** How big is the horizontal kernel of the blur texture */
    get blurHorizontalSize(): number;
    set blurHorizontalSize(value: number);
    /** How big is the vertical kernel of the blur texture */
    get blurVerticalSize(): number;
    set blurVerticalSize(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the target texture input component
     */
    get target(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the layer input component
     */
    get layer(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the objectRenderer input component
     */
    get objectRenderer(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
