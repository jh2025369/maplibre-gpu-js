import type { Nullable, NodeRenderGraphBlock, NodeRenderGraphBlockConnectionPointValueType } from "core/index";
import { Observable } from "../../Misc/observable";
import { NodeRenderGraphBlockConnectionPointTypes, NodeRenderGraphConnectionPointCompatibilityStates, NodeRenderGraphConnectionPointDirection } from "./Types/nodeRenderGraphTypes";
/**
 * Defines a connection point for a block
 */
export declare class NodeRenderGraphConnectionPoint {
    private readonly _ownerBlock;
    private _connectedPoint;
    /** @internal */
    _acceptedConnectionPointType: Nullable<NodeRenderGraphConnectionPoint>;
    private _endpoints;
    private readonly _direction;
    private _type;
    /** @internal */
    _linkedConnectionSource: Nullable<NodeRenderGraphConnectionPoint>;
    /** @internal */
    _typeConnectionSource: Nullable<NodeRenderGraphConnectionPoint | (() => NodeRenderGraphConnectionPoint)>;
    /** @internal */
    _defaultConnectionPointType: Nullable<NodeRenderGraphBlockConnectionPointTypes>;
    /** Gets the direction of the point */
    get direction(): NodeRenderGraphConnectionPointDirection;
    /**
     * The value stored in this connection point
     */
    value: NodeRenderGraphBlockConnectionPointValueType | undefined;
    /**
     * Gets or sets the additional types supported by this connection point
     */
    acceptedConnectionPointTypes: NodeRenderGraphBlockConnectionPointTypes[];
    /**
     * Gets or sets the additional types excluded by this connection point
     */
    excludedConnectionPointTypes: NodeRenderGraphBlockConnectionPointTypes[];
    /**
     * Observable triggered when this point is connected
     */
    onConnectionObservable: Observable<NodeRenderGraphConnectionPoint>;
    /**
     * Observable triggered when this point is disconnected
     */
    onDisconnectionObservable: Observable<NodeRenderGraphConnectionPoint>;
    /**
     * Gets or sets a boolean indicating that this connection point is exposed on a frame
     */
    isExposedOnFrame: boolean;
    /**
     * Gets or sets number indicating the position that the port is exposed to on a frame
     */
    exposedPortPosition: number;
    /**
     * Gets or sets the connection point type (default is Undefined)
     */
    get type(): NodeRenderGraphBlockConnectionPointTypes;
    set type(value: NodeRenderGraphBlockConnectionPointTypes);
    /**
     * Gets or sets the connection point name
     */
    name: string;
    /**
     * Gets or sets the connection point display name
     */
    displayName: string;
    /**
     * Gets or sets a boolean indicating that this connection point can be omitted
     */
    isOptional: boolean;
    /**
     * Gets a boolean indicating that the current point is connected to another NodeRenderGraphBlock
     */
    get isConnected(): boolean;
    /** Get the other side of the connection (if any) */
    get connectedPoint(): Nullable<NodeRenderGraphConnectionPoint>;
    /** Get the block that owns this connection point */
    get ownerBlock(): NodeRenderGraphBlock;
    /** Get the block connected on the other side of this connection (if any) */
    get sourceBlock(): Nullable<NodeRenderGraphBlock>;
    /** Get the block connected on the endpoints of this connection (if any) */
    get connectedBlocks(): Array<NodeRenderGraphBlock>;
    /** Gets the list of connected endpoints */
    get endpoints(): NodeRenderGraphConnectionPoint[];
    /** Gets a boolean indicating if that output point is connected to at least one input */
    get hasEndpoints(): boolean;
    /** Get the inner type (ie AutoDetect for instance instead of the inferred one) */
    get innerType(): NodeRenderGraphBlockConnectionPointTypes;
    /**
     * Creates a new connection point
     * @param name defines the connection point name
     * @param ownerBlock defines the block hosting this connection point
     * @param direction defines the direction of the connection point
     */
    constructor(name: string, ownerBlock: NodeRenderGraphBlock, direction: NodeRenderGraphConnectionPointDirection);
    /**
     * Gets the current class name e.g. "NodeRenderGraphConnectionPoint"
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets a boolean indicating if the current point can be connected to another point
     * @param connectionPoint defines the other connection point
     * @returns a boolean
     */
    canConnectTo(connectionPoint: NodeRenderGraphConnectionPoint): boolean;
    /**
     * Gets a number indicating if the current point can be connected to another point
     * @param connectionPoint defines the other connection point
     * @returns a number defining the compatibility state
     */
    checkCompatibilityState(connectionPoint: NodeRenderGraphConnectionPoint): NodeRenderGraphConnectionPointCompatibilityStates;
    /**
     * Connect this point to another connection point
     * @param connectionPoint defines the other connection point
     * @param ignoreConstraints defines if the system will ignore connection type constraints (default is false)
     * @returns the current connection point
     */
    connectTo(connectionPoint: NodeRenderGraphConnectionPoint, ignoreConstraints?: boolean): NodeRenderGraphConnectionPoint;
    /**
     * Disconnect this point from one of his endpoint
     * @param endpoint defines the other connection point
     * @returns the current connection point
     */
    disconnectFrom(endpoint: NodeRenderGraphConnectionPoint): NodeRenderGraphConnectionPoint;
    /**
     * Fills the list of excluded connection point types with all types other than those passed in the parameter
     * @param mask Types (ORed values of NodeRenderGraphBlockConnectionPointTypes) that are allowed, and thus will not be pushed to the excluded list
     */
    addExcludedConnectionPointFromAllowedTypes(mask: number): void;
    /**
     * Adds accepted connection point types
     * @param mask Types (ORed values of NodeRenderGraphBlockConnectionPointTypes) that are allowed to connect to this point
     */
    addAcceptedConnectionPointTypes(mask: number): void;
    /**
     * Serializes this point in a JSON representation
     * @param isInput defines if the connection point is an input (default is true)
     * @returns the serialized point object
     */
    serialize(isInput?: boolean): any;
    /**
     * Release resources
     */
    dispose(): void;
}
