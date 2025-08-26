import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
import { Vector2 } from "../Maths/math.vector";
/**
 * The ChromaticAberrationPostProcess separates the rgb channels in an image to produce chromatic distortion around the edges of the screen
 */
export declare class ThinChromaticAberrationPostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "chromaticAberration";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * Constructs a new chromatic aberration post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    /**
     * The amount of separation of rgb channels (default: 30)
     */
    aberrationAmount: number;
    /**
     * The amount the effect will increase for pixels closer to the edge of the screen. (default: 0)
     */
    radialIntensity: number;
    /**
     * The normalized direction in which the rgb channels should be separated. If set to 0,0 radial direction will be used. (default: Vector2(0.707,0.707))
     */
    direction: Vector2;
    /**
     * The center position where the radialIntensity should be around. [0.5,0.5 is center of screen, 1,1 is top right corner] (default: Vector2(0.5 ,0.5))
     */
    centerPosition: Vector2;
    /** The width of the source texture to which the effect is applied */
    screenWidth: number;
    /** The height of the source texture to which the effect is applied */
    screenHeight: number;
    bind(noDefaultBindings?: boolean): void;
}
