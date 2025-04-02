import { GLTFLoaderExtension } from "./glTFLoader";
import type { IGLTFRuntime } from "./glTFLoaderInterfaces";
import { Material } from "core/Materials/material";
/**
 * @internal
 * @deprecated
 */
export declare class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
    constructor();
    loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime): boolean;
    loadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
    private _loadTexture;
}
