import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
import { Vector2 } from "../Maths/math.vector";
/**
 * @internal
 */
export declare class ThinSSRBlurPostProcess extends EffectWrapper {
    static readonly FragmentUrl = "screenSpaceReflection2Blur";
    static readonly Uniforms: string[];
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    constructor(name: string, engine?: Nullable<AbstractEngine>, direction?: Vector2, blurStrength?: number, options?: EffectWrapperCreationOptions);
    textureWidth: number;
    textureHeight: number;
    direction: Vector2;
    blurStrength: number;
    bind(noDefaultBindings?: boolean): void;
}
