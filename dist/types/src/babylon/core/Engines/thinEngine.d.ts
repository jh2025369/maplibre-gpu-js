import type { IEffectCreationOptions, IShaderPath } from "../Materials/effect";
import type { ShaderProcessingContext } from "./Processors/shaderProcessingOptions";
import type { Nullable, DataArray, IndicesArray, FloatArray, DeepImmutable } from "../types";
import type { IColor4Like } from "../Maths/math.like";
import type { DataBuffer } from "../Buffers/dataBuffer";
import type { IPipelineContext } from "./IPipelineContext";
import type { WebGLPipelineContext } from "./WebGL/webGLPipelineContext";
import type { VertexBuffer } from "../Buffers/buffer";
import type { InstancingAttributeInfo } from "./instancingAttributeInfo";
import type { ThinTexture } from "../Materials/Textures/thinTexture";
import type { IEffectFallbacks } from "../Materials/iEffectFallbacks";
import type { HardwareTextureWrapper } from "../Materials/Textures/hardwareTextureWrapper";
import type { DrawWrapper } from "../Materials/drawWrapper";
import type { IMaterialContext } from "./IMaterialContext";
import type { IDrawContext } from "./IDrawContext";
import type { ICanvas, ICanvasRenderingContext } from "./ICanvas";
import type { IStencilState } from "../States/IStencilState";
import type { InternalTextureCreationOptions, TextureSize } from "../Materials/Textures/textureCreationOptions";
import type { RenderTargetWrapper } from "./renderTargetWrapper";
import type { AbstractEngineOptions, ISceneLike } from "./abstractEngine";
import type { PerformanceMonitor } from "../Misc/performanceMonitor";
import { AbstractEngine } from "./abstractEngine";
import { WebGLHardwareTexture } from "./WebGL/webGLHardwareTexture";
import { ShaderLanguage } from "../Materials/shaderLanguage";
import { InternalTexture, InternalTextureSource } from "../Materials/Textures/internalTexture";
import { Effect } from "../Materials/effect";
import { _ConcatenateShader } from "./abstractEngine.functions";
/** Interface defining initialization parameters for Engine class */
export interface EngineOptions extends AbstractEngineOptions, WebGLContextAttributes {
    /**
     * Defines if webgl2 should be turned off even if supported
     * @see https://doc.babylonjs.com/setup/support/webGL2
     */
    disableWebGL2Support?: boolean;
    /**
     * Defines that engine should compile shaders with high precision floats (if supported). True by default
     */
    useHighPrecisionFloats?: boolean;
    /**
     * Make the canvas XR Compatible for XR sessions
     */
    xrCompatible?: boolean;
    /**
     * Will prevent the system from falling back to software implementation if a hardware device cannot be created
     */
    failIfMajorPerformanceCaveat?: boolean;
    /**
     * If sRGB Buffer support is not set during construction, use this value to force a specific state
     * This is added due to an issue when processing textures in chrome/edge/firefox
     * This will not influence NativeEngine and WebGPUEngine which set the behavior to true during construction.
     */
    forceSRGBBufferSupportState?: boolean;
    /**
     * Defines if the gl context should be released.
     * It's false by default for backward compatibility, but you should probably pass true (see https://registry.khronos.org/webgl/extensions/WEBGL_lose_context/)
     */
    loseContextOnDispose?: boolean;
}
/**
 * The base engine class (root of all engines)
 */
