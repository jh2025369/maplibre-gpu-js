import type { FrameGraph, FrameGraphRenderPass, FrameGraphRenderContext } from "core/index";
import { FrameGraphPostProcessTask } from "./postProcessTask";
import { ThinSSRBlurPostProcess } from "core/PostProcesses/thinSSRBlurPostProcess";
/**
 * @internal
 */
export declare class FrameGraphSSRBlurTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinSSRBlurPostProcess;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinSSRBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
