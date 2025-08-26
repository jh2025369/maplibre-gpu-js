import { NodeParticleBlock } from "../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../nodeParticleBuildState";
import { Observable } from "core/Misc/observable";
/**
 * Defines a block used to debug values going through it
 */
export declare class ParticleDebugBlock extends NodeParticleBlock {
    /**
     * Gets the log entries
     */
    log: string[][];
    /**
     * Gets or sets the number of logs to keep
     */
    stackSize: number;
    /**
     * Create a new ParticleDebugBlock
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
    /**
     * Observable raised when data is collected
     */
    onDataCollectedObservable: Observable<ParticleDebugBlock>;
    _build(state: NodeParticleBuildState): void;
    serialize(): any;
    _deserialize(serializationObject: any): void;
    dispose(): void;
}
