import type { Scene } from "../scene";
import type { FlowGraphAsyncExecutionBlock } from "./flowGraphAsyncExecutionBlock";
import type { FlowGraphBlock } from "./flowGraphBlock";
import type { FlowGraphDataConnection } from "./flowGraphDataConnection";
import type { FlowGraph } from "./flowGraph";
import type { FlowGraphCoordinator } from "./flowGraphCoordinator";
import { Observable } from "../Misc/observable";
import type { AssetType, FlowGraphAssetType } from "./flowGraphAssetsContext";
import type { IAssetContainer } from "core/IAssetContainer";
import type { Nullable } from "core/types";
import { FlowGraphLogger } from "./flowGraphLogger";
import type { IFlowGraphOnTickEventPayload } from "./Blocks/Event/flowGraphSceneTickEventBlock";
/**
 * Construction parameters for the context.
 */
export interface IFlowGraphContextConfiguration {
    /**
     * The scene that the flow graph context belongs to.
     */
    readonly scene: Scene;
    /**
     * The event coordinator used by the flow graph context.
     */
    readonly coordinator: FlowGraphCoordinator;
    /**
     * The assets context used by the flow graph context.
     * If none is provided, a default one will be created.
     */
    readonly assetsContext?: IAssetContainer;
}
/**
 * Options for parsing a context.
 */
export interface IFlowGraphContextParseOptions {
    /**
     * A function that parses a value from a serialization object.
     * @param key the key of the value
     * @param serializationObject the object containing the value
     * @param scene the current scene
     * @returns
     */
    readonly valueParseFunction?: (key: string, serializationObject: any, assetsContainer: IAssetContainer, scene: Scene) => any;
    /**
     * The graph that the context is being parsed in.
     */
    readonly graph: FlowGraph;
}
/**
 * The context represents the current state and execution of the flow graph.
 * It contains both user-defined variables, which are derived from
 * a more general variable definition, and execution variables that
 * are set by the blocks.
 */
