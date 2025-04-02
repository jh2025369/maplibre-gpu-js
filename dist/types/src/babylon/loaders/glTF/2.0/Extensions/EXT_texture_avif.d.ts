import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import type { ITexture } from "../glTFLoaderInterfaces";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Nullable } from "core/types";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_texture_avif extension.
         */
        ["EXT_texture_avif"]: {};
    }
}
/**
 * [glTF PR](https://github.com/KhronosGroup/glTF/pull/2235)
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_avif/README.md)
 */
export declare class EXT_texture_avif implements IGLTFLoaderExtension {
    /** The name of this extension. */
    readonly name = "EXT_texture_avif";
    /** Defines whether this extension is enabled. */
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
    _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
}
