import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../nodeParticleBuildState";
/**
 * Operations supported by the Math block
 */
export declare enum ParticleMathBlockOperations {
    /** Add */
    Add = 0,
    /** Subtract */
    Subtract = 1,
    /** Multiply */
    Multiply = 2,
    /** Divide */
    Divide = 3,
    /** Max */
    Max = 4,
    /** Min */
    Min = 5
}
/**
 * Block used to apply math functions
 */
export declare class ParticleMathBlock extends NodeParticleBlock {
    /**
     * Gets or sets the operation applied by the block
     */
    operation: ParticleMathBlockOperations;
    private readonly _connectionObservers;
    /**
     * Create a new ParticleMathBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the left input component
     */
    get left(): NodeParticleConnectionPoint;
    /**
     * Gets the right input component
     */
    get right(): NodeParticleConnectionPoint;
    /**
     * Gets the geometry output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(state: NodeParticleBuildState): void;
    private _updateInputOutputTypes;
    /**
     * Release resources
     */
    dispose(): void;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
