import type { FrameGraph, FrameGraphTextureHandle, AbstractEngine, Camera } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { ThinDepthOfFieldEffectBlurLevel } from "core/PostProcesses/thinDepthOfFieldEffect";
import { ThinDepthOfFieldEffect } from "core/PostProcesses/thinDepthOfFieldEffect";
/**
 * Task which applies a depth of field effect.
 */
export declare class FrameGraphDepthOfFieldTask extends FrameGraphTask {
    /**
     * The source texture to apply the depth of field effect on.
     */
    sourceTexture: FrameGraphTextureHandle;
    /**
     * The sampling mode to use for the source texture.
     */
    sourceSamplingMode: number;
    /**
     * The depth texture to use for the depth of field effect.
     * Should store camera space depth (Z coordinate).
     */
    depthTexture: FrameGraphTextureHandle;
    /**
     * The sampling mode to use for the depth texture.
     */
    depthSamplingMode: number;
    /**
     * The camera used to render the scene.
     */
    camera: Camera;
    /**
     * The destination texture to render the depth of field effect to.
     */
    destinationTexture?: FrameGraphTextureHandle;
    /**
     * The output texture of the depth of field effect.
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The depth of field effect.
     */
    readonly depthOfField: ThinDepthOfFieldEffect;
    /**
     * Whether the depth of field effect is applied on HDR textures.
     * When true, the depth of field effect will use a higher precision texture format (half float or float). Else, it will use unsigned byte.
     */
    readonly hdr: boolean;
    /**
     * The name of the task.
     */
    get name(): string;
    set name(name: string);
    private readonly _engine;
    private readonly _circleOfConfusion;
    private readonly _blurX;
    private readonly _blurY;
    private readonly _merge;
    private readonly _defaultPipelineTextureType;
    /**
     * Constructs a depth of field task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task belongs to.
     * @param engine The engine to use for the depth of field effect.
     * @param blurLevel The blur level of the depth of field effect (default: ThinDepthOfFieldEffectBlurLevel.Low).
     * @param hdr Whether the depth of field effect is HDR.
     */
    constructor(name: string, frameGraph: FrameGraph, engine: AbstractEngine, blurLevel?: ThinDepthOfFieldEffectBlurLevel, hdr?: boolean);
    isReady(): boolean;
    record(): void;
    dispose(): void;
}
