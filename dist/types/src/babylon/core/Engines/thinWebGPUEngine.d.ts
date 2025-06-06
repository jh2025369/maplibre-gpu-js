import type { InternalTexture } from "core/Materials/Textures/internalTexture";
import { AbstractEngine } from "./abstractEngine";
import type { WebGPUCacheRenderPipeline } from "./WebGPU/webgpuCacheRenderPipeline";
import type { WebGPUTextureManager } from "./WebGPU/webgpuTextureManager";
import type { Nullable } from "core/types";
import { WebGPUPerfCounter } from "./WebGPU/webgpuPerfCounter";
import type { WebGPUSnapshotRendering } from "./WebGPU/webgpuSnapshotRendering";
import type { WebGPUBundleList } from "./WebGPU/webgpuBundleList";
import type { WebGPUTimestampQuery } from "./WebGPU/webgpuTimestampQuery";
import type { WebGPUOcclusionQuery } from "./WebGPU/webgpuOcclusionQuery";
/**
 * The base engine class for WebGPU
 */
export declare abstract class ThinWebGPUEngine extends AbstractEngine {
    /** @internal */
    dbgShowShaderCode: boolean;
    /** @internal */
    dbgSanityChecks: boolean;
    /** @internal */
    dbgVerboseLogsNumFrames: number;
    /** @internal */
    dbgLogIfNotDrawWrapper: boolean;
    /** @internal */
    dbgShowEmptyEnableEffectCalls: boolean;
    /** @internal */
    dbgVerboseLogsForFirstFrames: boolean;
    /** @internal */
    _textureHelper: WebGPUTextureManager;
    /** @internal */
    _cacheRenderPipeline: WebGPUCacheRenderPipeline;
    /** @internal */
    _occlusionQuery: WebGPUOcclusionQuery;
    /** @internal */
    _renderEncoder: GPUCommandEncoder;
    /** @internal */
    _uploadEncoder: GPUCommandEncoder;
    /** @internal */
    _currentRenderPass: Nullable<GPURenderPassEncoder>;
    protected _snapshotRendering: WebGPUSnapshotRendering;
    protected _snapshotRenderingMode: number;
    /** @internal */
    _timestampQuery: WebGPUTimestampQuery;
    /** @internal */
    _timestampIndex: number;
    /** @internal */
    _debugStackRenderPass: string[];
    /**
     * Gets the GPU time spent in the main render pass for the last frame rendered (in nanoseconds).
     * You have to enable the "timestamp-query" extension in the engine constructor options and set engine.enableGPUTimingMeasurements = true.
     * It will only return time spent in the main pass, not additional render target / compute passes (if any)!
     */
    readonly gpuTimeInFrameForMainPass?: WebGPUPerfCounter;
    /**
     * Used for both the compatibilityMode=false and the snapshot rendering modes (as both can't be enabled at the same time)
     * @internal
     */
    _bundleList: WebGPUBundleList;
    /**
     * Enables or disables GPU timing measurements.
     * Note that this is only supported if the "timestamp-query" extension is enabled in the options.
     */
    get enableGPUTimingMeasurements(): boolean;
    set enableGPUTimingMeasurements(enable: boolean);
    protected _currentPassIsMainPass(): boolean;
    /** @internal */
    _endCurrentRenderPass(): number;
    /**
     * @internal
     */
    _generateMipmaps(texture: InternalTexture, commandEncoder?: GPUCommandEncoder): void;
}
