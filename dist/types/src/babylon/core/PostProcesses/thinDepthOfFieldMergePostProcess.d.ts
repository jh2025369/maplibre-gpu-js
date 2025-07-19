import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * @internal
 */
export declare class ThinDepthOfFieldMergePostProcess extends EffectWrapper {
    static readonly FragmentUrl = "depthOfFieldMerge";
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
}
