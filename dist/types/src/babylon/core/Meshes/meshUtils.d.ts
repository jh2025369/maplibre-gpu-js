import type { AnimationGroup } from "../Animations/animationGroup";
import { Vector3 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { AbstractMesh } from "./abstractMesh";
/**
 * Computes the maximum extents of the given meshes considering animation, skeleton, and morph targets.
 * @param meshes The array of meshes to compute
 * @param animationGroup An optional animation group to animate (must be started to take effect)
 * @param animationStep An optional value indicating the number of seconds to step while looping through the given animation group
 * @returns An array of world space extents corresponding to the given meshes
 */
export declare function computeMaxExtents(meshes: Array<AbstractMesh>, animationGroup?: Nullable<AnimationGroup>, animationStep?: number): Array<{
    minimum: Vector3;
    maximum: Vector3;
}>;
