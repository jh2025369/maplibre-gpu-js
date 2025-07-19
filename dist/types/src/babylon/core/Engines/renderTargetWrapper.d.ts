import type { InternalTexture } from "../Materials/Textures/internalTexture";
import type { TextureSize } from "../Materials/Textures/textureCreationOptions";
import type { Nullable } from "../types";
import type { AbstractEngine } from "./abstractEngine";
/**
 * An interface enforcing the renderTarget accessor to used by render target textures.
 */
export interface IRenderTargetTexture {
    /**
     * Entry point to access the wrapper on a texture.
     */
    renderTarget: Nullable<RenderTargetWrapper>;
}
/**
 * Wrapper around a render target (either single or multi textures)
 */
export declare class RenderTargetWrapper {
    protected _engine: AbstractEngine;
    private _size;
    private _isCube;
    private _isMulti;
    private _textures;
    private _faceIndices;
    private _layerIndices;
    private _depthStencilTextureLabel?;
    /** @internal */
    _samples: number;
    /** @internal */
    _attachments: Nullable<number[]>;
    /** @internal */
    _generateStencilBuffer: boolean;
    /** @internal */
    _generateDepthBuffer: boolean;
    /** @internal */
    _depthStencilTexture: Nullable<InternalTexture>;
    /** @internal */
    _depthStencilTextureWithStencil: boolean;
    /**
     * Gets or sets the label of the render target wrapper (optional, for debugging purpose)
     */
    label?: string;
    /**
     * Gets the depth/stencil texture
     */
    get depthStencilTexture(): InternalTexture;
    /**
     * Sets the depth/stencil texture
     * @param texture The depth/stencil texture to set
     * @param disposeExisting True to dispose the existing depth/stencil texture (if any) before replacing it (default: true)
     */
    setDepthStencilTexture(texture: Nullable<InternalTexture>, disposeExisting?: boolean): void;
    /**
     * Indicates if the depth/stencil texture has a stencil aspect
     */
    get depthStencilTextureWithStencil(): boolean;
    /**
     * Defines if the render target wrapper is for a cube texture or if false a 2d texture
     */
    get isCube(): boolean;
    /**
     * Defines if the render target wrapper is for a single or multi target render wrapper
     */
    get isMulti(): boolean;
    /**
     * Defines if the render target wrapper is for a single or an array of textures
     */
    get is2DArray(): boolean;
    /**
     * Defines if the render target wrapper is for a 3D texture
     */
    get is3D(): boolean;
    /**
     * Gets the size of the render target wrapper (used for cubes, as width=height in this case)
     */
    get size(): number;
    /**
     * Gets the width of the render target wrapper
     */
    get width(): number;
    /**
     * Gets the height of the render target wrapper
     */
    get height(): number;
    /**
     * Gets the number of layers of the render target wrapper (only used if is2DArray is true and wrapper is not a multi render target)
     */
    get layers(): number;
    /**
     * Gets the depth of the render target wrapper (only used if is3D is true and wrapper is not a multi render target)
     */
    get depth(): number;
    /**
     * Gets the render texture. If this is a multi render target, gets the first texture
     */
    get texture(): Nullable<InternalTexture>;
    /**
     * Gets the list of render textures. If we are not in a multi render target, the list will be null (use the texture getter instead)
     */
    get textures(): Nullable<InternalTexture[]>;
    /**
     * Gets the face indices that correspond to the list of render textures. If we are not in a multi render target, the list will be null
     */
    get faceIndices(): Nullable<number[]>;
    /**
     * Gets the layer indices that correspond to the list of render textures. If we are not in a multi render target, the list will be null
     */
    get layerIndices(): Nullable<number[]>;
    /**
     * Sets this property to true to disable the automatic MSAA resolve that happens when the render target wrapper is unbound (default is false)
     */
    disableAutomaticMSAAResolve: boolean;
    /**
     * Indicates if MSAA color texture(s) should be resolved when a resolve occur (either automatically by the engine or manually by the user) (default is true)
     * Note that you can trigger a MSAA resolve at any time by calling resolveMSAATextures()
     */
    resolveMSAAColors: boolean;
    /**
     * Indicates if MSAA depth texture should be resolved when a resolve occur (either automatically by the engine or manually by the user) (default is false)
     */
    resolveMSAADepth: boolean;
    /**
     * Indicates if MSAA stencil texture should be resolved when a resolve occur (either automatically by the engine or manually by the user) (default is false)
     */
    resolveMSAAStencil: boolean;
    /**
     * Gets the base array layer of a texture in the textures array
     * This is an number that is calculated based on the layer and face indices set for this texture at that index
     * @param index The index of the texture in the textures array to get the base array layer for
     * @returns the base array layer of the texture at the given index
     */
    getBaseArrayLayer(index: number): number;
    /**
     * Gets the sample count of the render target
     */
    get samples(): number;
    /**
     * Sets the sample count of the render target
     * @param value sample count
     * @param initializeBuffers If set to true, the engine will make an initializing call to drawBuffers (only used when isMulti=true).
     * @param force true to force calling the update sample count engine function even if the current sample count is equal to value
     * @returns the sample count that has been set
     */
    setSamples(value: number, initializeBuffers?: boolean, force?: boolean): number;
    /**
     * Resolves the MSAA textures into their non-MSAA version.
     * Note that if samples equals 1 (no MSAA), no resolve is performed.
     */
    resolveMSAATextures(): void;
    /**
     * Generates mipmaps for each texture of the render target
     */
    generateMipMaps(): void;
    /**
     * Initializes the render target wrapper
     * @param isMulti true if the wrapper is a multi render target
     * @param isCube true if the wrapper should render to a cube texture
     * @param size size of the render target (width/height/layers)
     * @param engine engine used to create the render target
     * @param label defines the label to use for the wrapper (for debugging purpose only)
     */
    constructor(isMulti: boolean, isCube: boolean, size: TextureSize, engine: AbstractEngine, label?: string);
    /**
     * Sets the render target texture(s)
     * @param textures texture(s) to set
     */
    setTextures(textures: Nullable<InternalTexture> | Nullable<InternalTexture[]>): void;
    /**
     * Set a texture in the textures array
     * @param texture The texture to set
     * @param index The index in the textures array to set
     * @param disposePrevious If this function should dispose the previous texture
     */
    setTexture(texture: InternalTexture, index?: number, disposePrevious?: boolean): void;
    /**
     * Sets the layer and face indices of every render target texture bound to each color attachment
     * @param layers The layers of each texture to be set
     * @param faces The faces of each texture to be set
     */
    setLayerAndFaceIndices(layers: number[], faces: number[]): void;
    /**
     * Sets the layer and face indices of a texture in the textures array that should be bound to each color attachment
     * @param index The index of the texture in the textures array to modify
     * @param layer The layer of the texture to be set
     * @param face The face of the texture to be set
     */
    setLayerAndFaceIndex(index?: number, layer?: number, face?: number): void;
    /**
     * Creates the depth/stencil texture
     * @param comparisonFunction Comparison function to use for the texture
     * @param bilinearFiltering true if bilinear filtering should be used when sampling the texture
     * @param generateStencil Not used anymore. "format" will be used to determine if stencil should be created
     * @param samples sample count to use when creating the texture (default: 1)
     * @param format format of the depth texture (default: Constants.TEXTUREFORMAT_DEPTH32_FLOAT)
     * @param label defines the label to use for the texture (for debugging purpose only)
     * @returns the depth/stencil created texture
     */
    createDepthStencilTexture(comparisonFunction?: number, bilinearFiltering?: boolean, generateStencil?: boolean, samples?: number, format?: number, label?: string): InternalTexture;
    /**
     * @deprecated Use shareDepth instead
     * @param renderTarget Destination renderTarget
     */
    _shareDepth(renderTarget: RenderTargetWrapper): void;
    /**
     * Shares the depth buffer of this render target with another render target.
     * @param renderTarget Destination renderTarget
     */
    shareDepth(renderTarget: RenderTargetWrapper): void;
    /**
     * @internal
     */
    _swapAndDie(target: InternalTexture): void;
    protected _cloneRenderTargetWrapper(): Nullable<RenderTargetWrapper>;
    protected _swapRenderTargetWrapper(target: RenderTargetWrapper): void;
    /** @internal */
    _rebuild(): void;
    /**
     * Releases the internal render textures
     */
    releaseTextures(): void;
    /**
     * Disposes the whole render target wrapper
     * @param disposeOnlyFramebuffers true if only the frame buffers should be released (used for the WebGL engine). If false, all the textures will also be released
     */
    dispose(disposeOnlyFramebuffers?: boolean): void;
}
