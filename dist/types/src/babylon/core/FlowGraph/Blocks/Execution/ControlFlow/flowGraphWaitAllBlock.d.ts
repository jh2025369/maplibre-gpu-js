import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "../../../flowGraphExecutionBlockWithOutSignal";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
/**
 * Configuration for the wait all block.
 */
export interface IFlowGraphWaitAllBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The number of input signals. There will always be at least one input flow.
     * glTF interactivity has a max of 64 input flows.
     */
    inputSignalCount: number;
}
/**
 * A block that waits for all input flows to be activated before activating its output flow.
 */
export declare class FlowGraphWaitAllBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * the configuration of the block
     */
    config: IFlowGraphWaitAllBlockConfiguration;
    /**
     * Input connection: Resets the block.
     */
    reset: FlowGraphSignalConnection;
    /**
     * Output connection:When the last missing flow is activated
     */
    completed: FlowGraphSignalConnection;
    /**
     * Output connection: The number of remaining inputs to be activated.
     */
    remainingInputs: FlowGraphDataConnection<FlowGraphInteger>;
    /**
     * An array of input signals
     */
    readonly inFlows: FlowGraphSignalConnection[];
    private _cachedActivationState;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphWaitAllBlockConfiguration);
    private _getCurrentActivationState;
    _execute(context: FlowGraphContext, callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
    /**
     * Serializes this block into a object
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject?: any): void;
}
