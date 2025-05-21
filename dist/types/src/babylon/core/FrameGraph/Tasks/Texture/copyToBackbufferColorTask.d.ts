import type { FrameGraphTextureHandle } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task which copies a texture to the backbuffer color texture.
 */
export declare class FrameGraphCopyToBackbufferColorTask extends FrameGraphTask {
    /**
     * The source texture to copy to the backbuffer color texture.
     */
    sourceTexture: FrameGraphTextureHandle;
    record(): void;
}
