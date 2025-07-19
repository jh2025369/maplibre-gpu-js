import type { Nullable } from "core/types";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import { ThinBlurPostProcess } from "./thinBlurPostProcess";
import { ThinCircleOfConfusionPostProcess } from "./thinCircleOfConfusionPostProcess";
import { ThinDepthOfFieldMergePostProcess } from "./thinDepthOfFieldMergePostProcess";
/**
 * Specifies the level of blur that should be applied when using the depth of field effect
 */
export declare const enum ThinDepthOfFieldEffectBlurLevel {
    /**
     * Subtle blur
     */
    Low = 0,
    /**
     * Medium blur
     */
    Medium = 1,
    /**
     * Large blur
     */
    High = 2
}
export declare class ThinDepthOfFieldEffect {
    /** @internal */
    _circleOfConfusion: ThinCircleOfConfusionPostProcess;
    /** @internal */
    _depthOfFieldBlurX: Array<[ThinBlurPostProcess, number]>;
    /** @internal */
    _depthOfFieldBlurY: Array<[ThinBlurPostProcess, number]>;
    /** @internal */
    _dofMerge: ThinDepthOfFieldMergePostProcess;
    /**
     * The focal the length of the camera used in the effect in scene units/1000 (eg. millimeter)
     */
    set focalLength(value: number);
    get focalLength(): number;
    /**
     * F-Stop of the effect's camera. The diameter of the resulting aperture can be computed by lensSize/fStop. (default: 1.4)
     */
    set fStop(value: number);
    get fStop(): number;
    /**
     * Distance away from the camera to focus on in scene units/1000 (eg. millimeter). (default: 2000)
     */
    set focusDistance(value: number);
    get focusDistance(): number;
    /**
     * Max lens size in scene units/1000 (eg. millimeter). Standard cameras are 50mm. (default: 50) The diameter of the resulting aperture can be computed by lensSize/fStop.
     */
    set lensSize(value: number);
    get lensSize(): number;
    /**
     * The quality of the effect.
     */
    readonly blurLevel: ThinDepthOfFieldEffectBlurLevel;
    /**
     * Creates a new instance of @see ThinDepthOfFieldEffect
     * @param name The name of the depth of field render effect
     * @param engine The engine which the render effect will be applied. (default: current engine)
     * @param blurLevel The quality of the effect. (default: DepthOfFieldEffectBlurLevel.Low)
     * @param depthNotNormalized If the (view) depth used in circle of confusion post-process is normalized (0.0 to 1.0 from near to far) or not (0 to camera max distance) (default: false)
     * @param blockCompilation If shaders should not be compiled when the effect is created (default: false)
     */
    constructor(name: string, engine: Nullable<AbstractEngine>, blurLevel?: ThinDepthOfFieldEffectBlurLevel, depthNotNormalized?: boolean, blockCompilation?: boolean);
    /**
     * Checks if the effect is ready to be used
     * @returns if the effect is ready
     */
    isReady(): boolean;
}
