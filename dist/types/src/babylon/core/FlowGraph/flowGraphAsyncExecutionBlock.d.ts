import type { IFlowGraphBlockConfiguration } from "./flowGraphBlock";
import type { FlowGraphContext } from "./flowGraphContext";
import { FlowGraphExecutionBlockWithOutSignal } from "./flowGraphExecutionBlockWithOutSignal";
import type { FlowGraphSignalConnection } from "./flowGraphSignalConnection";
/**
 * An async execution block can start tasks that will be executed asynchronously.
 * It should also be responsible for clearing it in _cancelPendingTasks.
 */
export declare abstract class FlowGraphAsyncExecutionBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Output connection: The signal that is triggered when the asynchronous execution of this block is done.
     */
    done: FlowGraphSignalConnection;
    protected _eventsSignalOutputs: {
        [eventName: string]: FlowGraphSignalConnection;
    };
    constructor(config?: IFlowGraphBlockConfiguration, events?: string[]);
    /**
     * @internal
     * This function can be overridden to start any
     * pending tasks this node might have, such as
     * timeouts and playing animations.
     * @param context
     */
    abstract _preparePendingTasks(context: FlowGraphContext): void;
    /**
     * @internal
     * This function can be overridden to execute any
     * logic that should be executed on every frame
     * while the async task is pending.
     * @param context the context in which it is running
     */
    _executeOnTick(_context: FlowGraphContext): void;
    /**
     * @internal
     * @param context
     */
    _startPendingTasks(context: FlowGraphContext): void;
    _resetAfterCanceled(context: FlowGraphContext): void;
    abstract _cancelPendingTasks(context: FlowGraphContext): void;
}
