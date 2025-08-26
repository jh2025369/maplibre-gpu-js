import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import { FlowGraphExecutionBlock } from "../../../flowGraphExecutionBlock";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import type { FlowGraphNumber } from "core/FlowGraph/utils";
/**
 * Configuration for a switch block.
 */
export interface IFlowGraphSwitchBlockConfiguration<T> extends IFlowGraphBlockConfiguration {
    /**
     * The possible values for the selection.
     */
    cases: T[];
}
/**
 * A block that executes a branch based on a selection.
 */
export declare class FlowGraphSwitchBlock<T extends FlowGraphNumber> extends FlowGraphExecutionBlock {
    /**
     * the configuration of the block
     */
    config: IFlowGraphSwitchBlockConfiguration<T>;
    /**
     * Input connection: The value of the selection.
     */
    readonly case: FlowGraphDataConnection<T>;
    /**
     * The default case to execute if no other case is found.
     */
    readonly default: FlowGraphSignalConnection;
    private _caseToOutputFlow;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphSwitchBlockConfiguration<T>);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    /**
     * Adds a new case to the switch block.
     * @param newCase the new case to add.
     */
    addCase(newCase: T): void;
    /**
     * Removes a case from the switch block.
     * @param caseToRemove the case to remove.
     */
    removeCase(caseToRemove: T): void;
    /**
     * @internal
     */
    _getOutputFlowForCase(caseValue: T): FlowGraphSignalConnection;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
    /**
     * Serialize the block to a JSON representation.
     * @param serializationObject the object to serialize to.
     */
    serialize(serializationObject?: any): void;
}
