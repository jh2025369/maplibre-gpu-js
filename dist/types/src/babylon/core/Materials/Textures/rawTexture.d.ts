import { Texture } from "./texture";
import type { Nullable } from "../../types";
import type { AbstractEngine } from "../../Engines/abstractEngine";
import type { Scene } from "../../scene";
/**
 * Raw texture can help creating a texture directly from an array of data.
 * This can be super useful if you either get the data from an uncompressed source or
 * if you wish to create your texture pixel by pixel.
 */
export declare class RawTexture extends Texture {
    /**
     * Define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
     */
    format: number;
    private _waitingForData;
    /**
     * Instantiates a new RawTexture.
     * Raw texture can help creating a texture directly from an array of data.
     * This can be super useful if you either get the data from an uncompressed source or
     * if you wish to create your texture pixel by pixel.
     * @param data define the array of data to use to create the texture (null to create an empty texture)
     * @param width define the width of the texture
     * @param height define the height of the texture
     * @param format define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps define whether mip maps should be generated or not
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @param waitDataToBeReady If set to true Rawtexture will wait data to be set in order to be flaged as ready.
     */
    constructor(data: Nullable<ArrayBufferView>, width: number, height: number, 
    /**
     * Define the format of the data (RGB, RGBA... Engine.TEXTUREFORMAT_xxx)
     */
    format: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number, creationFlags?: number, useSRGBBuffer?: boolean, waitDataToBeReady?: boolean);
    /**
     * Updates the texture underlying data.
     * @param data Define the new data of the texture
     */
    update(data: ArrayBufferView): void;
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    clone(): Texture;
    isReady(): boolean;
    /**
     * Creates a luminance texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @returns the luminance texture
     */
    static CreateLuminanceTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number): RawTexture;
    /**
     * Creates a luminance alpha texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @returns the luminance alpha texture
     */
    static CreateLuminanceAlphaTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number): RawTexture;
    /**
     * Creates an alpha texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @returns the alpha texture
     */
    static CreateAlphaTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number): RawTexture;
    /**
     * Creates a RGB texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the RGB alpha texture
     */
    static CreateRGBTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number, creationFlags?: number, useSRGBBuffer?: boolean): RawTexture;
    /**
     * Creates a RGBA texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @param waitDataToBeReady if set to true this will force texture to wait for data to be set before it is considered ready.
     * @returns the RGBA texture
     */
    static CreateRGBATexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number, creationFlags?: number, useSRGBBuffer?: boolean, waitDataToBeReady?: boolean): RawTexture;
    /**
     * Creates a RGBA storage texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the RGBA texture
     */
    static CreateRGBAStorageTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number, useSRGBBuffer?: boolean): RawTexture;
    /**
     * Creates a R texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @returns the R texture
     */
    static CreateRTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number): RawTexture;
    /**
     * Creates a R storage texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @returns the R texture
     */
    static CreateRStorageTexture(data: Nullable<ArrayBufferView>, width: number, height: number, sceneOrEngine: Nullable<Scene | AbstractEngine>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number): RawTexture;
}
