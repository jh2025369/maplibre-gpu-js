import { FlowGraphAsyncExecutionBlock } from "../../../flowGraphAsyncExecutionBlock";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
/**
 * Block that sets a delay in seconds before activating the output signal.
 */
export declare class FlowGraphSetDelayBlock extends FlowGraphAsyncExecutionBlock {
    /**
     * The maximum number of parallel delays that can be set per node.
     */
    static MaxParallelDelayCount: number;
    /**
     * Input signal: If activated the delayed activations set by this block will be canceled.
     */
    readonly cancel: FlowGraphSignalConnection;
    /**
     * Input connection: The duration of the delay in seconds.
     */
    readonly duration: FlowGraphDataConnection<number>;
    /**
     * Output connection: The last delay index that was set.
     */
    readonly lastDelayIndex: FlowGraphDataConnection<FlowGraphInteger>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _preparePendingTasks(context: FlowGraphContext): void;
    _cancelPendingTasks(context: FlowGraphContext): void;
    _execute(context: FlowGraphContext, callingSignal: FlowGraphSignalConnection): void;
    getClassName(): string;
    private _onEnded;
    private _updateGlobalTimers;
}
