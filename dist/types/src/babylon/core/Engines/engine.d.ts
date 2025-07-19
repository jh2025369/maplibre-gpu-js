import type { Nullable } from "../types";
import type { Scene } from "../scene";
import { InternalTexture } from "../Materials/Textures/internalTexture";
import type { IOfflineProvider } from "../Offline/IOfflineProvider";
import type { ILoadingScreen } from "../Loading/loadingScreen";
import type { WebGLPipelineContext } from "./WebGL/webGLPipelineContext";
import type { IPipelineContext } from "./IPipelineContext";
import type { ICustomAnimationFrameRequester } from "../Misc/customAnimationFrameRequester";
import type { EngineOptions } from "./thinEngine";
import { ThinEngine } from "./thinEngine";
import type { IViewportLike, IColor4Like } from "../Maths/math.like";
import { PerformanceMonitor } from "../Misc/performanceMonitor";
import type { DataBuffer } from "../Buffers/dataBuffer";
import type { RenderTargetWrapper } from "./renderTargetWrapper";
import "./Extensions/engine.alpha";
import "./Extensions/engine.rawTexture";
import "./Extensions/engine.readTexture";
import "./Extensions/engine.dynamicBuffer";
import "./Extensions/engine.cubeTexture";
import "./Extensions/engine.renderTarget";
import "./Extensions/engine.renderTargetTexture";
import "./Extensions/engine.renderTargetCube";
import "./Extensions/engine.prefilteredCubeTexture";
import "./Extensions/engine.uniformBuffer";
import "./AbstractEngine/abstractEngine.loadingScreen";
import "./AbstractEngine/abstractEngine.dom";
import "./AbstractEngine/abstractEngine.states";
import "./AbstractEngine/abstractEngine.renderPass";
import "./AbstractEngine/abstractEngine.texture";
import { AbstractEngine } from "./abstractEngine";
import "../Audio/audioEngine";
/**
 * The engine class is responsible for interfacing with all lower-level APIs such as WebGL and Audio
 */
