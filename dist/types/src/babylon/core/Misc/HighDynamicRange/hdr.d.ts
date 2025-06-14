import type { CubeMapInfo } from "./panoramaToCubemap";
/**
 * Header information of HDR texture files.
 */
export interface HDRInfo {
    /**
     * The height of the texture in pixels.
     */
    height: number;
    /**
     * The width of the texture in pixels.
     */
    width: number;
    /**
     * The index of the beginning of the data in the binary file.
     */
    dataPosition: number;
}
/**
 * Reads header information from an RGBE texture stored in a native array.
 * More information on this format are available here:
 * https://en.wikipedia.org/wiki/RGBE_image_format
 *
 * @param uint8array The binary file stored in  native array.
 * @returns The header information.
 */
export declare function RGBE_ReadHeader(uint8array: Uint8Array): HDRInfo;
/**
 * Returns the cubemap information (each faces texture data) extracted from an RGBE texture.
 * This RGBE texture needs to store the information as a panorama.
 *
 * More information on this format are available here:
 * https://en.wikipedia.org/wiki/RGBE_image_format
 *
 * @param buffer The binary file stored in an array buffer.
 * @param size The expected size of the extracted cubemap.
 * @param supersample enable supersampling the cubemap (default: false)
 * @returns The Cube Map information.
 */
export declare function GetCubeMapTextureData(buffer: ArrayBuffer, size: number, supersample?: boolean): CubeMapInfo;
/**
 * Returns the pixels data extracted from an RGBE texture.
 * This pixels will be stored left to right up to down in the R G B order in one array.
 *
 * More information on this format are available here:
 * https://en.wikipedia.org/wiki/RGBE_image_format
 *
 * @param uint8array The binary file stored in an array buffer.
 * @param hdrInfo The header information of the file.
 * @returns The pixels data in RGB right to left up to down order.
 */
export declare function RGBE_ReadPixels(uint8array: Uint8Array, hdrInfo: HDRInfo): Float32Array;
/**
 * @deprecated Use functions separately
 */
export declare const HDRTools: {
    RGBE_ReadHeader: typeof RGBE_ReadHeader;
    GetCubeMapTextureData: typeof GetCubeMapTextureData;
    RGBE_ReadPixels: typeof RGBE_ReadPixels;
};
