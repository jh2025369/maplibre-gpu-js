import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../nodeParticleBuildState";
/**
 * Operations supported by the Trigonometry block
 */
export declare enum ParticleTrigonometryBlockOperations {
    /** Cos */
    Cos = 0,
    /** Sin */
    Sin = 1,
    /** Abs */
    Abs = 2,
    /** Exp */
    Exp = 3,
    /** Exp2 */
    Exp2 = 4,
    /** Round */
    Round = 5,
    /** Floor */
    Floor = 6,
    /** Ceiling */
    Ceiling = 7,
    /** Square root */
    Sqrt = 8,
    /** Log */
    Log = 9,
    /** Tangent */
    Tan = 10,
    /** Arc tangent */
    ArcTan = 11,
    /** Arc cosinus */
    ArcCos = 12,
    /** Arc sinus */
    ArcSin = 13,
    /** Sign */
    Sign = 14,
    /** Negate */
    Negate = 15,
    /** OneMinus */
    OneMinus = 16,
    /** Reciprocal */
    Reciprocal = 17,
    /** ToDegrees */
    ToDegrees = 18,
    /** ToRadians */
    ToRadians = 19,
    /** Fract */
    Fract = 20
}
/**
 * Block used to apply trigonometry operation to floats
 */
export declare class ParticleTrigonometryBlock extends NodeParticleBlock {
    /**
     * Gets or sets the operation applied by the block
     */
    operation: ParticleTrigonometryBlockOperations;
    /**
     * Creates a new GeometryTrigonometryBlock
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
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(state: NodeParticleBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
