import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
/**
 * Block used to lerp between 2 values
 */
export declare class ParticleLerpBlock extends NodeParticleBlock {
    /**
     * Creates a new GeometryLerpBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the left operand input component
     */
    get left(): NodeParticleConnectionPoint;
    /**
     * Gets the right operand input component
     */
    get right(): NodeParticleConnectionPoint;
    /**
     * Gets the gradient operand input component
     */
    get gradient(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(): void;
}
