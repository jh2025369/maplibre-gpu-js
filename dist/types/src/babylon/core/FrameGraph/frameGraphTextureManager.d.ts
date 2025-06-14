import type { Scene, AbstractEngine, TextureSize, Nullable, FrameGraphTextureCreationOptions, FrameGraphTextureHandle, InternalTexture, FrameGraphTextureDescription, RenderTargetWrapper } from "core/index";
import { Texture } from "../Materials/Textures/texture";
import { FrameGraphRenderTarget } from "./frameGraphRenderTarget";
type HistoryTexture = {
    textures: Array<Nullable<InternalTexture>>;
    handles: Array<FrameGraphTextureHandle>;
    index: number;
    references: Array<{
        renderTargetWrapper: RenderTargetWrapper;
        textureIndex: number;
    }>;
};
type TextureEntry = {
    texture: Nullable<InternalTexture>;
    name: string;
    creationOptions: FrameGraphTextureCreationOptions;
    namespace: FrameGraphTextureNamespace;
    textureIndex?: number;
    debug?: Texture;
    refHandle?: FrameGraphTextureHandle;
};
declare enum FrameGraphTextureNamespace {
    Task = 0,
    Graph = 1,
    External = 2
}
/**
 * Manages the textures used by a frame graph
 * @experimental
 */
export declare class FrameGraphTextureManager {
    readonly engine: AbstractEngine;
    private readonly _debugTextures;
    private readonly _scene;
    private static _Counter;
    /** @internal */
    readonly _textures: Map<FrameGraphTextureHandle, TextureEntry>;
    /** @internal */
    readonly _historyTextures: Map<FrameGraphTextureHandle, HistoryTexture>;
    /** @internal */
    _isRecordingTask: boolean;
    /**
     * Constructs a new instance of the texture manager
     * @param engine The engine to use
     * @param _debugTextures If true, debug textures will be created so that they are visible in the inspector
     * @param _scene The scene the manager belongs to
     */
    constructor(engine: AbstractEngine, _debugTextures: boolean, _scene: Scene);
    /**
     * Checks if a handle is a backbuffer handle (color or depth/stencil)
     * @param handle The handle to check
     * @returns True if the handle is a backbuffer handle
     */
    isBackbuffer(handle: FrameGraphTextureHandle): boolean;
    /**
     * Checks if a handle is a backbuffer color handle
     * @param handle The handle to check
     * @returns True if the handle is a backbuffer color handle
     */
    isBackbufferColor(handle: FrameGraphTextureHandle): boolean;
    /**
     * Checks if a handle is a backbuffer depth/stencil handle
     * @param handle The handle to check
     * @returns True if the handle is a backbuffer depth/stencil handle
     */
    isBackbufferDepthStencil(handle: FrameGraphTextureHandle): boolean;
    /**
     * Checks if a handle is a history texture (or points to a history texture, for a dangling handle)
     * @param handle The handle to check
     * @returns True if the handle is a history texture, otherwise false
     */
    isHistoryTexture(handle: FrameGraphTextureHandle): boolean;
    /**
     * Gets the creation options of a texture
     * @param handle Handle of the texture
     * @returns The creation options of the texture
     */
    getTextureCreationOptions(handle: FrameGraphTextureHandle): FrameGraphTextureCreationOptions;
    /**
     * Gets the description of a texture
     * @param handle Handle of the texture
     * @returns The description of the texture
     */
    getTextureDescription(handle: FrameGraphTextureHandle): FrameGraphTextureDescription;
    /**
     * Gets a texture handle or creates a new texture if the handle is not provided.
     * If handle is not provided, newTextureName and creationOptions must be provided.
     * @param handle If provided, will simply return the handle
     * @param newTextureName Name of the new texture to create
     * @param creationOptions Options to use when creating the new texture
     * @returns The handle to the texture.
     */
    getTextureHandleOrCreateTexture(handle?: FrameGraphTextureHandle, newTextureName?: string, creationOptions?: FrameGraphTextureCreationOptions): FrameGraphTextureHandle;
    /**
     * Gets a texture from a handle.
     * Note that if the texture is a history texture, the read texture for the current frame will be returned.
     * @param handle The handle of the texture
     * @returns The texture or null if not found
     */
    getTextureFromHandle(handle: FrameGraphTextureHandle): Nullable<InternalTexture>;
    /**
     * Imports a texture into the texture manager
     * @param name Name of the texture
     * @param texture Texture to import
     * @param handle Existing handle to use for the texture. If not provided (default), a new handle will be created.
     * @returns The handle to the texture
     */
    importTexture(name: string, texture: InternalTexture, handle?: FrameGraphTextureHandle): FrameGraphTextureHandle;
    /**
     * Creates a new render target texture
     * If multiple textures are described in FrameGraphTextureCreationOptions, the handle of the first texture is returned, handle+1 is the handle of the second texture, etc.
     * @param name Name of the texture
     * @param creationOptions Options to use when creating the texture
     * @param handle Existing handle to use for the texture. If not provided (default), a new handle will be created.
     * @returns The handle to the texture
     */
    createRenderTargetTexture(name: string, creationOptions: FrameGraphTextureCreationOptions, handle?: FrameGraphTextureHandle): FrameGraphTextureHandle;
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
     * Creates a handle which is not associated with any texture.
     * Call resolveDanglingHandle to associate the handle with a valid texture handle.
     * @returns The dangling handle
     */
    createDanglingHandle(): number;
    /**
     * Associates a texture with a dangling handle
     * @param danglingHandle The dangling handle
     * @param handle The handle to associate with the dangling handle (if not provided, a new texture handle will be created, using the newTextureName and creationOptions parameters)
     * @param newTextureName The name of the new texture to create (if handle is not provided)
     * @param creationOptions The options to use when creating the new texture (if handle is not provided)
     */
    resolveDanglingHandle(danglingHandle: FrameGraphTextureHandle, handle?: FrameGraphTextureHandle, newTextureName?: string, creationOptions?: FrameGraphTextureCreationOptions): void;
    /**
     * Gets the absolute dimensions of a texture.
     * @param size The size of the texture. Width and height must be expressed as a percentage of the screen size (100=100%)!
     * @param screenWidth The width of the screen (default: the width of the rendering canvas)
     * @param screenHeight The height of the screen (default: the height of the rendering canvas)
     * @returns The absolute dimensions of the texture
     */
    getAbsoluteDimensions(size: TextureSize, screenWidth?: number, screenHeight?: number): {
        width: number;
        height: number;
    };
    /** @internal */
    _dispose(): void;
    /** @internal */
    _allocateTextures(): void;
    /** @internal */
    _releaseTextures(releaseAll?: boolean): void;
    /** @internal */
    _updateHistoryTextures(): void;
    private _addSystemTextures;
    private _createDebugTexture;
    private _freeEntry;
    private _createHandleForTexture;
    private _cloneTextureOptions;
}
export {};
