import type { DataCursor } from "./exrLoader.core";
import { type IEXRDecoder, type IEXRHeader } from "./exrLoader.interfaces";
import { EXROutputType } from "./exrLoader.configuration";
/**
 * Inspired by https://github.com/sciecode/three.js/blob/dev/examples/jsm/loaders/EXRLoader.js
 * Referred to the original Industrial Light & Magic OpenEXR implementation and the TinyEXR / Syoyo Fujita
 * implementation.
 */
/**
 * Create a decoder for the exr file
 * @param header header of the exr file
 * @param dataView dataview of the exr file
 * @param offset current offset
 * @param outputType expected output type (float or half float)
 * @returns a promise that resolves with the decoder
 */
export declare function CreateDecoderAsync(header: IEXRHeader, dataView: DataView, offset: DataCursor, outputType: EXROutputType): Promise<IEXRDecoder>;
/**
 * Scan the data of the exr file
 * @param decoder decoder to use
 * @param header header of the exr file
 * @param dataView dataview of the exr file
 * @param offset current offset
 */
export declare function ScanData(decoder: IEXRDecoder, header: IEXRHeader, dataView: DataView, offset: DataCursor): void;
