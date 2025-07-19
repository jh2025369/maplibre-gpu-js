import type { Nullable } from "core/types";
import type { InternalTexture } from "../internalTexture";
import type { IInternalTextureLoader } from "./internalTextureLoader";
/**
 * Inspired by https://github.com/sciecode/three.js/blob/dev/examples/jsm/loaders/EXRLoader.js
 * Referred to the original Industrial Light & Magic OpenEXR implementation and the TinyEXR / Syoyo Fujita
 * implementation.
 */
/**
 * Loader for .exr file format
 * #4RN0VF#151: PIZ compression
 * #4RN0VF#146: ZIP compression
 * #4RN0VF#149: RLE compression
 * #4RN0VF#150: PXR24 compression
 */
export declare class _ExrTextureLoader implements IInternalTextureLoader {
    /**
     * Defines whether the loader supports cascade loading the different faces.
     */
    readonly supportCascades = false;
    /**
     * Uploads the cube texture data to the WebGL texture. It has already been bound.
     * @param _data contains the texture data
     * @param _texture defines the BabylonJS internal texture
     * @param _createPolynomials will be true if polynomials have been requested
     * @param _onLoad defines the callback to trigger once the texture is ready
     * @param _onError defines the callback to trigger in case of error
     */
    loadCubeData(_data: ArrayBufferView | ArrayBufferView[], _texture: InternalTexture, _createPolynomials: boolean, _onLoad: Nullable<(data?: any) => void>, _onError: Nullable<(message?: string, exception?: any) => void>): void;
    /**
     * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
     * @param data contains the texture data
     * @param texture defines the BabylonJS internal texture
     * @param callback defines the method to call once ready to upload
     */
    loadData(data: ArrayBufferView, texture: InternalTexture, callback: (width: number, height: number, loadMipmap: boolean, isCompressed: boolean, done: () => void, failedLoading?: boolean) => void): Promise<void>;
}
