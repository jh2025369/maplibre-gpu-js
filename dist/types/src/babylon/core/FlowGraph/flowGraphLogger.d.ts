export declare const enum FlowGraphAction {
    ExecuteBlock = "ExecuteBlock",
    ExecuteEvent = "ExecuteEvent",
    TriggerConnection = "TriggerConnection",
    ContextVariableSet = "ContextVariableSet",
    GlobalVariableSet = "GlobalVariableSet",
    GlobalVariableDelete = "GlobalVariableDelete",
    GlobalVariableGet = "GlobalVariableGet",
    AddConnection = "AddConnection",
    GetConnectionValue = "GetConnectionValue",
    SetConnectionValue = "SetConnectionValue",
    ActivateSignal = "ActivateSignal",
    ContextVariableGet = "ContextVariableGet"
}
/**
 * An item in the flow graph log.
 */
export interface IFlowGraphLogItem {
    /**
     * The time of the log item.
     */
    time?: number;
    /**
     * The class that triggered the log.
     */
    className: string;
    /**
     * The unique id of the block/module that triggered the log.
     */
    uniqueId: string;
    /**
     * The action that was logged.
     */
    action: FlowGraphAction;
    /**
     * The payload of the log
     * This can be any data that is relevant to the action.
     * For example, the value of a connection, the value of a variable, etc.
     * This is optional.
     */
    payload?: any;
}
/**
 * This class will be responsible of logging the flow graph activity.
 * Note that using this class might reduce performance, as it will log every action, according to the configuration.
 * It attaches to a flow graph and uses meta-programming to replace the methods of the flow graph to add logging abilities.
 */
export declare class FlowGraphLogger {
    /**
     * Whether to log to the console.
     */
    logToConsole: boolean;
    /**
     * The log cache of the flow graph.
     * Each item is a logged item, in order of execution.
     */
    log: IFlowGraphLogItem[];
    addLogItem(item: IFlowGraphLogItem): void;
    getItemsOfType(action: FlowGraphAction): IFlowGraphLogItem[];
}
