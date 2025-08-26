import type { FlowGraphContext } from "../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../flowGraphDataConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "../../flowGraphExecutionBlockWithOutSignal";
import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
/**
 * Configuration for the console log block.
 */
export interface IFlowGraphConsoleLogBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * An optional message template to use for the log message.
     * If provided, the template can hold placeholders for the message value.
     * For example, if the template is "The message is: \{data\}", a new data input called "data" will be created.
     * The value of the message input will be used to replace the placeholder in the template.
     */
    messageTemplate?: string;
}
/**
 * Block that logs a message to the console.
 */
export declare class FlowGraphConsoleLogBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input connection: The message to log.
     * Will be ignored if a message template is provided.
     */
    readonly message: FlowGraphDataConnection<any>;
    /**
     * Input connection: The log type.
     */
    readonly logType: FlowGraphDataConnection<"log" | "warn" | "error">;
    constructor(config?: IFlowGraphConsoleLogBlockConfiguration);
    /**
     * @internal
     */
    _execute(context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
    private _getMessageValue;
    private _getTemplateMatches;
}
