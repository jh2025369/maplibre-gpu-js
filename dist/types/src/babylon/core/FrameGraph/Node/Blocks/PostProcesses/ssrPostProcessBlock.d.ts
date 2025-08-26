import type { Scene, FrameGraph, NodeRenderGraphConnectionPoint, NodeRenderGraphBuildState } from "core/index";
import { FrameGraphSSRRenderingPipelineTask } from "../../../Tasks/PostProcesses/ssrRenderingPipelineTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the SSR post process
 */
export declare class NodeRenderGraphSSRPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphSSRRenderingPipelineTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphSSRRenderingPipelineTask;
    /**
     * Create a new NodeRenderGraphSSRPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     * @param textureType The texture type used by the different post processes created by SSR (default: Constants.TEXTURETYPE_UNSIGNED_BYTE)
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, textureType?: number);
    private _createTask;
    /** The texture type used by the different post processes created by SSR */
    get textureType(): number;
    set textureType(value: number);
    /** Gets or sets a boolean indicating if the effect should be rendered in debug mode */
    get debug(): boolean;
    set debug(value: boolean);
    /** Gets or sets the current reflection strength. 1.0 is an ideal value but can be increased/decreased for particular results */
    get strength(): number;
    set strength(value: number);
    /** Gets or sets the falloff exponent used to compute the reflection strength. Higher values lead to fainter reflections */
    get reflectionSpecularFalloffExponent(): number;
    set reflectionSpecularFalloffExponent(value: number);
    /** Gets or sets the minimum value for one of the reflectivity component of the material to consider it for SSR */
    get reflectivityThreshold(): number;
    set reflectivityThreshold(value: number);
    /** Gets or sets the thickness value used as tolerance when computing the intersection between the reflected ray and the scene */
    get thickness(): number;
    set thickness(value: number);
    /** Gets or sets the step size used to iterate until the effect finds the color of the reflection's pixel */
    get step(): number;
    set step(value: number);
    /** Gets or sets whether or not smoothing reflections is enabled */
    get enableSmoothReflections(): boolean;
    set enableSmoothReflections(value: boolean);
    /** Maximum number of steps during the ray marching process after which we consider an intersection could not be found */
    get maxSteps(): number;
    set maxSteps(value: number);
    /** Gets or sets the max distance used to define how far we look for reflection during the ray-marching on the reflected ray */
    get maxDistance(): number;
    set maxDistance(value: number);
    /** Gets or sets the factor applied when computing roughness */
    get roughnessFactor(): number;
    set roughnessFactor(value: number);
    /** Number of steps to skip at start when marching the ray to avoid self collisions */
    get selfCollisionNumSkip(): number;
    set selfCollisionNumSkip(value: number);
    /** Gets or sets the downsample factor used to reduce the size of the texture used to compute the SSR contribution */
    get ssrDownsample(): number;
    set ssrDownsample(value: number);
    /** Gets or sets a boolean indicating if the ray should be clipped to the frustum */
    get clipToFrustum(): boolean;
    set clipToFrustum(value: boolean);
    /** Gets or sets a boolean defining if geometry thickness should be computed automatically */
    get enableAutomaticThicknessComputation(): boolean;
    set enableAutomaticThicknessComputation(value: boolean);
    /** Gets or sets a boolean indicating whether the blending between the current color pixel and the reflection color should be done with a Fresnel coefficient */
    get useFresnel(): boolean;
    set useFresnel(value: boolean);
    /** Gets or sets the blur dispersion strength. Set this value to 0 to disable blurring */
    get blurDispersionStrength(): number;
    set blurDispersionStrength(value: number);
    /** Gets or sets the downsample factor used to reduce the size of the textures used to blur the reflection effect */
    get blurDownsample(): number;
    set blurDownsample(value: number);
    /** Gets or sets a boolean indicating if the reflections should be attenuated at the screen borders */
    get attenuateScreenBorders(): boolean;
    set attenuateScreenBorders(value: boolean);
    /** Gets or sets a boolean indicating if the reflections should be attenuated according to the distance of the intersection */
    get attenuateIntersectionDistance(): boolean;
    set attenuateIntersectionDistance(value: boolean);
    /** Gets or sets a boolean indicating if the reflections should be attenuated according to the number of iterations performed to find the intersection */
    get attenuateIntersectionIterations(): boolean;
    set attenuateIntersectionIterations(value: boolean);
    /** Gets or sets a boolean indicating if the reflections should be attenuated when the reflection ray is facing the camera (the view direction) */
    get attenuateFacingCamera(): boolean;
    set attenuateFacingCamera(value: boolean);
    /** Gets or sets a boolean indicating if the backface reflections should be attenuated */
    get attenuateBackfaceReflection(): boolean;
    set attenuateBackfaceReflection(value: boolean);
    /** Gets or sets a boolean defining if the input color texture is in gamma space */
    get inputTextureColorIsInGammaSpace(): boolean;
    set inputTextureColorIsInGammaSpace(value: boolean);
    /** Gets or sets a boolean defining if the output color texture generated by the SSR pipeline should be in gamma space */
    get generateOutputInGammaSpace(): boolean;
    set generateOutputInGammaSpace(value: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry depth input component
     */
    get geomDepth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry normal input component
     */
    get geomNormal(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry reflectivity input component
     */
    get geomReflectivity(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry back depth input component
     */
    get geomBackDepth(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
