import type { Nullable } from "core/types";
import type { DataCursor } from "./exrLoader.core";
export declare const INT32_SIZE = 4;
export declare const FLOAT32_SIZE = 4;
export declare const INT8_SIZE = 1;
export declare const INT16_SIZE = 2;
export declare const ULONG_SIZE = 8;
export declare const USHORT_RANGE: number;
export declare const BITMAP_SIZE: number;
export declare const HUF_ENCBITS = 16;
export declare const HUF_DECBITS = 14;
export declare const HUF_ENCSIZE: number;
export declare const HUF_DECSIZE: number;
export declare const HUF_DECMASK: number;
export declare const SHORT_ZEROCODE_RUN = 59;
export declare const LONG_ZEROCODE_RUN = 63;
export declare const SHORTEST_LONG_RUN: number;
export interface IEXRCHannel {
    name: string;
    pixelType: number;
}
export interface IDecodeChannel {
    [name: string]: number;
}
/**
 * Interface used to define the EXR header
 */
export interface IEXRHeader {
    /** Version */
    version: number;
    /** Specifications */
    spec: {
        singleTile: boolean;
        longName: boolean;
        deepFormat: boolean;
        multiPart: boolean;
    };
    /** Data window */
    dataWindow: {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
    };
    /** Channels */
    channels: IEXRCHannel[];
    /** Extra data */
    [name: string]: any;
}
export interface IEXRDecoder {
    size: number;
    viewer: DataView;
    array: Uint8Array;
    byteArray: Nullable<Float32Array | Uint16Array>;
    offset: DataCursor;
    width: number;
    height: number;
    channels: number;
    channelLineOffsets: IDecodeChannel;
    scanOrder: (value: number) => number;
    bytesPerLine: number;
    outLineWidth: number;
    lines: number;
    scanlineBlockSize: number;
    inputSize: Nullable<number>;
    type: number;
    uncompress: Nullable<(decoder: IEXRDecoder) => DataView>;
    getter: (dataView: DataView, offset: DataCursor) => number;
    format: number;
    outputChannels: number;
    decodeChannels: IDecodeChannel;
    blockCount: Nullable<number>;
    linearSpace: boolean;
    textureType: number;
}
