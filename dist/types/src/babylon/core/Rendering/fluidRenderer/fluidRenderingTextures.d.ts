import type { Camera } from "core/Cameras/camera";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import type { RenderTargetWrapper } from "core/Engines/renderTargetWrapper";
import { Texture } from "core/Materials/Textures/texture";
import type { ThinTexture } from "core/Materials/Textures/thinTexture";
import { PostProcess } from "core/PostProcesses/postProcess";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import { Observable } from "core/Misc/observable";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
/** @internal */
export declare class FluidRenderingTextures {
    protected _name: string;
    protected _scene: Scene;
    protected _camera: Nullable<Camera>;
    protected _engine: AbstractEngine;
    protected _width: number;
    protected _height: number;
    protected _blurTextureSizeX: number;
    protected _blurTextureSizeY: number;
    protected _textureType: number;
    protected _textureFormat: number;
    protected _blurTextureType: number;
    protected _blurTextureFormat: number;
    protected _useStandardBlur: boolean;
    protected _generateDepthBuffer: boolean;
    protected _samples: number;
    protected _postProcessRunningIndex: number;
    protected _rt: Nullable<RenderTargetWrapper>;
    protected _texture: Nullable<Texture>;
    protected _rtBlur: Nullable<RenderTargetWrapper>;
    protected _textureBlurred: Nullable<Texture>;
    protected _blurPostProcesses: Nullable<PostProcess[]>;
    enableBlur: boolean;
    blurSizeDivisor: number;
    blurFilterSize: number;
    private _blurNumIterations;
    get blurNumIterations(): number;
    set blurNumIterations(numIterations: number);
    blurMaxFilterSize: number;
    blurDepthScale: number;
    particleSize: number;
    onDisposeObservable: Observable<FluidRenderingTextures>;
    get renderTarget(): RenderTargetWrapper;
    get renderTargetBlur(): RenderTargetWrapper;
    get texture(): Texture;
    get textureBlur(): Texture;
    /** Shader language used by the texture */
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in the texture
     */
    get shaderLanguage(): ShaderLanguage;
    constructor(name: string, scene: Scene, width: number, height: number, blurTextureSizeX: number, blurTextureSizeY: number, textureType?: number, textureFormat?: number, blurTextureType?: number, blurTextureFormat?: number, useStandardBlur?: boolean, camera?: Nullable<Camera>, generateDepthBuffer?: boolean, samples?: number, shaderLanguage?: ShaderLanguage);
    initialize(): void;
    applyBlurPostProcesses(): void;
    protected _createRenderTarget(): void;
    protected _createBlurPostProcesses(textureBlurSource: ThinTexture, textureType: number, textureFormat: number, blurSizeDivisor: number, debugName: string, useStandardBlur?: boolean): [RenderTargetWrapper, Texture, PostProcess[]];
    private _fixReusablePostProcess;
    private _getProjectedParticleConstant;
    private _getDepthThreshold;
    dispose(): void;
}
