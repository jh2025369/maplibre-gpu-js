import type { Vector3, Matrix } from "../../Maths/math.vector";
import type { Particle } from "../../Particles/particle";
import type { Nullable } from "../../types";
import type { UniformBufferEffectCommonAccessor } from "../../Materials/uniformBufferEffectCommonAccessor";
import type { UniformBuffer } from "../../Materials/uniformBuffer";

import type { Scene } from "../../scene";

/**
 * Particle emitter represents a volume emitting particles.
 * This is the responsibility of the implementation to define the volume shape like cone/sphere/box.
 */
export interface IParticleEmitterType {
    /**
     * Called by the particle System when the direction is computed for the created particle.
     * @param worldMatrix is the world matrix of the particle system
     * @param directionToUpdate is the direction vector to update with the result
     * @param particle is the particle we are computed the direction for
     * @param isLocal defines if the direction should be set in local space
     * @param inverseWorldMatrix defines the inverted world matrix to use if isLocal is false
     */
    startDirectionFunction(worldMatrix: Matrix, directionToUpdate: Vector3, particle: Particle, isLocal: boolean, inverseWorldMatrix: Matrix): void;

    /**
     * Called by the particle System when the position is computed for the created particle.
     * @param worldMatrix is the world matrix of the particle system
     * @param positionToUpdate is the position vector to update with the result
     * @param particle is the particle we are computed the position for
     * @param isLocal defines if the position should be set in local space
     */
    startPositionFunction(worldMatrix: Matrix, positionToUpdate: Vector3, particle: Particle, isLocal: boolean): void;

    /**
     * Clones the current emitter and returns a copy of it
     * @returns the new emitter
     */
    clone(): IParticleEmitterType;

    /**
     * Called by the GPUParticleSystem to setup the update shader
     * @param uboOrEffect defines the update shader
     */
    applyToShader(uboOrEffect: UniformBufferEffectCommonAccessor): void;

    /**
     * Creates the structure of the ubo for this particle emitter
     * @param ubo ubo to create the structure for
     */
    buildUniformLayout(ubo: UniformBuffer): void;

    /**
     * Returns a string to use to update the GPU particles update shader
     * @returns the effect defines string
     */
    getEffectDefines(): string;

    /**
     * Returns a string representing the class name
     * @returns a string containing the class name
     */
    getClassName(): string;

    /**
     * Serializes the particle system to a JSON object.
     * @returns the JSON object
     */
    serialize(): any;

    /**
     * Parse properties from a JSON object
     * @param serializationObject defines the JSON object
     * @param scene defines the hosting scene
     */
    parse(serializationObject: any, scene: Nullable<Scene>): void;
}
