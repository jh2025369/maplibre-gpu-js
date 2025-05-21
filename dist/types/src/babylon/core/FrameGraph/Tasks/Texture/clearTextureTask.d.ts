import type { FrameGraph, FrameGraphTextureHandle } from "core/index";
import { Color4 } from "../../../Maths/math.color";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to clear a texture.
 */
export declare class FrameGraphClearTextureTask extends FrameGraphTask {
    /**
     * The color to clear the texture with.
     */
    color: Color4;
    /**
     * If the color should be cleared.
     */
    clearColor: boolean;
    /**
     * If the depth should be cleared.
     */
    clearDepth: boolean;
    /**
     * If the stencil should be cleared.
     */
    clearStencil: boolean;
    /**
     * The texture to clear.
     */
    destinationTexture?: FrameGraphTextureHandle;
    /**
     * The depth attachment texture to clear.
     */
    depthTexture?: FrameGraphTextureHandle;
    /**
     * The output texture (same as destinationTexture, but the handle will be different).
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The output depth texture (same as depthTexture, but the handle will be different).
     */
    readonly outputDepthTexture: FrameGraphTextureHandle;
    /**
     * Constructs a new clear task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     */
    constructor(name: string, frameGraph: FrameGraph);
    record(): void;
}
