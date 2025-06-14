import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * Post process used to render in black and white
 */
export declare class ThinBlackAndWhitePostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "blackAndWhite";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * Constructs a new black and white post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    /**
     * Effect intensity (default: 1)
     */
    degree: number;
    bind(): void;
}
