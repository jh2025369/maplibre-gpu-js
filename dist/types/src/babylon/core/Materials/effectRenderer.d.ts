import type { NonNullableFields, Nullable } from "../types";
import type { AbstractEngine } from "../Engines/abstractEngine";
import { Viewport } from "../Maths/math.viewport";
import { Observable } from "../Misc/observable";
import type { IShaderPath } from "./effect";
import { Effect } from "./effect";
import { DrawWrapper } from "./drawWrapper";
import type { IRenderTargetTexture, RenderTargetWrapper } from "../Engines/renderTargetWrapper";
import { ShaderLanguage } from "./shaderLanguage";
import "../Shaders/postprocess.vertex";
/**
 * Effect Render Options
 */
export interface IEffectRendererOptions {
    /**
     * Defines the vertices positions.
     */
    positions?: number[];
    /**
     * Defines the indices.
     */
    indices?: number[];
}
/**
 * Helper class to render one or more effects.
 * You can access the previous rendering in your shader by declaring a sampler named textureSampler
 */
export declare class EffectRenderer {
    /**
     * The engine the effect renderer has been created for.
     */
    readonly engine: AbstractEngine;
    private _vertexBuffers;
    private _indexBuffer;
    private _fullscreenViewport;
    private _onContextRestoredObserver;
    private _savedStateDepthTest;
    private _savedStateStencilTest;
    /**
     * Creates an effect renderer
     * @param engine the engine to use for rendering
     * @param options defines the options of the effect renderer
     */
    constructor(engine: AbstractEngine, options?: IEffectRendererOptions);
    /**
     * Sets the current viewport in normalized coordinates 0-1
     * @param viewport Defines the viewport to set (defaults to 0 0 1 1)
     */
    setViewport(viewport?: Viewport): void;
    /**
     * Binds the embedded attributes buffer to the effect.
     * @param effect Defines the effect to bind the attributes for
     */
    bindBuffers(effect: Effect): void;
    /**
     * Sets the current effect wrapper to use during draw.
     * The effect needs to be ready before calling this api.
     * This also sets the default full screen position attribute.
     * @param effectWrapper Defines the effect to draw with
     */
    applyEffectWrapper(effectWrapper: EffectWrapper): void;
    /**
     * Saves engine states
     */
    saveStates(): void;
    /**
     * Restores engine states
     */
    restoreStates(): void;
    /**
     * Draws a full screen quad.
     */
    draw(): void;
    private _isRenderTargetTexture;
    /**
     * renders one or more effects to a specified texture
     * @param effectWrapper the effect to renderer
     * @param outputTexture texture to draw to, if null it will render to the currently bound frame buffer
     */
    render(effectWrapper: EffectWrapper, outputTexture?: Nullable<RenderTargetWrapper | IRenderTargetTexture>): void;
    /**
     * Disposes of the effect renderer
     */
    dispose(): void;
}
/**
 * Allows for custom processing of the shader code used by an effect wrapper
 */
export type EffectWrapperCustomShaderCodeProcessing = {
    /**
     * If provided, will be called two times with the vertex and fragment code so that this code can be updated after the #include have been processed
     */
    processCodeAfterIncludes?: (postProcessName: string, shaderType: string, code: string) => string;
    /**
     * If provided, will be called two times with the vertex and fragment code so that this code can be updated before it is compiled by the GPU
     */
    processFinalCode?: (postProcessName: string, shaderType: string, code: string) => string;
    /**
     * If provided, will be called before creating the effect to collect additional custom bindings (defines, uniforms, samplers)
     */
    defineCustomBindings?: (postProcessName: string, defines: Nullable<string>, uniforms: string[], samplers: string[]) => Nullable<string>;
    /**
     * If provided, will be called when binding inputs to the shader code to allow the user to add custom bindings
     */
    bindCustomBindings?: (postProcessName: string, effect: Effect) => void;
};
/**
 * Options to create an EffectWrapper
 */
