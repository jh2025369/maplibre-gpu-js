/**
 * Packs two numbers, interpreted as 8-bit unsigned integers, into a single
 * float.  Unpack them in the shader using the `unpack_float()` function,
 * defined in _prelude.vertex.glsl
 */
export declare function packUint8ToFloat(a: number, b: number): number;
