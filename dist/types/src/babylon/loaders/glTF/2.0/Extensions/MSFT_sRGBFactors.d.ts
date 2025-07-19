import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_sRGBFactors extension.
         */
        ["MSFT_sRGBFactors"]: {};
    }
}
/** @internal */
export declare class MSFT_sRGBFactors implements IGLTFLoaderExtension {
    /** @internal */
    readonly name = "MSFT_sRGBFactors";
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
