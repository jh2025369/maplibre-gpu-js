import type { DeepImmutable } from "core/types";
import type { IMatrixLike } from "../math.like";
/** @internal */
export declare class MatrixManagement {
    /** @internal */
    static _UpdateFlagSeed: number;
}
/**
 * Marks the given matrix as dirty
 * @param matrix defines the matrix to mark as dirty
 */
export declare function MarkAsDirty(matrix: IMatrixLike): void;
/**
 * Sets the given matrix to the identity matrix
 * @param result defines the target matrix
 */
export declare function IdentityMatrixToRef(result: IMatrixLike): void;
/**
 * Creates a new translation matrix.
 * @param x defines the x coordinate
 * @param y defines the y coordinate
 * @param z defines the z coordinate
 * @param result defines the target matrix
 */
export declare function TranslationMatrixToRef(x: number, y: number, z: number, result: IMatrixLike): void;
/**
 * Creates a new scaling matrix.
 * @param x defines the scale factor on X axis
 * @param y defines the scale factor on Y axis
 * @param z defines the scale factor on Z axis
 * @param result defines the target matrix
 */
export declare function ScalingMatrixToRef(x: number, y: number, z: number, result: IMatrixLike): void;
/**
 * Multiplies two matrices and stores the result in the target array.
 * @param a defines the first matrix
 * @param b defines the second matrix
 * @param output defines the target array
 * @param offset defines the offset in the target array where to store the result (0 by default)
 */
export declare function MultiplyMatricesToArray(a: DeepImmutable<IMatrixLike>, b: DeepImmutable<IMatrixLike>, output: Float32Array | Array<number>, offset?: number): void;
/**
 * Multiplies two matrices and stores the result in a third matrix.
 * @param a defines the first matrix
 * @param b defines the second matrix
 * @param result defines the target matrix
 * @param offset defines the offset in the target matrix where to store the result (0 by default)
 */
export declare function MultiplyMatricesToRef(a: DeepImmutable<IMatrixLike>, b: DeepImmutable<IMatrixLike>, result: IMatrixLike, offset?: number): void;
/**
 * Populates the given matrix with the current matrix values
 * @param matrix defines the source matrix
 * @param target defines the target matrix
 */
export declare function CopyMatrixToRef(matrix: DeepImmutable<IMatrixLike>, target: IMatrixLike): void;
/**
 * Populates the given array from the starting index with the current matrix values
 * @param matrix defines the source matrix
 * @param array defines the target array
 * @param offset defines the offset in the target array where to start storing values
 */
export declare function CopyMatrixToArray(matrix: DeepImmutable<IMatrixLike>, array: Float32Array | Array<number>, offset?: number): void;
/**
 * Inverts the given matrix and stores the result in the target matrix
 * @param source defines the source matrix
 * @param target defines the target matrix
 * @returns true if the matrix was inverted successfully, false otherwise
 */
export declare function InvertMatrixToRef(source: DeepImmutable<IMatrixLike>, target: IMatrixLike): boolean;
/**
 * Inverts the given matrix and stores the result in the target array
 * @param source defines the source matrix
 * @param target defines the target array
 * @returns true if the matrix was inverted successfully, false otherwise
 */
export declare function InvertMatrixToArray(source: DeepImmutable<IMatrixLike>, target: Float32Array | Array<number>): boolean;
