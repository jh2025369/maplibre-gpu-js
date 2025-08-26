import type { Nullable, CubeTexture, Scene, Camera } from "core/index";
import { ThinSSRPostProcess } from "core/PostProcesses/thinSSRPostProcess";
import { ThinSSRBlurPostProcess } from "core/PostProcesses/thinSSRBlurPostProcess";
import { ThinSSRBlurCombinerPostProcess } from "core/PostProcesses/thinSSRBlurCombinerPostProcess";
/**
 * The SSR rendering pipeline is used to generate a reflection based on a flat mirror model.
 */
export declare class ThinSSRRenderingPipeline {
    /** @internal */
    readonly _ssrPostProcess: ThinSSRPostProcess;
    /** @internal */
    readonly _ssrBlurXPostProcess: ThinSSRBlurPostProcess;
    /** @internal */
    readonly _ssrBlurYPostProcess: ThinSSRBlurPostProcess;
    /** @internal */
    readonly _ssrBlurCombinerPostProcess: ThinSSRBlurCombinerPostProcess;
    /**
     * Gets or sets the name of the rendering pipeline
     */
    name: string;
    /**
     * Gets or sets a boolean indicating if the SSR rendering pipeline is supported
     */
    get isSSRSupported(): boolean;
    set isSSRSupported(supported: boolean);
    /**
     * Gets or sets the maxDistance used to define how far we look for reflection during the ray-marching on the reflected ray (default: 1000).
     * Note that this value is a view (camera) space distance (not pixels!).
     */
    get maxDistance(): number;
    set maxDistance(distance: number);
    /**
     * Gets or sets the step size used to iterate until the effect finds the color of the reflection's pixel. Should be an integer \>= 1 as it is the number of pixels we advance at each step (default: 1).
     * Use higher values to improve performances (but at the expense of quality).
     */
    get step(): number;
    set step(step: number);
    /**
     * Gets or sets the thickness value used as tolerance when computing the intersection between the reflected ray and the scene (default: 0.5).
     * If setting "enableAutomaticThicknessComputation" to true, you can use lower values for "thickness" (even 0), as the geometry thickness
     * is automatically computed thank to the regular depth buffer + the backface depth buffer
     */
    get thickness(): number;
    set thickness(thickness: number);
    /**
     * Gets or sets the current reflection strength. 1.0 is an ideal value but can be increased/decreased for particular results (default: 1).
     */
    get strength(): number;
    set strength(strength: number);
    /**
     * Gets or sets the falloff exponent used to compute the reflection strength. Higher values lead to fainter reflections (default: 1).
     */
    get reflectionSpecularFalloffExponent(): number;
    set reflectionSpecularFalloffExponent(exponent: number);
    /**
     * Maximum number of steps during the ray marching process after which we consider an intersection could not be found (default: 1000).
     * Should be an integer value.
     */
    get maxSteps(): number;
    set maxSteps(steps: number);
    /**
     * Gets or sets the factor applied when computing roughness. Default value is 0.2.
     * When blurring based on roughness is enabled (meaning blurDispersionStrength \> 0), roughnessFactor is used as a global roughness factor applied on all objects.
     * If you want to disable this global roughness set it to 0.
     */
    get roughnessFactor(): number;
    set roughnessFactor(factor: number);
    /**
     * Number of steps to skip at start when marching the ray to avoid self collisions (default: 1)
     * 1 should normally be a good value, depending on the scene you may need to use a higher value (2 or 3)
     */
    get selfCollisionNumSkip(): number;
    set selfCollisionNumSkip(skip: number);
    /**
     * Gets or sets the minimum value for one of the reflectivity component of the material to consider it for SSR (default: 0.04).
     * If all r/g/b components of the reflectivity is below or equal this value, the pixel will not be considered reflective and SSR won't be applied.
     */
    get reflectivityThreshold(): number;
    set reflectivityThreshold(threshold: number);
    /**
     * Gets or sets the downsample factor used to reduce the size of the texture used to compute the SSR contribution (default: 0).
     * Use 0 to render the SSR contribution at full resolution, 1 to render at half resolution, 2 to render at 1/3 resolution, etc.
     * Note that it is used only when blurring is enabled (blurDispersionStrength \> 0), because in that mode the SSR contribution is generated in a separate texture.
     */
    ssrDownsample: number;
    /**
     * Gets or sets the blur dispersion strength. Set this value to 0 to disable blurring (default: 0.03)
     * The reflections are blurred based on the roughness of the surface and the distance between the pixel shaded and the reflected pixel: the higher the distance the more blurry the reflection is.
     * blurDispersionStrength allows to increase or decrease this effect.
     */
    get blurDispersionStrength(): number;
    set blurDispersionStrength(strength: number);
    /**
     * Gets or sets the downsample factor used to reduce the size of the textures used to blur the reflection effect (default: 0).
     * Use 0 to blur at full resolution, 1 to render at half resolution, 2 to render at 1/3 resolution, etc.
     */
    blurDownsample: number;
    /**
     * Gets or sets whether or not smoothing reflections is enabled (default: false)
     * Enabling smoothing will require more GPU power.
     * Note that this setting has no effect if step = 1: it's only used if step \> 1.
     */
    get enableSmoothReflections(): boolean;
    set enableSmoothReflections(enabled: boolean);
    /**
     * Gets or sets the environment cube texture used to define the reflection when the reflected rays of SSR leave the view space or when the maxDistance/maxSteps is reached.
     */
    get environmentTexture(): Nullable<CubeTexture>;
    set environmentTexture(texture: Nullable<CubeTexture>);
    /**
     * Gets or sets the boolean defining if the environment texture is a standard cubemap (false) or a probe (true). Default value is false.
     * Note: a probe cube texture is treated differently than an ordinary cube texture because the Y axis is reversed.
     */
    get environmentTextureIsProbe(): boolean;
    set environmentTextureIsProbe(isProbe: boolean);
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated at the screen borders (default: true).
     */
    get attenuateScreenBorders(): boolean;
    set attenuateScreenBorders(attenuate: boolean);
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated according to the distance of the intersection (default: true).
     */
    get attenuateIntersectionDistance(): boolean;
    set attenuateIntersectionDistance(attenuate: boolean);
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated according to the number of iterations performed to find the intersection (default: true).
     */
    get attenuateIntersectionIterations(): boolean;
    set attenuateIntersectionIterations(attenuate: boolean);
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated when the reflection ray is facing the camera (the view direction) (default: false).
     */
    get attenuateFacingCamera(): boolean;
    set attenuateFacingCamera(attenuate: boolean);
    /**
     * Gets or sets a boolean indicating if the backface reflections should be attenuated (default: false).
     */
    get attenuateBackfaceReflection(): boolean;
    set attenuateBackfaceReflection(attenuate: boolean);
    /**
     * Gets or sets a boolean indicating if the ray should be clipped to the frustum (default: true).
     * You can try to set this parameter to false to save some performances: it may produce some artefacts in some cases, but generally they won't really be visible
     */
    get clipToFrustum(): boolean;
    set clipToFrustum(clip: boolean);
    /**
     * Gets or sets a boolean indicating whether the blending between the current color pixel and the reflection color should be done with a Fresnel coefficient (default: false).
     * It is more physically accurate to use the Fresnel coefficient (otherwise it uses the reflectivity of the material for blending), but it is also more expensive when you use blur (when blurDispersionStrength \> 0).
     */
    get useFresnel(): boolean;
    set useFresnel(fresnel: boolean);
    /**
     * Gets or sets a boolean defining if geometry thickness should be computed automatically (default: false).
     * When enabled, a depth renderer is created which will render the back faces of the scene to a depth texture (meaning additional work for the GPU).
     * In that mode, the "thickness" property is still used as an offset to compute the ray intersection, but you can typically use a much lower
     * value than when enableAutomaticThicknessComputation is false (it's even possible to use a value of 0 when using low values for "step")
     * Note that for performance reasons, this option will only apply to the first camera to which the rendering pipeline is attached!
     */
    get enableAutomaticThicknessComputation(): boolean;
    set enableAutomaticThicknessComputation(automatic: boolean);
    /**
     * Gets or sets a boolean defining if the input color texture is in gamma space (default: true)
     * The SSR effect works in linear space, so if the input texture is in gamma space, we must convert the texture to linear space before applying the effect
     */
    get inputTextureColorIsInGammaSpace(): boolean;
    set inputTextureColorIsInGammaSpace(gammaSpace: boolean);
    /**
     * Gets or sets a boolean defining if the output color texture generated by the SSR pipeline should be in gamma space (default: true)
     * If you have a post-process that comes after the SSR and that post-process needs the input to be in a linear space, you must disable generateOutputInGammaSpace
     */
    get generateOutputInGammaSpace(): boolean;
    set generateOutputInGammaSpace(gammaSpace: boolean);
    /**
     * Gets or sets a boolean indicating if the effect should be rendered in debug mode (default: false).
     * In this mode, colors have this meaning:
     *   - blue: the ray hit the max distance (we reached maxDistance)
     *   - red: the ray ran out of steps (we reached maxSteps)
     *   - yellow: the ray went off screen
     *   - green: the ray hit a surface. The brightness of the green color is proportional to the distance between the ray origin and the intersection point: A brighter green means more computation than a darker green.
     * In the first 3 cases, the final color is calculated by mixing the skybox color with the pixel color (if environmentTexture is defined), otherwise the pixel color is not modified
     * You should try to get as few blue/red/yellow pixels as possible, as this means that the ray has gone further than if it had hit a surface.
     */
    get debug(): boolean;
    set debug(value: boolean);
    /**
     * Gets or sets the camera to use to render the reflection
     */
    get camera(): Nullable<Camera>;
    set camera(camera: Nullable<Camera>);
    /**
     * Gets or sets a boolean indicating if the depth buffer stores screen space depth instead of camera view space depth.
     */
    get useScreenspaceDepth(): boolean;
    set useScreenspaceDepth(use: boolean);
    /**
     * Gets or sets a boolean indicating if the normals are in world space (false by default, meaning normals are in camera view space).
     */
    get normalsAreInWorldSpace(): boolean;
    set normalsAreInWorldSpace(normalsAreInWorldSpace: boolean);
    /**
     * Gets or sets a boolean indicating if the normals are encoded as unsigned, that is normalUnsigned = normal*0.5+0.5 (false by default).
     */
    get normalsAreUnsigned(): boolean;
    set normalsAreUnsigned(normalsAreUnsigned: boolean);
    /**
     * Checks if all the post processes in the pipeline are ready.
     * @returns true if all the post processes in the pipeline are ready
     */
    isReady(): boolean;
    private _scene;
    /**
     * Constructor of the SSR rendering pipeline
     * @param name The rendering pipeline name
     * @param scene The scene linked to this pipeline
     */
    constructor(name: string, scene: Scene);
    /**
     * Disposes of the pipeline
     */
    dispose(): void;
}
