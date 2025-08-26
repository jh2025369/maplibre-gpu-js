import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph, FrameGraphShadowGeneratorTask } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
/**
 * @internal
 */
export declare class NodeRenderGraphBaseShadowGeneratorBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphShadowGeneratorTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphShadowGeneratorTask;
    /**
     * Create a new NodeRenderGraphBaseShadowGeneratorBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    protected _finalizeInputOutputRegistering(): void;
    /** Sets the size of the shadow texture */
    get mapSize(): number;
    set mapSize(value: number);
    /** Sets the texture type to float (by default, half float is used if supported) */
    get useFloat32TextureType(): boolean;
    set useFloat32TextureType(value: boolean);
    /** Sets the texture type to Red */
    get useRedTextureFormat(): boolean;
    set useRedTextureFormat(value: boolean);
    /** Sets the bias */
    get bias(): number;
    set bias(value: number);
    /** Sets the normal bias */
    get normalBias(): number;
    set normalBias(value: number);
    /** Sets the darkness of the shadows */
    get darkness(): number;
    set darkness(value: number);
    /** Sets the filter method */
    get filter(): number;
    set filter(value: number);
    /** Sets the filter quality (for PCF and PCSS) */
    get filteringQuality(): number;
    set filteringQuality(value: number);
    /** Gets or sets the ability to have transparent shadow */
    get transparencyShadow(): boolean;
    set transparencyShadow(value: boolean);
    /** Enables or disables shadows with varying strength based on the transparency */
    get enableSoftTransparentShadow(): boolean;
    set enableSoftTransparentShadow(value: boolean);
    /** If this is true, use the opacity texture's alpha channel for transparent shadows instead of the diffuse one */
    get useOpacityTextureForTransparentShadow(): boolean;
    set useOpacityTextureForTransparentShadow(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the light input component
     */
    get light(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the objects input component
     */
    get objects(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the shadow generator component
     */
    get generator(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output texture component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
