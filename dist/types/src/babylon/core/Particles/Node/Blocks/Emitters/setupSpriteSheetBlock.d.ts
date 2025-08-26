import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
/**
 * Block used as configure the sprite sheet for particles
 */
export declare class SetupSpriteSheetBlock extends NodeParticleBlock {
    /**
     * Gets or sets the start cell of the sprite sheet
     */
    start: number;
    /**
     * Gets or sets the end cell of the sprite sheet
     */
    end: number;
    /**
     * Gets or sets the width of the sprite sheet
     */
    width: number;
    /**
     * Gets or sets the height of the sprite sheet
     */
    height: number;
    /**
     * Gets or sets a boolean indicating if the sprite sheet should loop
     */
    loop: boolean;
    /**
     * Gets or sets a boolean indicating if the sprite sheet should start at a random cell
     */
    randomStartCell: boolean;
    /**
     * Creates a new SetupSpriteSheetBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the particle component
     */
    get particle(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    _build(state: NodeParticleBuildState): void;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
