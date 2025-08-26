import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_minecraftMesh extension.
         */
        ["MSFT_minecraftMesh"]: {};
    }
}
/** @internal */
export declare class MSFT_minecraftMesh implements IGLTFLoaderExtension {
    /** @internal */
    readonly name = "MSFT_minecraftMesh";
    /** @internal */
    enabled: boolean;
    private _loader;
    /** @internal */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
}
