/**
 * The type of a connection point - input or output.
 */
export declare const enum FlowGraphConnectionType {
    Input = 0,
    Output = 1
}
/**
 * An interface for a connectable point in the flow graph.
 */
export interface IConnectable {
    /**
     * A uniquely identifying string for the connection.
     */
    uniqueId: string;
    /**
     * An array of the points that this point is connected to.
     */
    _connectedPoint: Array<IConnectable>;
    /**
     * Returns if the connection can only be connected to one other point.
     */
    _isSingularConnection(): boolean;
    /**
     * The type of the connection
     */
    _connectionType: FlowGraphConnectionType;
    /**
     * Connect this point to another point.
     * @param point the point to connect to.
     */
    connectTo(point: IConnectable): void;
}
/**
 * The base connection class.
 */
export declare class FlowGraphConnection<BlockT, ConnectedToT extends IConnectable> implements IConnectable {
    _ownerBlock: BlockT;
    /** @internal */
    _connectedPoint: Array<ConnectedToT>;
    /**
     * A uniquely identifying string for the connection.
     */
    uniqueId: string;
    /**
     * The name of the connection.
     */
    name: string;
    /**
     * @internal
     */
    _connectionType: FlowGraphConnectionType;
    /**
     * Used for parsing connections.
     * @internal
     */
    connectedPointIds: any[];
    constructor(name: string, _connectionType: FlowGraphConnectionType, _ownerBlock: BlockT);
    /**
     * The type of the connection
     */
    get connectionType(): FlowGraphConnectionType;
    /**
     * @internal
     * Override this to indicate if a point can connect to more than one point.
     */
    _isSingularConnection(): boolean;
    /**
     * Returns if a point is connected to any other point.
     * @returns boolean indicating if the point is connected.
     */
    isConnected(): boolean;
    /**
     * Connects two connections together.
     * @param point the connection to connect to.
     */
    connectTo(point: ConnectedToT): void;
    /**
     * Disconnects two connections.
     * @param point the connection to disconnect from.
     * @param removeFromLocal if true, the connection will be removed from the local connection list.
     */
    disconnectFrom(point: ConnectedToT, removeFromLocal?: boolean): void;
    /**
     * Disconnects all connected points.
     */
    disconnectFromAll(): void;
    dispose(): void;
    /**
     * Saves the connection to a JSON object.
     * @param serializationObject the object to serialize to.
     */
    serialize(serializationObject?: any): void;
    /**
     * @returns class name of the connection.
     */
    getClassName(): string;
    /**
     * Deserialize from a object into this
     * @param serializationObject the object to deserialize from.
     */
    deserialize(serializationObject: any): void;
}
