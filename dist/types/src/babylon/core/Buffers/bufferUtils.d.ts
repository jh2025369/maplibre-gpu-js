import type { DataArray } from "../types";
/**
 * Copies the given data array to the given float array.
 * @param input the input data array
 * @param size the number of components
 * @param type the component type
 * @param byteOffset the byte offset of the data
 * @param byteStride the byte stride of the data
 * @param normalized whether the data is normalized
 * @param totalVertices number of vertices in the buffer to take into account
 * @param output the output float array
 */
export declare function CopyFloatData(input: DataArray, size: number, type: number, byteOffset: number, byteStride: number, normalized: boolean, totalVertices: number, output: Float32Array): void;
