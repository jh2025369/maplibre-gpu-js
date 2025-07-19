import type { FrameGraph, FrameGraphRenderContext, FrameGraphRenderPass } from "core/index";
import { ThinBlurPostProcess } from "core/PostProcesses/thinBlurPostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * Task which applies a blur post process.
 */
export declare class FrameGraphBlurTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinBlurPostProcess;
    /**
     * Constructs a new blur task.
     * @param name Name of the task.
     * @param frameGraph Frame graph this task is associated with.
     * @param thinPostProcess The thin post process to use for the blur effect.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
