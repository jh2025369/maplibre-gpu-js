import type { Scene } from "../../scene";
import type { Engine } from "../../Engines/engine";
import { Texture } from "../../Materials/Textures/texture";
import { RenderTargetTexture } from "../../Materials/Textures/renderTargetTexture";
import "../../Engines/Extensions/engine.multiRender";
import type { InternalTexture } from "./internalTexture";
/**
 * Creation options of the multi render target texture.
 */
export interface IMultiRenderTargetOptions {
    /**
     * Specifies if mipmaps must be created. If undefined, the value from generateMipMaps is taken instead
     */
    createMipMaps?: boolean;
    /**
     * Define if the texture needs to create mip maps after render (default: false).
     */
    generateMipMaps?: boolean;
    /**
     * Define the types of all the draw buffers (render textures) we want to create
     */
    types?: number[];
    /**
     * Define the sampling modes of all the draw buffers (render textures) we want to create
     */
    samplingModes?: number[];
    /**
     * Define if sRGB format should be used for each of the draw buffers (render textures) we want to create
     */
    useSRGBBuffers?: boolean[];
    /**
     * Define if a depth buffer is required (default: true)
     */
    generateDepthBuffer?: boolean;
    /**
     * Define if a stencil buffer is required (default: false)
     */
    generateStencilBuffer?: boolean;
    /**
     * Define if a depth texture is required instead of a depth buffer (default: false)
     */
    generateDepthTexture?: boolean;
    /**
     * Define the internal format of the buffer in the RTT (RED, RG, RGB, RGBA (default), ALPHA...) of all the draw buffers (render textures) we want to create
     */
    formats?: number[];
    /**
     * Define depth texture format to use
     */
    depthTextureFormat?: number;
    /**
     * Define the number of desired draw buffers (render textures). You can set it to 0 if you don't need any color attachment. (default: 1)
     */
    textureCount?: number;
    /**
     * Define if aspect ratio should be adapted to the texture or stay the scene one (default: true)
     */
    doNotChangeAspectRatio?: boolean;
    /**
     * Define the default type of the buffers we are creating (default: Constants.TEXTURETYPE_UNSIGNED_BYTE). types[] is prioritized over defaultType if provided.
     */
    defaultType?: number;
    /**
     * Defines sample count (1 by default)
     */
    samples?: number;
    /**
     * Defines if we should draw into all attachments or the first one only by default (default: false)
     */
    drawOnlyOnFirstAttachmentByDefault?: boolean;
    /**
     * Define the type of texture at each attahment index (of Constants.TEXTURE_2D, .TEXTURE_2D_ARRAY, .TEXTURE_CUBE_MAP, .TEXTURE_CUBE_MAP_ARRAY, .TEXTURE_3D).
     * You can also use the -1 value to indicate that no texture should be created but that you will assign a texture to that attachment index later.
     * Can be useful when you want to attach several layers of the same 2DArrayTexture / 3DTexture or several faces of the same CubeMapTexture: Use the setInternalTexture
     * method for that purpose, after the MultiRenderTarget has been created.
     */
    targetTypes?: number[];
    /**
     * Define the face index of each texture in the textures array (if applicable, given the corresponding targetType) at creation time (for Constants.TEXTURE_CUBE_MAP and .TEXTURE_CUBE_MAP_ARRAY).
     * Can be changed at any time by calling setLayerAndFaceIndices or setLayerAndFaceIndex
     */
    faceIndex?: number[];
    /**
     * Define the layer index of each texture in the textures array (if applicable, given the corresponding targetType) at creation time (for Constants.TEXTURE_3D, .TEXTURE_2D_ARRAY, and .TEXTURE_CUBE_MAP_ARRAY).
     * Can be changed at any time by calling setLayerAndFaceIndices or setLayerAndFaceIndex
     */
    layerIndex?: number[];
    /**
     * Define the number of layer of each texture in the textures array (if applicable, given the corresponding targetType) (for Constants.TEXTURE_3D, .TEXTURE_2D_ARRAY, and .TEXTURE_CUBE_MAP_ARRAY)
     */
    layerCounts?: number[];
    /**
     * Define the creation flags of the textures (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     */
    creationFlags?: number[];
    /**
     * Define the names of the textures (used for debugging purpose)
     */
    labels?: string[];
    /**
     * Label of the RenderTargetWrapper (used for debugging only)
     */
    label?: string;
    /**
     * Define if the textures should not be created by the MultiRenderTarget (default: false)
     * If true, you will need to set the textures yourself by calling setTexture on the MultiRenderTarget.
     */
    dontCreateTextures?: boolean;
}
/**
 * A multi render target, like a render target provides the ability to render to a texture.
 * Unlike the render target, it can render to several draw buffers (render textures) in one draw.
 * This is specially interesting in deferred rendering or for any effects requiring more than
 * just one color from a single pass.
 */
