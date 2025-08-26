import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import { FlowGraphTypes } from "core/FlowGraph/flowGraphRichTypes";
import { Matrix, Quaternion, Vector3 } from "core/Maths/math.vector";
import { FlowGraphUnaryOperationBlock } from "../flowGraphUnaryOperationBlock";
import { FlowGraphBinaryOperationBlock } from "../flowGraphBinaryOperationBlock";
import type { FlowGraphMatrix } from "core/FlowGraph/utils";
/**
 * Configuration for the matrix blocks.
 */
export interface IFlowGraphMatrixBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The type of the matrix. Default is Matrix (which is 4x4)
     */
    matrixType: FlowGraphTypes;
}
/**
 * Transposes a matrix.
 */
export declare class FlowGraphTransposeBlock extends FlowGraphUnaryOperationBlock<FlowGraphMatrix, FlowGraphMatrix> {
    /**
     * Creates a new instance of the block.
     * @param config the configuration of the block
     */
    constructor(config?: IFlowGraphMatrixBlockConfiguration);
}
/**
 * Gets the determinant of a matrix.
 */
export declare class FlowGraphDeterminantBlock extends FlowGraphUnaryOperationBlock<FlowGraphMatrix, number> {
    /**
     * Creates a new instance of the block.
     * @param config the configuration of the block
     */
    constructor(config?: IFlowGraphMatrixBlockConfiguration);
}
/**
 * Inverts a matrix.
 */
export declare class FlowGraphInvertMatrixBlock extends FlowGraphUnaryOperationBlock<FlowGraphMatrix, FlowGraphMatrix> {
    /**
     * Creates a new instance of the inverse block.
     * @param config the configuration of the block
     */
    constructor(config?: IFlowGraphMatrixBlockConfiguration);
}
/**
 * Multiplies two matrices.
 */
export declare class FlowGraphMatrixMultiplicationBlock extends FlowGraphBinaryOperationBlock<FlowGraphMatrix, FlowGraphMatrix, FlowGraphMatrix> {
    /**
     * Creates a new instance of the multiplication block.
     * Note - this is similar to the math multiplication if not using matrix per-component multiplication.
     * @param config the configuration of the block
     */
    constructor(config?: IFlowGraphMatrixBlockConfiguration);
}
/**
 * Matrix decompose block
 */
export declare class FlowGraphMatrixDecomposeBlock extends FlowGraphBlock {
    /**
     * The input of this block
     */
    readonly input: FlowGraphDataConnection<Matrix>;
    /**
     * The position output of this block
     */
    readonly position: FlowGraphDataConnection<Vector3>;
    /**
     * The rotation output of this block
     */
    readonly rotationQuaternion: FlowGraphDataConnection<Quaternion>;
    /**
     * The scaling output of this block
     */
    readonly scaling: FlowGraphDataConnection<Vector3>;
    /**
     * Is the matrix valid
     */
    readonly isValid: FlowGraphDataConnection<boolean>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
/**
 * Matrix compose block
 */
export declare class FlowGraphMatrixComposeBlock extends FlowGraphBlock {
    /**
     * The position input of this block
     */
    readonly position: FlowGraphDataConnection<Vector3>;
    /**
     * The rotation input of this block
     */
    readonly rotationQuaternion: FlowGraphDataConnection<Quaternion>;
    /**
     * The scaling input of this block
     */
    readonly scaling: FlowGraphDataConnection<Vector3>;
    /**
     * The output of this block
     */
    readonly value: FlowGraphDataConnection<Matrix>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
