import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
/**
 * Block used to define a list of gradient entries
 */
export declare class ParticleGradientBlock extends NodeParticleBlock {
    private _entryCount;
    /**
     * Creates a new ParticleGradientBlock
     * @param name defines the block name
     */
    constructor(name: string);
    private _extend;
    private _manageExtendedInputs;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the gradient operand input component
     */
    get gradient(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(): void;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
