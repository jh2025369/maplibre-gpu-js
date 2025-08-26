import type { ParticleSystem } from "core/Particles/particleSystem";
import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../nodeParticleBuildState";
/**
 * Block used to get a system of particles
 */
export declare class SystemBlock extends NodeParticleBlock {
    /**
     * Gets or sets the blend mode for the particle system
     */
    blendMode: number;
    /**
     * Gets or sets the epsilon value used for comparison
     */
    capacity: number;
    /**
     * Gets or sets the emit rate
     */
    emitRate: number;
    /**
     * Gets or sets the target stop duration for the particle system
     */
    targetStopDuration: number;
    /**
     * Gets or sets the target stop duration for the particle system
     */
    startDelay: number;
    /**
     * Gets or sets a boolean indicating if the system should not start automatically
     */
    doNoStart: boolean;
    /**
     * Create a new SystemBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the particle input component
     */
    get particle(): NodeParticleConnectionPoint;
    /**
     * Gets the texture input component
     */
    get texture(): NodeParticleConnectionPoint;
    /**
     * Gets the onStart input component
     */
    get onStart(): NodeParticleConnectionPoint;
    /**
     * Gets the onEnd input component
     */
    get onEnd(): NodeParticleConnectionPoint;
    /**
     * Gets the system output component
     */
    get system(): NodeParticleConnectionPoint;
    /**
     * Builds the block and return a functional particle system
     * @param state defines the building state
     * @returns the built particle system
     */
    createSystem(state: NodeParticleBuildState): ParticleSystem;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