export interface EffectWrapperCreationOptions {
    /**
     * Engine to use to create the effect
     */
    engine?: AbstractEngine;
    /**
     * Fragment shader for the effect
     */
    fragmentShader?: string;
    /**
     * Use the shader store instead of direct source code
     */
    useShaderStore?: boolean;
    /**
     * Vertex shader for the effect (default: "postprocess")
     */
    vertexShader?: string;
    /**
     * Alias for vertexShader
     */
    vertexUrl?: string;
    /**
     * Attributes to use in the shader (default: ["position"])
     */
    attributeNames?: Array<string>;
    /**
     * Uniforms to use in the shader
     */
    uniformNames?: Array<string>;
    /**
     * Alias for uniformNames. Note that if it is provided, it takes precedence over uniformNames.
     */
    uniforms?: Nullable<string[]>;
    /**
     * Texture sampler names to use in the shader
     */
    samplerNames?: Array<string>;
    /**
     * Alias for samplerNames. Note that if it is provided, it takes precedence over samplerNames.
     */
    samplers?: Nullable<string[]>;
    /**
     * The list of uniform buffers used in the shader (if any)
     */
    uniformBuffers?: Nullable<string[]>;
    /**
     * Defines to use in the shader
     */
    defines?: Nullable<string | Array<string>>;
    /**
     * The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined)
     * See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
     */
    indexParameters?: any;
    /**
     * If the shader should not be compiled immediately. (default: false)
     */
    blockCompilation?: boolean;
    /**
     * Callback when effect is compiled
     */
    onCompiled?: Nullable<(effect: Effect) => void>;
    /**
     * The friendly name of the effect (default: "effectWrapper")
     */
    name?: string;
    /**
     * The language the shader is written in (default: GLSL)
     */
    shaderLanguage?: ShaderLanguage;
    /**
     * Defines additional code to call to prepare the shader code
     */
    extraInitializations?: (useWebGPU: boolean, list: Promise<any>[]) => void;
    /**
     * Additional async code to run before preparing the effect
     */
    extraInitializationsAsync?: () => Promise<void>;
    /**
     * If the effect should be used as a post process (default: false). If true, the effect will be created with a "scale" uniform and a "textureSampler" sampler
     */
    useAsPostProcess?: boolean;
}
/**
 * Wraps an effect to be used for rendering
 */
export declare class EffectWrapper {
    /**
     * Force code to compile to glsl even on WebGPU engines.
     * False by default. This is mostly meant for backward compatibility.
     */
    static ForceGLSL: boolean;
    private static _CustomShaderCodeProcessing;
    /**
     * Registers a shader code processing with an effect wrapper name.
     * @param effectWrapperName name of the effect wrapper. Use null for the fallback shader code processing. This is the shader code processing that will be used in case no specific shader code processing has been associated to an effect wrapper name
     * @param customShaderCodeProcessing shader code processing to associate to the effect wrapper name
     */
    static RegisterShaderCodeProcessing(effectWrapperName: Nullable<string>, customShaderCodeProcessing?: EffectWrapperCustomShaderCodeProcessing): void;
    private static _GetShaderCodeProcessing;
    /**
     * Gets or sets the name of the effect wrapper
     */
    get name(): string;
    set name(value: string);
    /**
     * Type of alpha mode to use when applying the effect (default: Engine.ALPHA_DISABLE). Used only if useAsPostProcess is true.
     */
    alphaMode: number;
    /**
     * Executed when the effect is created
     * @returns effect that was created for this effect wrapper
     */
    onEffectCreatedObservable: Observable<Effect>;
    /**
     * Options used to create the effect wrapper
     */
    readonly options: Required<NonNullableFields<EffectWrapperCreationOptions>>;
    /**
     * Get a value indicating if the effect is ready to be used
     * @returns true if the post-process is ready (shader is compiled)
     */
    isReady(): boolean;
    /**
     * Get the draw wrapper associated with the effect wrapper
     * @returns the draw wrapper associated with the effect wrapper
     */
    get drawWrapper(): DrawWrapper;
    /**
     * Event that is fired (only when the EffectWrapper is used with an EffectRenderer) right before the effect is drawn (should be used to update uniforms)
     */
    onApplyObservable: Observable<{}>;
    /**
     * The underlying effect
     */
    get effect(): Effect;
    set effect(effect: Effect);
    protected readonly _drawWrapper: DrawWrapper;
    protected _shadersLoaded: boolean;
    protected readonly _shaderPath: IShaderPath;
    /** @internal */
    _webGPUReady: boolean;
    private _onContextRestoredObserver;
    /**
     * Creates an effect to be rendered
     * @param creationOptions options to create the effect
     */
    constructor(creationOptions: EffectWrapperCreationOptions);
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    private _importPromises;
    /** @internal */
    _postConstructor(blockCompilation: boolean, defines?: Nullable<string>, extraInitializations?: (useWebGPU: boolean, list: Promise<any>[]) => void, importPromises?: Array<Promise<any>>): void;
    /**
     * Updates the effect with the current effect wrapper compile time values and recompiles the shader.
     * @param defines Define statements that should be added at the beginning of the shader. (default: null)
     * @param uniforms Set of uniform variables that will be passed to the shader. (default: null)
     * @param samplers Set of Texture2D variables that will be passed to the shader. (default: null)
     * @param indexParameters The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined) See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
     * @param onCompiled Called when the shader has been compiled.
     * @param onError Called if there is an error when compiling a shader.
     * @param vertexUrl The url of the vertex shader to be used (default: the one given at construction time)
     * @param fragmentUrl The url of the fragment shader to be used (default: the one given at construction time)
     */
    updateEffect(defines?: Nullable<string>, uniforms?: Nullable<string[]>, samplers?: Nullable<string[]>, indexParameters?: any, onCompiled?: (effect: Effect) => void, onError?: (effect: Effect, errors: string) => void, vertexUrl?: string, fragmentUrl?: string): void;
    /**
     * Binds the data to the effect.
     */
    bind(): void;
    /**
     * Disposes of the effect wrapper
     * @param _ignored kept for backward compatibility
     */
    dispose(_ignored?: boolean): void;
}
