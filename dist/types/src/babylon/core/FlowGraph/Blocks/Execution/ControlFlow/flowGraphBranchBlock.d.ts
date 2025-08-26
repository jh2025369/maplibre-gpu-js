import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import { FlowGraphExecutionBlock } from "../../../flowGraphExecutionBlock";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
/**
 * A block that evaluates a condition and activates one of two branches.
 */
export declare class FlowGraphBranchBlock extends FlowGraphExecutionBlock {
    /**
     * Input connection: The condition to evaluate.
     */
    readonly condition: FlowGraphDataConnection<boolean>;
    /**
     * Output connection: The branch to execute if the condition is true.
     */
    readonly onTrue: FlowGraphSignalConnection;
    /**
     * Output connection: The branch to execute if the condition is false.
     */
    readonly onFalse: FlowGraphSignalConnection;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