export declare class MultiRenderTarget extends RenderTargetTexture {
    private _textures;
    private _multiRenderTargetOptions;
    private _count;
    private _drawOnlyOnFirstAttachmentByDefault;
    private _textureNames?;
    /**
     * Get if draw buffers (render textures) are currently supported by the used hardware and browser.
     */
    get isSupported(): boolean;
    /**
     * Get the list of textures generated by the multi render target.
     */
    get textures(): Texture[];
    /**
     * Gets the number of textures in this MRT. This number can be different from `_textures.length` in case a depth texture is generated.
     */
    get count(): number;
    /**
     * Get the depth texture generated by the multi render target if options.generateDepthTexture has been set
     */
    get depthTexture(): Texture;
    /**
     * Set the wrapping mode on U of all the textures we are rendering to.
     * Can be any of the Texture. (CLAMP_ADDRESSMODE, MIRROR_ADDRESSMODE or WRAP_ADDRESSMODE)
     */
    set wrapU(wrap: number);
    /**
     * Set the wrapping mode on V of all the textures we are rendering to.
     * Can be any of the Texture. (CLAMP_ADDRESSMODE, MIRROR_ADDRESSMODE or WRAP_ADDRESSMODE)
     */
    set wrapV(wrap: number);
    /**
     * Instantiate a new multi render target texture.
     * A multi render target, like a render target provides the ability to render to a texture.
     * Unlike the render target, it can render to several draw buffers (render textures) in one draw.
     * This is specially interesting in deferred rendering or for any effects requiring more than
     * just one color from a single pass.
     * @param name Define the name of the texture
     * @param size Define the size of the buffers to render to
     * @param count Define the number of target we are rendering into
     * @param scene Define the scene the texture belongs to
     * @param options Define the options used to create the multi render target
     * @param textureNames Define the names to set to the textures (if count \> 0 - optional)
     */
    constructor(name: string, size: any, count: number, scene?: Scene, options?: IMultiRenderTargetOptions, textureNames?: string[]);
    private _initTypes;
    private _createInternaTextureIndexMapping;
    /**
     * @internal
     */
    _rebuild(fromContextLost?: boolean, forceFullRebuild?: boolean, textureNames?: string[]): void;
    private _createInternalTextures;
    private _releaseTextures;
    private _createTextures;
    /**
     * Replaces an internal texture within the MRT. Useful to share textures between MultiRenderTarget.
     * @param texture The new texture to set in the MRT
     * @param index The index of the texture to replace
     * @param disposePrevious Set to true if the previous internal texture should be disposed
     */
    setInternalTexture(texture: InternalTexture, index: number, disposePrevious?: boolean): void;
    /**
     * Changes an attached texture's face index or layer.
     * @param index The index of the texture to modify the attachment of
     * @param layerIndex The layer index of the texture to be attached to the framebuffer
     * @param faceIndex The face index of the texture to be attached to the framebuffer
     */
    setLayerAndFaceIndex(index: number, layerIndex?: number, faceIndex?: number): void;
    /**
     * Changes every attached texture's face index or layer.
     * @param layerIndices The layer indices of the texture to be attached to the framebuffer
     * @param faceIndices The face indices of the texture to be attached to the framebuffer
     */
    setLayerAndFaceIndices(layerIndices: number[], faceIndices: number[]): void;
    /**
     * Define the number of samples used if MSAA is enabled.
     */
    get samples(): number;
    set samples(value: number);
    /**
     * Resize all the textures in the multi render target.
     * Be careful as it will recreate all the data in the new texture.
     * @param size Define the new size
     */
    resize(size: any): void;
    /**
     * Changes the number of render targets in this MRT
     * Be careful as it will recreate all the data in the new texture.
     * @param count new texture count
     * @param options Specifies texture types and sampling modes for new textures
     * @param textureNames Specifies the names of the textures (optional)
     */
    updateCount(count: number, options?: IMultiRenderTargetOptions, textureNames?: string[]): void;
    protected _unbindFrameBuffer(engine: Engine, faceIndex: number): void;
    /**
     * Dispose the render targets and their associated resources
     * @param doNotDisposeInternalTextures if set to true, internal textures won't be disposed (default: false).
     */
    dispose(doNotDisposeInternalTextures?: boolean): void;
    /**
     * Release all the underlying texture used as draw buffers (render textures).
     */
    releaseInternalTextures(): void;
}
