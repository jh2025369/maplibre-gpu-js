import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../nodeParticleBuildState";
/**
 * Block used to create a Vector2/3 and Color4 out of individual or partial inputs
 */
export declare class ParticleConverterBlock extends NodeParticleBlock {
    /**
     * Create a new ParticleConverterBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the color component (input)
     */
    get colorIn(): NodeParticleConnectionPoint;
    /**
     * Gets the xyz component (input)
     */
    get xyzIn(): NodeParticleConnectionPoint;
    /**
     * Gets the xy component (input)
     */
    get xyIn(): NodeParticleConnectionPoint;
    /**
     * Gets the zw component (input)
     */
    get zwIn(): NodeParticleConnectionPoint;
    /**
     * Gets the x component (input)
     */
    get xIn(): NodeParticleConnectionPoint;
    /**
     * Gets the y component (input)
     */
    get yIn(): NodeParticleConnectionPoint;
    /**
     * Gets the z component (input)
     */
    get zIn(): NodeParticleConnectionPoint;
    /**
     * Gets the w component (input)
     */
    get wIn(): NodeParticleConnectionPoint;
    /**
     * Gets the xyzw component (output)
     */
    get colorOut(): NodeParticleConnectionPoint;
    /**
     * Gets the xyz component (output)
     */
    get xyzOut(): NodeParticleConnectionPoint;
    /**
     * Gets the xy component (output)
     */
    get xyOut(): NodeParticleConnectionPoint;
    /**
     * Gets the zw component (output)
     */
    get zwOut(): NodeParticleConnectionPoint;
    /**
     * Gets the x component (output)
     */
    get xOut(): NodeParticleConnectionPoint;
    /**
     * Gets the y component (output)
     */
    get yOut(): NodeParticleConnectionPoint;
    /**
     * Gets the z component (output)
     */
    get zOut(): NodeParticleConnectionPoint;
    /**
     * Gets the w component (output)
     */
    get wOut(): NodeParticleConnectionPoint;
    protected _inputRename(name: string): string;
    protected _outputRename(name: string): string;
    _build(state: NodeParticleBuildState): void;
}
