import type { FlowGraphContext } from "../../flowGraphContext";
import { FlowGraphEventBlock } from "../../flowGraphEventBlock";
import type { RichType } from "../../flowGraphRichTypes";
import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
/**
 * Parameters used to create a FlowGraphReceiveCustomEventBlock.
 */
export interface IFlowGraphReceiveCustomEventBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The id of the event to receive.
     * This event id is unique to the environment (not the context).
     */
    eventId: string;
    /**
     * The names of the data outputs for that event. Should be in the same order as the event data in
     * SendCustomEvent
     */
    eventData: {
        [key: string]: {
            type: RichType<any>;
        };
    };
}
/**
 * A block that receives a custom event.
 * It saves the event data in the data outputs, based on the provided eventData in the configuration. For example, if the event data is
 * `{ x: { type: RichTypeNumber }, y: { type: RichTypeNumber } }`, the block will have two data outputs: x and y.
 */
export declare class FlowGraphReceiveCustomEventBlock extends FlowGraphEventBlock {
    /**
     * the configuration of the block
     */
    config: IFlowGraphReceiveCustomEventBlockConfiguration;
    initPriority: number;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphReceiveCustomEventBlockConfiguration);
    _preparePendingTasks(context: FlowGraphContext): void;
    _cancelPendingTasks(context: FlowGraphContext): void;
    _executeEvent(_context: FlowGraphContext, _payload: any): boolean;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
