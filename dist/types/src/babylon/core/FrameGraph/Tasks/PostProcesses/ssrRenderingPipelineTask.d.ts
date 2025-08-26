import type { FrameGraph, FrameGraphTextureHandle, Camera } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { ThinSSRRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/thinSSRRenderingPipeline";
/**
 * Task which applies a SSR post process.
 */
export declare class FrameGraphSSRRenderingPipelineTask extends FrameGraphTask {
    /**
     * The source texture to apply the SSR effect on.
     */
    sourceTexture: FrameGraphTextureHandle;
    /**
     * The sampling mode to use for the source texture.
     */
    sourceSamplingMode: number;
    /**
     * The normal texture used by the SSR effect.
     */
    normalTexture: FrameGraphTextureHandle;
    /**
     * The depth texture used by the SSR effect.
     */
    depthTexture: FrameGraphTextureHandle;
    /**
     * The back depth texture used by the SSR effect (optional).
     * This is used when automatic thickness computation is enabled.
     * The back depth texture is the depth texture of the scene rendered for the back side of the objects (that is, front faces are culled).
     */
    backDepthTexture?: FrameGraphTextureHandle;
    /**
     * The reflectivity texture used by the SSR effect
     */
    reflectivityTexture: FrameGraphTextureHandle;
    private _camera;
    /**
     * The camera used to render the scene.
     */
    get camera(): Camera;
    set camera(camera: Camera);
    /**
     * The target texture to render the SSR effect to.
     */
    targetTexture?: FrameGraphTextureHandle;
    /**
     * The output texture of the SSR effect.
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The SSR Rendering pipeline.
     */
    readonly ssr: ThinSSRRenderingPipeline;
    /**
     * The name of the task.
     */
    get name(): string;
    set name(name: string);
    /**
     * The texture type used by the different post processes created by SSR.
     * It's a read-only property. If you want to change it, you must recreate the task and pass the appropriate texture type to the constructor.
     */
    readonly textureType: number;
    private readonly _ssr;
    private readonly _ssrBlurX;
    private readonly _ssrBlurY;
    private readonly _ssrBlurCombiner;
    /**
     * Constructs a SSR rendering pipeline task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task belongs to.
     * @param textureType The texture type used by the different post processes created by SSR (default: Constants.TEXTURETYPE_UNSIGNED_BYTE)
     */
    constructor(name: string, frameGraph: FrameGraph, textureType?: number);
    isReady(): boolean;
    record(): void;
    dispose(): void;
}
