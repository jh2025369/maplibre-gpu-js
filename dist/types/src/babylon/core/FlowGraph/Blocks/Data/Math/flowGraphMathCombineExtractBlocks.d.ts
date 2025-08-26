import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import { FlowGraphCachedOperationBlock } from "../flowGraphCachedOperationBlock";
import { type RichType } from "core/FlowGraph/flowGraphRichTypes";
import { FlowGraphBlock, type IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { Matrix, Vector2, Vector3, Vector4 } from "core/Maths/math.vector";
import { FlowGraphMatrix2D, FlowGraphMatrix3D } from "core/FlowGraph/CustomTypes/flowGraphMatrix";
declare abstract class FlowGraphMathCombineBlock<ResultT> extends FlowGraphCachedOperationBlock<ResultT> {
    /**
     * Base class for blocks that combine multiple numeric inputs into a single result.
     * Handles registering data inputs and managing cached outputs.
     * @param numberOfInputs The number of input values to combine.
     * @param type The type of the result.
     * @param config The block configuration.
     */
    constructor(numberOfInputs: number, type: RichType<ResultT>, config?: IFlowGraphBlockConfiguration);
}
/**
 * Abstract class representing a flow graph block that extracts multiple outputs from a single input.
 */
declare abstract class FlowGraphMathExtractBlock<InputT> extends FlowGraphBlock {
    /**
     * Creates an instance of FlowGraphMathExtractBlock.
     *
     * @param numberOfOutputs - The number of outputs to be extracted from the input.
     * @param type - The type of the input data.
     * @param config - Optional configuration for the flow graph block.
     */
    constructor(numberOfOutputs: number, type: RichType<InputT>, config?: IFlowGraphBlockConfiguration);
}
/**
 * Combines two floats into a new Vector2
 */
export declare class FlowGraphCombineVector2Block extends FlowGraphMathCombineBlock<Vector2> {
    constructor(config?: IFlowGraphBlockConfiguration);
    /**
     * @internal
     * Combines two floats into a new Vector2
     */
    _doOperation(context: FlowGraphContext): Vector2;
    getClassName(): string;
}
/**
 * Combines three floats into a new Vector3
 */
export declare class FlowGraphCombineVector3Block extends FlowGraphMathCombineBlock<Vector3> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _doOperation(context: FlowGraphContext): Vector3;
    getClassName(): string;
}
/**
 * Combines four floats into a new Vector4
 */
export declare class FlowGraphCombineVector4Block extends FlowGraphMathCombineBlock<Vector4> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _doOperation(context: FlowGraphContext): Vector4;
    getClassName(): string;
}
/**
 * Configuration for the matrix combine blocks.
 */
export interface IFlowGraphCombineMatrixBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * Whether the input is in column-major order. Default is false.
     * Note - Babylon's matrix is the same as WebGL's. So unless your matrix requires transformation, you should leave this as false.
     */
    inputIsColumnMajor?: boolean;
}
/**
 * Combines 16 floats into a new Matrix
 *
 * Note that glTF interactivity's combine4x4 uses column-major order, while Babylon.js uses row-major order.
 */
export declare class FlowGraphCombineMatrixBlock extends FlowGraphMathCombineBlock<Matrix> {
    constructor(config?: IFlowGraphCombineMatrixBlockConfiguration);
    _doOperation(context: FlowGraphContext): Matrix;
    getClassName(): string;
}
/**
 * Combines 4 floats into a new Matrix
 */
export declare class FlowGraphCombineMatrix2DBlock extends FlowGraphMathCombineBlock<FlowGraphMatrix2D> {
    constructor(config?: IFlowGraphCombineMatrixBlockConfiguration);
    _doOperation(context: FlowGraphContext): FlowGraphMatrix2D;
    getClassName(): string;
}
/**
 * Combines 9 floats into a new Matrix3D
 */
export declare class FlowGraphCombineMatrix3DBlock extends FlowGraphMathCombineBlock<FlowGraphMatrix3D> {
    constructor(config?: IFlowGraphCombineMatrixBlockConfiguration);
    _doOperation(context: FlowGraphContext): FlowGraphMatrix3D;
    getClassName(): string;
}
/**
 * Extracts two floats from a Vector2
 */
export declare class FlowGraphExtractVector2Block extends FlowGraphMathExtractBlock<Vector2> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
/**
 * Extracts three floats from a Vector3
 */
export declare class FlowGraphExtractVector3Block extends FlowGraphMathExtractBlock<Vector3> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
/**
 * Extracts four floats from a Vector4
 */
export declare class FlowGraphExtractVector4Block extends FlowGraphMathExtractBlock<Vector4> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
/**
 * Extracts 16 floats from a Matrix
 */
export declare class FlowGraphExtractMatrixBlock extends FlowGraphMathExtractBlock<Matrix> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
/**
 * Extracts 4 floats from a Matrix2D
 */
export declare class FlowGraphExtractMatrix2DBlock extends FlowGraphMathExtractBlock<FlowGraphMatrix2D> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
/**
 * Extracts 4 floats from a Matrix2D
 */
export declare class FlowGraphExtractMatrix3DBlock extends FlowGraphMathExtractBlock<FlowGraphMatrix3D> {
    constructor(config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
export {};
