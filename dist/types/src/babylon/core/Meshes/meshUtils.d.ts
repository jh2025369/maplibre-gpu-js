import type { AnimationGroup } from "../Animations/animationGroup";
import type { Nullable } from "../types";
import type { AbstractMesh } from "./abstractMesh";
import type { Mesh } from "./mesh";
import { Vector3 } from "../Maths/math.vector";
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
/**
 * @experimental
 * Removes unreferenced vertex data from the given meshes.
 * This is useful for cleaning up unused vertex data, such as UV sets, to reduce memory usage and stay under graphics device limits.
 * @remarks
 * This function currently only removes unreferenced UV sets (UV2, UV3, etc.) from the meshes.
 * @param meshes The array of meshes to clean up.
 */
export declare function RemoveUnreferencedVerticesData(meshes: readonly Mesh[]): void;
