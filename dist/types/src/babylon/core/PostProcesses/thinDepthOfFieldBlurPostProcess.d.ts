import type { Nullable, AbstractEngine, EffectWrapperCreationOptions, Vector2 } from "core/index";
import { ThinBlurPostProcess } from "./thinBlurPostProcess";
/**
 * @internal
 */
export declare class ThinDepthOfFieldBlurPostProcess extends ThinBlurPostProcess {
    constructor(name: string, engine: Nullable<AbstractEngine>, direction: Vector2, kernel: number, options?: EffectWrapperCreationOptions);
}
