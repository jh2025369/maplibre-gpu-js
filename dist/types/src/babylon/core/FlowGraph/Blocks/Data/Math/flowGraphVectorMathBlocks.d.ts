import { FlowGraphBlock, type IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphTypes } from "core/FlowGraph/flowGraphRichTypes";
import { FlowGraphBinaryOperationBlock } from "../flowGraphBinaryOperationBlock";
import { FlowGraphUnaryOperationBlock } from "../flowGraphUnaryOperationBlock";
import { Quaternion, Vector3 } from "core/Maths/math.vector";
import type { Matrix, Vector2 } from "core/Maths/math.vector";
import type { FlowGraphMatrix, FlowGraphVector } from "core/FlowGraph/utils";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import type { FlowGraphContext } from "../../../flowGraphContext";
/**
 * Vector length block.
 */
export declare class FlowGraphLengthBlock extends FlowGraphUnaryOperationBlock<FlowGraphVector, number> {
    constructor(config?: IFlowGraphBlockConfiguration);
    private _polymorphicLength;
}
/**
 * Configuration for normalized vector
 */
export interface IFlowGraphNormalizeBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * If true, the block will return NaN if the input vector has a length of 0.
     * This is the expected behavior for glTF interactivity graphs.
     */
    nanOnZeroLength?: boolean;
}
/**
 * Vector normalize block.
 */
export declare class FlowGraphNormalizeBlock extends FlowGraphUnaryOperationBlock<FlowGraphVector, FlowGraphVector> {
    constructor(config?: IFlowGraphNormalizeBlockConfiguration);
    private _polymorphicNormalize;
}
/**
 * Dot product block.
 */
export declare class FlowGraphDotBlock extends FlowGraphBinaryOperationBlock<FlowGraphVector, FlowGraphVector, number> {
    constructor(config?: IFlowGraphBlockConfiguration);
    private _polymorphicDot;
}
/**
 * Cross product block.
 */
export declare class FlowGraphCrossBlock extends FlowGraphBinaryOperationBlock<Vector3, Vector3, Vector3> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * 2D rotation block.
 */
export declare class FlowGraphRotate2DBlock extends FlowGraphBinaryOperationBlock<Vector2, number, Vector2> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * 3D rotation block.
 */
export declare class FlowGraphRotate3DBlock extends FlowGraphBinaryOperationBlock<Vector3, Quaternion, Vector3> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * Configuration for the transform block.
 */
export interface IFlowGraphTransformBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The vector type
     */
    vectorType: FlowGraphTypes;
}
/**
 * Transform a vector3 by a matrix.
 */
export declare class FlowGraphTransformBlock extends FlowGraphBinaryOperationBlock<FlowGraphVector, FlowGraphMatrix, FlowGraphVector> {
    constructor(config?: IFlowGraphTransformBlockConfiguration);
}
/**
 * Transform a vector3 by a matrix.
 */
export declare class FlowGraphTransformCoordinatesBlock extends FlowGraphBinaryOperationBlock<Vector3, Matrix, Vector3> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * Conjugate the quaternion.
 */
export declare class FlowGraphConjugateBlock extends FlowGraphUnaryOperationBlock<Quaternion, Quaternion> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * Get the angle between two quaternions.
 */
export declare class FlowGraphAngleBetweenBlock extends FlowGraphBinaryOperationBlock<Quaternion, Quaternion, number> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * Get the quaternion from an axis and an angle.
 */
export declare class FlowGraphQuaternionFromAxisAngleBlock extends FlowGraphBinaryOperationBlock<Vector3, number, Quaternion> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * Get the axis and angle from a quaternion.
 */
export declare class FlowGraphAxisAngleFromQuaternionBlock extends FlowGraphBlock {
    /**
     * The input of this block.
     */
    readonly a: FlowGraphDataConnection<Quaternion>;
    /**
     * The output axis of rotation.
     */
    readonly axis: FlowGraphDataConnection<Vector3>;
    /**
     * The output angle of rotation.
     */
    readonly angle: FlowGraphDataConnection<number>;
    /**
     * Output connection: Whether the value is valid.
     */
    readonly isValid: FlowGraphDataConnection<boolean>;
    constructor(config?: IFlowGraphBlockConfiguration);
    /** @override */
    _updateOutputs(context: FlowGraphContext): void;
    /** @override */
    getClassName(): string;
}
/**
 * Get the quaternion from two direction vectors.
 */
export declare class FlowGraphQuaternionFromDirectionsBlock extends FlowGraphBinaryOperationBlock<Vector3, Vector3, Quaternion> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
