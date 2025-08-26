import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
import { FlowGraphBlock } from "../../flowGraphBlock";
import type { FlowGraphContext } from "../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../flowGraphDataConnection";
import type { RichType } from "../../flowGraphRichTypes";
/**
 * A block that will cache the result of an operation and deliver it as an output.
 */
export declare abstract class FlowGraphCachedOperationBlock<OutputT> extends FlowGraphBlock {
    /**
     * The output of the operation
     */
    readonly value: FlowGraphDataConnection<OutputT>;
    /**
     * Output connection: Whether the value is valid.
     */
    readonly isValid: FlowGraphDataConnection<boolean>;
    constructor(outputRichType: RichType<OutputT>, config?: IFlowGraphBlockConfiguration);
    /**
     * @internal
     * Operation to realize
     * @param context the graph context
     */
    abstract _doOperation(context: FlowGraphContext): OutputT | undefined;
    _updateOutputs(context: FlowGraphContext): void;
}
