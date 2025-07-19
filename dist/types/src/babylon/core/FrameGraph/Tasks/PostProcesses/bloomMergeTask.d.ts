import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass } from "core/index";
import { ThinBloomMergePostProcess } from "core/PostProcesses/thinBloomMergePostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * @internal
 */
export declare class FrameGraphBloomMergeTask extends FrameGraphPostProcessTask {
    blurTexture: FrameGraphTextureHandle;
    readonly postProcess: ThinBloomMergePostProcess;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinBloomMergePostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
