import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { FlowGraphSignalConnection } from "core/FlowGraph/flowGraphSignalConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "core/FlowGraph/flowGraphExecutionBlockWithOutSignal";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
/**
 * @experimental
 * This block debounces the execution of a input, i.e. ensures that the input is only executed once every X times
 */
export declare class FlowGraphDebounceBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input: The number of times the input must be executed before the onDone signal is activated
     */
    readonly count: FlowGraphDataConnection<number>;
    /**
     * Input: Resets the debounce counter
     */
    readonly reset: FlowGraphSignalConnection;
    /**
     * Output: The current count of the debounce counter
     */
    readonly currentCount: FlowGraphDataConnection<number>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext, callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
