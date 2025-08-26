import type { EffectWrapperCreationOptions, Scene } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * Post process used to apply a motion blur post process
 */
export declare class ThinMotionBlurPostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "motionBlur";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    /**
     * The list of samplers used by the effect
     */
    static readonly Samplers: string[];
    /**
     * The default defines used by the effect
     */
    static readonly Defines = "#define GEOMETRY_SUPPORTED\n#define SAMPLES 64.0\n#define OBJECT_BASED";
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    private _scene;
    private _invViewProjection;
    private _previousViewProjection;
    /**
     * Constructs a new motion blur post process
     * @param name Name of the effect
     * @param scene The scene the effect belongs to
     * @param options Options to configure the effect
     */
    constructor(name: string, scene: Scene, options?: EffectWrapperCreationOptions);
    /**
     * Defines how much the image is blurred by the movement. Default value is equal to 1
     */
    motionStrength: number;
    private _motionBlurSamples;
    /**
     * Gets the number of iterations that are used for motion blur quality. Default value is equal to 32
     */
    get motionBlurSamples(): number;
    /**
     * Sets the number of iterations to be used for motion blur quality
     */
    set motionBlurSamples(samples: number);
    private _isObjectBased;
    /**
     * Gets whether or not the motion blur post-process is in object based mode.
     */
    get isObjectBased(): boolean;
    /**
     * Sets whether or not the motion blur post-process is in object based mode.
     */
    set isObjectBased(value: boolean);
    /**
     * The width of the source texture
     */
    textureWidth: number;
    /**
     * The height of the source texture
     */
    textureHeight: number;
    bind(noDefaultBindings?: boolean): void;
    private _updateEffect;
    private _applyMode;
}
