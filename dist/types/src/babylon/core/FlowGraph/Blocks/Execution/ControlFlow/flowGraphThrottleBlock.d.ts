import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "../../../flowGraphExecutionBlockWithOutSignal";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
/**
 * A block that throttles the execution of its output flow.
 */
export declare class FlowGraphThrottleBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input connection: The duration of the throttle, in seconds.
     */
    readonly duration: FlowGraphDataConnection<number>;
    /**
     * Input connection: Resets the throttle.
     */
    readonly reset: FlowGraphSignalConnection;
    /**
     * Output connection: The time remaining before the throttle is triggering again, in seconds.
     */
    readonly lastRemainingTime: FlowGraphDataConnection<number>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext, callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
