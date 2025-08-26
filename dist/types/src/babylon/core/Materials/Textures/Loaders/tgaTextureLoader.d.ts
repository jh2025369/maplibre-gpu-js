import type { InternalTexture } from "../../../Materials/Textures/internalTexture";
import type { IInternalTextureLoader } from "./internalTextureLoader";
/**
 * Implementation of the TGA Texture Loader.
 * @internal
 */
export declare class _TGATextureLoader implements IInternalTextureLoader {
    /**
     * Defines whether the loader supports cascade loading the different faces.
     */
    readonly supportCascades = false;
    /**
     * Uploads the cube texture data to the WebGL texture. It has already been bound.
     */
    loadCubeData(): void;
    /**
     * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
     * @param data contains the texture data
     * @param texture defines the BabylonJS internal texture
     * @param callback defines the method to call once ready to upload
     */
    loadData(data: ArrayBufferView, texture: InternalTexture, callback: (width: number, height: number, loadMipmap: boolean, isCompressed: boolean, done: () => void) => void): void;
}
