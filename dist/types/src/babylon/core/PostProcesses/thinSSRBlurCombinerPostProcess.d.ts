import type { Nullable, AbstractEngine, EffectWrapperCreationOptions, Camera } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * @internal
 */
export declare class ThinSSRBlurCombinerPostProcess extends EffectWrapper {
    static readonly FragmentUrl = "screenSpaceReflection2BlurCombiner";
    static readonly Uniforms: string[];
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    strength: number;
    reflectionSpecularFalloffExponent: number;
    camera: Nullable<Camera>;
    private _useFresnel;
    get useFresnel(): boolean;
    set useFresnel(fresnel: boolean);
    private _useScreenspaceDepth;
    get useScreenspaceDepth(): boolean;
    set useScreenspaceDepth(value: boolean);
    private _inputTextureColorIsInGammaSpace;
    get inputTextureColorIsInGammaSpace(): boolean;
    set inputTextureColorIsInGammaSpace(gammaSpace: boolean);
    private _generateOutputInGammaSpace;
    get generateOutputInGammaSpace(): boolean;
    set generateOutputInGammaSpace(gammaSpace: boolean);
    private _debug;
    get debug(): boolean;
    set debug(value: boolean);
    private _reflectivityThreshold;
    get reflectivityThreshold(): number;
    set reflectivityThreshold(threshold: number);
    private _normalsAreInWorldSpace;
    get normalsAreInWorldSpace(): boolean;
    set normalsAreInWorldSpace(value: boolean);
    private _normalsAreUnsigned;
    get normalsAreUnsigned(): boolean;
    set normalsAreUnsigned(value: boolean);
    bind(noDefaultBindings?: boolean): void;
    private _updateEffectDefines;
}
