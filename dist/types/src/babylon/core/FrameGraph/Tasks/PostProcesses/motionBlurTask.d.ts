import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass } from "core/index";
import { FrameGraphPostProcessTask } from "./postProcessTask";
import { ThinMotionBlurPostProcess } from "core/PostProcesses/thinMotionBlurPostProcess";
/**
 * Task which applies a motion blur post process.
 */
export declare class FrameGraphMotionBlurTask extends FrameGraphPostProcessTask {
    /**
     * The velocity texture to use for the motion blur effect.
     * Needed for object-based motion blur.
     */
    velocityTexture?: FrameGraphTextureHandle;
    /**
     * The (view) depth texture to use for the motion blur effect.
     * Needed for screen-based motion blur.
     */
    depthTexture?: FrameGraphTextureHandle;
    readonly postProcess: ThinMotionBlurPostProcess;
    /**
     * Constructs a new motion blur task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task belongs to.
     * @param thinPostProcess The thin post process to use for the task. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinMotionBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
