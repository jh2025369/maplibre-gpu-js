import type { FrameGraph, FrameGraphTextureHandle } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task which generates mipmaps for a texture.
 */
export declare class FrameGraphGenerateMipMapsTask extends FrameGraphTask {
    /**
     * The texture to generate mipmaps for.
     */
    destinationTexture: FrameGraphTextureHandle;
    /**
     * The output texture (same as destinationTexture, but the handle may be different).
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * Constructs a new FrameGraphGenerateMipMapsTask.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     */
    constructor(name: string, frameGraph: FrameGraph);
    record(): void;
}
