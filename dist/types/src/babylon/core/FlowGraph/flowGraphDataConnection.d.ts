import type { Nullable } from "core/types";
import type { FlowGraphBlock } from "./flowGraphBlock";
import { FlowGraphConnection, FlowGraphConnectionType } from "./flowGraphConnection";
import type { FlowGraphContext } from "./flowGraphContext";
import type { RichType } from "./flowGraphRichTypes";
import { Observable } from "core/Misc/observable";
/**
 * Represents a connection point for data.
 * An unconnected input point can have a default value.
 * An output point will only have a value if it is connected to an input point. Furthermore,
 * if the point belongs to a "function" node, the node will run its function to update the value.
 */
export declare class FlowGraphDataConnection<T> extends FlowGraphConnection<FlowGraphBlock, FlowGraphDataConnection<T>> {
    /**
     * the type of the data in this block
     */
    richType: RichType<T>;
    /**
     * [any] the default value of the connection
     */
    private _defaultValue;
    /**
     * [false] if the connection is optional
     */
    private _optional;
    private _isDisabled;
    /**
     * This is used for debugging purposes! It is the last value that was set to this connection with ANY context.
     * Do not use this value for anything else, as it might be wrong if used in a different context.
     */
    private _lastValue;
    /**
     * a data transformer function, if needed.
     * This can be used, for example, to force seconds into milliseconds output, if it makes sense in your case.
     */
    dataTransformer: Nullable<(value: T) => T>;
    /**
     * An observable that is triggered when the value of the connection changes.
     */
    onValueChangedObservable: Observable<T>;
    /**
     * Create a new data connection point.
     * @param name the name of the connection
     * @param connectionType the type of the connection
     * @param ownerBlock the block that owns this connection
     * @param richType the type of the data in this block
     * @param _defaultValue the default value of the connection
     * @param _optional if the connection is optional
     */
    constructor(name: string, connectionType: FlowGraphConnectionType, ownerBlock: FlowGraphBlock, 
    /**
     * the type of the data in this block
     */
    richType: RichType<T>, 
    /**
     * [any] the default value of the connection
     */
    _defaultValue?: T, 
    /**
     * [false] if the connection is optional
     */
    _optional?: boolean);
    /**
     * Whether or not the connection is optional.
     * Currently only used for UI control.
     */
    get optional(): boolean;
    /**
     * is this connection disabled
     * If the connection is disabled you will not be able to connect anything to it.
     */
    get isDisabled(): boolean;
    set isDisabled(value: boolean);
    /**
     * An output data block can connect to multiple input data blocks,
     * but an input data block can only connect to one output data block.
     * @returns true if the connection is singular
     */
    _isSingularConnection(): boolean;
    /**
     * Set the value of the connection in a specific context.
     * @param value the value to set
     * @param context the context to which the value is set
     */
    setValue(value: T, context: FlowGraphContext): void;
    /**
     * Reset the value of the connection to the default value.
     * @param context the context in which the value is reset
     */
    resetToDefaultValue(context: FlowGraphContext): void;
    /**
     * Connect this point to another point.
     * @param point the point to connect to.
     */
    connectTo(point: FlowGraphDataConnection<T>): void;
    private _getValueOrDefault;
    /**
     * Gets the value of the connection in a specific context.
     * @param context the context from which the value is retrieved
     * @returns the value of the connection
     */
    getValue(context: FlowGraphContext): T;
    /**
     * @internal
     */
    _getLastValue(): Nullable<T>;
    /**
     * @returns class name of the object.
     */
    getClassName(): string;
    /**
     * Serializes this object.
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject?: any): void;
}
