import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
/**
 * Block used to trigger a particle system based on a condition.
 */
export declare class ParticleTriggerBlock extends NodeParticleBlock {
    private _triggerCount;
    /**
     * Gets or sets the emit rate
     */
    limit: number;
    /**
     * Gets or sets the emit rate
     */
    delay: number;
    /**
     * Create a new ParticleTriggerBlock
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
     * Gets the condition input component
     */
    get condition(): NodeParticleConnectionPoint;
    /**
     * Gets the target system input component
     */
    get system(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    private _previousOne;
    _build(state: NodeParticleBuildState): void;
    serialize(): any;
    _deserialize(serializationObject: any): void;
    dispose(): void;
}
