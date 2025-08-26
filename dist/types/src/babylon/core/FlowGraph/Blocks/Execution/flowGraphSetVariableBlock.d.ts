import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
import type { FlowGraphContext } from "../../flowGraphContext";
import { FlowGraphExecutionBlockWithOutSignal } from "../../flowGraphExecutionBlockWithOutSignal";
import type { FlowGraphSignalConnection } from "../../flowGraphSignalConnection";
/**
 * The configuration of the FlowGraphGetVariableBlock.
 */
export interface IFlowGraphSetVariableBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The name of the variable to set.
     */
    variable?: string;
    /**
     * The name of the variables to set.
     */
    variables?: string[];
}
/**
 * This block will set a variable on the context.
 */
export declare class FlowGraphSetVariableBlock<T> extends FlowGraphExecutionBlockWithOutSignal {
    constructor(config: IFlowGraphSetVariableBlockConfiguration);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    private _saveVariable;
    getClassName(): string;
    serialize(serializationObject?: any): void;
}
