import type { FrameGraph, FrameGraphRenderPass, Camera, FrameGraphTextureHandle } from "core/index";
import { FrameGraphPostProcessTask } from "./postProcessTask";
import { ThinSSRPostProcess } from "core/PostProcesses/thinSSRPostProcess";
/**
 * @internal
 */
export declare class FrameGraphSSRTask extends FrameGraphPostProcessTask {
    normalTexture: FrameGraphTextureHandle;
    depthTexture: FrameGraphTextureHandle;
    reflectivityTexture: FrameGraphTextureHandle;
    backDepthTexture?: FrameGraphTextureHandle;
    camera: Camera;
    readonly postProcess: ThinSSRPostProcess;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinSSRPostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
