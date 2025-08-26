import type { ParticleTeleportOutBlock } from "./particleTeleportOutBlock";
import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
/**
 * Defines a block used to teleport a value to an endpoint
 */
export declare class ParticleTeleportInBlock extends NodeParticleBlock {
    private _endpoints;
    /** Gets the list of attached endpoints */
    get endpoints(): ParticleTeleportOutBlock[];
    /**
     * Create a new ParticleTeleportInBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeParticleConnectionPoint;
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
    isAnAncestorOf(block: NodeParticleBlock): boolean;
    /**
     * Add an enpoint to this block
     * @param endpoint define the endpoint to attach to
     */
    attachToEndpoint(endpoint: ParticleTeleportOutBlock): void;
    /**
     * Remove enpoint from this block
     * @param endpoint define the endpoint to remove
     */
    detachFromEndpoint(endpoint: ParticleTeleportOutBlock): void;
    _build(): void;
}
