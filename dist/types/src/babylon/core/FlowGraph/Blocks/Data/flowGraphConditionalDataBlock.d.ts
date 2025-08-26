import type { FlowGraphContext } from "../../flowGraphContext";
import { FlowGraphBlock } from "../../flowGraphBlock";
import type { FlowGraphDataConnection } from "../../flowGraphDataConnection";
import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
/**
 * Block that returns a value based on a condition.
 */
export declare class FlowGraphConditionalDataBlock<T> extends FlowGraphBlock {
    /**
     * Input connection: The condition to check.
     */
    readonly condition: FlowGraphDataConnection<boolean>;
    /**
     * Input connection: The value to return if the condition is true.
     */
    readonly onTrue: FlowGraphDataConnection<T>;
    /**
     * Input connection: The value to return if the condition is false.
     */
    readonly onFalse: FlowGraphDataConnection<T>;
    /**
     * Output connection: The value that was returned.
     */
    readonly output: FlowGraphDataConnection<T>;
    /**
     * Creates a new instance of the block
     * @param config optional configuration for this block
     */
    constructor(config?: IFlowGraphBlockConfiguration);
    /**
     * @internal
     */
    _updateOutputs(context: FlowGraphContext): void;
    /**
     * Gets the class name of this block
     * @returns the class name
     */
    getClassName(): string;
}
