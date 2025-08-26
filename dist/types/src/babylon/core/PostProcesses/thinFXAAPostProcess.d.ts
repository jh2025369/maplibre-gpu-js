import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
import { Vector2 } from "../Maths/math.vector";
/**
 * Postprocess used to apply FXAA (antialiasing) to the scene
 */
export declare class ThinFXAAPostProcess extends EffectWrapper {
    private static _GetDefines;
    /**
     * The vertex shader url
     */
    static readonly VertexUrl = "fxaa";
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "fxaa";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * Constructs a new FXAA post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    /**
     * The texel size of the texture to apply FXAA on
     */
    texelSize: Vector2;
    bind(noDefaultBindings?: boolean): void;
}
