import type { NodeRenderGraphConnectionPoint, Scene, Nullable, FrameGraph, NodeRenderGraphTeleportOutBlock } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
/**
 * Defines a block used to teleport a value to an endpoint
 */
export declare class NodeRenderGraphTeleportInBlock extends NodeRenderGraphBlock {
    private _endpoints;
    /** Gets the list of attached endpoints */
    get endpoints(): NodeRenderGraphTeleportOutBlock[];
    /**
     * Create a new NodeRenderGraphTeleportInBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeRenderGraphConnectionPoint;
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeRenderGraphBlock[]): string;
    /**
     * Checks if the current block is an ancestor of a given type
     * @param type defines the potential type to check
     * @returns true if block is a descendant
     */
    isAnAncestorOfType(type: string): boolean;
    /**
     * Checks if the current block is an ancestor of a given block
     * @param block defines the potential descendant block to check
     * @returns true if block is a descendant
     */
    isAnAncestorOf(block: NodeRenderGraphBlock): boolean;
    /**
     * Get the first descendant using a predicate
     * @param predicate defines the predicate to check
     * @returns descendant or null if none found
     */
    getDescendantOfPredicate(predicate: (block: NodeRenderGraphBlock) => boolean): Nullable<NodeRenderGraphBlock>;
    /**
     * Add an enpoint to this block
     * @param endpoint define the endpoint to attach to
     */
    attachToEndpoint(endpoint: NodeRenderGraphTeleportOutBlock): void;
    /**
     * Remove enpoint from this block
     * @param endpoint define the endpoint to remove
     */
    detachFromEndpoint(endpoint: NodeRenderGraphTeleportOutBlock): void;
    /**
     * Release resources
     */
    dispose(): void;
}
