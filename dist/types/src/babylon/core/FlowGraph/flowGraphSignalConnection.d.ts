import type { FlowGraphExecutionBlock } from "./flowGraphExecutionBlock";
import { FlowGraphConnection } from "./flowGraphConnection";
import type { FlowGraphContext } from "./flowGraphContext";
/**
 * Represents a connection point for a signal.
 * When an output point is activated, it will activate the connected input point.
 * When an input point is activated, it will execute the block it belongs to.
 */
export declare class FlowGraphSignalConnection extends FlowGraphConnection<FlowGraphExecutionBlock, FlowGraphSignalConnection> {
    /**
     * Optional payload. Can be used, for example, when an error is thrown to pass additional information.
     */
    payload: any;
    /**
     * The priority of the signal. Signals with higher priority will be executed first.
     * Set priority before adding the connection as sorting happens only when the connection is added.
     */
    priority: number;
    _isSingularConnection(): boolean;
    connectTo(point: FlowGraphSignalConnection): void;
    /**
     * @internal
     */
    _activateSignal(context: FlowGraphContext): void;
}
