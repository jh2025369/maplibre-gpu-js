import type { FrameGraph, FrameGraphRenderPass, FrameGraphRenderContext } from "core/index";
import { FrameGraphPostProcessTask } from "./postProcessTask";
import { ThinImageProcessingPostProcess } from "core/PostProcesses/thinImageProcessingPostProcess";
/**
 * Task which applies an image processing post process.
 */
export declare class FrameGraphImageProcessingTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinImageProcessingPostProcess;
    /**
     * Constructs a new image processing task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task belongs to.
     * @param thinPostProcess The thin post process to use for the task. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinImageProcessingPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
