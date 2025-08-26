import type { Nullable, EffectWrapperCreationOptions, AbstractEngine } from "core/index";
import { EffectWrapper } from "core/Materials/effectRenderer";
/**
 * PassPostProcess which produces an output the same as it's input
 */
export declare class ThinPassPostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "pass";
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * Constructs a new pass post process
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
}
/**
 * PassCubePostProcess which produces an output the same as it's input (which must be a cube texture)
 */
export declare class ThinPassCubePostProcess extends EffectWrapper {
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "passCube";
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * Creates the PassCubePostProcess
     * @param name Name of the effect
     * @param engine Engine to use to render the effect. If not provided, the last created engine will be used
     * @param options Options to configure the effect
     */
    constructor(name: string, engine?: Nullable<AbstractEngine>, options?: EffectWrapperCreationOptions);
    private _face;
    /**
     * Gets or sets the cube face to display.
     *  * 0 is +X
     *  * 1 is -X
     *  * 2 is +Y
     *  * 3 is -Y
     *  * 4 is +Z
     *  * 5 is -Z
     */
    get face(): number;
    set face(value: number);
}
