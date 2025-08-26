import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import { FlowGraphExecutionBlock } from "core/FlowGraph/flowGraphExecutionBlock";
import type { FlowGraphSignalConnection } from "core/FlowGraph/flowGraphSignalConnection";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
/**
 * Configuration for the flip flop block.
 */
export interface IFlowGraphFlipFlopBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The starting value of the flip flop switch
     */
    startValue?: boolean;
}
/**
 * This block flip flops between two outputs.
 */
export declare class FlowGraphFlipFlopBlock extends FlowGraphExecutionBlock {
    /**
     * Output connection: The signal to execute when the variable is on.
     */
    readonly onOn: FlowGraphSignalConnection;
    /**
     * Output connection: The signal to execute when the variable is off.
     */
    readonly onOff: FlowGraphSignalConnection;
    /**
     * Output connection: If the variable is on.
     */
    readonly value: FlowGraphDataConnection<boolean>;
    constructor(config?: IFlowGraphFlipFlopBlockConfiguration);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
