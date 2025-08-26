import type { TransformNode } from "core/Meshes/transformNode";
import type { Nullable } from "core/types";
import { GLTFLoader } from "../glTFLoader";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { INode } from "../glTFLoaderInterfaces";
import "core/Meshes/thinInstanceMesh";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_mesh_gpu_instancing extension.
         */
        ["EXT_mesh_gpu_instancing"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
 */
export declare class EXT_mesh_gpu_instancing implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "EXT_mesh_gpu_instancing";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
}
