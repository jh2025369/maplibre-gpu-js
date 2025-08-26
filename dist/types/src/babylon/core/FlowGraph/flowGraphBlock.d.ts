import type { FlowGraphContext } from "./flowGraphContext";
import { FlowGraphDataConnection } from "./flowGraphDataConnection";
import type { RichType } from "./flowGraphRichTypes";
import type { ISerializedFlowGraphBlock, IObjectAccessor } from "./typeDefinitions";
import type { Scene } from "../scene";
import type { IPathToObjectConverter } from "../ObjectModel/objectModelInterfaces";
import type { IAssetContainer } from "core/IAssetContainer";
import type { FlowGraphAction } from "./flowGraphLogger";
/**
 * Options for parsing a block.
 */
export interface IFlowGraphBlockParseOptions {
    /**
     * A function that parses a value from a serialization object.
     * @param key the key of the property
     * @param serializationObject the serialization object where the property is located
     * @param scene the scene that the block is being parsed in
     * @returns the parsed value
     */
    valueParseFunction?: (key: string, serializationObject: any, assetsContainer: IAssetContainer, scene: Scene) => any;
    /**
     * The assets container to use when loading assets.
     */
    assetsContainer?: IAssetContainer;
    /**
     * The scene that the block is being parsed in.
     */
    scene: Scene;
    /**
     * The path converter to use to convert the path to an object accessor.
     */
    pathConverter?: IPathToObjectConverter<IObjectAccessor>;
}
/**
 * Configuration for a block.
 */
export interface IFlowGraphBlockConfiguration {
    /**
     * The name of the block.
     */
    name?: string;
    [extraPropertyKey: string]: any;
}
/**
 * A block in a flow graph. The most basic form
 * of a block has inputs and outputs that contain
 * data.
 */
export declare class FlowGraphBlock {
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration;
    /**
     * A randomly generated GUID for each block.
     */
    uniqueId: string;
    /**
     * The name of the block.
     */
    name: string;
    /**
     * The data inputs of the block.
     */
    dataInputs: FlowGraphDataConnection<any>[];
    /**
     * The data outputs of the block.
     */
    dataOutputs: FlowGraphDataConnection<any>[];
    /**
     * Metadata that can be used by the block.
     */
    metadata: any;
    /** Constructor is protected so only subclasses can be instantiated
     * @param config optional configuration for this block
     * @internal - do not use directly. Extend this class instead.
     */
    constructor(
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration);
    /**
     * @internal
     * This function is called when the block needs to update its output flows.
     * @param _context the context in which it is running
     */
    _updateOutputs(_context: FlowGraphContext): void;
    /**
     * Registers a data input on the block.
     * @param name the name of the input
     * @param richType the type of the input
     * @param defaultValue optional default value of the input. If not set, the rich type's default value will be used.
     * @returns the created connection
     */
    registerDataInput<T>(name: string, richType: RichType<T>, defaultValue?: T): FlowGraphDataConnection<T>;
    /**
     * Registers a data output on the block.
     * @param name the name of the input
     * @param richType the type of the input
     * @param defaultValue optional default value of the input. If not set, the rich type's default value will be used.
     * @returns the created connection
     */
    registerDataOutput<T>(name: string, richType: RichType<T>, defaultValue?: T): FlowGraphDataConnection<T>;
    /**
     * Given the name of a data input, returns the connection if it exists
     * @param name the name of the input
     * @returns the connection if it exists, undefined otherwise
     */
    getDataInput(name: string): FlowGraphDataConnection<any> | undefined;
    /**
     * Given the name of a data output, returns the connection if it exists
     * @param name the name of the output
     * @returns the connection if it exists, undefined otherwise
     */
    getDataOutput(name: string): FlowGraphDataConnection<any> | undefined;
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     * @param _valueSerializeFunction a function that serializes a specific value
     */
    serialize(serializationObject?: any, _valueSerializeFunction?: (key: string, value: any, serializationObject: any) => any): void;
    /**
     * Deserializes this block
     * @param _serializationObject the object to deserialize from
     */
    deserialize(_serializationObject: ISerializedFlowGraphBlock): void;
    protected _log(context: FlowGraphContext, action: FlowGraphAction, payload?: any): void;
    /**
     * Gets the class name of this block
     * @returns the class name
     */
    getClassName(): string;
}
