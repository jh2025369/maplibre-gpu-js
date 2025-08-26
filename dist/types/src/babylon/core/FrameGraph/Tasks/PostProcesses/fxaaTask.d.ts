import type { FrameGraph, FrameGraphRenderContext, FrameGraphRenderPass } from "core/index";
import { ThinFXAAPostProcess } from "core/PostProcesses/thinFXAAPostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * Task which applies a FXAA post process.
 */
export declare class FrameGraphFXAATask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinFXAAPostProcess;
    /**
     * Constructs a new FXAA task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param thinPostProcess The thin post process to use for the FXAA effect. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinFXAAPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
