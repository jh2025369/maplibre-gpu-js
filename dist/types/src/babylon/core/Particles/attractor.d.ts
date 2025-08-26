import { Vector3 } from "core/Maths/math.vector";
import type { Particle } from "./particle";
import type { ThinParticleSystem } from "./thinParticleSystem";
/**
 * Class representing an attractor in a particle system.
 * #DEZ79M#40
 */
export declare class Attractor {
    /**
     * Gets or sets the strength of the attractor.
     * A positive value attracts particles, while a negative value repels them.
     */
    strength: number;
    /**
     * Gets or sets the position of the attractor in 3D space.
     */
    position: Vector3;
    /** @internal */
    _processParticle(particle: Particle, system: ThinParticleSystem): void;
    /**
     * Serializes the attractor to a JSON object.
     * @returns The serialized JSON object.
     */
    serialize(): any;
}
