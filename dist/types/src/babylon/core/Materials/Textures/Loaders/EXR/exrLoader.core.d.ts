/**
 * Inspired by https://github.com/sciecode/three.js/blob/dev/examples/jsm/loaders/EXRLoader.js
 * Referred to the original Industrial Light & Magic OpenEXR implementation and the TinyEXR / Syoyo Fujita
 * implementation.
 */
export declare enum CompressionCodes {
    NO_COMPRESSION = 0,
    RLE_COMPRESSION = 1,
    ZIPS_COMPRESSION = 2,
    ZIP_COMPRESSION = 3,
    PIZ_COMPRESSION = 4,
    PXR24_COMPRESSION = 5
}
/**
 * Interface used to define the cursor position in the data
 */
export interface DataCursor {
    /** Curosr position */
    value: number;
}
/**
 * Parse a null terminated string from the buffer
 * @param buffer buffer to read from
 * @param offset current offset in the buffer
 * @returns a string
 */
export declare function ParseNullTerminatedString(buffer: ArrayBuffer, offset: DataCursor): string;
/**
 * Parse an int32 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns an int32
 */
export declare function ParseInt32(dataView: DataView, offset: DataCursor): number;
/**
 * Parse an uint32 from the buffer
 * @param dataView data view to read from
 * @param offset offset in the data view
 * @returns an uint32
 */
export declare function ParseUint32(dataView: DataView, offset: DataCursor): number;
/**
 * Parse an uint8 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns an uint8
 */
export declare function ParseUint8(dataView: DataView, offset: DataCursor): number;
/**
 * Parse an uint16 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns an uint16
 */
export declare function ParseUint16(dataView: DataView, offset: DataCursor): number;
/**
 * Parse an uint8 from an array buffer
 * @param array array buffer
 * @param offset current offset in the data view
 * @returns an uint16
 */
export declare function ParseUint8Array(array: Uint8Array, offset: DataCursor): number;
/**
 * Parse an int64 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns an int64
 */
export declare function ParseInt64(dataView: DataView, offset: DataCursor): any;
/**
 * Parse a float32 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns a float32
 */
export declare function ParseFloat32(dataView: DataView, offset: DataCursor): number;
/**
 * Parse a float16 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns a float16
 */
export declare function ParseFloat16(dataView: DataView, offset: DataCursor): number;
/**
 * Decode a float32 from the buffer
 * @param dataView dataview on the data
 * @param offset current offset in the data view
 * @returns a float32
 */
export declare function DecodeFloat32(dataView: DataView, offset: DataCursor): number;
/**
 * Parse a value from the data view
 * @param dataView defines the data view to read from
 * @param offset defines the current offset in the data view
 * @param type defines the type of the value to read
 * @param size defines the size of the value to read
 * @returns the parsed value
 */
export declare function ParseValue(dataView: DataView, offset: DataCursor, type: string, size: number): string | number | any[] | {
    redX: number;
    redY: number;
    greenX: number;
    greenY: number;
    blueX: number;
    blueY: number;
    whiteX: number;
    whiteY: number;
} | {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
};
/**
 * Revert the endianness of the data
 * @param source defines the source
 */
export declare function Predictor(source: Uint8Array): void;
/**
 * Interleave pixels
 * @param source defines the data source
 * @param out defines the output
 */
export declare function InterleaveScalar(source: Uint8Array, out: Uint8Array): void;
