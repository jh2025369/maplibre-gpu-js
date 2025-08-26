import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { FlowGraphNumber } from "core/FlowGraph/utils";
import type { Nullable } from "core/types";
/**
 * This simple Util block takes an array as input and selects a single element from it.
 */
export declare class FlowGraphArrayIndexBlock<T = any> extends FlowGraphBlock {
    config: IFlowGraphBlockConfiguration;
    /**
     * Input connection: The array to select from.
     */
    readonly array: FlowGraphDataConnection<T[]>;
    /**
     * Input connection: The index to select.
     */
    readonly index: FlowGraphDataConnection<FlowGraphNumber>;
    /**
     * Output connection: The selected element.
     */
    readonly value: FlowGraphDataConnection<Nullable<T>>;
    /**
     * Construct a FlowGraphArrayIndexBlock.
     * @param config construction parameters
     */
    constructor(config: IFlowGraphBlockConfiguration);
    /**
     * @internal
     */
    _updateOutputs(context: FlowGraphContext): void;
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject?: any): void;
    getClassName(): string;
}
