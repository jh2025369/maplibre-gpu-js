import type { NodeRenderGraphConnectionPoint, Scene, FrameGraph, NodeRenderGraphBuildState, Camera, InternalTexture, Nullable, FrameGraphTextureCreationOptions, FrameGraphObjectList } from "core/index";
import { Observable } from "../../../Misc/observable";
import { NodeRenderGraphBlockConnectionPointTypes } from "../Types/nodeRenderGraphTypes";
import { NodeRenderGraphBlock } from "../nodeRenderGraphBlock";
export type NodeRenderGraphValueType = InternalTexture | Camera | FrameGraphObjectList;
export type NodeRenderGraphInputCreationOptions = FrameGraphTextureCreationOptions;
/**
 * Block used to expose an input value
 */
export declare class NodeRenderGraphInputBlock extends NodeRenderGraphBlock {
    private _storedValue;
    private _type;
    /** Gets an observable raised when the value is changed */
    onValueChangedObservable: Observable<NodeRenderGraphInputBlock>;
    /** Indicates that the input is externally managed */
    isExternal: boolean;
    /** Gets or sets the options to create the input value */
    creationOptions: NodeRenderGraphInputCreationOptions;
    /**
     * Gets or sets the connection point type (default is Undefined)
     */
    get type(): NodeRenderGraphBlockConnectionPointTypes;
    /**
     * Creates a new NodeRenderGraphInputBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param type defines the type of the input (can be set to NodeRenderGraphBlockConnectionPointTypes.Undefined)
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, type?: NodeRenderGraphBlockConnectionPointTypes);
    /**
     * Set the input block to its default value (based on its type)
     */
    setDefaultValue(): void;
    /**
     * Gets or sets the value of that point.
     */
    get value(): Nullable<NodeRenderGraphValueType>;
    set value(value: Nullable<NodeRenderGraphValueType>);
    /**
     * Gets the value as a specific type
     * @returns the value as a specific type
     */
    getTypedValue<T extends NodeRenderGraphValueType>(): T;
    /**
     * Gets the value as an internal texture
     * @returns The internal texture stored in value if value is an internal texture, otherwise null
     */
    getInternalTextureFromValue(): Nullable<InternalTexture>;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    /**
     * Check if the block is a texture of any type
     * @returns true if the block is a texture
     */
    isAnyTexture(): boolean;
    /**
     * Gets a boolean indicating that the connection point is the back buffer texture
     * @returns true if the connection point is the back buffer texture
     */
    isBackBuffer(): boolean;
    /**
     * Gets a boolean indicating that the connection point is a depth/stencil attachment texture
     * @returns true if the connection point is a depth/stencil attachment texture
     */
    isBackBufferDepthStencilAttachment(): boolean;
    /**
     * Check if the block is a camera
     * @returns true if the block is a camera
     */
    isCamera(): boolean;
    /**
     * Check if the block is an object list
     * @returns true if the block is an object list
     */
    isObjectList(): boolean;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    dispose(): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
