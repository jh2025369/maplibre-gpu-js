import type { Scene, FrameGraph } from "core/index";
import { FrameGraphImageProcessingTask } from "core/FrameGraph/Tasks/PostProcesses/imageProcessingTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
import { Color4 } from "../../../../Maths/math.color";
/**
 * Block that implements the image processing post process
 */
export declare class NodeRenderGraphImageProcessingPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphImageProcessingTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphImageProcessingTask;
    /**
     * Create a new image processing post process block
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Contrast used in the effect */
    get contrast(): number;
    set contrast(value: number);
    /** Exposure used in the effect */
    get exposure(): number;
    set exposure(value: number);
    /** Whether the tone mapping effect is enabled. */
    get toneMappingEnabled(): boolean;
    set toneMappingEnabled(value: boolean);
    /** Type of tone mapping effect. */
    get toneMappingType(): number;
    set toneMappingType(value: number);
    /** Whether the vignette effect is enabled. */
    get vignetteEnabled(): boolean;
    set vignetteEnabled(value: boolean);
    /** Vignette weight or intensity of the vignette effect. */
    get vignetteWeight(): number;
    set vignetteWeight(value: number);
    /** Vignette stretch size. */
    get vignetteStretch(): number;
    set vignetteStretch(value: number);
    /** Camera field of view used by the Vignette effect. */
    get vignetteCameraFov(): number;
    set vignetteCameraFov(value: number);
    /** Vignette center X Offset. */
    get vignetteCenterX(): number;
    set vignetteCenterX(value: number);
    /** Vignette center Y Offset. */
    get vignetteCenterY(): number;
    set vignetteCenterY(value: number);
    /** Color of the vignette applied on the screen through the chosen blend mode (vignetteBlendMode) */
    get vignetteColor(): Color4;
    set vignetteColor(value: Color4);
    /** Vignette blend mode allowing different kind of effect. */
    get vignetteBlendMode(): number;
    set vignetteBlendMode(value: number);
    /** Whether the dithering effect is enabled. */
    get ditheringEnabled(): boolean;
    set ditheringEnabled(value: boolean);
    /** Sets whether the dithering effect is enabled. */
    get ditheringIntensity(): number;
    set ditheringIntensity(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
