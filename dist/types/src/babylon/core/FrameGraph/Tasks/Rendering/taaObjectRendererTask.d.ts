import type { FrameGraph, Scene, DrawWrapper, ObjectRendererOptions } from "core/index";
import { FrameGraphObjectRendererTask } from "./objectRendererTask";
import { ThinTAAPostProcess } from "core/PostProcesses/thinTAAPostProcess";
/**
 * Task used to render objects to a texture with Temporal Anti-Aliasing (TAA).
 */
export declare class FrameGraphTAAObjectRendererTask extends FrameGraphObjectRendererTask {
    /**
     * The TAA post process.
     */
    readonly postProcess: ThinTAAPostProcess;
    protected readonly _postProcessDrawWrapper: DrawWrapper;
    /**
     * Constructs a new TAA object renderer task.
     * @param name The name of the task
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene the frame graph is associated with.
     * @param options The options of the object renderer.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, options?: ObjectRendererOptions);
    record(): void;
}
