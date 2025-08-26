/**
 * @internal
 **/
export declare class AlphaState {
    _blendFunctionParameters: number[];
    _blendEquationParameters: number[];
    _blendConstants: number[];
    _isBlendConstantsDirty: boolean;
    _alphaBlend: any[];
    _numTargetEnabled: number;
    private _isAlphaBlendDirty;
    private _isBlendFunctionParametersDirty;
    private _isBlendEquationParametersDirty;
    /**
     * Initializes the state.
     */
    constructor();
    get isDirty(): boolean;
    get alphaBlend(): boolean;
    setAlphaBlend(value: boolean, targetIndex?: number): void;
    setAlphaBlendConstants(r: number, g: number, b: number, a: number): void;
    setAlphaBlendFunctionParameters(srcRGBFactor: number, dstRGBFactor: number, srcAlphaFactor: number, dstAlphaFactor: number, targetIndex?: number): void;
    setAlphaEquationParameters(rgbEquation: number, alphaEquation: number, targetIndex?: number): void;
    reset(): void;
    apply(gl: WebGLRenderingContext, numTargets?: number): void;
    setAlphaMode(mode: number, targetIndex: number): void;
}
