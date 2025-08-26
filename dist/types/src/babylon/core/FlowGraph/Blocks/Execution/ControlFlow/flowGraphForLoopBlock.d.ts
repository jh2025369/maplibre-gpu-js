import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "core/FlowGraph/flowGraphExecutionBlockWithOutSignal";
import type { FlowGraphContext } from "../../../flowGraphContext";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import type { FlowGraphNumber } from "core/FlowGraph/utils";
import { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
/**
 * Configuration for the For Loop block.
 */
export interface IFlowGraphForLoopBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The initial index of the loop.
     * if not set will default to 0
     */
    initialIndex?: FlowGraphNumber;
    /**
     * If set to true, the index of the case will be incremented when the loop is done.
     * This will result that the index will equal endIndex when the loop finished its work.
     * This is the default behavior in glTF interactivity
     */
    incrementIndexWhenLoopDone?: boolean;
}
/**
 * Block that executes an action in a loop.
 */
export declare class FlowGraphForLoopBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * The maximum number of iterations allowed for the loop.
     * If the loop exceeds this number, it will stop. This number is configurable to avoid infinite loops.
     */
    static MaxLoopIterations: number;
    /**
     * Input connection: The start index of the loop.
     */
    readonly startIndex: FlowGraphDataConnection<FlowGraphNumber>;
    /**
     * Input connection: The end index of the loop.
     */
    readonly endIndex: FlowGraphDataConnection<FlowGraphNumber>;
    /**
     * Input connection: The step of the loop.
     */
    readonly step: FlowGraphDataConnection<number>;
    /**
     * Output connection: The current index of the loop.
     */
    readonly index: FlowGraphDataConnection<FlowGraphInteger>;
    /**
     * Output connection: The signal that is activated when the loop body is executed.
     */
    readonly executionFlow: FlowGraphSignalConnection;
    /**
     * Output connection: The completed signal. Triggered when condition is false.
     * No out signal is available.
     */
    readonly completed: FlowGraphSignalConnection;
    constructor(config?: IFlowGraphForLoopBlockConfiguration);
    /**
     * @internal
     */
    _execute(context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
