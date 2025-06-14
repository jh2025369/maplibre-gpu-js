import type { HardwareTextureWrapper } from "../../Materials/Textures/hardwareTextureWrapper";
import type { Nullable } from "../../types";
import type { WebGPUEngine } from "../webgpuEngine";
/** @internal */
export declare class WebGPUHardwareTexture implements HardwareTextureWrapper {
    private _engine;
    /**
     * Cache of RenderPassDescriptor and BindGroup used when generating mipmaps (see WebGPUTextureHelper.generateMipmaps)
     * @internal
     */
    _mipmapGenRenderPassDescr: GPURenderPassDescriptor[][];
    /** @internal */
    _mipmapGenBindGroup: GPUBindGroup[][];
    /**
     * Cache for the invertYPreMultiplyAlpha function (see WebGPUTextureHelper)
     * @internal
     */
    _copyInvertYTempTexture?: GPUTexture;
    /** @internal */
    _copyInvertYRenderPassDescr: GPURenderPassDescriptor;
    /** @internal */
    _copyInvertYBindGroup: GPUBindGroup;
    /** @internal */
    _copyInvertYBindGroupWithOfst: GPUBindGroup;
    /** @internal */
    _originalFormatIsRGB: boolean;
    private _webgpuTexture;
    private _webgpuMSAATexture;
    get underlyingResource(): Nullable<GPUTexture>;
    getMSAATexture(index: number): Nullable<GPUTexture>;
    setMSAATexture(texture: GPUTexture, index: number): void;
    releaseMSAATexture(index?: number): void;
    view: Nullable<GPUTextureView>;
    viewForWriting: Nullable<GPUTextureView>;
    format: GPUTextureFormat;
    textureUsages: number;
    textureAdditionalUsages: number;
    constructor(_engine: WebGPUEngine, existingTexture?: Nullable<GPUTexture>);
    set(hardwareTexture: GPUTexture): void;
    setUsage(_textureSource: number, generateMipMaps: boolean, is2DArray: boolean, isCube: boolean, is3D: boolean, width: number, height: number, depth: number): void;
    createView(descriptor?: GPUTextureViewDescriptor, createViewForWriting?: boolean): void;
    reset(): void;
    release(): void;
}
