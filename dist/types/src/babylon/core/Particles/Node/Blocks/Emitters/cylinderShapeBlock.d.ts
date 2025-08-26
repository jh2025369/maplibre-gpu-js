import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
import type { IShapeBlock } from "./IShapeBlock";
/**
 * Block used to provide a flow of particles emitted from a cylinder shape.
 */
export declare class CylinderShapeBlock extends NodeParticleBlock implements IShapeBlock {
    private _tempVector;
    /**
     * Create a new CylinderShapeBlock
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
     * Gets the radius input component
     */
    get radius(): NodeParticleConnectionPoint;
    /**
     * Gets the height input component
     */
    get height(): NodeParticleConnectionPoint;
    /**
     * Gets the radiusRange input component
     */
    get radiusRange(): NodeParticleConnectionPoint;
    /**
     * Gets the directionRandomizer input component
     */
    get directionRandomizer(): NodeParticleConnectionPoint;
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
