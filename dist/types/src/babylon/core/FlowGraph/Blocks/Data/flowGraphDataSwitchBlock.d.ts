import { FlowGraphBlock, type IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { FlowGraphNumber } from "core/FlowGraph/utils";
export interface IFlowGraphDataSwitchBlockConfiguration<T> extends IFlowGraphBlockConfiguration {
    /**
     * The possible values for the selection.
     *
     */
    cases: FlowGraphNumber[];
    /**
     * If true, the cases will be treated as integers, meaning 1.1, 1.0, 0.1e1  and 1 will a single case - "1".
     * This is the default behavior in glTF interactivity.
     */
    treatCasesAsIntegers?: boolean;
}
/**
 * This block conditionally outputs one of its inputs, based on a condition and a list of cases.
 *
 * This of it as a passive (data) version of the switch statement in programming languages.
 */
export declare class FlowGraphDataSwitchBlock<T> extends FlowGraphBlock {
    /**
     * the configuration of the block
     */
    config: IFlowGraphDataSwitchBlockConfiguration<T>;
    /**
     * Current selection value.
     */
    readonly case: FlowGraphDataConnection<FlowGraphNumber>;
    /**
     * Input: default value to output if no case is matched.
     */
    readonly default: FlowGraphDataConnection<T>;
    /**
     * Output: the value that is output based on the selection.
     */
    readonly value: FlowGraphDataConnection<T | undefined>;
    private _inputCases;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphDataSwitchBlockConfiguration<T>);
    _updateOutputs(context: FlowGraphContext): void;
    private _getOutputValueForCase;
    getClassName(): string;
}