export declare class Engine extends ThinEngine {
    /** Defines that alpha blending is disabled */
    static readonly ALPHA_DISABLE = 0;
    /** Defines that alpha blending to SRC ALPHA * SRC + DEST */
    static readonly ALPHA_ADD = 1;
    /** Defines that alpha blending to SRC ALPHA * SRC + (1 - SRC ALPHA) * DEST */
    static readonly ALPHA_COMBINE = 2;
    /** Defines that alpha blending to DEST - SRC * DEST */
    static readonly ALPHA_SUBTRACT = 3;
    /** Defines that alpha blending to SRC * DEST */
    static readonly ALPHA_MULTIPLY = 4;
    /** Defines that alpha blending to SRC ALPHA * SRC + (1 - SRC) * DEST */
    static readonly ALPHA_MAXIMIZED = 5;
    /** Defines that alpha blending to SRC + DEST */
    static readonly ALPHA_ONEONE = 6;
    /** Defines that alpha blending to SRC + (1 - SRC ALPHA) * DEST */
    static readonly ALPHA_PREMULTIPLIED = 7;
    /**
     * Defines that alpha blending to SRC + (1 - SRC ALPHA) * DEST
     * Alpha will be set to (1 - SRC ALPHA) * DEST ALPHA
     */
    static readonly ALPHA_PREMULTIPLIED_PORTERDUFF = 8;
    /** Defines that alpha blending to CST * SRC + (1 - CST) * DEST */
    static readonly ALPHA_INTERPOLATE = 9;
    /**
     * Defines that alpha blending to SRC + (1 - SRC) * DEST
     * Alpha will be set to SRC ALPHA + (1 - SRC ALPHA) * DEST ALPHA
     */
    static readonly ALPHA_SCREENMODE = 10;
    /** Defines that the resource is not delayed*/
    static readonly DELAYLOADSTATE_NONE = 0;
    /** Defines that the resource was successfully delay loaded */
    static readonly DELAYLOADSTATE_LOADED = 1;
    /** Defines that the resource is currently delay loading */
    static readonly DELAYLOADSTATE_LOADING = 2;
    /** Defines that the resource is delayed and has not started loading */
    static readonly DELAYLOADSTATE_NOTLOADED = 4;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn */
    static readonly NEVER = 512;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn */
    static readonly ALWAYS = 519;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value */
    static readonly LESS = 513;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value */
    static readonly EQUAL = 514;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value */
    static readonly LEQUAL = 515;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value */
    static readonly GREATER = 516;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value */
    static readonly GEQUAL = 518;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value */
    static readonly NOTEQUAL = 517;
    /** Passed to stencilOperation to specify that stencil value must be kept */
    static readonly KEEP = 7680;
    /** Passed to stencilOperation to specify that stencil value must be replaced */
    static readonly REPLACE = 7681;
    /** Passed to stencilOperation to specify that stencil value must be incremented */
    static readonly INCR = 7682;
    /** Passed to stencilOperation to specify that stencil value must be decremented */
    static readonly DECR = 7683;
    /** Passed to stencilOperation to specify that stencil value must be inverted */
    static readonly INVERT = 5386;
    /** Passed to stencilOperation to specify that stencil value must be incremented with wrapping */
    static readonly INCR_WRAP = 34055;
    /** Passed to stencilOperation to specify that stencil value must be decremented with wrapping */
    static readonly DECR_WRAP = 34056;
    /** Texture is not repeating outside of 0..1 UVs */
    static readonly TEXTURE_CLAMP_ADDRESSMODE = 0;
    /** Texture is repeating outside of 0..1 UVs */
    static readonly TEXTURE_WRAP_ADDRESSMODE = 1;
    /** Texture is repeating and mirrored */
    static readonly TEXTURE_MIRROR_ADDRESSMODE = 2;
    /** ALPHA */
    static readonly TEXTUREFORMAT_ALPHA = 0;
    /** LUMINANCE */
    static readonly TEXTUREFORMAT_LUMINANCE = 1;
    /** LUMINANCE_ALPHA */
    static readonly TEXTUREFORMAT_LUMINANCE_ALPHA = 2;
    /** RGB */
    static readonly TEXTUREFORMAT_RGB = 4;
    /** RGBA */
    static readonly TEXTUREFORMAT_RGBA = 5;
    /** RED */
    static readonly TEXTUREFORMAT_RED = 6;
    /** RED (2nd reference) */
    static readonly TEXTUREFORMAT_R = 6;
    /** RED unsigned short normed to [0, 1] **/
    static readonly TEXTUREFORMAT_R16_UNORM = 33322;
    /** RG unsigned short normed to [0, 1] **/
    static readonly TEXTUREFORMAT_RG16_UNORM = 33324;
    /** RGB unsigned short normed to [0, 1] **/
    static readonly TEXTUREFORMAT_RGB16_UNORM = 32852;
    /** RGBA unsigned short normed to [0, 1] **/
    static readonly TEXTUREFORMAT_RGBA16_UNORM = 32859;
    /** RED signed short normed to [-1, 1] **/
    static readonly TEXTUREFORMAT_R16_SNORM = 36760;
    /** RG signed short normed to [-1, 1] **/
    static readonly TEXTUREFORMAT_RG16_SNORM = 36761;
    /** RGB signed short normed to [-1, 1] **/
    static readonly TEXTUREFORMAT_RGB16_SNORM = 36762;
    /** RGBA signed short normed to [-1, 1] **/
    static readonly TEXTUREFORMAT_RGBA16_SNORM = 36763;
    /** RG */
    static readonly TEXTUREFORMAT_RG = 7;
    /** RED_INTEGER */
    static readonly TEXTUREFORMAT_RED_INTEGER = 8;
    /** RED_INTEGER (2nd reference) */
    static readonly TEXTUREFORMAT_R_INTEGER = 8;
    /** RG_INTEGER */
    static readonly TEXTUREFORMAT_RG_INTEGER = 9;
    /** RGB_INTEGER */
    static readonly TEXTUREFORMAT_RGB_INTEGER = 10;
    /** RGBA_INTEGER */
    static readonly TEXTUREFORMAT_RGBA_INTEGER = 11;
    /** UNSIGNED_BYTE */
    static readonly TEXTURETYPE_UNSIGNED_BYTE = 0;
    /** @deprecated use more explicit TEXTURETYPE_UNSIGNED_BYTE instead. Use TEXTURETYPE_UNSIGNED_INTEGER for 32bits values.*/
    static readonly TEXTURETYPE_UNSIGNED_INT = 0;
    /** FLOAT */
    static readonly TEXTURETYPE_FLOAT = 1;
    /** HALF_FLOAT */
    static readonly TEXTURETYPE_HALF_FLOAT = 2;
    /** BYTE */
    static readonly TEXTURETYPE_BYTE = 3;
    /** SHORT */
    static readonly TEXTURETYPE_SHORT = 4;
    /** UNSIGNED_SHORT */
    static readonly TEXTURETYPE_UNSIGNED_SHORT = 5;
    /** INT */
    static readonly TEXTURETYPE_INT = 6;
    /** UNSIGNED_INT */
    static readonly TEXTURETYPE_UNSIGNED_INTEGER = 7;
    /** UNSIGNED_SHORT_4_4_4_4 */
    static readonly TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 = 8;
    /** UNSIGNED_SHORT_5_5_5_1 */
    static readonly TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 = 9;
    /** UNSIGNED_SHORT_5_6_5 */
    static readonly TEXTURETYPE_UNSIGNED_SHORT_5_6_5 = 10;
    /** UNSIGNED_INT_2_10_10_10_REV */
    static readonly TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV = 11;
    /** UNSIGNED_INT_24_8 */
    static readonly TEXTURETYPE_UNSIGNED_INT_24_8 = 12;
    /** UNSIGNED_INT_10F_11F_11F_REV */
    static readonly TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV = 13;
    /** UNSIGNED_INT_5_9_9_9_REV */
    static readonly TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV = 14;
    /** FLOAT_32_UNSIGNED_INT_24_8_REV */
    static readonly TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV = 15;
    /** nearest is mag = nearest and min = nearest and mip = none */
    static readonly TEXTURE_NEAREST_SAMPLINGMODE = 1;
    /** Bilinear is mag = linear and min = linear and mip = nearest */
    static readonly TEXTURE_BILINEAR_SAMPLINGMODE = 2;
    /** Trilinear is mag = linear and min = linear and mip = linear */
    static readonly TEXTURE_TRILINEAR_SAMPLINGMODE = 3;
    /** nearest is mag = nearest and min = nearest and mip = linear */
    static readonly TEXTURE_NEAREST_NEAREST_MIPLINEAR = 8;
    /** Bilinear is mag = linear and min = linear and mip = nearest */
    static readonly TEXTURE_LINEAR_LINEAR_MIPNEAREST = 11;
    /** Trilinear is mag = linear and min = linear and mip = linear */
    static readonly TEXTURE_LINEAR_LINEAR_MIPLINEAR = 3;
    /** mag = nearest and min = nearest and mip = nearest */
    static readonly TEXTURE_NEAREST_NEAREST_MIPNEAREST = 4;
    /** mag = nearest and min = linear and mip = nearest */
    static readonly TEXTURE_NEAREST_LINEAR_MIPNEAREST = 5;
    /** mag = nearest and min = linear and mip = linear */
    static readonly TEXTURE_NEAREST_LINEAR_MIPLINEAR = 6;
    /** mag = nearest and min = linear and mip = none */
    static readonly TEXTURE_NEAREST_LINEAR = 7;
    /** mag = nearest and min = nearest and mip = none */
    static readonly TEXTURE_NEAREST_NEAREST = 1;
    /** mag = linear and min = nearest and mip = nearest */
    static readonly TEXTURE_LINEAR_NEAREST_MIPNEAREST = 9;
    /** mag = linear and min = nearest and mip = linear */
    static readonly TEXTURE_LINEAR_NEAREST_MIPLINEAR = 10;
    /** mag = linear and min = linear and mip = none */
    static readonly TEXTURE_LINEAR_LINEAR = 2;
    /** mag = linear and min = nearest and mip = none */
    static readonly TEXTURE_LINEAR_NEAREST = 12;
    /** Explicit coordinates mode */
    static readonly TEXTURE_EXPLICIT_MODE = 0;
    /** Spherical coordinates mode */
    static readonly TEXTURE_SPHERICAL_MODE = 1;
    /** Planar coordinates mode */
    static readonly TEXTURE_PLANAR_MODE = 2;
    /** Cubic coordinates mode */
    static readonly TEXTURE_CUBIC_MODE = 3;
    /** Projection coordinates mode */
    static readonly TEXTURE_PROJECTION_MODE = 4;
    /** Skybox coordinates mode */
    static readonly TEXTURE_SKYBOX_MODE = 5;
    /** Inverse Cubic coordinates mode */
    static readonly TEXTURE_INVCUBIC_MODE = 6;
    /** Equirectangular coordinates mode */
    static readonly TEXTURE_EQUIRECTANGULAR_MODE = 7;
    /** Equirectangular Fixed coordinates mode */
    static readonly TEXTURE_FIXED_EQUIRECTANGULAR_MODE = 8;
    /** Equirectangular Fixed Mirrored coordinates mode */
    static readonly TEXTURE_FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
    /** Defines that texture rescaling will use a floor to find the closer power of 2 size */
    static readonly SCALEMODE_FLOOR = 1;
    /** Defines that texture rescaling will look for the nearest power of 2 size */
    static readonly SCALEMODE_NEAREST = 2;
    /** Defines that texture rescaling will use a ceil to find the closer power of 2 size */
    static readonly SCALEMODE_CEILING = 3;
    /**
     * Returns the current npm package of the sdk
     */
    static get NpmPackage(): string;
    /**
     * Returns the current version of the framework
     */
    static get Version(): string;
    /** Gets the list of created engines */
    static get Instances(): AbstractEngine[];
    /**
     * Gets the latest created engine
     */
    static get LastCreatedEngine(): Nullable<AbstractEngine>;
    /**
     * Gets the latest created scene
     */
    static get LastCreatedScene(): Nullable<Scene>;
    /** @internal */
    /**
     * Method called to create the default loading screen.
     * This can be overridden in your own app.
     * @param canvas The rendering canvas element
     * @returns The loading screen
     */
    static DefaultLoadingScreenFactory(canvas: HTMLCanvasElement): ILoadingScreen;
    /**
     * If set, will be used to request the next animation frame for the render loop
     */
    customAnimationFrameRequester: Nullable<ICustomAnimationFrameRequester>;
    private _rescalePostProcess;
    protected get _supportsHardwareTextureRescaling(): boolean;
    private _measureFps;
    private _performanceMonitor;
    /**
     * Gets the performance monitor attached to this engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#engineinstrumentation
     */
    get performanceMonitor(): PerformanceMonitor;
    /**
     * Creates a new engine
     * @param canvasOrContext defines the canvas or WebGL context to use for rendering. If you provide a WebGL context, Babylon.js will not hook events on the canvas (like pointers, keyboards, etc...) so no event observables will be available. This is mostly used when Babylon.js is used as a plugin on a system which already used the WebGL context
     * @param antialias defines enable antialiasing (default: false)
     * @param options defines further options to be sent to the getContext() function
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    constructor(canvasOrContext: Nullable<HTMLCanvasElement | OffscreenCanvas | WebGLRenderingContext | WebGL2RenderingContext>, antialias?: boolean, options?: EngineOptions, adaptToDeviceRatio?: boolean);
    protected _initGLContext(): void;
    /**
     * Shared initialization across engines types.
     * @param canvas The canvas associated with this instance of the engine.
     */
    protected _sharedInit(canvas: HTMLCanvasElement): void;
    /**
     * Resize an image and returns the image data as an uint8array
     * @param image image to resize
     * @param bufferWidth destination buffer width
     * @param bufferHeight destination buffer height
     * @returns an uint8array containing RGBA values of bufferWidth * bufferHeight size
     */
    resizeImageBitmap(image: HTMLImageElement | ImageBitmap, bufferWidth: number, bufferHeight: number): Uint8Array;
    /**
     * Engine abstraction for loading and creating an image bitmap from a given source string.
     * @param imageSource source to load the image from.
     * @param options An object that sets options for the image's extraction.
     * @returns ImageBitmap
     */
    _createImageBitmapFromSource(imageSource: string, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    /**
     * Toggle full screen mode
     * @param requestPointerLock defines if a pointer lock should be requested from the user
     */
    switchFullscreen(requestPointerLock: boolean): void;
    /**
     * Enters full screen mode
     * @param requestPointerLock defines if a pointer lock should be requested from the user
     */
    enterFullscreen(requestPointerLock: boolean): void;
    /**
     * Exits full screen mode
     */
    exitFullscreen(): void;
    /** States */
    /**
     * Sets a boolean indicating if the dithering state is enabled or disabled
     * @param value defines the dithering state
     */
    setDitheringState(value: boolean): void;
    /**
     * Sets a boolean indicating if the rasterizer state is enabled or disabled
     * @param value defines the rasterizer state
     */
    setRasterizerState(value: boolean): void;
    /**
     * Directly set the WebGL Viewport
     * @param x defines the x coordinate of the viewport (in screen space)
     * @param y defines the y coordinate of the viewport (in screen space)
     * @param width defines the width of the viewport (in screen space)
     * @param height defines the height of the viewport (in screen space)
     * @returns the current viewport Object (if any) that is being replaced by this call. You can restore this viewport later on to go back to the original state
     */
    setDirectViewport(x: number, y: number, width: number, height: number): Nullable<IViewportLike>;
    /**
     * Executes a scissor clear (ie. a clear on a specific portion of the screen)
     * @param x defines the x-coordinate of the bottom left corner of the clear rectangle
     * @param y defines the y-coordinate of the corner of the clear rectangle
     * @param width defines the width of the clear rectangle
     * @param height defines the height of the clear rectangle
     * @param clearColor defines the clear color
     */
    scissorClear(x: number, y: number, width: number, height: number, clearColor: IColor4Like): void;
    /**
     * Enable scissor test on a specific rectangle (ie. render will only be executed on a specific portion of the screen)
     * @param x defines the x-coordinate of the bottom left corner of the clear rectangle
     * @param y defines the y-coordinate of the corner of the clear rectangle
     * @param width defines the width of the clear rectangle
     * @param height defines the height of the clear rectangle
     */
    enableScissor(x: number, y: number, width: number, height: number): void;
    /**
     * Disable previously set scissor test rectangle
     */
    disableScissor(): void;
    /**
     * @internal
     */
    _loadFileAsync(url: string, offlineProvider?: IOfflineProvider, useArrayBuffer?: false): Promise<string>;
    _loadFileAsync(url: string, offlineProvider?: IOfflineProvider, useArrayBuffer?: true): Promise<ArrayBuffer>;
    /**
     * Gets the source code of the vertex shader associated with a specific webGL program
     * @param program defines the program to use
     * @returns a string containing the source code of the vertex shader associated with the program
     */
    getVertexShaderSource(program: WebGLProgram): Nullable<string>;
    /**
     * Gets the source code of the fragment shader associated with a specific webGL program
     * @param program defines the program to use
     * @returns a string containing the source code of the fragment shader associated with the program
     */
    getFragmentShaderSource(program: WebGLProgram): Nullable<string>;
    /**
     * sets the object from which width and height will be taken from when getting render width and height
     * Will fallback to the gl object
     * @param dimensions the framebuffer width and height that will be used.
     */
    set framebufferDimensionsObject(dimensions: Nullable<{
        framebufferWidth: number;
        framebufferHeight: number;
    }>);
    protected _rebuildBuffers(): void;
    /**
     * Get Font size information
     * @param font font name
     * @returns an object containing ascent, height and descent
     */
    getFontOffset(font: string): {
        ascent: number;
        height: number;
        descent: number;
    };
    protected _cancelFrame(): void;
    _renderLoop(): void;
    /**
     * Enters Pointerlock mode
     */
    enterPointerlock(): void;
    /**
     * Exits Pointerlock mode
     */
    exitPointerlock(): void;
    /**
     * Begin a new frame
     */
    beginFrame(): void;
    _deletePipelineContext(pipelineContext: IPipelineContext): void;
    createShaderProgram(pipelineContext: IPipelineContext, vertexCode: string, fragmentCode: string, defines: Nullable<string>, context?: WebGLRenderingContext, transformFeedbackVaryings?: Nullable<string[]>): WebGLProgram;
    protected _createShaderProgram(pipelineContext: WebGLPipelineContext, vertexShader: WebGLShader, fragmentShader: WebGLShader, context: WebGLRenderingContext, transformFeedbackVaryings?: Nullable<string[]>): WebGLProgram;
    /**
     * @internal
     */
    _releaseTexture(texture: InternalTexture): void;
    /**
     * @internal
     */
    _releaseRenderTargetWrapper(rtWrapper: RenderTargetWrapper): void;
    /**
     * @internal
     * Rescales a texture
     * @param source input texture
     * @param destination destination texture
     * @param scene scene to use to render the resize
     * @param internalFormat format to use when resizing
     * @param onComplete callback to be called when resize has completed
     */
    _rescaleTexture(source: InternalTexture, destination: InternalTexture, scene: Nullable<any>, internalFormat: number, onComplete: () => void): void;
    /**
     * Wraps an external web gl texture in a Babylon texture.
     * @param texture defines the external texture
     * @param hasMipMaps defines whether the external texture has mip maps (default: false)
     * @param samplingMode defines the sampling mode for the external texture (default: Constants.TEXTURE_TRILINEAR_SAMPLINGMODE)
     * @param width defines the width for the external texture (default: 0)
     * @param height defines the height for the external texture (default: 0)
     * @returns the babylon internal texture
     */
    wrapWebGLTexture(texture: WebGLTexture, hasMipMaps?: boolean, samplingMode?: number, width?: number, height?: number): InternalTexture;
    /**
     * @internal
     */
    _uploadImageToTexture(texture: InternalTexture, image: HTMLImageElement | ImageBitmap, faceIndex?: number, lod?: number): void;
    /**
     * Updates a depth texture Comparison Mode and Function.
     * If the comparison Function is equal to 0, the mode will be set to none.
     * Otherwise, this only works in webgl 2 and requires a shadow sampler in the shader.
     * @param texture The texture to set the comparison function for
     * @param comparisonFunction The comparison function to set, 0 if no comparison required
     */
    updateTextureComparisonFunction(texture: InternalTexture, comparisonFunction: number): void;
    /**
     * Creates a webGL buffer to use with instantiation
     * @param capacity defines the size of the buffer
     * @returns the webGL buffer
     */
    createInstancesBuffer(capacity: number): DataBuffer;
    /**
     * Delete a webGL buffer used with instantiation
     * @param buffer defines the webGL buffer to delete
     */
    deleteInstancesBuffer(buffer: WebGLBuffer): void;
    private _clientWaitAsync;
    /**
     * @internal
     */
    _readPixelsAsync(x: number, y: number, w: number, h: number, format: number, type: number, outputBuffer: ArrayBufferView): Promise<ArrayBufferView>;
    dispose(): void;
}
