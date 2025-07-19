import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
import type { Camera } from "core/Cameras/camera";
/**
 * Options used to create a ThinCircleOfConfusionPostProcess.
 */
export interface ThinCircleOfConfusionPostProcessOptions extends EffectWrapperCreationOptions {
    /**
     * If the (view) depth is normalized (0.0 to 1.0 from near to far) or not (0 to camera max distance)
     */
    depthNotNormalized?: boolean;
}
/**
 * Post process used to calculate the circle of confusion (used for depth of field, for example)
 */
export declare class ThinCircleOfConfusionPostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "circleOfConfusion";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    /**
     * The list of samplers used by the effect
     */
    static readonly Samplers: string[];
    /**
     * Defines if the depth is normalized or not
     */
    static readonly DefinesDepthNotNormalized = "#define COC_DEPTH_NOT_NORMALIZED";
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * Constructs a new circle of confusion post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: ThinCircleOfConfusionPostProcessOptions);
    /**
     * The camera to use to calculate the circle of confusion
     */
    camera: Camera;
    /**
     * Max lens size in scene units/1000 (eg. millimeter). Standard cameras are 50mm. (default: 50) The diameter of the resulting aperture can be computed by lensSize/fStop.
     */
    lensSize: number;
    /**
     * F-Stop of the effect's camera. The diameter of the resulting aperture can be computed by lensSize/fStop. (default: 1.4)
     */
    fStop: number;
    /**
     * Distance away from the camera to focus on in scene units/1000 (eg. millimeter). (default: 2000)
     */
    focusDistance: number;
    /**
     * Focal length of the effect's camera in scene units/1000 (eg. millimeter). (default: 50)
     */
    focalLength: number;
    bind(): void;
}
