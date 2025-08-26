import type { NodeRenderGraphConnectionPoint, Scene, Nullable, FrameGraph, NodeRenderGraphTeleportInBlock, NodeRenderGraphBuildState } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
/**
 * Defines a block used to receive a value from a teleport entry point
 */
export declare class NodeRenderGraphTeleportOutBlock extends NodeRenderGraphBlock {
    /** @internal */
    _entryPoint: Nullable<NodeRenderGraphTeleportInBlock>;
    /** @internal */
    _tempEntryPointUniqueId: Nullable<number>;
    /**
     * Create a new NodeRenderGraphTeleportOutBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /**
     * Gets the entry point
     */
    get entryPoint(): NodeRenderGraphTeleportInBlock;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    /** Detach from entry point */
    detach(): void;
    protected _buildBlock(): void;
    protected _customBuildStep(state: NodeRenderGraphBuildState): void;
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeRenderGraphBlock[]): string;
    _dumpCodeForOutputConnections(alreadyDumped: NodeRenderGraphBlock[]): string;
    /**
     * Clone the current block to a new identical block
     * @returns a copy of the current block
     */
    clone(): NodeRenderGraphBlock;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
