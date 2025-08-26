import type { Nullable, AbstractEngine } from "core/index";
import { ThinBloomMergePostProcess } from "./thinBloomMergePostProcess";
import { ThinBlurPostProcess } from "./thinBlurPostProcess";
import { ThinExtractHighlightsPostProcess } from "./thinExtractHighlightsPostProcess";
/**
 * The bloom effect spreads bright areas of an image to simulate artifacts seen in cameras
 */
export declare class ThinBloomEffect {
    /** @internal */
    _downscale: ThinExtractHighlightsPostProcess;
    /** @internal */
    _blurX: ThinBlurPostProcess;
    /** @internal */
    _blurY: ThinBlurPostProcess;
    /** @internal */
    _merge: ThinBloomMergePostProcess;
    /**
     * The luminance threshold to find bright areas of the image to bloom.
     */
    get threshold(): number;
    set threshold(value: number);
    /**
     * The strength of the bloom.
     */
    get weight(): number;
    set weight(value: number);
    /**
     * Specifies the size of the bloom blur kernel, relative to the final output size
     */
    get kernel(): number;
    set kernel(value: number);
    /**
     * The ratio of the blur texture to the input texture that should be used to compute the bloom.
     */
    readonly scale: number;
    /**
     * Creates a new instance of @see ThinBloomEffect
     * @param name The name of the bloom render effect
     * @param engine The engine which the render effect will be applied. (default: current engine)
     * @param scale The ratio of the blur texture to the input texture that should be used to compute the bloom.
     * @param blockCompilation If shaders should not be compiled when the effect is created (default: false)
     */
    constructor(name: string, engine: Nullable<AbstractEngine>, scale: number, blockCompilation?: boolean);
    /**
     * Checks if the effect is ready to be used
     * @returns if the effect is ready
     */
    isReady(): boolean;
}
