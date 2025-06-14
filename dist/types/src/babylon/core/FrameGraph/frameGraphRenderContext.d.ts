import type { Nullable, AbstractEngine, DrawWrapper, IColor4Like, Layer, FrameGraphTextureHandle, Effect, FrameGraphTextureManager, ObjectRenderer, Scene, FrameGraphRenderTarget } from "core/index";
import { FrameGraphContext } from "./frameGraphContext";
/**
 * Frame graph context used render passes.
 * @experimental
 */
export declare class FrameGraphRenderContext extends FrameGraphContext {
    private readonly _engine;
    private readonly _textureManager;
    private readonly _scene;
    private readonly _effectRenderer;
    private _currentRenderTarget;
    private _debugMessageWhenTargetBound;
    private _debugMessageHasBeenPushed;
    private _renderTargetIsBound;
    private readonly _copyTexture;
    private static _IsObjectRenderer;
    /** @internal */
    constructor(_engine: AbstractEngine, _textureManager: FrameGraphTextureManager, _scene: Scene);
    /**
     * Checks whether a texture handle points to the backbuffer's color or depth texture
     * @param handle The handle to check
     * @returns True if the handle points to the backbuffer's color or depth texture, otherwise false
     */
    isBackbuffer(handle: FrameGraphTextureHandle): boolean;
    /**
     * Checks whether a texture handle points to the backbuffer's color texture
     * @param handle The handle to check
     * @returns True if the handle points to the backbuffer's color texture, otherwise false
     */
    isBackbufferColor(handle: FrameGraphTextureHandle): boolean;
    /**
     * Checks whether a texture handle points to the backbuffer's depth texture
     * @param handle The handle to check
     * @returns True if the handle points to the backbuffer's depth texture, otherwise false
     */
    isBackbufferDepthStencil(handle: FrameGraphTextureHandle): boolean;
    /**
     * Creates a (frame graph) render target wrapper
     * Note that renderTargets or renderTargetDepth can be undefined, but not both at the same time!
     * @param name Name of the render target wrapper
     * @param renderTargets Render target handles (textures) to use
     * @param renderTargetDepth Render target depth handle (texture) to use
     * @returns The created render target wrapper
     */
    createRenderTarget(name: string, renderTargets?: FrameGraphTextureHandle | FrameGraphTextureHandle[], renderTargetDepth?: FrameGraphTextureHandle): FrameGraphRenderTarget;
    /**
     * Clears the current render buffer or the current render target (if any is set up)
     * @param color Defines the color to use
     * @param backBuffer Defines if the back buffer must be cleared
     * @param depth Defines if the depth buffer must be cleared
     * @param stencil Defines if the stencil buffer must be cleared
     */
    clear(color: Nullable<IColor4Like>, backBuffer: boolean, depth: boolean, stencil?: boolean): void;
    /**
     * Clears the color attachments of the current render target
     * @param color Defines the color to use
     * @param attachments The attachments to clear
     */
    clearColorAttachments(color: Nullable<IColor4Like>, attachments: number[]): void;
    /**
     * Binds the attachments to the current render target
     * @param attachments The attachments to bind
     */
    bindAttachments(attachments: number[]): void;
    /**
     * Generates mipmaps for the current render target
     */
    generateMipMaps(): void;
    /**
     * Sets the texture sampling mode for a given texture handle
     * @param handle Handle of the texture to set the sampling mode for
     * @param samplingMode Sampling mode to set
     */
    setTextureSamplingMode(handle: FrameGraphTextureHandle, samplingMode: number): void;
    /**
     * Binds a texture handle to a given effect (resolves the handle to a texture and binds it to the effect)
     * @param effect The effect to bind the texture to
     * @param name The name of the texture in the effect
     * @param handle The handle of the texture to bind
     */
    bindTextureHandle(effect: Effect, name: string, handle: FrameGraphTextureHandle): void;
    /**
     * Sets the depth states for the current render target
     * @param depthTest If true, depth testing is enabled
     * @param depthWrite If true, depth writing is enabled
     */
    setDepthStates(depthTest: boolean, depthWrite: boolean): void;
    /**
     * Applies a full-screen effect to the current render target
     * @param drawWrapper The draw wrapper containing the effect to apply
     * @param customBindings The custom bindings to use when applying the effect (optional)
     * @returns True if the effect was applied, otherwise false (effect not ready)
     */
    applyFullScreenEffect(drawWrapper: DrawWrapper, customBindings?: () => void): boolean;
    /**
     * Copies a texture to the current render target
     * @param sourceTexture The source texture to copy from
     * @param forceCopyToBackbuffer If true, the copy will be done to the back buffer regardless of the current render target
     */
    copyTexture(sourceTexture: FrameGraphTextureHandle, forceCopyToBackbuffer?: boolean): void;
    /**
     * Renders a RenderTargetTexture or a layer
     * @param object The RenderTargetTexture/Layer to render
     * @param viewportWidth The width of the viewport (optional for Layer, but mandatory for ObjectRenderer)
     * @param viewportHeight The height of the viewport (optional for Layer, but mandatory for ObjectRenderer)
     */
    render(object: Layer | ObjectRenderer, viewportWidth?: number, viewportHeight?: number): void;
    /**
     * Binds a render target texture so that upcoming draw calls will render to it
     * Note: it is a lazy operation, so the render target will only be bound when needed. This way, it is possible to call
     *   this method several times with different render targets without incurring the cost of binding if no draw calls are made
     * @param renderTarget The handle of the render target texture to bind (default: undefined, meaning "back buffer"). Pass an array for MRT rendering.
     * @param debugMessage Optional debug message to display when the render target is bound (visible in PIX, for example)
     */
    bindRenderTarget(renderTarget?: FrameGraphRenderTarget, debugMessage?: string): void;
    /** @internal */
    _flushDebugMessages(): void;
    private _applyRenderTarget;
    /** @internal */
    _isReady(): boolean;
    /** @internal */
    _dispose(): void;
}
