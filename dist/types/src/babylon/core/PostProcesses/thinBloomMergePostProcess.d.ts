import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * @internal
 */
export declare class ThinBloomMergePostProcess extends EffectWrapper {
    static readonly FragmentUrl = "bloomMerge";
    static readonly Uniforms: string[];
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    /** Weight of the bloom to be added to the original input. */
    weight: number;
    bind(): void;
}
