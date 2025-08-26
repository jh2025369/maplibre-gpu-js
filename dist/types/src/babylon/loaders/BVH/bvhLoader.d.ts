import { Skeleton } from "core/Bones/skeleton";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import type { BVHLoadingOptions } from "./bvhLoadingOptions";
import type { AssetContainer } from "core/assetContainer";
/**
 * Reads a BVH file, returns a skeleton
 * @param text - The BVH file content
 * @param scene - The scene to add the skeleton to
 * @param assetContainer - The asset container to add the skeleton to
 * @param loadingOptions - The loading options
 * @returns The skeleton
 */
export declare function ReadBvh(text: string, scene: Scene, assetContainer: Nullable<AssetContainer>, loadingOptions: BVHLoadingOptions): Skeleton;
