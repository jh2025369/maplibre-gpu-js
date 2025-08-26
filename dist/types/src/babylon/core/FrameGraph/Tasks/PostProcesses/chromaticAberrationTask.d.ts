import type { FrameGraph, FrameGraphRenderContext, FrameGraphRenderPass } from "core/index";
import { ThinChromaticAberrationPostProcess } from "core/PostProcesses/thinChromaticAberrationPostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * Task which applies a chromatic aberration post process.
 */
export declare class FrameGraphChromaticAberrationTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinChromaticAberrationPostProcess;
    /**
     * Constructs a new chromatic aberration task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param thinPostProcess The thin post process to use for the chromatic aberration effect. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinChromaticAberrationPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
