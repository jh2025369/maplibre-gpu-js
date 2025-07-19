import type { Nullable } from "core/types";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Camera } from "core/Cameras/camera";
import type { INode, ICamera, IMaterial } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";
import type { Material } from "core/Materials/material";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the ExtrasAsMetadata extension.
         */
        ["ExtrasAsMetadata"]: {};
    }
}
/**
 * Store glTF extras (if present) in BJS objects' metadata
 */
export declare class ExtrasAsMetadata implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "ExtrasAsMetadata";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _assignExtras;
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
    /**
     * @internal
     */
    loadCameraAsync(context: string, camera: ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
    /**
     * @internal
     */
    createMaterial(context: string, material: IMaterial, babylonDrawMode: number): Nullable<Material>;
}
