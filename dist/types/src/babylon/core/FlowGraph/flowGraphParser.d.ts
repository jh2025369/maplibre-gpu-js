import type { FlowGraph, IFlowGraphParseOptions } from "./flowGraph";
import type { FlowGraphBlock, IFlowGraphBlockParseOptions } from "./flowGraphBlock";
import type { FlowGraphContext, IFlowGraphContextParseOptions } from "./flowGraphContext";
import type { IFlowGraphCoordinatorParseOptions } from "./flowGraphCoordinator";
import { FlowGraphCoordinator } from "./flowGraphCoordinator";
import type { FlowGraphDataConnection } from "./flowGraphDataConnection";
import type { FlowGraphSignalConnection } from "./flowGraphSignalConnection";
import type { ISerializedFlowGraph, ISerializedFlowGraphBlock, ISerializedFlowGraphContext } from "./typeDefinitions";
import type { FlowGraphConnection } from "./flowGraphConnection";
/**
 * Given a list of blocks, find an output data connection that has a specific unique id
 * @param blocks a list of flow graph blocks
 * @param uniqueId the unique id of a connection
 * @returns the connection that has this unique id. throws an error if none was found
 */
export declare function GetDataOutConnectionByUniqueId(blocks: FlowGraphBlock[], uniqueId: string): FlowGraphDataConnection<any>;
/**
 * Given a list of blocks, find an input signal connection that has a specific unique id
 * @param blocks a list of flow graph blocks
 * @param uniqueId the unique id of a connection
 * @returns the connection that has this unique id. throws an error if none was found
 */
export declare function GetSignalInConnectionByUniqueId(blocks: FlowGraphBlock[], uniqueId: string): FlowGraphSignalConnection;
/**
 * Parses a serialized coordinator.
 * @param serializedObject the object to parse
 * @param options the options to use when parsing
 * @returns the parsed coordinator
 */
export declare function ParseCoordinatorAsync(serializedObject: any, options: IFlowGraphCoordinatorParseOptions): Promise<FlowGraphCoordinator>;
/**
 * Parses a graph from a given serialization object
 * @param serializationObject the object where the values are written
 * @param options options for parsing the graph
 * @returns the parsed graph
 */
export declare function ParseFlowGraphAsync(serializationObject: ISerializedFlowGraph, options: IFlowGraphParseOptions): Promise<FlowGraph>;
/**
 * Parses a graph from a given serialization object
 * @param serializationObject the object where the values are written
 * @param options options for parsing the graph
 * @param resolvedClasses the resolved classes for the blocks
 * @returns the parsed graph
 */
export declare function ParseFlowGraph(serializationObject: ISerializedFlowGraph, options: IFlowGraphParseOptions, resolvedClasses: (typeof FlowGraphBlock)[]): FlowGraph;
/**
 * Parses a context
 * @param serializationObject the object containing the context serialization values
 * @param options the options for parsing the context
 * @param rightHanded whether the serialized data is right handed
 * @returns
 */
export declare function ParseFlowGraphContext(serializationObject: ISerializedFlowGraphContext, options: IFlowGraphContextParseOptions, rightHanded?: boolean): FlowGraphContext;
/**
 * Parses a block from a serialization object
 * This function is async due to the factory method that is used to create the block's class. If you load the class externally use ParseBlockWithClassType
 * @param serializationObject the object to parse from
 * @param parseOptions options for parsing the block
 * @returns the parsed block
 */
export declare function ParseBlockAsync(serializationObject: ISerializedFlowGraphBlock, parseOptions: IFlowGraphBlockParseOptions): Promise<FlowGraphBlock>;
/**
 * Parses a block from a serialization object
 * @param serializationObject the object to parse from
 * @param parseOptions options for parsing the block
 * @param classType the class type of the block. This is used when the class is not loaded asynchronously
 * @returns the parsed block
 */
export declare function ParseFlowGraphBlockWithClassType(serializationObject: ISerializedFlowGraphBlock, parseOptions: IFlowGraphBlockParseOptions, classType: typeof FlowGraphBlock): FlowGraphBlock;
/**
 * Parses a connection from an object
 * @param serializationObject the object to parse from.
 * @param ownerBlock the block that owns the connection.
 * @param classType the class type of the connection.
 * @returns the parsed connection.
 */
export declare function ParseGraphConnectionWithClassType<BlockT extends FlowGraphBlock>(serializationObject: any, ownerBlock: BlockT, classType: typeof FlowGraphConnection): FlowGraphConnection<BlockT, import("./flowGraphConnection").IConnectable>;
/**
 * Parses a data connection from a serialized object.
 * @param serializationObject the object to parse from
 * @param ownerBlock the block that owns the connection
 * @param classType the class type of the data connection
 * @returns the parsed connection
 */
export declare function ParseGraphDataConnection(serializationObject: any, ownerBlock: FlowGraphBlock, classType: typeof FlowGraphDataConnection): FlowGraphDataConnection<any>;
