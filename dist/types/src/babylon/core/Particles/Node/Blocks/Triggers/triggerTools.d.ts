import type { Scene } from "core/scene";
import type { Vector3 } from "core/Maths/math.vector";
import type { SystemBlock } from "../systemBlock";
import type { ParticleSystem } from "core/Particles/particleSystem";
/**
 * @internal
 * Tools for managing particle triggers and sub-emitter systems.
 */
export declare function _TriggerSubEmitter(template: SystemBlock, scene: Scene, location: Vector3): ParticleSystem;
