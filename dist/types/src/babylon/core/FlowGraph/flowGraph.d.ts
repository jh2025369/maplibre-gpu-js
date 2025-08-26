import { Observable } from "../Misc/observable";
import type { Scene } from "../scene";
import type { FlowGraphEventBlock } from "./flowGraphEventBlock";
import { FlowGraphContext } from "./flowGraphContext";
import type { FlowGraphBlock } from "./flowGraphBlock";
import type { FlowGraphCoordinator } from "./flowGraphCoordinator";
import type { IObjectAccessor } from "./typeDefinitions";
import type { IPathToObjectConverter } from "../ObjectModel/objectModelInterfaces";
import type { IAssetContainer } from "core/IAssetContainer";
import { FlowGraphEventType } from "./flowGraphEventType";
export declare const enum FlowGraphState {
    /**
     * The graph is stopped
     */
    Stopped = 0,
    /**
     * The graph is running
     */
    Started = 1
}
/**
 * Parameters used to create a flow graph.
 */
export interface IFlowGraphParams {
    /**
     * The scene that the flow graph belongs to.
     */
    scene: Scene;
    /**
     * The event coordinator used by the flow graph.
     */
    coordinator: FlowGraphCoordinator;
}
/**
 * Options for parsing a flow graph.
 */
export interface IFlowGraphParseOptions {
    /**
     * A function that parses complex values in a scene.
     * @param key the key of the value
     * @param serializationObject the object to read the value from
     * @param scene the scene to read the value from
     */
    valueParseFunction?: (key: string, serializationObject: any, assetsContainer: IAssetContainer, scene: Scene) => any;
    /**
     * The flow graph coordinator.
     */
    coordinator: FlowGraphCoordinator;
    /**
     * A function that converts a path to an object accessor.
     */
    pathConverter?: IPathToObjectConverter<IObjectAccessor>;
}
/**
 * Class used to represent a flow graph.
 * A flow graph is a graph of blocks that can be used to create complex logic.
 * Blocks can be added to the graph and connected to each other.
 * The graph can then be started, which will init and start all of its event blocks.
 *
 * @experimental FlowGraph is still in development and is subject to change.
 */
export declare class FlowGraph {
    /**
     * An observable that is triggered when the state of the graph changes.
     */
    onStateChangedObservable: Observable<FlowGraphState>;
    /** @internal */
    _eventBlocks: {
        [keyof in FlowGraphEventType]: FlowGraphEventBlock[];
    };
    /**
     * @internal
     */
    readonly _scene: Scene;
    private _coordinator;
    private _executionContexts;
    private _sceneEventCoordinator;
    private _eventObserver;
    /**
     * The state of the graph
     */
    private _state;
    /**
     * The state of the graph
     */
    get state(): FlowGraphState;
    /**
     * The state of the graph
     */
    set state(value: FlowGraphState);
    /**
     * Construct a Flow Graph
     * @param params construction parameters. currently only the scene
     */
    constructor(params: IFlowGraphParams);
    /**
     * Create a context. A context represents one self contained execution for the graph, with its own variables.
     * @returns the context, where you can get and set variables
     */
    createContext(): FlowGraphContext;
    /**
     * Returns the execution context at a given index
     * @param index the index of the context
     * @returns the execution context at that index
     */
    getContext(index: number): FlowGraphContext;
    /**
     * Add an event block. When the graph is started, it will start listening to events
     * from the block and execute the graph when they are triggered.
     * @param block the event block to be added
     */
    addEventBlock(block: FlowGraphEventBlock): void;
    /**
     * Starts the flow graph. Initializes the event blocks and starts listening to events.
     */
    start(): void;
    private _startPendingEvents;
    private _getContextualOrder;
    /**
     * Disposes of the flow graph. Cancels any pending tasks and removes all event listeners.
     */
    dispose(): void;
    /**
     * Executes a function in all blocks of a flow graph, starting with the event blocks.
     * @param visitor the function to execute.
     */
    visitAllBlocks(visitor: (block: FlowGraphBlock) => void): void;
    /**
     * Serializes a graph
     * @param serializationObject the object to write the values in
     * @param valueSerializeFunction a function to serialize complex values
     */
    serialize(serializationObject?: any, valueSerializeFunction?: (key: string, value: any, serializationObject: any) => void): void;
}
