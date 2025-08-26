import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
/**
 * Block used to define a gradient entry for a gradient block
 */
export declare class ParticleGradientValueBlock extends NodeParticleBlock {
    /**
     * Gets or sets the epsilon value used for comparison
     */
    reference: number;
    /**
     * Creates a new ParticleGradientEntryBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the value operand input component
     */
    get value(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(): void;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
