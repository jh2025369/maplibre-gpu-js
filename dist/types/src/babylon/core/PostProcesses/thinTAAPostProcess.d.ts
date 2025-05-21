import type { Nullable, AbstractEngine, EffectWrapperCreationOptions } from "core/index";
import { Camera } from "../Cameras/camera";
import { EffectWrapper } from "core/Materials/effectRenderer";
/**
 * Simple implementation of Temporal Anti-Aliasing (TAA).
 * This can be used to improve image quality for still pictures (screenshots for e.g.).
 */
export declare class ThinTAAPostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "taa";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    /**
     * The list of samplers used by the effect
     */
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    private _samples;
    /**
     * Number of accumulated samples (default: 8)
     */
    set samples(samples: number);
    get samples(): number;
    /**
     * The factor used to blend the history frame with current frame (default: 0.05)
     */
    factor: number;
    /**
     * The camera to use for the post process
     */
    camera: Nullable<Camera>;
    private _disabled;
    /**
     * Whether the TAA is disabled
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _textureWidth;
    /**
     * The width of the texture in which to render
     */
    get textureWidth(): number;
    set textureWidth(width: number);
    private _textureHeight;
    /**
     * The height of the texture in which to render
     */
    get textureHeight(): number;
    set textureHeight(height: number);
    /**
     * Disable TAA on camera move (default: true).
     * You generally want to keep this enabled, otherwise you will get a ghost effect when the camera moves (but if it's what you want, go for it!)
     */
    disableOnCameraMove: boolean;
    private _hs;
    private _firstUpdate;
    /**
     * Constructs a new TAA post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    /** @internal */
    _reset(): void;
    updateProjectionMatrix(): void;
    bind(): void;
}
