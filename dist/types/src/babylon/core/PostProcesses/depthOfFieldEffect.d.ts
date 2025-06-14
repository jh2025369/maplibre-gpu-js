import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { PostProcess } from "./postProcess";
import { PostProcessRenderEffect } from "../PostProcesses/RenderPipeline/postProcessRenderEffect";
import { DepthOfFieldBlurPostProcess } from "./depthOfFieldBlurPostProcess";
import type { Scene } from "../scene";
import type { AbstractEngine } from "core/Engines/abstractEngine";
/**
 * Specifies the level of max blur that should be applied when using the depth of field effect
 */
export declare const enum DepthOfFieldEffectBlurLevel {
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
/**
 * The depth of field effect applies a blur to objects that are closer or further from where the camera is focusing.
 */
export declare class DepthOfFieldEffect extends PostProcessRenderEffect {
    private _circleOfConfusion;
    /**
     * @internal Internal, blurs from high to low
     */
    _depthOfFieldBlurX: Array<DepthOfFieldBlurPostProcess>;
    private _depthOfFieldBlurY;
    private _dofMerge;
    /**
     * @internal Internal post processes in depth of field effect
     */
    _effects: Array<PostProcess>;
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
    private _thinDepthOfFieldEffect;
    /**
     * Creates a new instance DepthOfFieldEffect
     * @param sceneOrEngine The scene or engine the effect belongs to.
     * @param depthTexture The depth texture of the scene to compute the circle of confusion.This must be set in order for this to function but may be set after initialization if needed.
     * @param blurLevel
     * @param pipelineTextureType The type of texture to be used when performing the post processing.
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     * @param depthNotNormalized If the depth from the depth texture is already normalized or if the normalization should be done at runtime in the shader (default: false)
     */
    constructor(sceneOrEngine: Scene | AbstractEngine, depthTexture: Nullable<RenderTargetTexture>, blurLevel?: DepthOfFieldEffectBlurLevel, pipelineTextureType?: number, blockCompilation?: boolean, depthNotNormalized?: boolean);
    /**
     * Get the current class name of the current effect
     * @returns "DepthOfFieldEffect"
     */
    getClassName(): string;
    /**
     * Depth texture to be used to compute the circle of confusion. This must be set here or in the constructor in order for the post process to function.
     */
    set depthTexture(value: RenderTargetTexture);
    /**
     * Disposes each of the internal effects for a given camera.
     * @param camera The camera to dispose the effect on.
     */
    disposeEffects(camera: Camera): void;
    /**
     * @internal Internal
     */
    _updateEffects(): void;
    /**
     * Internal
     * @returns if all the contained post processes are ready.
     * @internal
     */
    _isReady(): boolean;
}
