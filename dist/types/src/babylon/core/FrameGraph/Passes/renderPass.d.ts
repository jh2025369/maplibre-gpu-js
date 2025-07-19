import type { Nullable, FrameGraphRenderContext, AbstractEngine, IFrameGraphPass, FrameGraphTextureHandle, FrameGraphTask, FrameGraphRenderTarget } from "core/index";
import { FrameGraphPass } from "./pass";
/**
 * Render pass used to render objects.
 */
export declare class FrameGraphRenderPass extends FrameGraphPass<FrameGraphRenderContext> {
    protected readonly _engine: AbstractEngine;
    protected _renderTarget: FrameGraphTextureHandle | FrameGraphTextureHandle[] | undefined;
    protected _renderTargetDepth: FrameGraphTextureHandle | undefined;
    protected readonly _usedTextures: FrameGraphTextureHandle[];
    protected _frameGraphRenderTarget: FrameGraphRenderTarget | undefined;
    /**
     * Checks if a pass is a render pass.
     * @param pass The pass to check.
     * @returns True if the pass is a render pass, else false.
     */
    static IsRenderPass(pass: IFrameGraphPass): pass is FrameGraphRenderPass;
    /**
     * Gets the render target(s) used by the render pass.
     */
    get renderTarget(): FrameGraphTextureHandle | FrameGraphTextureHandle[] | undefined;
    /**
     * Gets the render target depth used by the render pass.
     */
    get renderTargetDepth(): FrameGraphTextureHandle | undefined;
    /** @internal */
    constructor(name: string, parentTask: FrameGraphTask, context: FrameGraphRenderContext, engine: AbstractEngine);
    /**
     * Indicates that the pass will use the given texture.
     * Use this method to indicate that the pass will use a texture so that the frame graph can handle the texture's lifecycle.
     * You don't have to call this method for the render target / render target depth textures.
     * @param texture The texture used.
     */
    useTexture(texture: FrameGraphTextureHandle): void;
    /**
     * Sets the render target(s) to use for rendering.
     * @param renderTargetHandle The render target to use for rendering, or an array of render targets to use for multi render target rendering.
     */
    setRenderTarget(renderTargetHandle?: FrameGraphTextureHandle | FrameGraphTextureHandle[]): void;
    /**
     * Sets the render target depth to use for rendering.
     * @param renderTargetHandle The render target depth to use for rendering.
     */
    setRenderTargetDepth(renderTargetHandle?: FrameGraphTextureHandle): void;
    /** @internal */
    _execute(): void;
    /** @internal */
    _isValid(): Nullable<string>;
}
