import type { Scene } from "core/scene";
import type { NodeParticleConnectionPoint } from "./nodeParticleBlockConnectionPoint";
import { NodeParticleContextualSources } from "./Enums/nodeParticleContextualSources";
import type { Particle } from "../particle";
import type { Nullable } from "core/types";
import { NodeParticleBlockConnectionPointTypes } from "./Enums/nodeParticleBlockConnectionPointTypes";
import { Vector2, Vector3 } from "core/Maths/math.vector";
import type { ThinParticleSystem } from "../thinParticleSystem";
import { Color4 } from "core/Maths/math.color";
import { NodeParticleSystemSources } from "./Enums/nodeParticleSystemSources";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
/**
 * Class used to store node based geometry build state
 */
export declare class NodeParticleBuildState {
    /**
     * Gets the capactity of the particle system to build
     */
    capacity: number;
    /**
     * Gets the scene where the particle system is built
     */
    scene: Scene;
    /** Gets or sets the build identifier */
    buildId: number;
    /** Gets or sets the list of non connected mandatory inputs */
    notConnectedNonOptionalInputs: NodeParticleConnectionPoint[];
    /** Gets or sets a boolean indicating that verbose mode is on */
    verbose: boolean;
    /**
     * Gets or sets the particle context for contextual data
     */
    particleContext: Nullable<Particle>;
    /**
     * Gets or sets the system context for contextual data
     */
    systemContext: Nullable<ThinParticleSystem>;
    /**
     * Gets or sets the index of the gradient to use
     */
    gradientIndex: number;
    /**
     * Gets or sets next gradient in line
     */
    nextGradientIndex: number;
    /**
     * Gets or sets the next gradient value
     */
    nextGradientValue: any;
    /**
     * Emits errors if any
     */
    emitErrors(): void;
    /**
     * Adapt a value to a target type
     * @param source defines the value to adapt
     * @param targetType defines the target type
     * @returns the adapted value
     */
    adapt(source: NodeParticleConnectionPoint, targetType: NodeParticleBlockConnectionPointTypes): any;
    /**
     * Gets the value associated with a contextual source
     * @param source Source of the contextual value
     * @returns the value associated with the source
     */
    getContextualValue(source: NodeParticleContextualSources): number | Vector3 | Color4 | Vector2;
    /**
     * Gets a boolean indicating if the emitter is a transform node (or a simple vector3)
     */
    get isEmitterTransformNode(): boolean;
    /**
     * Gets the emitter world matrix
     */
    get emitterWorldMatrix(): import("core/Maths/math.vector").Matrix;
    /**
     * Gets the emitter inverse world matrix
     */
    get emitterInverseWorldMatrix(): import("core/Maths/math.vector").Matrix;
    /**
     * Gets the emitter position
     */
    get emitterPosition(): Vector3;
    /**
     * Gets the value associated with a system source
     * @param source Source of the system value
     * @returns the value associated with the source
     */
    getSystemValue(source: NodeParticleSystemSources): number | Vector3 | AbstractMesh;
}
