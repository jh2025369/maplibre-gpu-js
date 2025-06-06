import type { NodeRenderGraphBuildState, Nullable, AbstractEngine, Scene, FrameGraphTask, FrameGraph } from "core/index";
import { NodeRenderGraphBlockConnectionPointTypes } from "./Types/nodeRenderGraphTypes";
import { Observable } from "../../Misc/observable";
import { NodeRenderGraphConnectionPoint } from "./nodeRenderGraphBlockConnectionPoint";
/**
 * Defines a block that can be used inside a node render graph
 */
export declare class NodeRenderGraphBlock {
    private _name;
    private _buildId;
    protected _isInput: boolean;
    protected _isTeleportOut: boolean;
    protected _isTeleportIn: boolean;
    protected _isDebug: boolean;
    protected _isUnique: boolean;
    protected _scene: Scene;
    protected _engine: AbstractEngine;
    protected _frameGraph: FrameGraph;
    protected _frameGraphTask?: FrameGraphTask;
    /**
     * Gets or sets the disable flag of the task associated with this block
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphTask;
    /**
     * Gets an observable raised when the block is built
     */
    onBuildObservable: Observable<NodeRenderGraphBlock>;
    /** @internal */
    _inputs: NodeRenderGraphConnectionPoint[];
    /** @internal */
    _outputs: NodeRenderGraphConnectionPoint[];
    /** @internal */
    _codeVariableName: string;
    /** @internal */
    _additionalConstructionParameters: Nullable<unknown[]>;
    /**
     * Gets the list of input points
     */
    get inputs(): NodeRenderGraphConnectionPoint[];
    /** Gets the list of output points */
    get outputs(): NodeRenderGraphConnectionPoint[];
    /**
     * Gets or sets the unique id of the node
     */
    uniqueId: number;
    /**
     * Gets or set the name of the block
     */
    get name(): string;
    set name(value: string);
    /**
     * Gets a boolean indicating if this block is an input
     */
    get isInput(): boolean;
    /**
     * Gets a boolean indicating if this block is a teleport out
     */
    get isTeleportOut(): boolean;
    /**
     * Gets a boolean indicating if this block is a teleport in
     */
    get isTeleportIn(): boolean;
    /**
     * Gets a boolean indicating if this block is a debug block
     */
    get isDebug(): boolean;
    /**
     * Gets a boolean indicating that this block can only be used once per node render graph
     */
    get isUnique(): boolean;
    /**
     * A free comment about the block
     */
    comments: string;
    /** Gets or sets a boolean indicating that this input can be edited from a collapsed frame */
    visibleOnFrame: boolean;
    /**
     * Gets the current class name e.g. "NodeRenderGraphBlock"
     * @returns the class name
     */
    getClassName(): string;
    protected _inputRename(name: string): string;
    protected _outputRename(name: string): string;
    /**
     * Checks if the current block is an ancestor of a given block
     * @param block defines the potential descendant block to check
     * @returns true if block is a descendant
     */
    isAnAncestorOf(block: NodeRenderGraphBlock): boolean;
    /**
     * Checks if the current block is an ancestor of a given type
     * @param type defines the potential type to check
     * @returns true if block is a descendant
     */
    isAnAncestorOfType(type: string): boolean;
    /**
     * Get the first descendant using a predicate
     * @param predicate defines the predicate to check
     * @returns descendant or null if none found
     */
    getDescendantOfPredicate(predicate: (block: NodeRenderGraphBlock) => boolean): Nullable<NodeRenderGraphBlock>;
    /**
     * Creates a new NodeRenderGraphBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param _additionalConstructionParameters defines additional parameters to pass to the block constructor
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, ..._additionalConstructionParameters: unknown[]);
    /**
     * Register a new input. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param isOptional defines a boolean indicating that this input can be omitted
     * @param point an already created connection point. If not provided, create a new one
     * @returns the current block
     */
    registerInput(name: string, type: NodeRenderGraphBlockConnectionPointTypes, isOptional?: boolean, point?: NodeRenderGraphConnectionPoint): this;
    /**
     * Register a new output. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param point an already created connection point. If not provided, create a new one
     * @returns the current block
     */
    registerOutput(name: string, type: NodeRenderGraphBlockConnectionPointTypes, point?: NodeRenderGraphConnectionPoint): this;
    protected _buildBlock(_state: NodeRenderGraphBuildState): void;
    protected _customBuildStep(_state: NodeRenderGraphBuildState): void;
    protected _propagateInputValueToOutput(inputConnectionPoint: NodeRenderGraphConnectionPoint, outputConnectionPoint: NodeRenderGraphConnectionPoint): void;
    /**
     * Build the current node and generate the vertex data
     * @param state defines the current generation state
     * @returns true if already built
     */
    build(state: NodeRenderGraphBuildState): boolean;
    protected _linkConnectionTypes(inputIndex0: number, inputIndex1: number, looseCoupling?: boolean): void;
    /**
     * Initialize the block and prepare the context for build
     */
    initialize(): void;
    /**
     * Lets the block try to connect some inputs automatically
     */
    autoConfigure(): void;
    /**
     * Find an input by its name
     * @param name defines the name of the input to look for
     * @returns the input or null if not found
     */
    getInputByName(name: string): NodeRenderGraphConnectionPoint;
    /**
     * Find an output by its name
     * @param name defines the name of the output to look for
     * @returns the output or null if not found
     */
    getOutputByName(name: string): NodeRenderGraphConnectionPoint;
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
    protected _dumpPropertiesCode(): string;
    /**
     * @internal
     */
    _dumpCodeForOutputConnections(alreadyDumped: NodeRenderGraphBlock[]): string;
    /**
     * @internal
     */
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeRenderGraphBlock[]): string;
    /**
     * Clone the current block to a new identical block
     * @returns a copy of the current block
     */
    clone(): NodeRenderGraphBlock;
    /**
     * Release resources
     */
    dispose(): void;
}
