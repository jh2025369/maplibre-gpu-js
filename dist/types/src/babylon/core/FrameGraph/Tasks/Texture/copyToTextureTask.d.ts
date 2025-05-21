import type { FrameGraph, FrameGraphTextureHandle } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to copy a texture to another texture.
 */
export declare class FrameGraphCopyToTextureTask extends FrameGraphTask {
    /**
     * The source texture to copy from.
     */
    sourceTexture: FrameGraphTextureHandle;
    /**
     * The destination texture to copy to.
     */
    destinationTexture: FrameGraphTextureHandle;
    /**
     * The output texture (same as destinationTexture, but the handle may be different).
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * Constructs a new FrameGraphCopyToTextureTask.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     */
    constructor(name: string, frameGraph: FrameGraph);
    record(): void;
}
