import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_diffuse_transmission extension.
         */
        ["KHR_materials_diffuse_transmission"]: {};
    }
}
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */
export declare class KHR_materials_diffuse_transmission implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_materials_diffuse_transmission";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
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
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadTranslucentPropertiesAsync;
}
