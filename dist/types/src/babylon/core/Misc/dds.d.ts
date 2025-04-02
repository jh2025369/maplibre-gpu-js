import type { SphericalPolynomial } from "../Maths/sphericalPolynomial";
import type { InternalTexture } from "../Materials/Textures/internalTexture";
import type { AbstractEngine } from "../Engines/abstractEngine";
import "../Engines/AbstractEngine/abstractEngine.cubeTexture";
/**
 * Direct draw surface info
 * @see https://docs.microsoft.com/en-us/windows/desktop/direct3ddds/dx-graphics-dds-pguide
 */
export interface DDSInfo {
    /**
     * Width of the texture
     */
    width: number;
    /**
     * Width of the texture
     */
    height: number;
    /**
     * Number of Mipmaps for the texture
     * @see https://en.wikipedia.org/wiki/Mipmap
     */
    mipmapCount: number;
    /**
     * If the textures format is a known fourCC format
     * @see https://www.fourcc.org/
     */
    isFourCC: boolean;
    /**
     * If the texture is an RGB format eg. DXGI_FORMAT_B8G8R8X8_UNORM format
     */
    isRGB: boolean;
    /**
     * If the texture is a lumincance format
     */
    isLuminance: boolean;
    /**
     * If this is a cube texture
     * @see https://docs.microsoft.com/en-us/windows/desktop/direct3ddds/dds-file-layout-for-cubic-environment-maps
     */
    isCube: boolean;
    /**
     * If the texture is a compressed format eg. FOURCC_DXT1
     */
    isCompressed: boolean;
    /**
     * The dxgiFormat of the texture
     * @see https://docs.microsoft.com/en-us/windows/desktop/api/dxgiformat/ne-dxgiformat-dxgi_format
     */
    dxgiFormat: number;
    /**
     * Texture type eg. Engine.TEXTURETYPE_UNSIGNED_BYTE, Engine.TEXTURETYPE_FLOAT
     */
    textureType: number;
    /**
     * Sphericle polynomial created for the dds texture
     */
    sphericalPolynomial?: SphericalPolynomial;
}
/**
 * Class used to provide DDS decompression tools
 */
export declare class DDSTools {
    /**
     * Gets or sets a boolean indicating that LOD info is stored in alpha channel (false by default)
     */
    static StoreLODInAlphaChannel: boolean;
    /**
     * Gets DDS information from an array buffer
     * @param data defines the array buffer view to read data from
     * @returns the DDS information
     */
    static GetDDSInfo(data: ArrayBufferView): DDSInfo;
    private static _GetHalfFloatAsFloatRGBAArrayBuffer;
    private static _GetHalfFloatRGBAArrayBuffer;
    private static _GetFloatRGBAArrayBuffer;
    private static _GetFloatAsHalfFloatRGBAArrayBuffer;
    private static _GetFloatAsUIntRGBAArrayBuffer;
    private static _GetHalfFloatAsUIntRGBAArrayBuffer;
    private static _GetRGBAArrayBuffer;
    private static _ExtractLongWordOrder;
    private static _GetRGBArrayBuffer;
    private static _GetLuminanceArrayBuffer;
    /**
     * Uploads DDS Levels to a Babylon Texture
     * @internal
     */
    static UploadDDSLevels(engine: AbstractEngine, texture: InternalTexture, data: ArrayBufferView, info: DDSInfo, loadMipmaps: boolean, faces: number, lodIndex?: number, currentFace?: number, destTypeMustBeFilterable?: boolean): void;
}
