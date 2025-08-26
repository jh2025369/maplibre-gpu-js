import type { Nullable, EffectWrapperCreationOptions, AbstractEngine, InternalTexture, Scene } from "core/index";
import { Observable } from "./observable";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * @internal
 */
export declare const enum DepthTextureType {
    NormalizedViewDepth = 0,
    ViewDepth = 1,
    ScreenDepth = 2
}
/**
 * @internal
 */
export declare class ThinMinMaxReducerPostProcess extends EffectWrapper {
    static readonly FragmentUrl = "minmaxRedux";
    static readonly Uniforms: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    textureWidth: number;
    textureHeight: number;
    constructor(name: string, engine?: Nullable<AbstractEngine>, defines?: string, options?: EffectWrapperCreationOptions);
    bind(noDefaultBindings?: boolean): void;
}
/**
 * @internal
 */
export declare class ThinMinMaxReducer {
    readonly onAfterReductionPerformed: Observable<{
        min: number;
        max: number;
    }>;
    readonly reductionSteps: Array<ThinMinMaxReducerPostProcess>;
    private _depthRedux;
    private _depthTextureType;
    get depthRedux(): boolean;
    set depthRedux(value: boolean);
    protected readonly _scene: Scene;
    private _textureWidth;
    private _textureHeight;
    get textureWidth(): number;
    get textureHeight(): number;
    constructor(scene: Scene, depthRedux?: boolean);
    setTextureDimensions(width: number, height: number, depthTextureType?: DepthTextureType): boolean;
    readMinMax(texture: InternalTexture): void;
    dispose(disposeAll?: boolean): void;
    private _recreatePostProcesses;
}
