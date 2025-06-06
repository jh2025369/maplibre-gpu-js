import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass } from "core/index";
import { ThinDepthOfFieldMergePostProcess } from "core/PostProcesses/thinDepthOfFieldMergePostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * @internal
 */
export declare class FrameGraphDepthOfFieldMergeTask extends FrameGraphPostProcessTask {
    circleOfConfusionTexture: FrameGraphTextureHandle;
    blurSteps: FrameGraphTextureHandle[];
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinDepthOfFieldMergePostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
