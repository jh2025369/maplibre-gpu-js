import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
export type CodeExecutionFunction = (value: any, context: FlowGraphContext) => any;
/**
 * This block takes in a function that is defined OUTSIDE of the flow graph and executes it.
 * The function can be a normal function or an async function.
 * The function's arguments will be the value of the input connection as the first variable, and the flow graph context as the second variable.
 */
export declare class FlowGraphCodeExecutionBlock extends FlowGraphBlock {
    config: IFlowGraphBlockConfiguration;
    /**
     * Input connection: The function to execute.
     */
    readonly executionFunction: FlowGraphDataConnection<CodeExecutionFunction>;
    /**
     * Input connection: The value to pass to the function.
     */
    readonly value: FlowGraphDataConnection<any>;
    /**
     * Output connection: The result of the function.
     */
    readonly result: FlowGraphDataConnection<any>;
    /**
     * Construct a FlowGraphCodeExecutionBlock.
     * @param config construction parameters
     */
    constructor(config: IFlowGraphBlockConfiguration);
    /**
     * @internal
     */
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
