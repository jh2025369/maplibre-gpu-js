import type { RichType } from "core/FlowGraph/flowGraphRichTypes";
import { FlowGraphExecutionBlockWithOutSignal } from "../../flowGraphExecutionBlockWithOutSignal";
import type { FlowGraphContext } from "../../flowGraphContext";
import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
/**
 * Parameters used to create a FlowGraphSendCustomEventBlock.
 */
export interface IFlowGraphSendCustomEventBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The id of the event to send.
     * Note - in the glTF specs this is an index to the event array (i.e. - a number)
     */
    eventId: string;
    /**
     * The names of the data inputs for that event.
     */
    eventData: {
        [key: string]: {
            type: RichType<any>;
            value?: any;
        };
    };
}
/**
 * A block that sends a custom event.
 * To receive this event you need to use the ReceiveCustomEvent block.
 * This block has no output, but does have inputs based on the eventData from the configuration.
 * @see FlowGraphReceiveCustomEventBlock
 */
export declare class FlowGraphSendCustomEventBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * the configuration of the block
     */
    config: IFlowGraphSendCustomEventBlockConfiguration;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphSendCustomEventBlockConfiguration);
    _execute(context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