export declare class FlowGraphContext {
    /**
     * A randomly generated GUID for each context.
     */
    uniqueId: string;
    /**
     * These are the variables defined by a user.
     */
    private _userVariables;
    /**
     * These are the variables set by the blocks.
     */
    private _executionVariables;
    /**
     * A context-specific global variables, available to all blocks in the context.
     */
    private _globalContextVariables;
    /**
     * These are the values for the data connection points
     */
    private _connectionValues;
    /**
     * These are the variables set by the graph.
     */
    private readonly _configuration;
    /**
     * These are blocks that have currently pending tasks/listeners that need to be cleaned up.
     */
    private _pendingBlocks;
    /**
     * A monotonically increasing ID for each execution.
     * Incremented for every block executed.
     */
    private _executionId;
    /**
     * Observable that is triggered when a node is executed.
     */
    onNodeExecutedObservable: Observable<FlowGraphBlock>;
    /**
     * The assets context used by the flow graph context.
     * Note that it can be shared between flow graph contexts.
     */
    assetsContext: IAssetContainer;
    /**
     * Whether to treat data as right-handed.
     * This is used when serializing data from a right-handed system, while running the context in a left-handed system, for example in glTF parsing.
     * Default is false.
     */
    treatDataAsRightHanded: boolean;
    private _enableLogging;
    /**
     * The logger used by the context to log actions.
     */
    logger: Nullable<FlowGraphLogger>;
    /**
     * Enable logging on this context
     */
    get enableLogging(): boolean;
    set enableLogging(value: boolean);
    constructor(params: IFlowGraphContextConfiguration);
    /**
     * Check if a user-defined variable is defined.
     * @param name the name of the variable
     * @returns true if the variable is defined
     */
    hasVariable(name: string): boolean;
    /**
     * Set a user-defined variable.
     * @param name the name of the variable
     * @param value the value of the variable
     */
    setVariable(name: string, value: any): void;
    /**
     * Get an assets from the assets context based on its type and index in the array
     * @param type The type of the asset
     * @param index The index of the asset
     * @returns The asset or null if not found
     */
    getAsset<T extends FlowGraphAssetType>(type: T, index: number): Nullable<AssetType<T>>;
    /**
     * Get a user-defined variable.
     * @param name the name of the variable
     * @returns the value of the variable
     */
    getVariable(name: string): any;
    /**
     * Gets all user variables map
     */
    get userVariables(): {
        [key: string]: any;
    };
    /**
     * Get the scene that the context belongs to.
     * @returns the scene
     */
    getScene(): Scene;
    private _getUniqueIdPrefixedName;
    /**
     * @internal
     * @param name name of the variable
     * @param defaultValue default value to return if the variable is not defined
     * @returns the variable value or the default value if the variable is not defined
     */
    _getGlobalContextVariable<T>(name: string, defaultValue: T): T;
    /**
     * Set a global context variable
     * @internal
     * @param name the name of the variable
     * @param value the value of the variable
     */
    _setGlobalContextVariable<T>(name: string, value: T): void;
    /**
     * Delete a global context variable
     * @internal
     * @param name the name of the variable
     */
    _deleteGlobalContextVariable(name: string): void;
    /**
     * Check if a global context variable is defined
     * @internal
     * @param name the name of the variable
     * @returns true if the variable is defined
     */
    _hasGlobalContextVariable(name: string): boolean;
    /**
     * Set an internal execution variable
     * @internal
     * @param name
     * @param value
     */
    _setExecutionVariable(block: FlowGraphBlock, name: string, value: any): void;
    /**
     * Get an internal execution variable
     * @internal
     * @param name
     * @returns
     */
    _getExecutionVariable<T>(block: FlowGraphBlock, name: string, defaultValue: T): T;
    /**
     * Delete an internal execution variable
     * @internal
     * @param block
     * @param name
     */
    _deleteExecutionVariable(block: FlowGraphBlock, name: string): void;
    /**
     * Check if an internal execution variable is defined
     * @internal
     * @param block
     * @param name
     * @returns
     */
    _hasExecutionVariable(block: FlowGraphBlock, name: string): boolean;
    /**
     * Check if a connection value is defined
     * @internal
     * @param connectionPoint
     * @returns
     */
    _hasConnectionValue(connectionPoint: FlowGraphDataConnection<any>): boolean;
    /**
     * Set a connection value
     * @internal
     * @param connectionPoint
     * @param value
     */
    _setConnectionValue<T>(connectionPoint: FlowGraphDataConnection<T>, value: T): void;
    /**
     * Set a connection value by key
     * @internal
     * @param key the key of the connection value
     * @param value the value of the connection
     */
    _setConnectionValueByKey<T>(key: string, value: T): void;
    /**
     * Get a connection value
     * @internal
     * @param connectionPoint
     * @returns
     */
    _getConnectionValue<T>(connectionPoint: FlowGraphDataConnection<T>): T;
    /**
     * Get the configuration
     * @internal
     * @param name
     * @param value
     */
    get configuration(): IFlowGraphContextConfiguration;
    /**
     * Check if there are any pending blocks in this context
     * @returns true if there are pending blocks
     */
    get hasPendingBlocks(): boolean;
    /**
     * Add a block to the list of blocks that have pending tasks.
     * @internal
     * @param block
     */
    _addPendingBlock(block: FlowGraphAsyncExecutionBlock): void;
    /**
     * Remove a block from the list of blocks that have pending tasks.
     * @internal
     * @param block
     */
    _removePendingBlock(block: FlowGraphAsyncExecutionBlock): void;
    /**
     * Clear all pending blocks.
     * @internal
     */
    _clearPendingBlocks(): void;
    /**
     * @internal
     * Function that notifies the node executed observable
     * @param node
     */
    _notifyExecuteNode(node: FlowGraphBlock): void;
    _notifyOnTick(framePayload: IFlowGraphOnTickEventPayload): void;
    /**
     * @internal
     */
    _increaseExecutionId(): void;
    /**
     * A monotonically increasing ID for each execution.
     * Incremented for every block executed.
     */
    get executionId(): number;
    /**
     * Serializes a context
     * @param serializationObject the object to write the values in
     * @param valueSerializationFunction a function to serialize complex values
     */
    serialize(serializationObject?: any, valueSerializationFunction?: (key: string, value: any, serializationObject: any) => void): void;
    /**
     * @returns the class name of the object.
     */
    getClassName(): string;
}
