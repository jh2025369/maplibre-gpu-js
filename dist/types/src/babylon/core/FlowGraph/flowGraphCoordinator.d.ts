import { Observable } from "core/Misc/observable";
import type { Scene } from "../scene";
import { FlowGraph } from "./flowGraph";
import type { IPathToObjectConverter } from "../ObjectModel/objectModelInterfaces";
import type { IObjectAccessor } from "./typeDefinitions";
import type { IAssetContainer } from "core/IAssetContainer";
/**
 * Parameters used to create a flow graph engine.
 */
export interface IFlowGraphCoordinatorConfiguration {
    /**
     * The scene that the flow graph engine belongs to.
     */
    scene: Scene;
}
/**
 * Parameters used to parse a flow graph coordinator.
 */
export interface IFlowGraphCoordinatorParseOptions {
    /**
     * A function that will be called to parse the value of a property.
     * @param key the key of the property
     * @param serializationObject the serialization object where the property is located
     * @param scene the scene that the block is being parsed in
     */
    valueParseFunction?: (key: string, serializationObject: any, assetsContainer: IAssetContainer, scene: Scene) => any;
    /**
     * The path converter to use to convert the path to an object accessor.
     */
    pathConverter: IPathToObjectConverter<IObjectAccessor>;
    /**
     * The scene that the flow graph coordinator belongs to.
     */
    scene: Scene;
}
/**
 * This class holds all of the existing flow graphs and is responsible for creating new ones.
 * It also handles starting/stopping multiple graphs and communication between them through an Event Coordinator
 * This is the entry point for the flow graph system.
 * @experimental This class is still in development and is subject to change.
 */
export declare class FlowGraphCoordinator {
    /**
     * the configuration of the block
     */
    config: IFlowGraphCoordinatorConfiguration;
    /**
     * The maximum number of events per type.
     * This is used to limit the number of events that can be created in a single scene.
     * This is to prevent infinite loops.
     */
    static MaxEventsPerType: number;
    /**
     * The maximum number of execution of a specific event in a single frame.
     */
    static MaxEventTypeExecutionPerFrame: number;
    /**
     * @internal
     * A list of all the coordinators per scene. Will be used by the inspector
     */
    static readonly SceneCoordinators: Map<Scene, FlowGraphCoordinator[]>;
    /**
     * When set to true (default) custom events will be dispatched synchronously.
     * This means that the events will be dispatched immediately when they are triggered.
     */
    dispatchEventsSynchronously: boolean;
    private readonly _flowGraphs;
    private _customEventsMap;
    private _eventExecutionCounter;
    private _disposeObserver;
    private _onBeforeRenderObserver;
    private _executeOnNextFrame;
    private _eventUniqueId;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphCoordinatorConfiguration);
    /**
     * Creates a new flow graph and adds it to the list of existing flow graphs
     * @returns a new flow graph
     */
    createGraph(): FlowGraph;
    /**
     * Removes a flow graph from the list of existing flow graphs and disposes it
     * @param graph the graph to remove
     */
    removeGraph(graph: FlowGraph): void;
    /**
     * Starts all graphs
     */
    start(): void;
    /**
     * Disposes all graphs
     */
    dispose(): void;
    /**
     * Serializes this coordinator to a JSON object.
     * @param serializationObject the object to serialize to
     * @param valueSerializeFunction the function to use to serialize the value
     */
    serialize(serializationObject: any, valueSerializeFunction?: (key: string, value: any, serializationObject: any) => void): void;
    /**
     * Gets the list of flow graphs
     */
    get flowGraphs(): FlowGraph[];
    /**
     * Get an observable that will be notified when the event with the given id is fired.
     * @param id the id of the event
     * @returns the observable for the event
     */
    getCustomEventObservable(id: string): Observable<any>;
    /**
     * Notifies the observable for the given event id with the given data.
     * @param id the id of the event
     * @param data the data to send with the event
     * @param async if true, the event will be dispatched asynchronously
     */
    notifyCustomEvent(id: string, data: any, async?: boolean): void;
}
