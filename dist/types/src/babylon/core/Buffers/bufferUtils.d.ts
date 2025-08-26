import type { DataArray, FloatArray, IndicesArray, TypedArray, TypedArrayConstructor } from "../types";
/**
 * Union of TypedArrays that can be used for vertex data.
 */
export type VertexDataTypedArray = Exclude<TypedArray, Float64Array | BigInt64Array | BigUint64Array>;
/**
 * Gets the byte length of the given type.
 * @param type the type
 * @returns the number of bytes
 */
export declare function GetTypeByteLength(type: number): number;
/**
 * Gets the appropriate TypedArray constructor for the given component type.
 * @param componentType the component type
 * @returns the constructor object
 */
export declare function GetTypedArrayConstructor(componentType: number): TypedArrayConstructor<VertexDataTypedArray>;
/**
 * Enumerates each value of the data array and calls the given callback.
 * @param data the data to enumerate
 * @param byteOffset the byte offset of the data
 * @param byteStride the byte stride of the data
 * @param componentCount the number of components per element
 * @param componentType the type of the component
 * @param count the number of values to enumerate
 * @param normalized whether the data is normalized
 * @param callback the callback function called for each group of component values
 */
export declare function EnumerateFloatValues(data: DataArray, byteOffset: number, byteStride: number, componentCount: number, componentType: number, count: number, normalized: boolean, callback: (values: number[], index: number) => void): void;
/**
 * Gets the given data array as a float array. Float data is constructed if the data array cannot be returned directly.
 * @param data the input data array
 * @param size the number of components
 * @param type the component type
 * @param byteOffset the byte offset of the data
 * @param byteStride the byte stride of the data
 * @param normalized whether the data is normalized
 * @param totalVertices number of vertices in the buffer to take into account
 * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
 * @returns a float array containing vertex data
 */
export declare function GetFloatData(data: DataArray, size: number, type: number, byteOffset: number, byteStride: number, normalized: boolean, totalVertices: number, forceCopy?: boolean): FloatArray;
/**
 * Gets the given data array as a typed array that matches the component type. If the data cannot be used directly, a copy is made to support the new typed array.
 * If the data is number[], byteOffset and byteStride must be a multiple of 4, as data will be treated like a list of floats.
 * @param data the input data array
 * @param size the number of components
 * @param type the component type
 * @param byteOffset the byte offset of the data
 * @param byteStride the byte stride of the data
 * @param normalized whether the data is normalized
 * @param totalVertices number of vertices in the buffer to take into account
 * @param forceCopy defines a boolean indicating that the returned array must be cloned upon returning it
 * @returns a typed array containing vertex data
 */
export declare function GetTypedArrayData(data: DataArray, size: number, type: number, byteOffset: number, byteStride: number, normalized: boolean, totalVertices: number, forceCopy?: boolean): VertexDataTypedArray;
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
/**
 * Utility function to determine if an IndicesArray is an Uint32Array. If indices is an Array, determines whether at least one index is 32 bits.
 * @param indices The IndicesArray to check.
 * @param count The number of indices. Only used if indices is an Array.
 * @param start The offset to start at (default: 0). Only used if indices is an Array.
 * @param offset The offset to substract from the indices before testing (default: 0). Only used if indices is an Array.
 * @returns True if the indices use 32 bits
 */
export declare function AreIndices32Bits(indices: IndicesArray, count: number, start?: number, offset?: number): boolean;
/**
 * Creates a typed array suitable for GPU buffer operations, as some engines require CPU buffer sizes to be aligned to specific boundaries (e.g., 4 bytes).
 * The use of non-aligned arrays still works but may result in a performance penalty.
 * @param type The type of the array. For instance, Float32Array or Uint8Array
 * @param elementCount The number of elements to store in the array
 * @returns The aligned typed array
 */
export declare function CreateAlignedTypedArray<T extends TypedArray>(type: TypedArrayConstructor<T>, elementCount: number): T;
