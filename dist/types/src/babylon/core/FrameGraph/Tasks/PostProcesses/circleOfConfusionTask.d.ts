import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass, Camera } from "core/index";
import { FrameGraphPostProcessTask } from "./postProcessTask";
import { ThinCircleOfConfusionPostProcess } from "core/PostProcesses/thinCircleOfConfusionPostProcess";
/**
 * Task which applies a circle of confusion post process.
 */
export declare class FrameGraphCircleOfConfusionTask extends FrameGraphPostProcessTask {
    /**
     * The depth texture to use for the circle of confusion effect.
     * It must store camera space depth (Z coordinate)
     */
    depthTexture: FrameGraphTextureHandle;
    /**
     * The sampling mode to use for the depth texture.
     */
    depthSamplingMode: number;
    /**
     * The camera to use for the circle of confusion effect.
     */
    camera: Camera;
    readonly postProcess: ThinCircleOfConfusionPostProcess;
    /**
     * Constructs a new circle of confusion task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task belongs to.
     * @param thinPostProcess The thin post process to use for the task. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinCircleOfConfusionPostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
