import { BaseTexture } from "../baseTexture";
import type { AbstractEngine } from "../../../Engines/abstractEngine";
/**
 * Options for texture filtering
 */
interface IHDRIrradianceFilteringOptions {
    /**
     * Scales pixel intensity for the input HDR map.
     */
    hdrScale?: number;
    /**
     * Quality of the filter. Should be `Constants.TEXTURE_FILTERING_QUALITY_OFFLINE` for prefiltering
     */
    quality?: number;
    /**
     * Use the Cumulative Distribution Function (CDF) for filtering
     */
    useCdf?: boolean;
}
/**
 * Filters HDR maps to get correct renderings of PBR reflections
 */
export declare class HDRIrradianceFiltering {
    private _engine;
    private _effectRenderer;
    private _effectWrapper;
    private _cdfGenerator;
    /**
     * Quality switch for prefiltering. Should be set to `Constants.TEXTURE_FILTERING_QUALITY_OFFLINE` unless
     * you care about baking speed.
     */
    quality: number;
    /**
     * Scales pixel intensity for the input HDR map.
     */
    hdrScale: number;
    /**
     * Use the Cumulative Distribution Function (CDF) for filtering
     */
    useCdf: boolean;
    /**
     * Instantiates HDR filter for irradiance map
     *
     * @param engine Thin engine
     * @param options Options
     */
    constructor(engine: AbstractEngine, options?: IHDRIrradianceFilteringOptions);
    private _createRenderTarget;
    private _prefilterInternal;
    private _createEffect;
    /**
     * Get a value indicating if the filter is ready to be used
     * @param texture Texture to filter
     * @returns true if the filter is ready
     */
    isReady(texture: BaseTexture): boolean;
    /**
     * Prefilters a cube texture to contain IBL irradiance.
     * Prefiltering will be invoked at the end of next rendering pass.
     * This has to be done once the map is loaded, and has not been prefiltered by a third party software.
     * See http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf for more information
     * @param texture Texture to filter
     * @returns Promise called when prefiltering is done
     */
    prefilter(texture: BaseTexture): Promise<BaseTexture>;
}
export {};
