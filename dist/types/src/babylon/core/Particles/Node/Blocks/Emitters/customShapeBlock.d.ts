import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { IShapeBlock } from "./IShapeBlock";
/**
 * Block used to provide a flow of particles emitted from a custom position.
 */
export declare class CustomShapeBlock extends NodeParticleBlock implements IShapeBlock {
    /**
     * Create a new CustomShapeBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the particle component
     */
    get particle(): NodeParticleConnectionPoint;
    /**
     * Gets the position input component
     */
    get position(): NodeParticleConnectionPoint;
    /**
     * Gets the direction input component
     */
    get direction(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    /**
     * Builds the block
     * @param state defines the build state
     */
    _build(state: NodeParticleBuildState): void;
}
