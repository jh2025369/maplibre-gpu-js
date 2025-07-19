export type Size = {
    width: number;
    height: number;
};
type Point2D = {
    x: number;
    y: number;
};
/**
 * An image with alpha color value
 */
export declare class AlphaImage {
    width: number;
    height: number;
    data: Uint8Array;
    constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
    resize(size: Size): void;
    clone(): AlphaImage;
    static copy(srcImg: AlphaImage, dstImg: AlphaImage, srcPt: Point2D, dstPt: Point2D, size: Size): void;
}
/**
 * An object to store image data not premultiplied, because ImageData is not premultiplied.
 * UNPACK_PREMULTIPLY_ALPHA_WEBGL must be used when uploading to a texture.
 */
export declare class RGBAImage {
    width: number;
    height: number;
    /**
     * data must be a Uint8Array instead of Uint8ClampedArray because texImage2D does not support Uint8ClampedArray in all browsers.
     */
    data: Uint8Array;
    constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
    resize(size: Size): void;
    replace(data: Uint8Array | Uint8ClampedArray, copy?: boolean): void;
    clone(): RGBAImage;
    static copy(srcImg: RGBAImage | ImageData, dstImg: RGBAImage, srcPt: Point2D, dstPt: Point2D, size: Size): void;
}
export {};
