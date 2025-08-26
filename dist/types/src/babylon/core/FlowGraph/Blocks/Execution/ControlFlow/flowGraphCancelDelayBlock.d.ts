import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "../../../flowGraphExecutionBlockWithOutSignal";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import type { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
/**
 * This block cancels a delay that was previously scheduled.
 */
export declare class FlowGraphCancelDelayBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input connection: The index value of the scheduled activation to be cancelled.
     */
    readonly delayIndex: FlowGraphDataConnection<FlowGraphInteger>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    getClassName(): string;
}
