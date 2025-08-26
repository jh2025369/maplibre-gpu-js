import type { AbstractEngine, FrameGraphTextureManager, Scene, FrameGraphTextureHandle, Nullable, InternalTexture } from "core/index";
/**
 * Base class for frame graph context.
 */
export declare class FrameGraphContext {
    protected readonly _engine: AbstractEngine;
    protected readonly _textureManager: FrameGraphTextureManager;
    protected readonly _scene: Scene;
    private _depthTest;
    private _depthWrite;
    /** @internal */
    constructor(_engine: AbstractEngine, _textureManager: FrameGraphTextureManager, _scene: Scene);
    /**
     * Renders a component without managing the render target.
     * Use this method when you have a component that handles its own rendering logic which is not fully integrated into the frame graph system.
     * @param component The component to render.
     */
    renderUnmanaged(component: {
        render: () => void;
    }): void;
    /**
     * Gets a texture from a handle.
     * Note that if the texture is a history texture, the read texture for the current frame will be returned.
     * @param handle The handle of the texture
     * @returns The texture or null if not found
     */
    getTextureFromHandle(handle: FrameGraphTextureHandle): Nullable<InternalTexture>;
    /**
     * Pushes a debug group to the engine's debug stack.
     * @param name The name of the debug group
     */
    pushDebugGroup(name: string): void;
    /**
     * Pops a debug group from the engine's debug stack.
     */
    popDebugGroup(): void;
    /**
     * Saves the current depth states (depth testing and depth writing)
     */
    saveDepthStates(): void;
    /**
     * Restores the depth states saved by saveDepthStates
     */
    restoreDepthStates(): void;
    /**
     * Sets the depth states for the current render target
     * @param depthTest If true, depth testing is enabled
     * @param depthWrite If true, depth writing is enabled
     */
    setDepthStates(depthTest: boolean, depthWrite: boolean): void;
}
