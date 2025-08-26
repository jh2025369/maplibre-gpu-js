import { Observable } from "../../../Misc/observable";
import { NodeParticleBlock } from "../nodeParticleBlock";
import { NodeParticleBlockConnectionPointTypes } from "../Enums/nodeParticleBlockConnectionPointTypes";
import type { NodeParticleConnectionPoint } from "../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../nodeParticleBuildState";
import { NodeParticleContextualSources } from "../Enums/nodeParticleContextualSources";
import { NodeParticleSystemSources } from "../Enums/nodeParticleSystemSources";
/**
 * Block used to expose an input value
 */
export declare class ParticleInputBlock extends NodeParticleBlock {
    private _storedValue;
    private _valueCallback;
    private _type;
    /** Gets or set a value used to limit the range of float values */
    min: number;
    /** Gets or set a value used to limit the range of float values */
    max: number;
    /** Gets or sets the group to use to display this block in the Inspector */
    groupInInspector: string;
    /**
     * Gets or sets a boolean indicating that this input is displayed in the Inspector
     */
    displayInInspector: boolean;
    /** Gets an observable raised when the value is changed */
    onValueChangedObservable: Observable<ParticleInputBlock>;
    /**
     * Gets or sets the connection point type (default is float)
     */
    get type(): NodeParticleBlockConnectionPointTypes;
    /** @internal */
    private _systemSource;
    /**
     * Gets a boolean indicating that the current connection point is a system source
     */
    get isSystemSource(): boolean;
    /**
     * Gets or sets the system source used by this input block
     */
    get systemSource(): NodeParticleSystemSources;
    set systemSource(value: NodeParticleSystemSources);
    private _contextualSource;
    /**
     * Gets a boolean indicating that the current connection point is a contextual value
     */
    get isContextual(): boolean;
    /**
     * Gets or sets the current contextual value
     */
    get contextualValue(): NodeParticleContextualSources;
    set contextualValue(value: NodeParticleContextualSources);
    /**
     * Creates a new InputBlock
     * @param name defines the block name
     * @param type defines the type of the input (can be set to NodeParticleBlockConnectionPointTypes.AutoDetect)
     */
    constructor(name: string, type?: NodeParticleBlockConnectionPointTypes);
    /**
     * Gets or sets the value of that point.
     * Please note that this value will be ignored if valueCallback is defined
     */
    get value(): any;
    set value(value: any);
    /**
     * Gets or sets a callback used to get the value of that point.
     * Please note that setting this value will force the connection point to ignore the value property
     */
    get valueCallback(): () => any;
    set valueCallback(value: () => any);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    /**
     * Set the input block to its default value (based on its type)
     */
    setDefaultValue(): void;
    _build(state: NodeParticleBuildState): void;
    dispose(): void;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
