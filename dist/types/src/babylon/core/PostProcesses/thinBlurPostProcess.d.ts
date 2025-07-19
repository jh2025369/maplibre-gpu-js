import type { Nullable, AbstractEngine, EffectWrapperCreationOptions, Vector2, Effect } from "core/index";
import { EffectWrapper } from "../Materials/effectRenderer";
/**
 * Post process used to apply a blur effect
 */
export declare class ThinBlurPostProcess extends EffectWrapper {
    /**
     * The vertex shader url
     */
    static readonly VertexUrl = "kernelBlur";
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "kernelBlur";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    /**
     * The list of samplers used by the effect
     */
    static readonly Samplers: string[];
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    protected _kernel: number;
    protected _idealKernel: number;
    protected _packedFloat: boolean;
    private _staticDefines;
    /**
     * Constructs a new blur post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param direction Direction in which to apply the blur
     * @param kernel Kernel size of the blur
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, direction?: Vector2, kernel?: number, options?: EffectWrapperCreationOptions);
    /**
     * Width of the texture to apply the blur on
     */
    textureWidth: number;
    /**
     * Height of the texture to apply the blur on
     */
    textureHeight: number;
    /** The direction in which to blur the image. */
    direction: Vector2;
    /**
     * Sets the length in pixels of the blur sample region
     */
    set kernel(v: number);
    /**
     * Gets the length in pixels of the blur sample region
     */
    get kernel(): number;
    /**
     * Sets whether or not the blur needs to unpack/repack floats
     */
    set packedFloat(v: boolean);
    /**
     * Gets whether or not the blur is unpacking/repacking floats
     */
    get packedFloat(): boolean;
    bind(): void;
    /** @internal */
    _updateParameters(onCompiled?: (effect: Effect) => void, onError?: (effect: Effect, errors: string) => void): void;
    /**
     * Best kernels are odd numbers that when divided by 2, their integer part is even, so 5, 9 or 13.
     * Other odd kernels optimize correctly but require proportionally more samples, even kernels are
     * possible but will produce minor visual artifacts. Since each new kernel requires a new shader we
     * want to minimize kernel changes, having gaps between physical kernels is helpful in that regard.
     * The gaps between physical kernels are compensated for in the weighting of the samples
     * @param idealKernel Ideal blur kernel.
     * @returns Nearest best kernel.
     */
    protected _nearestBestKernel(idealKernel: number): number;
    /**
     * Calculates the value of a Gaussian distribution with sigma 3 at a given point.
     * @param x The point on the Gaussian distribution to sample.
     * @returns the value of the Gaussian function at x.
     */
    protected _gaussianWeight(x: number): number;
    /**
     * Generates a string that can be used as a floating point number in GLSL.
     * @param x Value to print.
     * @param decimalFigures Number of decimal places to print the number to (excluding trailing 0s).
     * @returns GLSL float string.
     */
    protected _glslFloat(x: number, decimalFigures?: number): string;
}
