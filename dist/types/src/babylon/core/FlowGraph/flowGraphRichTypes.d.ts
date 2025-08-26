import { Vector2, Vector3, Vector4, Matrix, Quaternion } from "../Maths/math.vector";
import { Color3, Color4 } from "../Maths/math.color";
import { FlowGraphInteger } from "./CustomTypes/flowGraphInteger";
import { FlowGraphMatrix2D, FlowGraphMatrix3D } from "./CustomTypes/flowGraphMatrix";
/**
 * The types supported by the flow graph.
 */
export declare const enum FlowGraphTypes {
    Any = "any",
    String = "string",
    Number = "number",
    Boolean = "boolean",
    Object = "object",
    Integer = "FlowGraphInteger",
    Vector2 = "Vector2",
    Vector3 = "Vector3",
    Vector4 = "Vector4",
    Quaternion = "Quaternion",
    Matrix = "Matrix",
    Matrix2D = "Matrix2D",
    Matrix3D = "Matrix3D",
    Color3 = "Color3",
    Color4 = "Color4"
}
/**
 * A rich type represents extra information about a type,
 * such as its name and a default value constructor.
 */
export declare class RichType<T> {
    /**
     * The name given to the type.
     */
    typeName: string;
    /**
     * The default value of the type.
     */
    defaultValue: T;
    /**
     * [-1] The ANIMATIONTYPE of the type, if available
     */
    animationType: number;
    /**
     * A function that can be used to transform a value of any type into a value of this rich type.
     * This can be used, for example, between vector4 and quaternion.
     */
    typeTransformer: (value: any) => T;
    constructor(
    /**
     * The name given to the type.
     */
    typeName: string, 
    /**
     * The default value of the type.
     */
    defaultValue: T, 
    /**
     * [-1] The ANIMATIONTYPE of the type, if available
     */
    animationType?: number);
    /**
     * Serializes this rich type into a serialization object.
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject: any): void;
}
export declare const RichTypeAny: RichType<any>;
export declare const RichTypeString: RichType<string>;
export declare const RichTypeNumber: RichType<number>;
export declare const RichTypeBoolean: RichType<boolean>;
export declare const RichTypeVector2: RichType<Vector2>;
export declare const RichTypeVector3: RichType<Vector3>;
export declare const RichTypeVector4: RichType<Vector4>;
export declare const RichTypeMatrix: RichType<Matrix>;
export declare const RichTypeMatrix2D: RichType<FlowGraphMatrix2D>;
export declare const RichTypeMatrix3D: RichType<FlowGraphMatrix3D>;
export declare const RichTypeColor3: RichType<Color3>;
export declare const RichTypeColor4: RichType<Color4>;
export declare const RichTypeQuaternion: RichType<Quaternion>;
export declare const RichTypeFlowGraphInteger: RichType<FlowGraphInteger>;
/**
 * Given a value, try to deduce its rich type.
 * @param value the value to deduce the rich type from
 * @returns the value's rich type, or RichTypeAny if the type could not be deduced.
 */
export declare function getRichTypeFromValue<T>(value: T): RichType<T>;
/**
 * Given a flow graph type, return the rich type that corresponds to it.
 * @param flowGraphType the flow graph type
 * @returns the rich type that corresponds to the flow graph type
 */
export declare function getRichTypeByFlowGraphType(flowGraphType?: string): RichType<any>;
/**
 * get the animation type for a given flow graph type
 * @param flowGraphType the flow graph type
 * @returns the animation type for this flow graph type
 */
export declare function getAnimationTypeByFlowGraphType(flowGraphType: FlowGraphTypes): number;
/**
 * Given an animation type, return the rich type that corresponds to it.
 * @param animationType the animation type
 * @returns the rich type that corresponds to the animation type
 */
export declare function getRichTypeByAnimationType(animationType: number): RichType<any>;
