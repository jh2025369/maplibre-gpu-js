import { type IEXRDecoder } from "./exrLoader.interfaces";
/**
 * No compression
 * @param decoder defines the decoder to use
 * @returns a decompressed data view
 */
export declare function UncompressRAW(decoder: IEXRDecoder): DataView;
/**
 * RLE compression
 * @param decoder defines the decoder to use
 * @returns a decompressed data view
 */
export declare function UncompressRLE(decoder: IEXRDecoder): DataView;
/**
 * Zip compression
 * @param decoder defines the decoder to use
 * @returns a decompressed data view
 */
export declare function UncompressZIP(decoder: IEXRDecoder): DataView;
/**
 * PXR compression
 * @param decoder defines the decoder to use
 * @returns a decompressed data view
 */
export declare function UncompressPXR(decoder: IEXRDecoder): DataView;
/**
 * PIZ compression
 * @param decoder defines the decoder to use
 * @returns a decompressed data view
 */
export declare function UncompressPIZ(decoder: IEXRDecoder): DataView;
