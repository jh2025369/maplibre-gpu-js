import { NodeParticleConnectionPoint } from "./nodeParticleBlockConnectionPoint";
import type { NodeParticleBlockConnectionPointTypes } from "./Enums/nodeParticleBlockConnectionPointTypes";
import type { NodeParticleBuildState } from "./nodeParticleBuildState";
import { Observable } from "core/Misc/observable";
/**
 * Defines a block that can be used inside a node based particle system
 */
export declare class NodeParticleBlock {
    private _name;
    protected _buildId: number;
    protected _isInput: boolean;
    protected _isSystem: boolean;
    protected _isDebug: boolean;
    protected _isTeleportOut: boolean;
    protected _isTeleportIn: boolean;
    /**
     * Gets or sets the unique id of the node
     */
    uniqueId: number;
    /** @internal */
    _inputs: NodeParticleConnectionPoint[];
    /** @internal */
    _outputs: NodeParticleConnectionPoint[];
    /**
     * Gets an observable raised when the block is built
     */
    onBuildObservable: Observable<NodeParticleBlock>;
    /**
     * Gets an observable raised when the block is disposed
     */
    onDisposeObservable: Observable<NodeParticleBlock>;
    /**
     * Gets an observable raised when the inputs of the block change
     */
    onInputChangedObservable: Observable<NodeParticleConnectionPoint>;
    /**
     * Gets a boolean indicating if this block is a teleport out
     */
    get isTeleportOut(): boolean;
    /**
     * Gets a boolean indicating if this block is a teleport in
     */
    get isTeleportIn(): boolean;
    /**
     * Gets a boolean indicating that this block is a system block
     */
    get isSystem(): boolean;
    /**
     * Gets a boolean indicating that this block is an input block
     */
    get isInput(): boolean;
    /**
     * Gets a boolean indicating if this block is a debug block
     */
    get isDebug(): boolean;
    /**
     * A free comment about the block
     */
    comments: string;
    /** Gets or sets a boolean indicating that this input can be edited from a collapsed frame */
    visibleOnFrame: boolean;
    /**
     * Gets or set the name of the block
     */
    get name(): string;
    set name(value: string);
    /**
     * Gets the current class name e.g. "NodeParticleBlock"
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the list of input points
     */
    get inputs(): NodeParticleConnectionPoint[];
    /** Gets the list of output points */
    get outputs(): NodeParticleConnectionPoint[];
    /**
     * Creates a new NodeParticleBlock
     * @param name defines the block name
     */
    constructor(name: string);
    protected _inputRename(name: string): string;
    protected _outputRename(name: string): string;
    /**
     * Checks if the current block is an ancestor of a given block
     * @param block defines the potential descendant block to check
     * @returns true if block is a descendant
     */
    isAnAncestorOf(block: NodeParticleBlock): boolean;
    /**
     * Checks if the current block is an ancestor of a given type
     * @param type defines the potential type to check
     * @returns true if block is a descendant
     */
    isAnAncestorOfType(type: string): boolean;
    /**
     * Find an input by its name
     * @param name defines the name of the input to look for
     * @returns the input or null if not found
     */
    getInputByName(name: string): NodeParticleConnectionPoint;
    protected _linkConnectionTypes(inputIndex0: number, inputIndex1: number, looseCoupling?: boolean): void;
    /**
     * Register a new input. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param isOptional defines a boolean indicating that this input can be omitted
     * @param value value to return if there is no connection
     * @param valueMin min value accepted for value
     * @param valueMax max value accepted for value
     * @returns the current block
     */
    registerInput(name: string, type: NodeParticleBlockConnectionPointTypes, isOptional?: boolean, value?: any, valueMin?: any, valueMax?: any): this;
    /**
     * Register a new output. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param point an already created connection point. If not provided, create a new one
     * @returns the current block
     */
    registerOutput(name: string, type: NodeParticleBlockConnectionPointTypes, point?: NodeParticleConnectionPoint): this;
    /**
     * Builds the block. Must be implemented by derived classes.
     * @param _state defines the current build state
     */
    _build(_state: NodeParticleBuildState): void;
    protected _customBuildStep(_state: NodeParticleBuildState): void;
    /**
     * Builds the block
     * @param state defines the current build state
     * @returns the built block
     */
    build(state: NodeParticleBuildState): boolean;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    /**
     * @internal
     */
    _deserialize(serializationObject: any): void;
    private _deserializePortDisplayNamesAndExposedOnFrame;
    /**
     * Clone the current block to a new identical block
     * @returns a copy of the current block
     */
    clone(): NodeParticleBlock;
    /**
     * Release resources
     */
    dispose(): void;
}
