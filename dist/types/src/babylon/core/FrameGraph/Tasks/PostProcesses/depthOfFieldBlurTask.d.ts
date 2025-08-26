import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass } from "core/index";
import { FrameGraphBlurTask } from "./blurTask";
import { ThinDepthOfFieldBlurPostProcess } from "core/PostProcesses/thinDepthOfFieldBlurPostProcess";
/**
 * @internal
 */
export declare class FrameGraphDepthOfFieldBlurTask extends FrameGraphBlurTask {
    circleOfConfusionTexture: FrameGraphTextureHandle;
    circleOfConfusionSamplingMode: number;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinDepthOfFieldBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
