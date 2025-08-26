import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphUnaryOperationBlock } from "../flowGraphUnaryOperationBlock";
import { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
/**
 * A block that converts a boolean to a float.
 */
export declare class FlowGraphBooleanToFloat extends FlowGraphUnaryOperationBlock<boolean, number> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * A block that converts a boolean to an integer
 */
export declare class FlowGraphBooleanToInt extends FlowGraphUnaryOperationBlock<boolean, FlowGraphInteger> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * A block that converts a float to a boolean.
 */
export declare class FlowGraphFloatToBoolean extends FlowGraphUnaryOperationBlock<number, boolean> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * A block that converts an integer to a boolean.
 */
export declare class FlowGraphIntToBoolean extends FlowGraphUnaryOperationBlock<FlowGraphInteger, boolean> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * A block that converts an integer to a float.
 */
export declare class FlowGraphIntToFloat extends FlowGraphUnaryOperationBlock<FlowGraphInteger, number> {
    constructor(config?: IFlowGraphBlockConfiguration);
}
/**
 * Configuration for the float to int block.
 */
export interface IFlowGraphFloatToIntConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The rounding mode to use.
     * if not defined, it will use the FlowGraphInteger default rounding ( a | 0 )
     */
    roundingMode?: "floor" | "ceil" | "round";
}
/**
 * A block that converts a float to an integer.
 */
export declare class FlowGraphFloatToInt extends FlowGraphUnaryOperationBlock<number, FlowGraphInteger> {
    constructor(config?: IFlowGraphFloatToIntConfiguration);
}
