import type { Matrix, Quaternion, Vector2, Vector3, Vector4 } from "core/Maths/math.vector";
import type { Node } from "../node";
import type { FlowGraphInteger } from "./CustomTypes/flowGraphInteger";
import type { FlowGraphMatrix2D, FlowGraphMatrix3D } from "./CustomTypes/flowGraphMatrix";
/**
 * @internal
 * Returns if mesh1 is a descendant of mesh2
 * @param mesh1
 * @param mesh2
 * @returns
 */
export declare function _IsDescendantOf(mesh1: Node, mesh2: Node): boolean;
export type FlowGraphNumber = number | FlowGraphInteger;
export type FlowGraphVector = Vector2 | Vector3 | Vector4 | Quaternion;
export type FlowGraphMatrix = Matrix | FlowGraphMatrix2D | FlowGraphMatrix3D;
export type FlowGraphMathOperationType = FlowGraphNumber | FlowGraphVector | FlowGraphMatrix | boolean;
/**
 * @internal
 */
export declare function _GetClassNameOf(v: any): any;
/**
 * @internal
 * Check if two classname are the same and are vector or quaternion classes.
 * @param className the first class name
 * @param className2 the second class name
 * @returns whether the two class names are the same and are vector or quaternion classes.
 */
export declare function _AreSameVectorOrQuaternionClass(className: string, className2: string): boolean;
/**
 * @internal
 * Check if two classname are the same and are matrix classes.
 * @param className the first class name
 * @param className2 the second class name
 * @returns whether the two class names are the same and are matrix classes.
 */
export declare function _AreSameMatrixClass(className: string, className2: string): boolean;
/**
 * @internal
 * Check if two classname are the same and are integer classes.
 * @param className the first class name
 * @param className2 the second class name
 * @returns whether the two class names are the same and are integer classes.
 */
export declare function _AreSameIntegerClass(className: string, className2: string): boolean;
/**
 * Check if an object has a numeric value.
 * @param a the object to check if it is a number.
 * @param validIfNaN whether to consider NaN as a valid number.
 * @returns whether a is a FlowGraphNumber (Integer or number).
 */
export declare function isNumeric(a: FlowGraphMathOperationType, validIfNaN?: boolean): a is FlowGraphNumber;
/**
 * Get the numeric value of a FlowGraphNumber.
 * @param a the object to get the numeric value from.
 * @returns the numeric value.
 */
export declare function getNumericValue(a: FlowGraphNumber): number;
