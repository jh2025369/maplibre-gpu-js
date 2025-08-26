import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
/**
 * @internal
 */
export declare class CreateParticleBlock extends NodeParticleBlock {
    /**
     * Create a new CreateParticleBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the emitPower input component
     */
    get emitPower(): NodeParticleConnectionPoint;
    /**
     * Gets the lifeTime input component
     */
    get lifeTime(): NodeParticleConnectionPoint;
    /**
     * Gets the color input component
     */
    get color(): NodeParticleConnectionPoint;
    /**
     * Gets the scale input component
     */
    get scale(): NodeParticleConnectionPoint;
    /**
     * Gets the angle input component
     */
    get angle(): NodeParticleConnectionPoint;
    /**
     * Gets the particle output component
     */
    get particle(): NodeParticleConnectionPoint;
    /**
     * @internal
     */
    _build(state: NodeParticleBuildState): void;
}
