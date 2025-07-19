import type { DataCursor } from "./exrLoader.core";
/** @internal */
export declare function ReverseLutFromBitmap(bitmap: Uint8Array, lut: Uint16Array): number;
/** @internal */
export declare function HufUncompress(array: Uint8Array, dataView: DataView, offset: DataCursor, nCompressed: number, outBuffer: Uint16Array, nRaw: number): void;
/** @internal */
export declare function Wav2Decode(buffer: Uint16Array, j: number, nx: number, ox: number, ny: number, oy: number, mx: number): any;
/** @internal */
export declare function ApplyLut(lut: Uint16Array, data: Uint16Array, nData: number): void;
