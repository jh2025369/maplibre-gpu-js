import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import { FlowGraphExecutionBlock } from "../../../flowGraphExecutionBlock";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
/**
 * Configuration for the multi gate block.
 */
export interface IFlowGraphMultiGateBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The number of output signals. Required.
     */
    outputSignalCount: number;
    /**
     * If the block should pick a random output flow from the ones that haven't been executed. Default to false.
     */
    isRandom?: boolean;
    /**
     * If the block should loop back to the first output flow after executing the last one. Default to false.
     */
    isLoop?: boolean;
}
/**
 * A block that has an input flow and routes it to any potential output flows, randomly or sequentially
 */
export declare class FlowGraphMultiGateBlock extends FlowGraphExecutionBlock {
    /**
     * the configuration of the block
     */
    config: IFlowGraphMultiGateBlockConfiguration;
    /**
     * Input connection: Resets the gate.
     */
    readonly reset: FlowGraphSignalConnection;
    /**
     * Output connections: The output signals.
     */
    readonly outputSignals: FlowGraphSignalConnection[];
    /**
     * Output connection: The index of the current output flow.
     */
    readonly lastIndex: FlowGraphDataConnection<FlowGraphInteger>;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphMultiGateBlockConfiguration);
    private _getNextIndex;
    /**
     * Sets the block's output signals. Would usually be passed from the constructor but can be changed afterwards.
     * @param numberOutputSignals the number of output flows
     */
    setNumberOfOutputSignals(numberOutputSignals?: number): void;
    _execute(context: FlowGraphContext, callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
    /**
     * Serializes the block.
     * @param serializationObject the object to serialize to.
     */
    serialize(serializationObject?: any): void;
}
