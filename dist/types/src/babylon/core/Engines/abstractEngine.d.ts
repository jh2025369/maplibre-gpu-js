import type { DataArray, FloatArray, IndicesArray, Nullable } from "../types";
import type { PerfCounter } from "../Misc/perfCounter";
import type { PostProcess } from "../PostProcesses/postProcess";
import type { Scene } from "../scene";
import type { IColor4Like, IViewportLike } from "../Maths/math.like";
import type { ICanvas, IImage } from "./ICanvas";
import type { HardwareTextureWrapper } from "../Materials/Textures/hardwareTextureWrapper";
import type { EngineCapabilities } from "./engineCapabilities";
import type { DataBuffer } from "../Buffers/dataBuffer";
import type { RenderTargetWrapper } from "./renderTargetWrapper";
import type { IShaderProcessor } from "./Processors/iShaderProcessor";
import type { ShaderLanguage } from "../Materials/shaderLanguage";
import type { IAudioEngineOptions } from "../Audio/Interfaces/IAudioEngineOptions";
import type { EngineFeatures } from "./engineFeatures";
import type { UniformBuffer } from "../Materials/uniformBuffer";
import type { StorageBuffer } from "../Buffers/storageBuffer";
import type { IEffectCreationOptions, IShaderPath } from "../Materials/effect";
import type { IOfflineProvider } from "../Offline/IOfflineProvider";
import type { IWebRequest } from "../Misc/interfaces/iWebRequest";
import type { IFileRequest } from "../Misc/fileRequest";
import type { Texture } from "../Materials/Textures/texture";
import type { LoadFileError } from "../Misc/fileTools";
import type { ShaderProcessingContext } from "./Processors/shaderProcessingOptions";
import type { IPipelineContext } from "./IPipelineContext";
import type { ThinTexture } from "../Materials/Textures/thinTexture";
import type { InternalTextureCreationOptions, TextureSize } from "../Materials/Textures/textureCreationOptions";
import type { EffectFallbacks } from "../Materials/effectFallbacks";
import type { IMaterialContext } from "./IMaterialContext";
import type { IStencilState } from "../States/IStencilState";
import type { DrawWrapper } from "../Materials/drawWrapper";
import type { IDrawContext } from "./IDrawContext";
import type { VertexBuffer } from "../Meshes/buffer";
import type { IAudioEngine } from "../Audio/Interfaces/IAudioEngine";
import type { WebRequest } from "core/Misc/webRequest";
import type { PerformanceMonitor } from "core/Misc/performanceMonitor";
import type { ILoadingScreen } from "../Loading/loadingScreen";
import { Effect } from "../Materials/effect";
import { DepthCullingState } from "../States/depthCullingState";
import { StencilStateComposer } from "../States/stencilStateComposer";
import { StencilState } from "../States/stencilState";
import { AlphaState } from "../States/alphaCullingState";
import { InternalTexture, InternalTextureSource } from "../Materials/Textures/internalTexture";
import { Observable } from "../Misc/observable";
import type { Material } from "core/Materials/material";
/**
 * Defines the interface used by objects working like Scene
 * @internal
 */
export interface ISceneLike {
    /** Add pending data  (to load) */
    addPendingData(data: any): void;
    /** Remove pending data */
    removePendingData(data: any): void;
    /** Offline provider */
    offlineProvider: IOfflineProvider;
}
/**
 * Queue a new function into the requested animation frame pool (ie. this function will be executed by the browser (or the javascript engine) for the next frame)
 * @param func - the function to be called
 * @param requester - the object that will request the next frame. Falls back to window.
 * @returns frame number
 */
export declare function QueueNewFrame(func: () => void, requester?: any): number;
/** Interface defining initialization parameters for AbstractEngine class */
export interface AbstractEngineOptions {
    /**
     * Defines if the engine should no exceed a specified device ratio
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
     */
    limitDeviceRatio?: number;
    /**
     * Defines if webaudio should be initialized as well
     * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
     */
    audioEngine?: boolean;
    /**
     * Specifies options for the audio engine
     */
    audioEngineOptions?: IAudioEngineOptions;
    /**
     * Defines if animations should run using a deterministic lock step
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     */
    deterministicLockstep?: boolean;
    /** Defines the maximum steps to use with deterministic lock step mode */
    lockstepMaxSteps?: number;
    /** Defines the seconds between each deterministic lock step */
    timeStep?: number;
    /**
     * Defines that engine should ignore context lost events
     * If this event happens when this parameter is true, you will have to reload the page to restore rendering
     */
    doNotHandleContextLost?: boolean;
    /**
     * Defines that engine should ignore modifying touch action attribute and style
     * If not handle, you might need to set it up on your side for expected touch devices behavior.
     */
    doNotHandleTouchAction?: boolean;
    /**
     * Make the matrix computations to be performed in 64 bits instead of 32 bits. False by default
     */
    useHighPrecisionMatrix?: boolean;
    /**
     * Defines whether to adapt to the device's viewport characteristics (default: false)
     */
    adaptToDeviceRatio?: boolean;
    /**
     * Defines whether MSAA is enabled on the canvas.
     */
    antialias?: boolean;
    /**
     * Defines whether the stencil buffer should be enabled.
     */
    stencil?: boolean;
    /**
     * Defines whether the canvas should be created in "premultiplied" mode (if false, the canvas is created in the "opaque" mode) (true by default)
     */
    premultipliedAlpha?: boolean;
    /**
     * True if the more expensive but exact conversions should be used for transforming colors to and from linear space within shaders.
     * Otherwise, the default is to use a cheaper approximation.
     */
    useExactSrgbConversions?: boolean;
}
/**
 * Information about the current host
 */
export interface HostInformation {
    /**
     * Defines if the current host is a mobile
     */
    isMobile: boolean;
}
export type PrepareTextureProcessFunction = (width: number, height: number, img: HTMLImageElement | ImageBitmap | {
    width: number;
    height: number;
}, extension: string, texture: InternalTexture, continuationCallback: () => void) => boolean;
export type PrepareTextureFunction = (texture: InternalTexture, extension: string, scene: Nullable<ISceneLike>, img: HTMLImageElement | ImageBitmap | {
    width: number;
    height: number;
}, invertY: boolean, noMipmap: boolean, isCompressed: boolean, processFunction: PrepareTextureProcessFunction, samplingMode: number) => void;
/**
 * The parent class for specialized engines (WebGL, WebGPU)
 */
