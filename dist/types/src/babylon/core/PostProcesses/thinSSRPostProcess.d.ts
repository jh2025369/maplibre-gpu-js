import type { Nullable, Scene, CubeTexture, Camera, EffectWrapperCreationOptions } from "core/index";
import { EffectWrapper } from "core/Materials/effectRenderer";
/**
 * @internal
 */
export declare class ThinSSRPostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "screenSpaceReflection2";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    isSSRSupported: boolean;
    maxDistance: number;
    step: number;
    thickness: number;
    strength: number;
    reflectionSpecularFalloffExponent: number;
    maxSteps: number;
    roughnessFactor: number;
    selfCollisionNumSkip: number;
    private _reflectivityThreshold;
    get reflectivityThreshold(): number;
    set reflectivityThreshold(threshold: number);
    private _useBlur;
    get useBlur(): boolean;
    set useBlur(blur: boolean);
    private _enableSmoothReflections;
    get enableSmoothReflections(): boolean;
    set enableSmoothReflections(enabled: boolean);
    private _environmentTexture;
    get environmentTexture(): Nullable<CubeTexture>;
    set environmentTexture(texture: Nullable<CubeTexture>);
    private _environmentTextureIsProbe;
    get environmentTextureIsProbe(): boolean;
    set environmentTextureIsProbe(isProbe: boolean);
    private _attenuateScreenBorders;
    get attenuateScreenBorders(): boolean;
    set attenuateScreenBorders(attenuate: boolean);
    private _attenuateIntersectionDistance;
    get attenuateIntersectionDistance(): boolean;
    set attenuateIntersectionDistance(attenuate: boolean);
    private _attenuateIntersectionIterations;
    get attenuateIntersectionIterations(): boolean;
    set attenuateIntersectionIterations(attenuate: boolean);
    private _attenuateFacingCamera;
    get attenuateFacingCamera(): boolean;
    set attenuateFacingCamera(attenuate: boolean);
    private _attenuateBackfaceReflection;
    get attenuateBackfaceReflection(): boolean;
    set attenuateBackfaceReflection(attenuate: boolean);
    private _clipToFrustum;
    get clipToFrustum(): boolean;
    set clipToFrustum(clip: boolean);
    private _useFresnel;
    get useFresnel(): boolean;
    set useFresnel(fresnel: boolean);
    private _enableAutomaticThicknessComputation;
    get enableAutomaticThicknessComputation(): boolean;
    set enableAutomaticThicknessComputation(automatic: boolean);
    private _inputTextureColorIsInGammaSpace;
    get inputTextureColorIsInGammaSpace(): boolean;
    set inputTextureColorIsInGammaSpace(gammaSpace: boolean);
    private _generateOutputInGammaSpace;
    get generateOutputInGammaSpace(): boolean;
    set generateOutputInGammaSpace(gammaSpace: boolean);
    private _debug;
    get debug(): boolean;
    set debug(value: boolean);
    private _textureWidth;
    get textureWidth(): number;
    set textureWidth(width: number);
    private _textureHeight;
    get textureHeight(): number;
    set textureHeight(height: number);
    camera: Nullable<Camera>;
    private _useScreenspaceDepth;
    get useScreenspaceDepth(): boolean;
    set useScreenspaceDepth(value: boolean);
    private _normalsAreInWorldSpace;
    get normalsAreInWorldSpace(): boolean;
    set normalsAreInWorldSpace(value: boolean);
    private _normalsAreUnsigned;
    get normalsAreUnsigned(): boolean;
    set normalsAreUnsigned(value: boolean);
    private _scene;
    constructor(name: string, scene: Scene, options?: EffectWrapperCreationOptions);
    bind(noDefaultBindings?: boolean): void;
    private _updateEffectDefines;
}
