import type { InternalTexture } from "../Materials/Textures/internalTexture";
/**
 * Gets the header of a TGA file
 * @param data defines the TGA data
 * @returns the header
 */
export declare function GetTGAHeader(data: Uint8Array): any;
/**
 * Uploads TGA content to a Babylon Texture
 * @internal
 */
export declare function UploadContent(texture: InternalTexture, data: Uint8Array): void;
/**
 * @internal
 */
declare function GetImageData8bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function GetImageData16bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function GetImageData24bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function GetImageData32bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function GetImageDataGrey8bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function GetImageDataGrey16bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * Based on jsTGALoader - Javascript loader for TGA file
 * By Vincent Thibault
 * @see http://blog.robrowser.com/javascript-tga-loader.html
 */
export declare const TGATools: {
    /**
     * Gets the header of a TGA file
     * @param data defines the TGA data
     * @returns the header
     */
    GetTGAHeader: typeof GetTGAHeader;
    /**
     * Uploads TGA content to a Babylon Texture
     * @internal
     */
    UploadContent: typeof UploadContent;
    /** @internal */
    _getImageData8bits: typeof GetImageData8bits;
    /** @internal */
    _getImageData16bits: typeof GetImageData16bits;
    /** @internal */
    _getImageData24bits: typeof GetImageData24bits;
    /** @internal */
    _getImageData32bits: typeof GetImageData32bits;
    /** @internal */
    _getImageDataGrey8bits: typeof GetImageDataGrey8bits;
    /** @internal */
    _getImageDataGrey16bits: typeof GetImageDataGrey16bits;
};
export {};
