import { Vector3, Vector2 } from "core/Maths/math.vector";
/**
 * Interface representing a generic flow graph matrix.
 */
export interface IFlowGraphMatrix<VectorType> {
    /**
     * The matrix elements stored in a row-major order.
     */
    m: number[];
    /**
     * Transforms a vector using this matrix.
     *
     * @param v - The vector to transform.
     * @returns The transformed vector.
     */
    transformVector(v: VectorType): VectorType;
    /**
     * Transforms a vector using this matrix and stores the result in a reference vector.
     *
     * @param v - The vector to transform.
     * @param result - The vector to store the result.
     * @returns The transformed vector.
     */
    transformVectorToRef(v: VectorType, result: VectorType): VectorType;
    /**
     * Returns the matrix elements as an array.
     *
     * @returns The matrix elements as an array.
     */
    asArray(): number[];
    /**
     * Copies the matrix elements to an array.
     *
     * @param emptyArray - The array to copy the elements to.
     * @returns The array with the matrix elements.
     */
    toArray(emptyArray: number[]): number[];
    /**
     * Sets the matrix elements from an array.
     *
     * @param array - The array containing the matrix elements.
     * @returns The updated matrix.
     */
    fromArray(array: number[]): IFlowGraphMatrix<VectorType>;
    /**
     * Multiplies this matrix with another matrix and stores the result in a reference matrix.
     *
     * @param other - The matrix to multiply with.
     * @param result - The matrix to store the result.
     * @returns The result matrix.
     */
    multiplyToRef(other: IFlowGraphMatrix<VectorType>, result: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Multiplies this matrix with another matrix.
     * To staz conform with the Matrix class, this does B * A
     *
     * @param other - The matrix to multiply with.
     * @returns The result matrix.
     */
    multiply(other: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Divides this matrix by another matrix and stores the result in a reference matrix.
     *
     * @param other - The matrix to divide by.
     * @param result - The matrix to store the result.
     * @returns The result matrix.
     */
    divideToRef(other: IFlowGraphMatrix<VectorType>, result: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Divides this matrix by another matrix.
     *
     * @param other - The matrix to divide by.
     * @returns The result matrix.
     */
    divide(other: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Adds another matrix to this matrix and stores the result in a reference matrix.
     *
     * @param other - The matrix to add.
     * @param result - The matrix to store the result.
     * @returns The result matrix.
     */
    addToRef(other: IFlowGraphMatrix<VectorType>, result: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Adds another matrix to this matrix.
     *
     * @param other - The matrix to add.
     * @returns The result matrix.
     */
    add(other: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Subtracts another matrix from this matrix and stores the result in a reference matrix.
     *
     * @param other - The matrix to subtract.
     * @param result - The matrix to store the result.
     * @returns The result matrix.
     */
    subtractToRef(other: IFlowGraphMatrix<VectorType>, result: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Subtracts another matrix from this matrix.
     *
     * @param other - The matrix to subtract.
     * @returns The result matrix.
     */
    subtract(other: IFlowGraphMatrix<VectorType>): IFlowGraphMatrix<VectorType>;
    /**
     * Transposes this matrix.
     *
     * @returns The transposed matrix.
     */
    transpose(): IFlowGraphMatrix<VectorType>;
    /**
     * Computes the determinant of this matrix.
     *
     * @returns The determinant of the matrix.
     */
    determinant(): number;
    /**
     * Computes the inverse of this matrix.
     *
     * @returns The inverse of the matrix.
     * @throws Error if the matrix is not invertible.
     */
    inverse(): IFlowGraphMatrix<VectorType>;
    /**
     * Gets the class name of this matrix.
     *
     * @returns The class name.
     */
    getClassName(): string;
    /**
     * Checks if this matrix is equal to another matrix within an optional epsilon.
     *
     * @param other - The matrix to compare with.
     * @param epsilon - The optional epsilon for comparison.
     * @returns True if the matrices are equal, false otherwise.
     */
    equals(other: IFlowGraphMatrix<VectorType>, epsilon?: number): boolean;
}
/**
 * A 2x2 matrix.
 */
export declare class FlowGraphMatrix2D implements IFlowGraphMatrix<Vector2> {
    /**
     * @internal
     */
    _m: number[];
    constructor(m?: number[]);
    get m(): number[];
    transformVector(v: Vector2): Vector2;
    transformVectorToRef(v: Vector2, result: Vector2): Vector2;
    asArray(): number[];
    toArray(emptyArray?: number[]): number[];
    fromArray(array: number[]): FlowGraphMatrix2D;
    multiplyToRef(other: FlowGraphMatrix2D, result: FlowGraphMatrix2D): FlowGraphMatrix2D;
    multiply(other: FlowGraphMatrix2D): FlowGraphMatrix2D;
    divideToRef(other: FlowGraphMatrix2D, result: FlowGraphMatrix2D): FlowGraphMatrix2D;
    divide(other: FlowGraphMatrix2D): FlowGraphMatrix2D;
    addToRef(other: FlowGraphMatrix2D, result: FlowGraphMatrix2D): FlowGraphMatrix2D;
    add(other: FlowGraphMatrix2D): FlowGraphMatrix2D;
    subtractToRef(other: FlowGraphMatrix2D, result: FlowGraphMatrix2D): FlowGraphMatrix2D;
    subtract(other: FlowGraphMatrix2D): FlowGraphMatrix2D;
    transpose(): FlowGraphMatrix2D;
    determinant(): number;
    inverse(): FlowGraphMatrix2D;
    equals(other: IFlowGraphMatrix<Vector2>, epsilon?: number): boolean;
    getClassName(): string;
    toString(): string;
}
/**
 * A 3x3 matrix.
 */
export declare class FlowGraphMatrix3D implements IFlowGraphMatrix<Vector3> {
    /**
     * @internal
     */
    _m: number[];
    constructor(array?: number[]);
    get m(): number[];
    transformVector(v: Vector3): Vector3;
    transformVectorToRef(v: Vector3, result: Vector3): Vector3;
    multiplyToRef(other: FlowGraphMatrix3D, result: FlowGraphMatrix3D): FlowGraphMatrix3D;
    multiply(other: FlowGraphMatrix3D): FlowGraphMatrix3D;
    divideToRef(other: FlowGraphMatrix3D, result: FlowGraphMatrix3D): FlowGraphMatrix3D;
    divide(other: FlowGraphMatrix3D): FlowGraphMatrix3D;
    addToRef(other: FlowGraphMatrix3D, result: FlowGraphMatrix3D): FlowGraphMatrix3D;
    add(other: FlowGraphMatrix3D): FlowGraphMatrix3D;
    subtractToRef(other: FlowGraphMatrix3D, result: FlowGraphMatrix3D): FlowGraphMatrix3D;
    subtract(other: FlowGraphMatrix3D): FlowGraphMatrix3D;
    toArray(emptyArray?: number[]): number[];
    asArray(): number[];
    fromArray(array: number[]): FlowGraphMatrix3D;
    transpose(): FlowGraphMatrix3D;
    determinant(): number;
    inverse(): FlowGraphMatrix3D;
    equals(other: IFlowGraphMatrix<Vector3>, epsilon?: number): boolean;
    getClassName(): string;
    toString(): string;
}
