import type { DeepImmutable } from "../types";
import type { Vector2, Vector4 } from "./math.vector";
import { Quaternion, Vector3 } from "./math.vector";
/**
 * Creates a string representation of the Vector2
 * @param vector defines the Vector2 to stringify
 * @param decimalCount defines the number of decimals to use
 * @returns a string with the Vector2 coordinates.
 */
export declare function Vector2ToFixed(vector: Vector2, decimalCount: number): string;
/**
 * Creates a string representation of the Vector3
 * @param vector defines the Vector3 to stringify
 * @param decimalCount defines the number of decimals to use
 * @returns a string with the Vector3 coordinates.
 */
export declare function Vector3ToFixed(vector: Vector3, decimalCount: number): string;
/**
 * Creates a string representation of the Vector4
 * @param vector defines the Vector4 to stringify
 * @param decimalCount defines the number of decimals to use
 * @returns a string with the Vector4 coordinates.
 */
export declare function Vector4ToFixed(vector: Vector4, decimalCount: number): string;
/**
 * Returns the angle in radians between two quaternions
 * @param q1 defines the first quaternion
 * @param q2 defines the second quaternion
 * @returns the angle in radians between the two quaternions
 */
export declare function GetAngleBetweenQuaternions(q1: DeepImmutable<Quaternion>, q2: DeepImmutable<Quaternion>): number;
/**
 * Creates a quaternion from two direction vectors
 * @param a defines the first direction vector
 * @param b defines the second direction vector
 * @returns the target quaternion
 */
export declare function GetQuaternionFromDirections<T extends Vector3>(a: T, b: T): Quaternion;
/**
 * Creates a quaternion from two direction vectors
 * @param a defines the first direction vector
 * @param b defines the second direction vector
 * @param result defines the target quaternion
 * @returns the target quaternion
 */
export declare function GetQuaternionFromDirectionsToRef<T extends Vector3, ResultT extends Quaternion>(a: T, b: T, result: ResultT): ResultT;
