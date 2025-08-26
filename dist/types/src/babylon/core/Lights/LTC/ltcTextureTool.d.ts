import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Tuple } from "core/types";
/**
 * Linearly transformed cosine textures that are used in the Area Lights shaders.
 */
export type ILTCTextures = {
    /**
     * Linearly transformed cosine texture BRDF Approximation.
     */
    LTC1: BaseTexture;
    /**
     * Linearly transformed cosine texture Fresnel Approximation.
     */
    LTC2: BaseTexture;
};
/**
 * Loads LTC texture data from Babylon.js CDN.
 * @returns Promise with data for LTC1 and LTC2 textures for area lights.
 */
export declare function DecodeLTCTextureDataAsync(): Promise<Tuple<Uint16Array, 2>>;