export declare class ThinEngine extends AbstractEngine {
    private static _TempClearColorUint32;
    private static _TempClearColorInt32;
    /** Use this array to turn off some WebGL2 features on known buggy browsers version */
    static ExceptionList: {
        key: string;
        capture: string;
        captureConstraint: number;
        targets: string[];
    }[];
    /** @internal */
    protected _name: string;
    /**
     * Gets or sets the name of the engine
     */
    get name(): string;
    set name(value: string);
    /**
     * Returns the version of the engine
     */
    get version(): number;
    /**
     * Gets or sets the relative url used to load shaders if using the engine in non-minified mode
     */
    static get ShadersRepository(): string;
    static set ShadersRepository(value: string);
    /**
     * Gets or sets a boolean that indicates if textures must be forced to power of 2 size even if not required
     */
    forcePOTTextures: boolean;
    /** Gets or sets a boolean indicating if the engine should validate programs after compilation */
    validateShaderPrograms: boolean;
    /**
     * Gets or sets a boolean indicating that uniform buffers must be disabled even if they are supported
     */
    disableUniformBuffers: boolean;
    /**
     * Gets a boolean indicating that the engine supports uniform buffers
     * @see https://doc.babylonjs.com/setup/support/webGL2#uniform-buffer-objets
     */
    get supportsUniformBuffers(): boolean;
    /** @internal */
    _gl: WebGL2RenderingContext;
    /** @internal */
    _webGLVersion: number;
    /** @internal */
    _glSRGBExtensionValues: {
        SRGB: typeof WebGL2RenderingContext.SRGB;
        SRGB8: typeof WebGL2RenderingContext.SRGB8 | EXT_sRGB["SRGB_ALPHA_EXT"];
        SRGB8_ALPHA8: typeof WebGL2RenderingContext.SRGB8_ALPHA8 | EXT_sRGB["SRGB_ALPHA_EXT"];
    };
    /**
     * Gets a boolean indicating that only power of 2 textures are supported
     * Please note that you can still use non power of 2 textures but in this case the engine will forcefully convert them
     */
    get needPOTTextures(): boolean;
    private _glVersion;
    private _glRenderer;
    private _glVendor;
    /** @internal */
    _currentMaterialContext: IMaterialContext;
    /** @internal */
    protected _currentProgram: Nullable<WebGLProgram>;
    private _vertexAttribArraysEnabled;
    private _cachedVertexArrayObject;
    private _uintIndicesCurrentlySet;
    protected _currentBoundBuffer: DataBuffer[];
    /** @internal */
    _currentFramebuffer: Nullable<WebGLFramebuffer>;
    /** @internal */
    _dummyFramebuffer: Nullable<WebGLFramebuffer>;
    private _currentBufferPointers;
    private _currentInstanceLocations;
    private _currentInstanceBuffers;
    private _textureUnits;
    /** @internal */
    _workingCanvas: Nullable<ICanvas>;
    /** @internal */
    _workingContext: Nullable<ICanvasRenderingContext>;
    private _vaoRecordInProgress;
    private _mustWipeVertexAttributes;
    private _nextFreeTextureSlots;
    private _maxSimultaneousTextures;
    private _maxMSAASamplesOverride;
    protected get _supportsHardwareTextureRescaling(): boolean;
    protected _framebufferDimensionsObject: Nullable<{
        framebufferWidth: number;
        framebufferHeight: number;
    }>;
    /**
     * sets the object from which width and height will be taken from when getting render width and height
     * Will fallback to the gl object
     * @param dimensions the framebuffer width and height that will be used.
     */
    set framebufferDimensionsObject(dimensions: Nullable<{
        framebufferWidth: number;
        framebufferHeight: number;
    }>);
    /**
     * Creates a new snapshot at the next frame using the current snapshotRenderingMode
     */
    snapshotRenderingReset(): void;
    /**
     * Creates a new engine
     * @param canvasOrContext defines the canvas or WebGL context to use for rendering. If you provide a WebGL context, Babylon.js will not hook events on the canvas (like pointers, keyboards, etc...) so no event observables will be available. This is mostly used when Babylon.js is used as a plugin on a system which already used the WebGL context
     * @param antialias defines whether anti-aliasing should be enabled (default value is "undefined", meaning that the browser may or may not enable it)
     * @param options defines further options to be sent to the getContext() function
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    constructor(canvasOrContext: Nullable<HTMLCanvasElement | OffscreenCanvas | WebGLRenderingContext | WebGL2RenderingContext>, antialias?: boolean, options?: EngineOptions, adaptToDeviceRatio?: boolean);
    protected _clearEmptyResources(): void;
    /**
     * @internal
     */
    _getShaderProcessingContext(shaderLanguage: ShaderLanguage): Nullable<ShaderProcessingContext>;
    /**
     * Gets a boolean indicating if all created effects are ready
     * @returns true if all effects are ready
     */
    areAllEffectsReady(): boolean;
    protected _initGLContext(): void;
    protected _initFeatures(): void;
    /**
     * Gets version of the current webGL context
     * Keep it for back compat - use version instead
     */
    get webGLVersion(): number;
    /**
     * Gets a string identifying the name of the class
     * @returns "Engine" string
     */
    getClassName(): string;
    /** @internal */
    _prepareWorkingCanvas(): void;
    /**
     * Gets an object containing information about the current engine context
     * @returns an object containing the vendor, the renderer and the version of the current engine context
     */
    getInfo(): {
        vendor: string;
        renderer: string;
        version: string;
    };
    /**
     * Gets an object containing information about the current webGL context
     * @returns an object containing the vendor, the renderer and the version of the current webGL context
     */
    getGlInfo(): {
        vendor: string;
        renderer: string;
        version: string;
    };
    /**Gets driver info if available */
    extractDriverInfo(): string;
    /**
     * Gets the current render width
     * @param useScreen defines if screen size must be used (or the current render target if any)
     * @returns a number defining the current render width
     */
    getRenderWidth(useScreen?: boolean): number;
    /**
     * Gets the current render height
     * @param useScreen defines if screen size must be used (or the current render target if any)
     * @returns a number defining the current render height
     */
    getRenderHeight(useScreen?: boolean): number;
    /**
     * Clear the current render buffer or the current render target (if any is set up)
     * @param color defines the color to use
     * @param backBuffer defines if the back buffer must be cleared
     * @param depth defines if the depth buffer must be cleared
     * @param stencil defines if the stencil buffer must be cleared
     */
    clear(color: Nullable<IColor4Like>, backBuffer: boolean, depth: boolean, stencil?: boolean): void;
    /**
     * @internal
     */
    _viewport(x: number, y: number, width: number, height: number): void;
    /**
     * End the current frame
     */
    endFrame(): void;
    /**
     * Gets the performance monitor attached to this engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#engineinstrumentation
     */
    get performanceMonitor(): PerformanceMonitor;
    /**
     * Binds the frame buffer to the specified texture.
     * @param rtWrapper The render target wrapper to render to
     * @param faceIndex The face of the texture to render to in case of cube texture and if the render target wrapper is not a multi render target
     * @param requiredWidth The width of the target to render to
     * @param requiredHeight The height of the target to render to
     * @param forceFullscreenViewport Forces the viewport to be the entire texture/screen if true
     * @param lodLevel Defines the lod level to bind to the frame buffer
     * @param layer Defines the 2d array index to bind to the frame buffer if the render target wrapper is not a multi render target
     */
    bindFramebuffer(rtWrapper: RenderTargetWrapper, faceIndex?: number, requiredWidth?: number, requiredHeight?: number, forceFullscreenViewport?: boolean, lodLevel?: number, layer?: number): void;
    /**
     * Set various states to the webGL context
     * @param culling defines culling state: true to enable culling, false to disable it
     * @param zOffset defines the value to apply to zOffset (0 by default)
     * @param force defines if states must be applied even if cache is up to date
     * @param reverseSide defines if culling must be reversed (CCW if false, CW if true)
     * @param cullBackFaces true to cull back faces, false to cull front faces (if culling is enabled)
     * @param stencil stencil states to set
     * @param zOffsetUnits defines the value to apply to zOffsetUnits (0 by default)
     */
    setState(culling: boolean, zOffset?: number, force?: boolean, reverseSide?: boolean, cullBackFaces?: boolean, stencil?: IStencilState, zOffsetUnits?: number): void;
    /**
     * @internal
     */
    _bindUnboundFramebuffer(framebuffer: Nullable<WebGLFramebuffer>): void;
    /** @internal */
    _currentFrameBufferIsDefaultFrameBuffer(): boolean;
    /**
     * Generates the mipmaps for a texture
     * @param texture texture to generate the mipmaps for
     */
    generateMipmaps(texture: InternalTexture): void;
    /**
     * Unbind the current render target texture from the webGL context
     * @param texture defines the render target wrapper to unbind
     * @param disableGenerateMipMaps defines a boolean indicating that mipmaps must not be generated
     * @param onBeforeUnbind defines a function which will be called before the effective unbind
     */
    unBindFramebuffer(texture: RenderTargetWrapper, disableGenerateMipMaps?: boolean, onBeforeUnbind?: () => void): void;
    /**
     * Generates mipmaps for the texture of the (single) render target
     * @param texture The render target containing the texture to generate the mipmaps for
     */
    generateMipMapsFramebuffer(texture: RenderTargetWrapper): void;
    /**
     * Resolves the MSAA texture of the (single) render target into its non-MSAA version.
     * Note that if "texture" is not a MSAA render target, no resolve is performed.
     * @param texture  The render target texture containing the MSAA textures to resolve
     */
    resolveFramebuffer(texture: RenderTargetWrapper): void;
    /**
     * Force a webGL flush (ie. a flush of all waiting webGL commands)
     */
    flushFramebuffer(): void;
    /**
     * Unbind the current render target and bind the default framebuffer
     */
    restoreDefaultFramebuffer(): void;
    /** @internal */
    protected _resetVertexBufferBinding(): void;
    /**
     * Creates a vertex buffer
     * @param data the data or size for the vertex buffer
     * @param _updatable whether the buffer should be created as updatable
     * @param _label defines the label of the buffer (for debug purpose)
     * @returns the new WebGL static buffer
     */
    createVertexBuffer(data: DataArray | number, _updatable?: boolean, _label?: string): DataBuffer;
    private _createVertexBuffer;
    /**
     * Creates a dynamic vertex buffer
     * @param data the data for the dynamic vertex buffer
     * @param _label defines the label of the buffer (for debug purpose)
     * @returns the new WebGL dynamic buffer
     */
    createDynamicVertexBuffer(data: DataArray | number, _label?: string): DataBuffer;
    protected _resetIndexBufferBinding(): void;
    /**
     * Creates a new index buffer
     * @param indices defines the content of the index buffer
     * @param updatable defines if the index buffer must be updatable
     * @param _label defines the label of the buffer (for debug purpose)
     * @returns a new webGL buffer
     */
    createIndexBuffer(indices: IndicesArray, updatable?: boolean, _label?: string): DataBuffer;
    protected _normalizeIndexData(indices: IndicesArray): Uint16Array | Uint32Array;
    /**
     * Bind a webGL buffer to the webGL context
     * @param buffer defines the buffer to bind
     */
    bindArrayBuffer(buffer: Nullable<DataBuffer>): void;
    protected bindIndexBuffer(buffer: Nullable<DataBuffer>): void;
    private _bindBuffer;
    /**
     * update the bound buffer with the given data
     * @param data defines the data to update
     */
    updateArrayBuffer(data: Float32Array): void;
    private _vertexAttribPointer;
    /**
     * @internal
     */
    _bindIndexBufferWithCache(indexBuffer: Nullable<DataBuffer>): void;
    private _bindVertexBuffersAttributes;
    /**
     * Records a vertex array object
     * @see https://doc.babylonjs.com/setup/support/webGL2#vertex-array-objects
     * @param vertexBuffers defines the list of vertex buffers to store
     * @param indexBuffer defines the index buffer to store
     * @param effect defines the effect to store
     * @param overrideVertexBuffers defines optional list of avertex buffers that overrides the entries in vertexBuffers
     * @returns the new vertex array object
     */
    recordVertexArrayObject(vertexBuffers: {
        [key: string]: VertexBuffer;
    }, indexBuffer: Nullable<DataBuffer>, effect: Effect, overrideVertexBuffers?: {
        [kind: string]: Nullable<VertexBuffer>;
    }): WebGLVertexArrayObject;
    /**
     * Bind a specific vertex array object
     * @see https://doc.babylonjs.com/setup/support/webGL2#vertex-array-objects
     * @param vertexArrayObject defines the vertex array object to bind
     * @param indexBuffer defines the index buffer to bind
     */
    bindVertexArrayObject(vertexArrayObject: WebGLVertexArrayObject, indexBuffer: Nullable<DataBuffer>): void;
    /**
     * Bind webGl buffers directly to the webGL context
     * @param vertexBuffer defines the vertex buffer to bind
     * @param indexBuffer defines the index buffer to bind
     * @param vertexDeclaration defines the vertex declaration to use with the vertex buffer
     * @param vertexStrideSize defines the vertex stride of the vertex buffer
     * @param effect defines the effect associated with the vertex buffer
     */
    bindBuffersDirectly(vertexBuffer: DataBuffer, indexBuffer: DataBuffer, vertexDeclaration: number[], vertexStrideSize: number, effect: Effect): void;
    private _unbindVertexArrayObject;
    /**
     * Bind a list of vertex buffers to the webGL context
     * @param vertexBuffers defines the list of vertex buffers to bind
     * @param indexBuffer defines the index buffer to bind
     * @param effect defines the effect associated with the vertex buffers
     * @param overrideVertexBuffers defines optional list of avertex buffers that overrides the entries in vertexBuffers
     */
    bindBuffers(vertexBuffers: {
        [key: string]: Nullable<VertexBuffer>;
    }, indexBuffer: Nullable<DataBuffer>, effect: Effect, overrideVertexBuffers?: {
        [kind: string]: Nullable<VertexBuffer>;
    }): void;
    /**
     * Unbind all instance attributes
     */
    unbindInstanceAttributes(): void;
    /**
     * Release and free the memory of a vertex array object
     * @param vao defines the vertex array object to delete
     */
    releaseVertexArrayObject(vao: WebGLVertexArrayObject): void;
    /**
     * @internal
     */
    _releaseBuffer(buffer: DataBuffer): boolean;
    protected _deleteBuffer(buffer: DataBuffer): void;
    /**
     * Update the content of a webGL buffer used with instantiation and bind it to the webGL context
     * @param instancesBuffer defines the webGL buffer to update and bind
     * @param data defines the data to store in the buffer
     * @param offsetLocations defines the offsets or attributes information used to determine where data must be stored in the buffer
     */
    updateAndBindInstancesBuffer(instancesBuffer: DataBuffer, data: Float32Array, offsetLocations: number[] | InstancingAttributeInfo[]): void;
    /**
     * Bind the content of a webGL buffer used with instantiation
     * @param instancesBuffer defines the webGL buffer to bind
     * @param attributesInfo defines the offsets or attributes information used to determine where data must be stored in the buffer
     * @param computeStride defines Whether to compute the strides from the info or use the default 0
     */
    bindInstancesBuffer(instancesBuffer: DataBuffer, attributesInfo: InstancingAttributeInfo[], computeStride?: boolean): void;
    /**
     * Disable the instance attribute corresponding to the name in parameter
     * @param name defines the name of the attribute to disable
     */
    disableInstanceAttributeByName(name: string): void;
    /**
     * Disable the instance attribute corresponding to the location in parameter
     * @param attributeLocation defines the attribute location of the attribute to disable
     */
    disableInstanceAttribute(attributeLocation: number): void;
    /**
     * Disable the attribute corresponding to the location in parameter
     * @param attributeLocation defines the attribute location of the attribute to disable
     */
    disableAttributeByIndex(attributeLocation: number): void;
    /**
     * Send a draw order
     * @param useTriangles defines if triangles must be used to draw (else wireframe will be used)
     * @param indexStart defines the starting index
     * @param indexCount defines the number of index to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    draw(useTriangles: boolean, indexStart: number, indexCount: number, instancesCount?: number): void;
    /**
     * Draw a list of points
     * @param verticesStart defines the index of first vertex to draw
     * @param verticesCount defines the count of vertices to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    drawPointClouds(verticesStart: number, verticesCount: number, instancesCount?: number): void;
    /**
     * Draw a list of unindexed primitives
     * @param useTriangles defines if triangles must be used to draw (else wireframe will be used)
     * @param verticesStart defines the index of first vertex to draw
     * @param verticesCount defines the count of vertices to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    drawUnIndexed(useTriangles: boolean, verticesStart: number, verticesCount: number, instancesCount?: number): void;
    /**
     * Draw a list of indexed primitives
     * @param fillMode defines the primitive to use
     * @param indexStart defines the starting index
     * @param indexCount defines the number of index to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    drawElementsType(fillMode: number, indexStart: number, indexCount: number, instancesCount?: number): void;
    /**
     * Draw a list of unindexed primitives
     * @param fillMode defines the primitive to use
     * @param verticesStart defines the index of first vertex to draw
     * @param verticesCount defines the count of vertices to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    drawArraysType(fillMode: number, verticesStart: number, verticesCount: number, instancesCount?: number): void;
    private _drawMode;
    /**
     * @internal
     */
    _releaseEffect(effect: Effect): void;
    /**
     * @internal
     */
    _deletePipelineContext(pipelineContext: IPipelineContext): void;
    /**
     * @internal
     */
    _getGlobalDefines(defines?: {
        [key: string]: string;
    }): string | undefined;
    /**
     * Create a new effect (used to store vertex/fragment shaders)
     * @param baseName defines the base name of the effect (The name of file without .fragment.fx or .vertex.fx)
     * @param attributesNamesOrOptions defines either a list of attribute names or an IEffectCreationOptions object
     * @param uniformsNamesOrEngine defines either a list of uniform names or the engine to use
     * @param samplers defines an array of string used to represent textures
     * @param defines defines the string containing the defines to use to compile the shaders
     * @param fallbacks defines the list of potential fallbacks to use if shader compilation fails
     * @param onCompiled defines a function to call when the effect creation is successful
     * @param onError defines a function to call when the effect creation has failed
     * @param indexParameters defines an object containing the index values to use to compile shaders (like the maximum number of simultaneous lights)
     * @param shaderLanguage the language the shader is written in (default: GLSL)
     * @param extraInitializationsAsync additional async code to run before preparing the effect
     * @returns the new Effect
     */
    createEffect(baseName: string | (IShaderPath & {
        vertexToken?: string;
        fragmentToken?: string;
    }), attributesNamesOrOptions: string[] | IEffectCreationOptions, uniformsNamesOrEngine: string[] | ThinEngine, samplers?: string[], defines?: string, fallbacks?: IEffectFallbacks, onCompiled?: Nullable<(effect: Effect) => void>, onError?: Nullable<(effect: Effect, errors: string) => void>, indexParameters?: any, shaderLanguage?: ShaderLanguage, extraInitializationsAsync?: () => Promise<void>): Effect;
    protected static _ConcatenateShader: typeof _ConcatenateShader;
    /**
     * @internal
     */
    _getShaderSource(shader: WebGLShader): Nullable<string>;
    /**
     * Directly creates a webGL program
     * @param pipelineContext  defines the pipeline context to attach to
     * @param vertexCode defines the vertex shader code to use
     * @param fragmentCode defines the fragment shader code to use
     * @param context defines the webGL context to use (if not set, the current one will be used)
     * @param transformFeedbackVaryings defines the list of transform feedback varyings to use
     * @returns the new webGL program
     */
    createRawShaderProgram(pipelineContext: IPipelineContext, vertexCode: string, fragmentCode: string, context?: WebGLRenderingContext, transformFeedbackVaryings?: Nullable<string[]>): WebGLProgram;
    /**
     * Creates a webGL program
     * @param pipelineContext  defines the pipeline context to attach to
     * @param vertexCode  defines the vertex shader code to use
     * @param fragmentCode defines the fragment shader code to use
     * @param defines defines the string containing the defines to use to compile the shaders
     * @param context defines the webGL context to use (if not set, the current one will be used)
     * @param transformFeedbackVaryings defines the list of transform feedback varyings to use
     * @returns the new webGL program
     */
    createShaderProgram(pipelineContext: IPipelineContext, vertexCode: string, fragmentCode: string, defines: Nullable<string>, context?: WebGLRenderingContext, transformFeedbackVaryings?: Nullable<string[]>): WebGLProgram;
    /**
     * Inline functions in shader code that are marked to be inlined
     * @param code code to inline
     * @returns inlined code
     */
    inlineShaderCode(code: string): string;
    /**
     * Creates a new pipeline context
     * @param shaderProcessingContext defines the shader processing context used during the processing if available
     * @returns the new pipeline
     */
    createPipelineContext(shaderProcessingContext: Nullable<ShaderProcessingContext>): IPipelineContext;
    /**
     * Creates a new material context
     * @returns the new context
     */
    createMaterialContext(): IMaterialContext | undefined;
    /**
     * Creates a new draw context
     * @returns the new context
     */
    createDrawContext(): IDrawContext | undefined;
    protected _finalizePipelineContext(pipelineContext: WebGLPipelineContext): void;
    /**
     * @internal
     */
    _preparePipelineContext(pipelineContext: IPipelineContext, vertexSourceCode: string, fragmentSourceCode: string, createAsRaw: boolean, rawVertexSourceCode: string, rawFragmentSourceCode: string, rebuildRebind: any, defines: Nullable<string>, transformFeedbackVaryings: Nullable<string[]>, key: string, onReady: () => void): void;
    protected _createShaderProgram(pipelineContext: WebGLPipelineContext, vertexShader: WebGLShader, fragmentShader: WebGLShader, context: WebGLRenderingContext, transformFeedbackVaryings?: Nullable<string[]>): WebGLProgram;
    /**
     * @internal
     */
    _isRenderingStateCompiled(pipelineContext: IPipelineContext): boolean;
    /**
     * @internal
     */
    _executeWhenRenderingStateIsCompiled(pipelineContext: IPipelineContext, action: () => void): void;
    /**
     * Gets the list of webGL uniform locations associated with a specific program based on a list of uniform names
     * @param pipelineContext defines the pipeline context to use
     * @param uniformsNames defines the list of uniform names
     * @returns an array of webGL uniform locations
     */
    getUniforms(pipelineContext: IPipelineContext, uniformsNames: string[]): Nullable<WebGLUniformLocation>[];
    /**
     * Gets the list of active attributes for a given webGL program
     * @param pipelineContext defines the pipeline context to use
     * @param attributesNames defines the list of attribute names to get
     * @returns an array of indices indicating the offset of each attribute
     */
    getAttributes(pipelineContext: IPipelineContext, attributesNames: string[]): number[];
    /**
     * Activates an effect, making it the current one (ie. the one used for rendering)
     * @param effect defines the effect to activate
     */
    enableEffect(effect: Nullable<Effect | DrawWrapper>): void;
    /**
     * Set the value of an uniform to a number (int)
     * @param uniform defines the webGL uniform location where to store the value
     * @param value defines the int number to store
     * @returns true if the value was set
     */
    setInt(uniform: Nullable<WebGLUniformLocation>, value: number): boolean;
    /**
     * Set the value of an uniform to a int2
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @returns true if the value was set
     */
    setInt2(uniform: Nullable<WebGLUniformLocation>, x: number, y: number): boolean;
    /**
     * Set the value of an uniform to a int3
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @returns true if the value was set
     */
    setInt3(uniform: Nullable<WebGLUniformLocation>, x: number, y: number, z: number): boolean;
    /**
     * Set the value of an uniform to a int4
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @param w defines the 4th component of the value
     * @returns true if the value was set
     */
    setInt4(uniform: Nullable<WebGLUniformLocation>, x: number, y: number, z: number, w: number): boolean;
    /**
     * Set the value of an uniform to an array of int32
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if the value was set
     */
    setIntArray(uniform: Nullable<WebGLUniformLocation>, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of int32 (stored as vec2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if the value was set
     */
    setIntArray2(uniform: Nullable<WebGLUniformLocation>, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of int32 (stored as vec3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if the value was set
     */
    setIntArray3(uniform: Nullable<WebGLUniformLocation>, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of int32 (stored as vec4)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if the value was set
     */
    setIntArray4(uniform: Nullable<WebGLUniformLocation>, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to a number (unsigned int)
     * @param uniform defines the webGL uniform location where to store the value
     * @param value defines the unsigned int number to store
     * @returns true if the value was set
     */
    setUInt(uniform: Nullable<WebGLUniformLocation>, value: number): boolean;
    /**
     * Set the value of an uniform to a unsigned int2
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @returns true if the value was set
     */
    setUInt2(uniform: Nullable<WebGLUniformLocation>, x: number, y: number): boolean;
    /**
     * Set the value of an uniform to a unsigned int3
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @returns true if the value was set
     */
    setUInt3(uniform: Nullable<WebGLUniformLocation>, x: number, y: number, z: number): boolean;
    /**
     * Set the value of an uniform to a unsigned int4
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @param w defines the 4th component of the value
     * @returns true if the value was set
     */
    setUInt4(uniform: Nullable<WebGLUniformLocation>, x: number, y: number, z: number, w: number): boolean;
    /**
     * Set the value of an uniform to an array of unsigned int32
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of unsigned int32 to store
     * @returns true if the value was set
     */
    setUIntArray(uniform: Nullable<WebGLUniformLocation>, array: Uint32Array): boolean;
    /**
     * Set the value of an uniform to an array of unsigned int32 (stored as vec2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of unsigned int32 to store
     * @returns true if the value was set
     */
    setUIntArray2(uniform: Nullable<WebGLUniformLocation>, array: Uint32Array): boolean;
    /**
     * Set the value of an uniform to an array of unsigned int32 (stored as vec3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of unsigned int32 to store
     * @returns true if the value was set
     */
    setUIntArray3(uniform: Nullable<WebGLUniformLocation>, array: Uint32Array): boolean;
    /**
     * Set the value of an uniform to an array of unsigned int32 (stored as vec4)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of unsigned int32 to store
     * @returns true if the value was set
     */
    setUIntArray4(uniform: Nullable<WebGLUniformLocation>, array: Uint32Array): boolean;
    /**
     * Set the value of an uniform to an array of number
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if the value was set
     */
    setArray(uniform: Nullable<WebGLUniformLocation>, array: FloatArray): boolean;
    /**
     * Set the value of an uniform to an array of number (stored as vec2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if the value was set
     */
    setArray2(uniform: Nullable<WebGLUniformLocation>, array: FloatArray): boolean;
    /**
     * Set the value of an uniform to an array of number (stored as vec3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if the value was set
     */
    setArray3(uniform: Nullable<WebGLUniformLocation>, array: FloatArray): boolean;
    /**
     * Set the value of an uniform to an array of number (stored as vec4)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if the value was set
     */
    setArray4(uniform: Nullable<WebGLUniformLocation>, array: FloatArray): boolean;
    /**
     * Set the value of an uniform to an array of float32 (stored as matrices)
     * @param uniform defines the webGL uniform location where to store the value
     * @param matrices defines the array of float32 to store
     * @returns true if the value was set
     */
    setMatrices(uniform: Nullable<WebGLUniformLocation>, matrices: DeepImmutable<FloatArray>): boolean;
    /**
     * Set the value of an uniform to a matrix (3x3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param matrix defines the Float32Array representing the 3x3 matrix to store
     * @returns true if the value was set
     */
    setMatrix3x3(uniform: Nullable<WebGLUniformLocation>, matrix: Float32Array): boolean;
    /**
     * Set the value of an uniform to a matrix (2x2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param matrix defines the Float32Array representing the 2x2 matrix to store
     * @returns true if the value was set
     */
    setMatrix2x2(uniform: Nullable<WebGLUniformLocation>, matrix: Float32Array): boolean;
    /**
     * Set the value of an uniform to a number (float)
     * @param uniform defines the webGL uniform location where to store the value
     * @param value defines the float number to store
     * @returns true if the value was transferred
     */
    setFloat(uniform: Nullable<WebGLUniformLocation>, value: number): boolean;
    /**
     * Set the value of an uniform to a vec2
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @returns true if the value was set
     */
    setFloat2(uniform: Nullable<WebGLUniformLocation>, x: number, y: number): boolean;
    /**
     * Set the value of an uniform to a vec3
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @returns true if the value was set
     */
    setFloat3(uniform: Nullable<WebGLUniformLocation>, x: number, y: number, z: number): boolean;
    /**
     * Set the value of an uniform to a vec4
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @param w defines the 4th component of the value
     * @returns true if the value was set
     */
    setFloat4(uniform: Nullable<WebGLUniformLocation>, x: number, y: number, z: number, w: number): boolean;
    /**
     * Apply all cached states (depth, culling, stencil and alpha)
     */
    applyStates(): void;
    /**
     * Force the entire cache to be cleared
     * You should not have to use this function unless your engine needs to share the webGL context with another engine
     * @param bruteForce defines a boolean to force clearing ALL caches (including stencil, detoh and alpha states)
     */
    wipeCaches(bruteForce?: boolean): void;
    /**
     * @internal
     */
    _getSamplingParameters(samplingMode: number, generateMipMaps: boolean): {
        min: number;
        mag: number;
    };
    /** @internal */
    protected _createTexture(): WebGLTexture;
    /** @internal */
    _createHardwareTexture(): HardwareTextureWrapper;
    /**
     * Creates an internal texture without binding it to a framebuffer
     * @internal
     * @param size defines the size of the texture
     * @param options defines the options used to create the texture
     * @param delayGPUTextureCreation true to delay the texture creation the first time it is really needed. false to create it right away
     * @param source source type of the texture
     * @returns a new internal texture
     */
    _createInternalTexture(size: TextureSize, options: boolean | InternalTextureCreationOptions, delayGPUTextureCreation?: boolean, source?: InternalTextureSource): InternalTexture;
    /**
     * @internal
     */
    _getUseSRGBBuffer(useSRGBBuffer: boolean, noMipmap: boolean): boolean;
    /**
     * Usually called from Texture.ts.
     * Passed information to create a WebGLTexture
     * @param url defines a value which contains one of the following:
     * * A conventional http URL, e.g. 'http://...' or 'file://...'
     * * A base64 string of in-line texture data, e.g. 'data:image/jpg;base64,/...'
     * * An indicator that data being passed using the buffer parameter, e.g. 'data:mytexture.jpg'
     * @param noMipmap defines a boolean indicating that no mipmaps shall be generated.  Ignored for compressed textures.  They must be in the file
     * @param invertY when true, image is flipped when loaded.  You probably want true. Certain compressed textures may invert this if their default is inverted (eg. ktx)
     * @param scene needed for loading to the correct scene
     * @param samplingMode mode with should be used sample / access the texture (Default: Texture.TRILINEAR_SAMPLINGMODE)
     * @param onLoad optional callback to be called upon successful completion
     * @param onError optional callback to be called upon failure
     * @param buffer a source of a file previously fetched as either a base64 string, an ArrayBuffer (compressed or image format), HTMLImageElement (image format), or a Blob
     * @param fallback an internal argument in case the function must be called again, due to etc1 not having alpha capabilities
     * @param format internal format.  Default: RGB when extension is '.jpg' else RGBA.  Ignored for compressed textures
     * @param forcedExtension defines the extension to use to pick the right loader
     * @param mimeType defines an optional mime type
     * @param loaderOptions options to be passed to the loader
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns a InternalTexture for assignment back into BABYLON.Texture
     */
    createTexture(url: Nullable<string>, noMipmap: boolean, invertY: boolean, scene: Nullable<ISceneLike>, samplingMode?: number, onLoad?: Nullable<(texture: InternalTexture) => void>, onError?: Nullable<(message: string, exception: any) => void>, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>, fallback?: Nullable<InternalTexture>, format?: Nullable<number>, forcedExtension?: Nullable<string>, mimeType?: string, loaderOptions?: any, creationFlags?: number, useSRGBBuffer?: boolean): InternalTexture;
    /**
     * Calls to the GL texImage2D and texImage3D functions require three arguments describing the pixel format of the texture.
     * createTexture derives these from the babylonFormat and useSRGBBuffer arguments and also the file extension of the URL it's working with.
     * This function encapsulates that derivation for easy unit testing.
     * @param babylonFormat Babylon's format enum, as specified in ITextureCreationOptions.
     * @param fileExtension The file extension including the dot, e.g. .jpg.
     * @param useSRGBBuffer Use SRGB not linear.
     * @returns The options to pass to texImage2D or texImage3D calls.
     * @internal
     */
    _getTexImageParametersForCreateTexture(babylonFormat: number, useSRGBBuffer: boolean): TexImageParameters;
    /**
     * @internal
     */
    _rescaleTexture(source: InternalTexture, destination: InternalTexture, scene: Nullable<any>, internalFormat: number, onComplete: () => void): void;
    private _unpackFlipYCached;
    /**
     * In case you are sharing the context with other applications, it might
     * be interested to not cache the unpack flip y state to ensure a consistent
     * value would be set.
     */
    enableUnpackFlipYCached: boolean;
    /**
     * @internal
     */
    _unpackFlipY(value: boolean): void;
    /** @internal */
    _getUnpackAlignement(): number;
    /** @internal */
    _getTextureTarget(texture: InternalTexture): number;
    /**
     * Update the sampling mode of a given texture
     * @param samplingMode defines the required sampling mode
     * @param texture defines the texture to update
     * @param generateMipMaps defines whether to generate mipmaps for the texture
     */
    updateTextureSamplingMode(samplingMode: number, texture: InternalTexture, generateMipMaps?: boolean): void;
    /**
     * Update the dimensions of a texture
     * @param texture texture to update
     * @param width new width of the texture
     * @param height new height of the texture
     * @param depth new depth of the texture
     */
    updateTextureDimensions(texture: InternalTexture, width: number, height: number, depth?: number): void;
    /**
     * Update the sampling mode of a given texture
     * @param texture defines the texture to update
     * @param wrapU defines the texture wrap mode of the u coordinates
     * @param wrapV defines the texture wrap mode of the v coordinates
     * @param wrapR defines the texture wrap mode of the r coordinates
     */
    updateTextureWrappingMode(texture: InternalTexture, wrapU: Nullable<number>, wrapV?: Nullable<number>, wrapR?: Nullable<number>): void;
    /**
     * @internal
     */
    _uploadCompressedDataToTextureDirectly(texture: InternalTexture, internalFormat: number, width: number, height: number, data: ArrayBufferView, faceIndex?: number, lod?: number): void;
    /**
     * @internal
     */
    _uploadDataToTextureDirectly(texture: InternalTexture, imageData: ArrayBufferView, faceIndex?: number, lod?: number, babylonInternalFormat?: number, useTextureWidthAndHeight?: boolean): void;
    /**
     * Update a portion of an internal texture
     * @param texture defines the texture to update
     * @param imageData defines the data to store into the texture
     * @param xOffset defines the x coordinates of the update rectangle
     * @param yOffset defines the y coordinates of the update rectangle
     * @param width defines the width of the update rectangle
     * @param height defines the height of the update rectangle
     * @param faceIndex defines the face index if texture is a cube (0 by default)
     * @param lod defines the lod level to update (0 by default)
     * @param generateMipMaps defines whether to generate mipmaps or not
     */
    updateTextureData(texture: InternalTexture, imageData: ArrayBufferView, xOffset: number, yOffset: number, width: number, height: number, faceIndex?: number, lod?: number, generateMipMaps?: boolean): void;
    /**
     * @internal
     */
    _uploadArrayBufferViewToTexture(texture: InternalTexture, imageData: ArrayBufferView, faceIndex?: number, lod?: number): void;
    protected _prepareWebGLTextureContinuation(texture: InternalTexture, scene: Nullable<ISceneLike>, noMipmap: boolean, isCompressed: boolean, samplingMode: number): void;
    private _prepareWebGLTexture;
    _getInternalFormatFromDepthTextureFormat(textureFormat: number, hasDepth: boolean, hasStencil: boolean): number;
    _getWebGLTextureTypeFromDepthTextureFormat(textureFormat: number): GLenum;
    /**
     * @internal
     */
    _setupFramebufferDepthAttachments(generateStencilBuffer: boolean, generateDepthBuffer: boolean, width: number, height: number, samples?: number, depthTextureFormat?: number, dontBindRenderBufferToFrameBuffer?: boolean): Nullable<WebGLRenderbuffer>;
    /**
     * @internal
     */
    _createRenderBuffer(width: number, height: number, samples: number, internalFormat: number, msInternalFormat: number, attachment: number, unbindBuffer?: boolean): Nullable<WebGLRenderbuffer>;
    _updateRenderBuffer(renderBuffer: Nullable<WebGLRenderbuffer>, width: number, height: number, samples: number, internalFormat: number, msInternalFormat: number, attachment: number, unbindBuffer?: boolean): Nullable<WebGLRenderbuffer>;
    /**
     * @internal
     */
    _releaseTexture(texture: InternalTexture): void;
    protected _deleteTexture(texture: Nullable<WebGLHardwareTexture>): void;
    protected _setProgram(program: WebGLProgram): void;
    /**
     * @internal
     */
    _boundUniforms: {
        [key: number]: WebGLUniformLocation;
    };
    /**
     * Binds an effect to the webGL context
     * @param effect defines the effect to bind
     */
    bindSamplers(effect: Effect): void;
    private _activateCurrentTexture;
    /**
     * @internal
     */
    _bindTextureDirectly(target: number, texture: Nullable<InternalTexture>, forTextureDataUpdate?: boolean, force?: boolean): boolean;
    /**
     * @internal
     */
    _bindTexture(channel: number, texture: Nullable<InternalTexture>, name: string): void;
    /**
     * Unbind all textures from the webGL context
     */
    unbindAllTextures(): void;
    /**
     * Sets a texture to the according uniform.
     * @param channel The texture channel
     * @param uniform The uniform to set
     * @param texture The texture to apply
     * @param name The name of the uniform in the effect
     */
    setTexture(channel: number, uniform: Nullable<WebGLUniformLocation>, texture: Nullable<ThinTexture>, name: string): void;
    private _bindSamplerUniformToChannel;
    private _getTextureWrapMode;
    _setTexture(channel: number, texture: Nullable<ThinTexture>, isPartOfTextureArray?: boolean, depthStencilTexture?: boolean, name?: string): boolean;
    /**
     * Sets an array of texture to the webGL context
     * @param channel defines the channel where the texture array must be set
     * @param uniform defines the associated uniform location
     * @param textures defines the array of textures to bind
     * @param name name of the channel
     */
    setTextureArray(channel: number, uniform: Nullable<WebGLUniformLocation>, textures: ThinTexture[], name: string): void;
    /**
     * @internal
     */
    _setAnisotropicLevel(target: number, internalTexture: InternalTexture, anisotropicFilteringLevel: number): void;
    private _setTextureParameterFloat;
    private _setTextureParameterInteger;
    /**
     * Unbind all vertex attributes from the webGL context
     */
    unbindAllAttributes(): void;
    /**
     * Force the engine to release all cached effects. This means that next effect compilation will have to be done completely even if a similar effect was already compiled
     */
    releaseEffects(): void;
    /**
     * Dispose and release all associated resources
     */
    dispose(): void;
    /**
     * Attach a new callback raised when context lost event is fired
     * @param callback defines the callback to call
     */
    attachContextLostEvent(callback: (event: WebGLContextEvent) => void): void;
    /**
     * Attach a new callback raised when context restored event is fired
     * @param callback defines the callback to call
     */
    attachContextRestoredEvent(callback: (event: WebGLContextEvent) => void): void;
    /**
     * Get the current error code of the webGL context
     * @returns the error code
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
     */
    getError(): number;
    private _canRenderToFloatFramebuffer;
    private _canRenderToHalfFloatFramebuffer;
    private _canRenderToFramebuffer;
    /**
     * @internal
     */
    _getWebGLTextureType(type: number): number;
    /**
     * @internal
     */
    _getInternalFormat(format: number, useSRGBBuffer?: boolean): number;
    /**
     * @internal
     */
    _getRGBABufferInternalSizedFormat(type: number, format?: number, useSRGBBuffer?: boolean): number;
    /**
     * Reads pixels from the current frame buffer. Please note that this function can be slow
     * @param x defines the x coordinate of the rectangle where pixels must be read
     * @param y defines the y coordinate of the rectangle where pixels must be read
     * @param width defines the width of the rectangle where pixels must be read
     * @param height defines the height of the rectangle where pixels must be read
     * @param hasAlpha defines whether the output should have alpha or not (defaults to true)
     * @param flushRenderer true to flush the renderer from the pending commands before reading the pixels
     * @returns a ArrayBufferView promise (Uint8Array) containing RGBA colors
     */
    readPixels(x: number, y: number, width: number, height: number, hasAlpha?: boolean, flushRenderer?: boolean): Promise<ArrayBufferView>;
    private static _IsSupported;
    private static _HasMajorPerformanceCaveat;
    /**
     * Gets a Promise<boolean> indicating if the engine can be instantiated (ie. if a webGL context can be found)
     */
    static get IsSupportedAsync(): Promise<boolean>;
    /**
     * Gets a boolean indicating if the engine can be instantiated (ie. if a webGL context can be found)
     */
    static get IsSupported(): boolean;
    /**
     * Gets a boolean indicating if the engine can be instantiated (ie. if a webGL context can be found)
     * @returns true if the engine can be created
     * @ignorenaming
     */
    static isSupported(): boolean;
    /**
     * Gets a boolean indicating if the engine can be instantiated on a performant device (ie. if a webGL context can be found and it does not use a slow implementation)
     */
    static get HasMajorPerformanceCaveat(): boolean;
}
interface TexImageParameters {
    internalFormat: number;
    format: number;
    type: number;
}
export {};