export declare abstract class AbstractEngine {
    /** @internal */
    protected _colorWrite: boolean;
    /** @internal */
    protected _colorWriteChanged: boolean;
    /** @internal */
    _depthCullingState: DepthCullingState;
    /** @internal */
    _stencilStateComposer: StencilStateComposer;
    /** @internal */
    _stencilState: StencilState;
    /** @internal */
    _alphaState: AlphaState;
    /** @internal */
    _alphaMode: number;
    /** @internal */
    _alphaEquation: number;
    protected _activeRequests: IFileRequest[];
    /** @internal */
    _badOS: boolean;
    /** @internal */
    _badDesktopOS: boolean;
    /** @internal */
    _videoTextureSupported: boolean;
    protected _compatibilityMode: boolean;
    /** @internal */
    _pointerLockRequested: boolean;
    /** @internal */
    _loadingScreen: ILoadingScreen;
    /** @internal */
    _renderingCanvas: Nullable<HTMLCanvasElement>;
    /** @internal */
    _internalTexturesCache: InternalTexture[];
    /** @internal */
    _currentEffect: Nullable<Effect>;
    /** @internal */
    protected _cachedVertexBuffers: any;
    /** @internal */
    protected _cachedIndexBuffer: Nullable<DataBuffer>;
    /** @internal */
    protected _cachedEffectForVertexBuffers: Nullable<Effect>;
    /** @internal */
    _currentRenderTarget: Nullable<RenderTargetWrapper>;
    /** @internal */
    _caps: EngineCapabilities;
    /** @internal */
    protected _cachedViewport: Nullable<IViewportLike>;
    /** @internal */
    _currentDrawContext: IDrawContext;
    /** @internal */
    protected _boundTexturesCache: {
        [key: string]: Nullable<InternalTexture>;
    };
    /** @internal */
    protected _activeChannel: number;
    /** @internal */
    protected _currentTextureChannel: number;
    /** @internal */
    _viewportCached: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    /** @internal */
    _viewportDepthRangeCached: {
        minDepth: number;
        maxDepth: number;
    };
    /** @internal */
    protected _isWebGPU: boolean;
    /** @internal */
    _onFocus: () => void;
    /** @internal */
    _onBlur: () => void;
    /** @internal */
    _onCanvasPointerOut: (event: PointerEvent) => void;
    /** @internal */
    _onCanvasBlur: () => void;
    /** @internal */
    _onCanvasFocus: () => void;
    /** @internal */
    _onCanvasContextMenu: (evt: Event) => void;
    /** @internal */
    _onFullscreenChange: () => void;
    /**
     * Observable event triggered each time the canvas loses focus
     */
    onCanvasBlurObservable: Observable<AbstractEngine>;
    /**
     * Observable event triggered each time the canvas gains focus
     */
    onCanvasFocusObservable: Observable<AbstractEngine>;
    /**
     * Event raised when a new scene is created
     */
    onNewSceneAddedObservable: Observable<Scene>;
    /**
     * Observable event triggered each time the rendering canvas is resized
     */
    onResizeObservable: Observable<AbstractEngine>;
    /**
     * Observable event triggered each time the canvas receives pointerout event
     */
    onCanvasPointerOutObservable: Observable<PointerEvent>;
    /**
     * Turn this value on if you want to pause FPS computation when in background
     */
    disablePerformanceMonitorInBackground: boolean;
    /**
     * Gets or sets a boolean indicating that vertex array object must be disabled even if they are supported
     */
    disableVertexArrayObjects: boolean;
    /** @internal */
    protected _frameId: number;
    /**
     * Gets the current frame id
     */
    get frameId(): number;
    /**
     * Gets a boolean indicating if the engine runs in WebGPU or not.
     */
    get isWebGPU(): boolean;
    protected _shaderProcessor: Nullable<IShaderProcessor>;
    /**
     * @internal
     */
    _getShaderProcessor(shaderLanguage: ShaderLanguage): Nullable<IShaderProcessor>;
    /**
     * Gets a boolean indicating if all created effects are ready
     * @returns true if all effects are ready
     */
    abstract areAllEffectsReady(): boolean;
    /**
     * @internal
     */
    abstract _executeWhenRenderingStateIsCompiled(pipelineContext: IPipelineContext, action: () => void): void;
    /**
     * @internal
     */
    abstract _setTexture(channel: number, texture: Nullable<ThinTexture>, isPartOfTextureArray?: boolean, depthStencilTexture?: boolean, name?: string): boolean;
    /**
     * Sets a texture to the according uniform.
     * @param channel The texture channel
     * @param unused unused parameter
     * @param texture The texture to apply
     * @param name The name of the uniform in the effect
     */
    abstract setTexture(channel: number, unused: Nullable<WebGLUniformLocation>, texture: Nullable<ThinTexture>, name: string): void;
    /**
     * Binds an effect to the webGL context
     * @param effect defines the effect to bind
     */
    abstract bindSamplers(effect: Effect): void;
    /**
     * @internal
     */
    abstract _bindTexture(channel: number, texture: Nullable<InternalTexture>, name: string): void;
    /**
     * @internal
     */
    abstract _deletePipelineContext(pipelineContext: IPipelineContext): void;
    /**
     * @internal
     */
    abstract _preparePipelineContext(pipelineContext: IPipelineContext, vertexSourceCode: string, fragmentSourceCode: string, createAsRaw: boolean, rawVertexSourceCode: string, rawFragmentSourceCode: string, rebuildRebind: any, defines: Nullable<string>, transformFeedbackVaryings: Nullable<string[]>, key: string, onReady: () => void): void;
    /** @internal */
    protected _shaderPlatformName: string;
    /**
     * Gets the shader platform name used by the effects.
     */
    get shaderPlatformName(): string;
    /**
     * Gets information about the current host
     */
    hostInformation: HostInformation;
    /**
     * Gets a boolean indicating if the engine is currently rendering in fullscreen mode
     */
    isFullscreen: boolean;
    /**
     * Gets or sets a boolean to enable/disable IndexedDB support and avoid XHR on .manifest
     **/
    enableOfflineSupport: boolean;
    /**
     * Gets or sets a boolean to enable/disable checking manifest if IndexedDB support is enabled (js will always consider the database is up to date)
     **/
    disableManifestCheck: boolean;
    /**
     * Gets or sets a boolean to enable/disable the context menu (right-click) from appearing on the main canvas
     */
    disableContextMenu: boolean;
    /**
     * Gets or sets the current render pass id
     */
    currentRenderPassId: number;
    /**
     * Gets a boolean indicating if the pointer is currently locked
     */
    isPointerLock: boolean;
    /**
     * Gets the list of created postprocesses
     */
    postProcesses: PostProcess[];
    /** Gets or sets the tab index to set to the rendering canvas. 1 is the minimum value to set to be able to capture keyboard events */
    canvasTabIndex: number;
    /** @internal */
    protected _onContextLost: (evt: Event) => void;
    /** @internal */
    protected _onContextRestored: (evt: Event) => void;
    /** @internal */
    protected _contextWasLost: boolean;
    private _emptyTexture;
    private _emptyCubeTexture;
    private _emptyTexture3D;
    private _emptyTexture2DArray;
    protected _clearEmptyResources(): void;
    abstract wipeCaches(bruteForce?: boolean): void;
    private _useReverseDepthBuffer;
    /**
     * Gets or sets a boolean indicating if depth buffer should be reverse, going from far to near.
     * This can provide greater z depth for distant objects.
     */
    get useReverseDepthBuffer(): boolean;
    set useReverseDepthBuffer(useReverse: boolean);
    /**
     * Enable or disable color writing
     * @param enable defines the state to set
     */
    setColorWrite(enable: boolean): void;
    /**
     * Gets a boolean indicating if color writing is enabled
     * @returns the current color writing state
     */
    getColorWrite(): boolean;
    /**
     * Gets the depth culling state manager
     */
    get depthCullingState(): DepthCullingState;
    /**
     * Gets the alpha state manager
     */
    get alphaState(): AlphaState;
    /**
     * Gets the stencil state manager
     */
    get stencilState(): StencilState;
    /**
     * Gets the stencil state composer
     */
    get stencilStateComposer(): StencilStateComposer;
    /**
     * Indicates if the z range in NDC space is 0..1 (value: true) or -1..1 (value: false)
     */
    readonly isNDCHalfZRange: boolean;
    /**
     * Indicates that the origin of the texture/framebuffer space is the bottom left corner. If false, the origin is top left
     */
    readonly hasOriginBottomLeft: boolean;
    /**
     * Gets a boolean indicating if the exact sRGB conversions or faster approximations are used for converting to and from linear space.
     */
    readonly useExactSrgbConversions: boolean;
    /** @internal */
    _getGlobalDefines(defines?: {
        [key: string]: string;
    }): string | undefined;
    /** @internal */
    _renderTargetWrapperCache: RenderTargetWrapper[];
    /** @internal */
    protected _compiledEffects: {
        [key: string]: Effect;
    };
    private _rebuildInternalTextures;
    private _rebuildRenderTargetWrappers;
    private _rebuildEffects;
    protected _rebuildGraphicsResources(): void;
    protected _flagContextRestored(): void;
    protected _restoreEngineAfterContextLost(initEngine: () => void): void;
    /** @internal */
    protected _isDisposed: boolean;
    /** Gets a boolean indicating if the engine was disposed */
    get isDisposed(): boolean;
    /**
     * Gets the list of created scenes
     */
    scenes: Scene[];
    /** @internal */
    _virtualScenes: Scene[];
    /** @internal */
    _features: EngineFeatures;
    /**
     * Enables or disables the snapshot rendering mode
     * Note that the WebGL engine does not support snapshot rendering so setting the value won't have any effect for this engine
     */
    get snapshotRendering(): boolean;
    set snapshotRendering(activate: boolean);
    /**
     * Gets or sets the snapshot rendering mode
     */
    get snapshotRenderingMode(): number;
    set snapshotRenderingMode(mode: number);
    /**
     * Observable event triggered before each texture is initialized
     */
    onBeforeTextureInitObservable: Observable<Texture>;
    /**
     * Gets or sets a boolean indicating if the engine must keep rendering even if the window is not in foreground
     */
    renderEvenInBackground: boolean;
    /**
     * Gets or sets a boolean indicating that cache can be kept between frames
     */
    preventCacheWipeBetweenFrames: boolean;
    /**
     * Returns the string "AbstractEngine"
     * @returns "AbstractEngine"
     */
    getClassName(): string;
    /**
     * Gets the default empty texture
     */
    get emptyTexture(): InternalTexture;
    /**
     * Gets the default empty 3D texture
     */
    get emptyTexture3D(): InternalTexture;
    /**
     * Gets the default empty 2D array texture
     */
    get emptyTexture2DArray(): InternalTexture;
    /**
     * Gets the default empty cube texture
     */
    get emptyCubeTexture(): InternalTexture;
    /** @internal */
    _frameHandler: number;
    /** @internal */
    protected _activeRenderLoops: (() => void)[];
    /**
     * Gets the list of current active render loop functions
     * @returns a read only array with the current render loop functions
     */
    get activeRenderLoops(): ReadonlyArray<() => void>;
    /**
     * stop executing a render loop function and remove it from the execution array
     * @param renderFunction defines the function to be removed. If not provided all functions will be removed.
     */
    stopRenderLoop(renderFunction?: () => void): void;
    protected _cancelFrame(): void;
    /** @internal */
    _windowIsBackground: boolean;
    /**
     * Begin a new frame
     */
    beginFrame(): void;
    /**
     * End the current frame
     */
    endFrame(): void;
    /**
     * Gets the performance monitor attached to this engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#engineinstrumentation
     */
    abstract get performanceMonitor(): PerformanceMonitor;
    /** @internal */
    _boundRenderFunction: any;
    /** @internal */
    _renderLoop(): void;
    /** @internal */
    _renderFrame(): void;
    /** @internal */
    _renderViews(): boolean;
    /**
     * Can be used to override the current requestAnimationFrame requester.
     * @internal
     */
    protected _queueNewFrame(bindedRenderFunction: any, requester?: any): number;
    /**
     * Register and execute a render loop. The engine can have more than one render function
     * @param renderFunction defines the function to continuously execute
     */
    runRenderLoop(renderFunction: () => void): void;
    /**
     * Gets a boolean indicating if depth testing is enabled
     * @returns the current state
     */
    getDepthBuffer(): boolean;
    /**
     * Enable or disable depth buffering
     * @param enable defines the state to set
     */
    setDepthBuffer(enable: boolean): void;
    /**
     * Set the z offset Factor to apply to current rendering
     * @param value defines the offset to apply
     */
    setZOffset(value: number): void;
    /**
     * Gets the current value of the zOffset Factor
     * @returns the current zOffset Factor state
     */
    getZOffset(): number;
    /**
     * Set the z offset Units to apply to current rendering
     * @param value defines the offset to apply
     */
    setZOffsetUnits(value: number): void;
    /**
     * Gets the current value of the zOffset Units
     * @returns the current zOffset Units state
     */
    getZOffsetUnits(): number;
    /**
     * Gets host window
     * @returns the host window object
     */
    getHostWindow(): Nullable<Window>;
    /**
     * (WebGPU only) True (default) to be in compatibility mode, meaning rendering all existing scenes without artifacts (same rendering than WebGL).
     * Setting the property to false will improve performances but may not work in some scenes if some precautions are not taken.
     * See https://doc.babylonjs.com/setup/support/webGPU/webGPUOptimization/webGPUNonCompatibilityMode for more details
     */
    get compatibilityMode(): boolean;
    set compatibilityMode(mode: boolean);
    /**
     * Observable raised when the engine is about to compile a shader
     */
    onBeforeShaderCompilationObservable: Observable<AbstractEngine>;
    /**
     * Observable raised when the engine has just compiled a shader
     */
    onAfterShaderCompilationObservable: Observable<AbstractEngine>;
    /**
     * Observable raised when the engine begins a new frame
     */
    onBeginFrameObservable: Observable<AbstractEngine>;
    /**
     * Observable raised when the engine ends the current frame
     */
    onEndFrameObservable: Observable<AbstractEngine>;
    protected _rebuildTextures(): void;
    /**
     * @internal
     */
    abstract _getRGBABufferInternalSizedFormat(type: number, format?: number, useSRGBBuffer?: boolean): number;
    /** @internal */
    abstract _getUnpackAlignement(): number;
    /**
     * @internal
     */
    abstract _uploadCompressedDataToTextureDirectly(texture: InternalTexture, internalFormat: number, width: number, height: number, data: ArrayBufferView, faceIndex: number, lod?: number): void;
    /**
     * @internal
     */
    abstract _bindTextureDirectly(target: number, texture: Nullable<InternalTexture>, forTextureDataUpdate?: boolean, force?: boolean): boolean;
    /**
     * @internal
     */
    abstract _uploadDataToTextureDirectly(texture: InternalTexture, imageData: ArrayBufferView, faceIndex?: number, lod?: number, babylonInternalFormat?: number, useTextureWidthAndHeight?: boolean): void;
    /** @internal */
    abstract _unpackFlipY(value: boolean): void;
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
    abstract readPixels(x: number, y: number, width: number, height: number, hasAlpha?: boolean, flushRenderer?: boolean): Promise<ArrayBufferView>;
    /**
     * Generates mipmaps for a texture
     * @param texture The texture to generate the mipmaps for
     */
    abstract generateMipmaps(texture: InternalTexture): void;
    /**
     * Force a flush (ie. a flush of all waiting commands)
     */
    abstract flushFramebuffer(): void;
    /** @internal */
    abstract _currentFrameBufferIsDefaultFrameBuffer(): boolean;
    /**
     * Creates an internal texture without binding it to a framebuffer
     * @internal
     * @param size defines the size of the texture
     * @param options defines the options used to create the texture
     * @param delayGPUTextureCreation true to delay the texture creation the first time it is really needed. false to create it right away
     * @param source source type of the texture
     * @returns a new internal texture
     */
    abstract _createInternalTexture(size: TextureSize, options: boolean | InternalTextureCreationOptions, delayGPUTextureCreation?: boolean, source?: InternalTextureSource): InternalTexture;
    /** @internal */
    abstract applyStates(): void;
    /**
     * Binds the frame buffer to the specified texture.
     * @param texture The render target wrapper to render to
     * @param faceIndex The face of the texture to render to in case of cube texture
     * @param requiredWidth The width of the target to render to
     * @param requiredHeight The height of the target to render to
     * @param forceFullscreenViewport Forces the viewport to be the entire texture/screen if true
     * @param lodLevel defines the lod level to bind to the frame buffer
     * @param layer defines the 2d array index to bind to frame buffer to
     */
    abstract bindFramebuffer(texture: RenderTargetWrapper, faceIndex?: number, requiredWidth?: number, requiredHeight?: number, forceFullscreenViewport?: boolean, lodLevel?: number, layer?: number): void;
    /**
     * Update the sampling mode of a given texture
     * @param texture defines the texture to update
     * @param wrapU defines the texture wrap mode of the u coordinates
     * @param wrapV defines the texture wrap mode of the v coordinates
     * @param wrapR defines the texture wrap mode of the r coordinates
     */
    abstract updateTextureWrappingMode(texture: InternalTexture, wrapU: Nullable<number>, wrapV?: Nullable<number>, wrapR?: Nullable<number>): void;
    /**
     * Unbind the current render target and bind the default framebuffer
     */
    abstract restoreDefaultFramebuffer(): void;
    /**
     * Draw a list of indexed primitives
     * @param fillMode defines the primitive to use
     * @param indexStart defines the starting index
     * @param indexCount defines the number of index to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    abstract drawElementsType(fillMode: number, indexStart: number, indexCount: number, instancesCount?: number): void;
    /**
     * Unbind the current render target texture from the webGL context
     * @param texture defines the render target wrapper to unbind
     * @param disableGenerateMipMaps defines a boolean indicating that mipmaps must not be generated
     * @param onBeforeUnbind defines a function which will be called before the effective unbind
     */
    abstract unBindFramebuffer(texture: RenderTargetWrapper, disableGenerateMipMaps?: boolean, onBeforeUnbind?: () => void): void;
    /**
     * Generates mipmaps for the texture of the (single) render target
     * @param texture The render target containing the texture to generate the mipmaps for
     */
    abstract generateMipMapsFramebuffer(texture: RenderTargetWrapper): void;
    /**
     * Resolves the MSAA texture of the (single) render target into its non-MSAA version.
     * Note that if "texture" is not a MSAA render target, no resolve is performed.
     * @param texture The render target texture containing the MSAA texture to resolve
     */
    abstract resolveFramebuffer(texture: RenderTargetWrapper): void;
    /**Gets driver info if available */
    abstract extractDriverInfo(): string;
    /**
     * Bind a list of vertex buffers to the webGL context
     * @param vertexBuffers defines the list of vertex buffers to bind
     * @param indexBuffer defines the index buffer to bind
     * @param effect defines the effect associated with the vertex buffers
     * @param overrideVertexBuffers defines optional list of avertex buffers that overrides the entries in vertexBuffers
     */
    abstract bindBuffers(vertexBuffers: {
        [key: string]: Nullable<VertexBuffer>;
    }, indexBuffer: Nullable<DataBuffer>, effect: Effect, overrideVertexBuffers?: {
        [kind: string]: Nullable<VertexBuffer>;
    }): void;
    /**
     * @internal
     */
    _releaseRenderTargetWrapper(rtWrapper: RenderTargetWrapper): void;
    /**
     * Activates an effect, making it the current one (ie. the one used for rendering)
     * @param effect defines the effect to activate
     */
    abstract enableEffect(effect: Nullable<Effect | DrawWrapper>): void;
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
    abstract setState(culling: boolean, zOffset?: number, force?: boolean, reverseSide?: boolean, cullBackFaces?: boolean, stencil?: IStencilState, zOffsetUnits?: number): void;
    /**
     * Creates a new material context
     * @returns the new context
     */
    abstract createMaterialContext(): IMaterialContext | undefined;
    /**
     * Creates a new draw context
     * @returns the new context
     */
    abstract createDrawContext(): IDrawContext | undefined;
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
    abstract createEffect(baseName: string | (IShaderPath & {
        vertexToken?: string;
        fragmentToken?: string;
    }), attributesNamesOrOptions: string[] | IEffectCreationOptions, uniformsNamesOrEngine: string[] | AbstractEngine, samplers?: string[], defines?: string, fallbacks?: EffectFallbacks, onCompiled?: Nullable<(effect: Effect) => void>, onError?: Nullable<(effect: Effect, errors: string) => void>, indexParameters?: any, shaderLanguage?: ShaderLanguage, extraInitializationsAsync?: () => Promise<void>): Effect;
    /**
     * Clear the current render buffer or the current render target (if any is set up)
     * @param color defines the color to use
     * @param backBuffer defines if the back buffer must be cleared
     * @param depth defines if the depth buffer must be cleared
     * @param stencil defines if the stencil buffer must be cleared
     */
    abstract clear(color: Nullable<IColor4Like>, backBuffer: boolean, depth: boolean, stencil?: boolean): void;
    /**
     * Gets a boolean indicating that only power of 2 textures are supported
     * Please note that you can still use non power of 2 textures but in this case the engine will forcefully convert them
     */
    abstract get needPOTTextures(): boolean;
    /**
     * Creates a new index buffer
     * @param indices defines the content of the index buffer
     * @param _updatable defines if the index buffer must be updatable
     * @param label defines the label of the buffer (for debug purpose)
     * @returns a new buffer
     */
    abstract createIndexBuffer(indices: IndicesArray, _updatable?: boolean, label?: string): DataBuffer;
    /**
     * Draw a list of unindexed primitives
     * @param fillMode defines the primitive to use
     * @param verticesStart defines the index of first vertex to draw
     * @param verticesCount defines the count of vertices to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    abstract drawArraysType(fillMode: number, verticesStart: number, verticesCount: number, instancesCount?: number): void;
    /**
     * Force the engine to release all cached effects.
     * This means that next effect compilation will have to be done completely even if a similar effect was already compiled
     */
    abstract releaseEffects(): void;
    /**
     * @internal
     */
    abstract _viewport(x: number, y: number, width: number, height: number): void;
    /**
     * Gets the current viewport
     */
    get currentViewport(): Nullable<IViewportLike>;
    /**
     * Set the WebGL's viewport
     * @param viewport defines the viewport element to be used
     * @param requiredWidth defines the width required for rendering. If not provided the rendering canvas' width is used
     * @param requiredHeight defines the height required for rendering. If not provided the rendering canvas' height is used
     */
    setViewport(viewport: IViewportLike, requiredWidth?: number, requiredHeight?: number): void;
    /**
     * Update the sampling mode of a given texture
     * @param samplingMode defines the required sampling mode
     * @param texture defines the texture to update
     * @param generateMipMaps defines whether to generate mipmaps for the texture
     */
    abstract updateTextureSamplingMode(samplingMode: number, texture: InternalTexture, generateMipMaps?: boolean): void;
    /**
     * Sets an array of texture to the webGL context
     * @param channel defines the channel where the texture array must be set
     * @param uniform defines the associated uniform location
     * @param textures defines the array of textures to bind
     * @param name name of the channel
     */
    abstract setTextureArray(channel: number, uniform: Nullable<WebGLUniformLocation>, textures: ThinTexture[], name: string): void;
    /** @internal */
    _transformTextureUrl: Nullable<(url: string) => string>;
    /**
     * Unbind all instance attributes
     */
    abstract unbindInstanceAttributes(): void;
    /**
     * @internal
     */
    abstract _getUseSRGBBuffer(useSRGBBuffer: boolean, noMipmap: boolean): boolean;
    /**
     * Create an image to use with canvas
     * @returns IImage interface
     */
    createCanvasImage(): IImage;
    /**
     * Returns a string describing the current engine
     */
    get description(): string;
    protected _createTextureBase(url: Nullable<string>, noMipmap: boolean, invertY: boolean, scene: Nullable<ISceneLike>, samplingMode: number, onLoad: Nullable<(texture: InternalTexture) => void>, onError: Nullable<(message: string, exception: any) => void>, prepareTexture: PrepareTextureFunction, prepareTextureProcess: PrepareTextureProcessFunction, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>, fallback?: Nullable<InternalTexture>, format?: Nullable<number>, forcedExtension?: Nullable<string>, mimeType?: string, loaderOptions?: any, useSRGBBuffer?: boolean): InternalTexture;
    /**
     * Creates a new pipeline context
     * @param shaderProcessingContext defines the shader processing context used during the processing if available
     * @returns the new pipeline
     */
    abstract createPipelineContext(shaderProcessingContext: Nullable<ShaderProcessingContext>): IPipelineContext;
    /**
     * Inline functions in shader code that are marked to be inlined
     * @param code code to inline
     * @returns inlined code
     */
    abstract inlineShaderCode(code: string): string;
    /**
     * Gets a boolean indicating that the engine supports uniform buffers
     */
    abstract get supportsUniformBuffers(): boolean;
    /**
     * Returns the version of the engine
     */
    abstract get version(): number;
    /**
     * @internal
     */
    abstract _releaseEffect(effect: Effect): void;
    /**
     * Bind a buffer to the current draw context
     * @param buffer defines the buffer to bind
     * @param _location not used in WebGPU
     * @param name Name of the uniform variable to bind
     */
    abstract bindUniformBufferBase(buffer: DataBuffer, _location: number, name: string): void;
    /**
     * Bind a specific block at a given index in a specific shader program
     * @param pipelineContext defines the pipeline context to use
     * @param blockName defines the block name
     * @param index defines the index where to bind the block
     */
    abstract bindUniformBlock(pipelineContext: IPipelineContext, blockName: string, index: number): void;
    /** @internal */
    _uniformBuffers: UniformBuffer[];
    /** @internal */
    _storageBuffers: StorageBuffer[];
    protected _rebuildBuffers(): void;
    protected _highPrecisionShadersAllowed: boolean;
    /** @internal */
    get _shouldUseHighPrecisionShader(): boolean;
    /**
     * @internal
     */
    abstract _getShaderProcessingContext(shaderLanguage: ShaderLanguage, pureMode: boolean): Nullable<ShaderProcessingContext>;
    /**
     * Gets host document
     * @returns the host document object
     */
    getHostDocument(): Nullable<Document>;
    /**
     * Observable signaled when a context lost event is raised
     */
    onContextLostObservable: Observable<AbstractEngine>;
    /**
     * Observable signaled when a context restored event is raised
     */
    onContextRestoredObservable: Observable<AbstractEngine>;
    /**
     * Gets the list of loaded textures
     * @returns an array containing all loaded textures
     */
    getLoadedTexturesCache(): InternalTexture[];
    /**
     * Clears the list of texture accessible through engine.
     * This can help preventing texture load conflict due to name collision.
     */
    clearInternalTexturesCache(): void;
    /**
     * @internal
     */
    abstract _releaseTexture(texture: InternalTexture): void;
    /**
     * Gets the object containing all engine capabilities
     * @returns the EngineCapabilities object
     */
    getCaps(): EngineCapabilities;
    /**
     * Reset the texture cache to empty state
     */
    resetTextureCache(): void;
    /** @internal */
    protected _name: string;
    /**
     * Gets or sets the name of the engine
     */
    get name(): string;
    set name(value: string);
    /**
     * Returns the current npm package of the sdk
     */
    static get NpmPackage(): string;
    /**
     * Returns the current version of the framework
     */
    static get Version(): string;
    /**
     * The time (in milliseconds elapsed since the current page has been loaded) when the engine was initialized
     */
    readonly startTime: number;
    /** @internal */
    protected _audioContext: Nullable<AudioContext>;
    /** @internal */
    protected _audioDestination: Nullable<AudioDestinationNode | MediaStreamAudioDestinationNode>;
    /**
     * Gets the HTML canvas attached with the current webGL context
     * @returns a HTML canvas
     */
    getRenderingCanvas(): Nullable<HTMLCanvasElement>;
    /**
     * Gets the audio context specified in engine initialization options
     * @returns an Audio Context
     */
    getAudioContext(): Nullable<AudioContext>;
    /**
     * Gets the audio destination specified in engine initialization options
     * @returns an audio destination node
     */
    getAudioDestination(): Nullable<AudioDestinationNode | MediaStreamAudioDestinationNode>;
    /**
     * Defines whether the engine has been created with the premultipliedAlpha option on or not.
     */
    premultipliedAlpha: boolean;
    /**
     * If set to true zooming in and out in the browser will rescale the hardware-scaling correctly.
     */
    adaptToDeviceRatio: boolean;
    /** @internal */
    protected _lastDevicePixelRatio: number;
    /** @internal */
    _hardwareScalingLevel: number;
    /**
     * Defines the hardware scaling level.
     * By default the hardware scaling level is computed from the window device ratio.
     * if level = 1 then the engine will render at the exact resolution of the canvas. If level = 0.5 then the engine will render at twice the size of the canvas.
     * @param level defines the level to use
     */
    setHardwareScalingLevel(level: number): void;
    /**
     * Gets the current hardware scaling level.
     * By default the hardware scaling level is computed from the window device ratio.
     * if level = 1 then the engine will render at the exact resolution of the canvas. If level = 0.5 then the engine will render at twice the size of the canvas.
     * @returns a number indicating the current hardware scaling level
     */
    getHardwareScalingLevel(): number;
    /** @internal */
    _doNotHandleContextLost: boolean;
    /**
     * Gets or sets a boolean indicating if resources should be retained to be able to handle context lost events
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#handling-webgl-context-lost
     */
    get doNotHandleContextLost(): boolean;
    set doNotHandleContextLost(value: boolean);
    /** @internal */
    protected _isStencilEnable: boolean;
    /**
     * Returns true if the stencil buffer has been enabled through the creation option of the context.
     */
    get isStencilEnable(): boolean;
    /** @internal */
    protected _creationOptions: AbstractEngineOptions;
    /**
     * Gets the options used for engine creation
     * @returns EngineOptions object
     */
    getCreationOptions(): AbstractEngineOptions;
    /**
     * Creates a new engine
     * @param antialias defines whether anti-aliasing should be enabled. If undefined, it means that the underlying engine is free to enable it or not
     * @param options defines further options to be sent to the creation context
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    constructor(antialias: boolean | undefined, options: AbstractEngineOptions, adaptToDeviceRatio?: boolean);
    /**
     * Resize the view according to the canvas' size
     * @param forceSetSize true to force setting the sizes of the underlying canvas
     */
    resize(forceSetSize?: boolean): void;
    /**
     * Force a specific size of the canvas
     * @param width defines the new canvas' width
     * @param height defines the new canvas' height
     * @param forceSetSize true to force setting the sizes of the underlying canvas
     * @returns true if the size was changed
     */
    setSize(width: number, height: number, forceSetSize?: boolean): boolean;
    /**
     * @internal
     */
    abstract _releaseBuffer(buffer: DataBuffer): boolean;
    /**
     * Create a dynamic uniform buffer
     * @see https://doc.babylonjs.com/setup/support/webGL2#uniform-buffer-objets
     * @param elements defines the content of the uniform buffer
     * @param label defines a name for the buffer (for debugging purpose)
     * @returns the webGL uniform buffer
     */
    abstract createDynamicUniformBuffer(elements: FloatArray, label?: string): DataBuffer;
    /**
     * Create an uniform buffer
     * @see https://doc.babylonjs.com/setup/support/webGL2#uniform-buffer-objets
     * @param elements defines the content of the uniform buffer
     * @param label defines a name for the buffer (for debugging purpose)
     * @returns the webGL uniform buffer
     */
    abstract createUniformBuffer(elements: FloatArray, label?: string): DataBuffer;
    /**
     * Update an existing uniform buffer
     * @see https://doc.babylonjs.com/setup/support/webGL2#uniform-buffer-objets
     * @param uniformBuffer defines the target uniform buffer
     * @param elements defines the content to update
     * @param offset defines the offset in the uniform buffer where update should start
     * @param count defines the size of the data to update
     */
    abstract updateUniformBuffer(uniformBuffer: DataBuffer, elements: FloatArray, offset?: number, count?: number): void;
    /**
     * Creates a dynamic vertex buffer
     * @param data the data for the dynamic vertex buffer
     * @param _label defines the label of the buffer (for debug purpose)
     * @returns the new WebGL dynamic buffer
     */
    abstract createDynamicVertexBuffer(data: DataArray | number, _label?: string): DataBuffer;
    /**
     * Creates a vertex buffer
     * @param data the data or size for the vertex buffer
     * @param _updatable whether the buffer should be created as updatable
     * @param _label defines the label of the buffer (for debug purpose)
     * @returns the new WebGL static buffer
     */
    abstract createVertexBuffer(data: DataArray | number, _updatable?: boolean, _label?: string): DataBuffer;
    /**
     * Update the dimensions of a texture
     * @param texture texture to update
     * @param width new width of the texture
     * @param height new height of the texture
     * @param depth new depth of the texture
     */
    abstract updateTextureDimensions(texture: InternalTexture, width: number, height: number, depth: number): void;
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
    abstract createTexture(url: Nullable<string>, noMipmap: boolean, invertY: boolean, scene: Nullable<ISceneLike>, samplingMode?: number, onLoad?: Nullable<(texture: InternalTexture) => void>, onError?: Nullable<(message: string, exception: any) => void>, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>, fallback?: Nullable<InternalTexture>, format?: Nullable<number>, forcedExtension?: Nullable<string>, mimeType?: string, loaderOptions?: any, creationFlags?: number, useSRGBBuffer?: boolean): InternalTexture;
    /**
     * Creates a raw texture
     * @param data defines the data to store in the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param format defines the format of the data
     * @param generateMipMaps defines if the engine should generate the mip levels
     * @param invertY defines if data must be stored with Y axis inverted
     * @param samplingMode defines the required sampling mode (Texture.NEAREST_SAMPLINGMODE by default)
     * @param compression defines the compression used (null by default)
     * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_BYTE by default)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the raw texture inside an InternalTexture
     */
    createRawTexture(data: Nullable<ArrayBufferView>, width: number, height: number, format: number, generateMipMaps: boolean, invertY: boolean, samplingMode: number, compression?: Nullable<string>, type?: number, creationFlags?: number, useSRGBBuffer?: boolean): InternalTexture;
    /**
     * Creates a new raw 3D texture
     * @param data defines the data used to create the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param depth defines the depth of the texture
     * @param format defines the format of the texture
     * @param generateMipMaps defines if the engine must generate mip levels
     * @param invertY defines if data must be stored with Y axis inverted
     * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
     * @param compression defines the compressed used (can be null)
     * @param textureType defines the compressed used (can be null)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @returns a new raw 3D texture (stored in an InternalTexture)
     */
    createRawTexture3D(data: Nullable<ArrayBufferView>, width: number, height: number, depth: number, format: number, generateMipMaps: boolean, invertY: boolean, samplingMode: number, compression?: Nullable<string>, textureType?: number, creationFlags?: number): InternalTexture;
    /**
     * Creates a new raw 2D array texture
     * @param data defines the data used to create the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param depth defines the number of layers of the texture
     * @param format defines the format of the texture
     * @param generateMipMaps defines if the engine must generate mip levels
     * @param invertY defines if data must be stored with Y axis inverted
     * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
     * @param compression defines the compressed used (can be null)
     * @param textureType defines the compressed used (can be null)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @returns a new raw 2D array texture (stored in an InternalTexture)
     */
    createRawTexture2DArray(data: Nullable<ArrayBufferView>, width: number, height: number, depth: number, format: number, generateMipMaps: boolean, invertY: boolean, samplingMode: number, compression?: Nullable<string>, textureType?: number, creationFlags?: number): InternalTexture;
    /**
     * Gets or sets a boolean indicating if back faces must be culled. If false, front faces are culled instead (true by default)
     * If non null, this takes precedence over the value from the material
     */
    cullBackFaces: Nullable<boolean>;
    /**
     * Gets the current render width
     * @param useScreen defines if screen size must be used (or the current render target if any)
     * @returns a number defining the current render width
     */
    abstract getRenderWidth(useScreen?: boolean): number;
    /**
     * Gets the current render height
     * @param useScreen defines if screen size must be used (or the current render target if any)
     * @returns a number defining the current render height
     */
    abstract getRenderHeight(useScreen?: boolean): number;
    /**
     * Shared initialization across engines types.
     * @param canvas The canvas associated with this instance of the engine.
     */
    protected _sharedInit(canvas: HTMLCanvasElement): void;
    private _checkForMobile;
    protected _setupMobileChecks(): void;
    /** @internal */
    static _RenderPassIdCounter: number;
    /** @internal */
    _renderPassNames: string[];
    /** @internal */
    abstract _createHardwareTexture(): HardwareTextureWrapper;
    /**
     * creates and returns a new video element
     * @param constraints video constraints
     * @returns video element
     */
    createVideoElement(constraints: MediaTrackConstraints): any;
    protected _fps: number;
    protected _deltaTime: number;
    /** @internal */
    _drawCalls: PerfCounter;
    /**
     * @internal
     */
    _reportDrawCall(numDrawCalls?: number): void;
    /**
     * Gets the current framerate
     * @returns a number representing the framerate
     */
    getFps(): number;
    /**
     * Gets the time spent between current and previous frame
     * @returns a number representing the delta time in ms
     */
    getDeltaTime(): number;
    /** @internal */
    _deterministicLockstep: boolean;
    /** @internal */
    _lockstepMaxSteps: number;
    /** @internal */
    _timeStep: number;
    /**
     * Gets a boolean indicating that the engine is running in deterministic lock step mode
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     * @returns true if engine is in deterministic lock step mode
     */
    isDeterministicLockStep(): boolean;
    /**
     * Gets the max steps when engine is running in deterministic lock step
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     * @returns the max steps
     */
    getLockstepMaxSteps(): number;
    /**
     * Returns the time in ms between steps when using deterministic lock step.
     * @returns time step in (ms)
     */
    getTimeStep(): number;
    /**
     * Engine abstraction for loading and creating an image bitmap from a given source string.
     * @param imageSource source to load the image from.
     * @param options An object that sets options for the image's extraction.
     */
    _createImageBitmapFromSource(imageSource: string, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    /**
     * Engine abstraction for createImageBitmap
     * @param image source for image
     * @param options An object that sets options for the image's extraction.
     * @returns ImageBitmap
     */
    createImageBitmap(image: ImageBitmapSource, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    /**
     * Resize an image and returns the image data as an uint8array
     * @param image image to resize
     * @param bufferWidth destination buffer width
     * @param bufferHeight destination buffer height
     */
    resizeImageBitmap(image: HTMLImageElement | ImageBitmap, bufferWidth: number, bufferHeight: number): Uint8Array;
    /**
     * Get the current error code of the webGL context
     * @returns the error code
     */
    abstract getError(): number;
    /**
     * Get Font size information
     * @param font font name
     */
    getFontOffset(font: string): {
        ascent: number;
        height: number;
        descent: number;
    };
    protected static _CreateCanvas(width: number, height: number): ICanvas;
    /**
     * Create a canvas. This method is overridden by other engines
     * @param width width
     * @param height height
     * @returns ICanvas interface
     */
    createCanvas(width: number, height: number): ICanvas;
    /**
     * Loads an image as an HTMLImageElement.
     * @param input url string, ArrayBuffer, or Blob to load
     * @param onLoad callback called when the image successfully loads
     * @param onError callback called when the image fails to load
     * @param offlineProvider offline provider for caching
     * @param mimeType optional mime type
     * @param imageBitmapOptions optional the options to use when creating an ImageBitmap
     * @returns the HTMLImageElement of the loaded image
     * @internal
     */
    static _FileToolsLoadImage(input: string | ArrayBuffer | ArrayBufferView | Blob, onLoad: (img: HTMLImageElement | ImageBitmap) => void, onError: (message?: string, exception?: any) => void, offlineProvider: Nullable<IOfflineProvider>, mimeType?: string, imageBitmapOptions?: ImageBitmapOptions): Nullable<HTMLImageElement>;
    /**
     * @internal
     */
    _loadFile(url: string, onSuccess: (data: string | ArrayBuffer, responseURL?: string) => void, onProgress?: (data: any) => void, offlineProvider?: IOfflineProvider, useArrayBuffer?: boolean, onError?: (request?: IWebRequest, exception?: any) => void): IFileRequest;
    /**
     * Loads a file from a url
     * @param url url to load
     * @param onSuccess callback called when the file successfully loads
     * @param onProgress callback called while file is loading (if the server supports this mode)
     * @param offlineProvider defines the offline provider for caching
     * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
     * @param onError callback called when the file fails to load
     * @returns a file request object
     * @internal
     */
    static _FileToolsLoadFile(url: string, onSuccess: (data: string | ArrayBuffer, responseURL?: string) => void, onProgress?: (ev: ProgressEvent) => void, offlineProvider?: IOfflineProvider, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void): IFileRequest;
    /**
     * An event triggered when the engine is disposed.
     */
    readonly onDisposeObservable: Observable<AbstractEngine>;
    /**
     * Dispose and release all associated resources
     */
    dispose(): void;
    /**
     * Method called to create the default rescale post process on each engine.
     */
    static _RescalePostProcessFactory: Nullable<(engine: AbstractEngine) => PostProcess>;
    /**
     * Method called to create the default loading screen.
     * This can be overridden in your own app.
     * @param canvas The rendering canvas element
     */
    static DefaultLoadingScreenFactory(canvas: HTMLCanvasElement): ILoadingScreen;
    /**
     * Gets the audio engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic
     * @ignorenaming
     */
    static audioEngine: Nullable<IAudioEngine>;
    /**
     * Default AudioEngine factory responsible of creating the Audio Engine.
     * By default, this will create a BabylonJS Audio Engine if the workload has been embedded.
     */
    static AudioEngineFactory: (hostElement: Nullable<HTMLElement>, audioContext: Nullable<AudioContext>, audioDestination: Nullable<AudioDestinationNode | MediaStreamAudioDestinationNode>) => IAudioEngine;
    /**
     * Default offline support factory responsible of creating a tool used to store data locally.
     * By default, this will create a Database object if the workload has been embedded.
     */
    static OfflineProviderFactory: (urlToScene: string, callbackManifestChecked: (checked: boolean) => any, disableManifestCheck: boolean) => IOfflineProvider;
    /**
     * Will flag all materials in all scenes in all engines as dirty to trigger new shader compilation
     * @param flag defines which part of the materials must be marked as dirty
     * @param predicate defines a predicate used to filter which materials should be affected
     */
    static MarkAllMaterialsAsDirty(flag: number, predicate?: (mat: Material) => boolean): void;
    /**
     * Gets or sets the epsilon value used by collision engine
     */
    static CollisionsEpsilon: number;
    /**
     * Queue a new function into the requested animation frame pool (ie. this function will be executed by the browser (or the javascript engine) for the next frame)
     * @param func - the function to be called
     * @param requester - the object that will request the next frame. Falls back to window.
     * @returns frame number
     */
    static QueueNewFrame: (func: () => void, requester?: any) => number;
}
