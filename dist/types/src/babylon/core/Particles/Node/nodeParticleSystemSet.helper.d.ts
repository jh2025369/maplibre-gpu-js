import type { Nullable } from "core/types";
import type { ParticleSystem } from "../particleSystem";
import { NodeParticleSystemSet } from "./nodeParticleSystemSet";
/**
 * Converts a ParticleSystem to a NodeParticleSystemSet.
 * @param name The name of the node particle system set.
 * @param particleSystems The particle systems to convert.
 * @returns The converted node particle system set or null if conversion failed.
 */
export declare function ConvertToNodeParticleSystemSet(name: string, particleSystems: ParticleSystem[]): Nullable<NodeParticleSystemSet>;
