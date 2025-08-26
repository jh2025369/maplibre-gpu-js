import type { Scene, NodeRenderGraphBuildState, FrameGraph, NodeRenderGraphConnectionPoint } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphGlowLayerTask } from "core/FrameGraph/Tasks/Layers/glowLayerTask";
/**
 * Block that implements the glow layer
 */
export declare class NodeRenderGraphGlowLayerBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphGlowLayerTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphGlowLayerTask;
    /**
     * Create a new NodeRenderGraphGlowLayerBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param ldrMerge Forces the merge step to be done in ldr (clamp values &gt; 1). Default: false
     * @param layerTextureRatio multiplication factor applied to the main texture size to compute the size of the layer render target texture (default: 0.5)
     * @param layerTextureFixedSize defines the fixed size of the layer render target texture. Takes precedence over layerTextureRatio if provided (default: undefined)
     * @param layerTextureType defines the type of the layer texture (default: Constants.TEXTURETYPE_UNSIGNED_BYTE)
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, ldrMerge?: boolean, layerTextureRatio?: number, layerTextureFixedSize?: number, layerTextureType?: number);
    private _createTask;
    /** Forces the merge step to be done in ldr (clamp values &gt; 1). Default: false */
    get ldrMerge(): boolean;
    set ldrMerge(value: boolean);
    /** Multiplication factor applied to the main texture size to compute the size of the layer render target texture */
    get layerTextureRatio(): number;
    set layerTextureRatio(value: number);
    /** Defines the fixed size of the layer render target texture. Takes precedence over layerTextureRatio if provided */
    get layerTextureFixedSize(): number;
    set layerTextureFixedSize(value: number);
    /** Defines the type of the layer texture */
    get layerTextureType(): number;
    set layerTextureType(value: number);
    /** How big is the kernel of the blur texture */
    get blurKernelSize(): number;
    set blurKernelSize(value: number);
    /** The intensity of the glow */
    get intensity(): number;
    set intensity(value: number);
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
     * Gets the layer texture input component
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
