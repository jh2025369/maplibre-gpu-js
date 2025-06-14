import type { FrameGraph, FrameGraphTextureHandle, DrawWrapper, FrameGraphRenderPass, FrameGraphRenderContext, EffectWrapper } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task which applies a post process.
 */
export declare class FrameGraphPostProcessTask extends FrameGraphTask {
    /**
     * The source texture to apply the post process on.
     */
    sourceTexture: FrameGraphTextureHandle;
    /**
     * The sampling mode to use for the source texture.
     */
    sourceSamplingMode: number;
    /**
     * The destination texture to render the post process to.
     * If not supplied, a texture with the same configuration as the source texture will be created.
     */
    destinationTexture?: FrameGraphTextureHandle;
    /**
     * The output texture of the post process.
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The post process to apply.
     */
    readonly postProcess: EffectWrapper;
    protected readonly _postProcessDrawWrapper: DrawWrapper;
    protected _outputWidth: number;
    protected _outputHeight: number;
    /**
     * Constructs a new post process task.
     * @param name Name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param postProcess The post process to apply.
     */
    constructor(name: string, frameGraph: FrameGraph, postProcess: EffectWrapper);
    isReady(): boolean;
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
    dispose(): void;
}
