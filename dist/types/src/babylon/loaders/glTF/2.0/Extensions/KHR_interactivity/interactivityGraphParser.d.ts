import type { IKHRInteractivity_Graph } from "babylonjs-gltf2interface";
import type { IGLTF } from "../../glTFLoaderInterfaces";
import type { IGLTFToFlowGraphMapping } from "./declarationMapper";
import type { ISerializedFlowGraph, ISerializedFlowGraphBlock } from "core/FlowGraph/typeDefinitions";
import { FlowGraphTypes } from "core/FlowGraph/flowGraphRichTypes";
export interface InteractivityEvent {
    eventId: string;
    eventData?: {
        eventData: boolean;
        id: string;
        type: string;
        value?: any;
    }[];
}
export declare const gltfTypeToBabylonType: {
    [key: string]: {
        length: number;
        flowGraphType: FlowGraphTypes;
        elementType: "number" | "boolean";
    };
};
export declare class InteractivityGraphToFlowGraphParser {
    private _interactivityGraph;
    private _gltf;
    _animationTargetFps: number;
    /**
     * Note - the graph should be rejected if the same type is defined twice.
     * We currently don't validate that.
     */
    private _types;
    private _mappings;
    private _staticVariables;
    private _events;
    private _internalEventsCounter;
    private _nodes;
    constructor(_interactivityGraph: IKHRInteractivity_Graph, _gltf: IGLTF, _animationTargetFps?: number);
    get arrays(): {
        types: {
            length: number;
            flowGraphType: FlowGraphTypes;
            elementType: "number" | "boolean";
        }[];
        mappings: {
            flowGraphMapping: IGLTFToFlowGraphMapping;
            fullOperationName: string;
        }[];
        staticVariables: {
            type: FlowGraphTypes;
            value: any[];
        }[];
        events: InteractivityEvent[];
        nodes: {
            blocks: ISerializedFlowGraphBlock[];
            fullOperationName: string;
        }[];
    };
    private _parseTypes;
    private _parseDeclarations;
    private _parseVariables;
    private _parseVariable;
    private _parseEvents;
    private _parseNodes;
    private _getEmptyBlock;
    private _parseNodeConfiguration;
    private _parseNodeConnections;
    private _createNewSocketConnection;
    private _connectFlowGraphNodes;
    getVariableName(index: number): string;
    serializeToFlowGraph(): ISerializedFlowGraph;
}
