import { RGBAImage } from '../util/image';
/**
 * The possible DEM encoding types
 */
export type DEMEncoding = 'mapbox' | 'terrarium' | 'custom';
/**
 * DEMData is a data structure for decoding, backfilling, and storing elevation data for processing in the hillshade shaders
 * data can be populated either from a pngraw image tile or from serliazed data sent back from a worker. When data is initially
 * loaded from a image tile, we decode the pixel values using the appropriate decoding formula, but we store the
 * elevation data as an Int32 value. we add 65536 (2^16) to eliminate negative values and enable the use of
 * integer overflow when creating the texture used in the hillshadePrepare step.
 *
 * DEMData also handles the backfilling of data from a tile's neighboring tiles. This is necessary because we use a pixel's 8
 * surrounding pixel values to compute the slope at that pixel, and we cannot accurately calculate the slope at pixels on a
 * tile's edge without backfilling from neighboring tiles.
 */
export declare class DEMData {
    uid: string | number;
    data: Uint32Array;
    stride: number;
    dim: number;
    min: number;
    max: number;
    redFactor: number;
    greenFactor: number;
    blueFactor: number;
    baseShift: number;
    /**
     * Constructs a `DEMData` object
     * @param uid - the tile's unique id
     * @param data - RGBAImage data has uniform 1px padding on all sides: square tile edge size defines stride
    // and dim is calculated as stride - 2.
     * @param encoding - the encoding type of the data
     * @param redFactor - the red channel factor used to unpack the data, used for `custom` encoding only
     * @param greenFactor - the green channel factor used to unpack the data, used for `custom` encoding only
     * @param blueFactor - the blue channel factor used to unpack the data, used for `custom` encoding only
     * @param baseShift - the base shift used to unpack the data, used for `custom` encoding only
     */
    constructor(uid: string | number, data: RGBAImage | ImageData, encoding: DEMEncoding, redFactor?: number, greenFactor?: number, blueFactor?: number, baseShift?: number);
    get(x: number, y: number): number;
    getUnpackVector(): number[];
    _idx(x: number, y: number): number;
    unpack(r: number, g: number, b: number): number;
    getPixels(): RGBAImage;
    backfillBorder(borderTile: DEMData, dx: number, dy: number): void;
}
