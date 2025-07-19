import type { FrameGraph } from "core/index";
import { ThinExtractHighlightsPostProcess } from "core/PostProcesses/thinExtractHighlightsPostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * Task used to extract highlights from a scene.
 */
export declare class FrameGraphExtractHighlightsTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinExtractHighlightsPostProcess;
    /**
     * Constructs a new extract highlights task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param thinPostProcess The thin post process to use for the task. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinExtractHighlightsPostProcess);
}
