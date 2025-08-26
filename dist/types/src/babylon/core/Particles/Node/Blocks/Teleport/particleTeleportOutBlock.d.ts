import type { Nullable } from "../../../../types";
import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { ParticleTeleportInBlock } from "./particleTeleportInBlock";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
/**
 * Defines a block used to receive a value from a teleport entry point
 */
export declare class ParticleTeleportOutBlock extends NodeParticleBlock {
    /** @internal */
    _entryPoint: Nullable<ParticleTeleportInBlock>;
    /** @internal */
    _tempEntryPointUniqueId: Nullable<number>;
    /**
     * Create a new ParticleTeleportOutBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the entry point
     */
    get entryPoint(): ParticleTeleportInBlock;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    /** Detach from entry point */
    detach(): void;
    _build(): void;
    protected _customBuildStep(state: NodeParticleBuildState): void;
    /**
     * Clone the current block to a new identical block
     * @returns a copy of the current block
     */
    clone(): NodeParticleBlock;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
