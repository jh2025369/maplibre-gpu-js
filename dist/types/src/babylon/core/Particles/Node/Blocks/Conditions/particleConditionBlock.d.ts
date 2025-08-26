import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
/**
 * Conditions supported by the condition block
 */
export declare enum ParticleConditionBlockTests {
    /** Equal */
    Equal = 0,
    /** NotEqual */
    NotEqual = 1,
    /** LessThan */
    LessThan = 2,
    /** GreaterThan */
    GreaterThan = 3,
    /** LessOrEqual */
    LessOrEqual = 4,
    /** GreaterOrEqual */
    GreaterOrEqual = 5,
    /** Logical Exclusive OR */
    Xor = 6,
    /** Logical Or */
    Or = 7,
    /** Logical And */
    And = 8
}
/**
 * Block used to evaluate a condition and return a true or false value as a float (1 or 0).
 */
export declare class ParticleConditionBlock extends NodeParticleBlock {
    /**
     * Gets or sets the test used by the block
     */
    test: ParticleConditionBlockTests;
    /**
     * Gets or sets the epsilon value used for comparison
     */
    epsilon: number;
    /**
     * Create a new ParticleConditionBlock
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
     * Gets the ifTrue input component
     */
    get ifTrue(): NodeParticleConnectionPoint;
    /**
     * Gets the ifFalse input component
     */
    get ifFalse(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(): void;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
