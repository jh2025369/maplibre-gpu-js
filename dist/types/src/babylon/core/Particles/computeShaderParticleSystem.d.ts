import type { WebGPUEngine } from "../Engines/webgpuEngine";
import type { IGPUParticleSystemPlatform } from "./IGPUParticleSystemPlatform";
import type { Buffer, VertexBuffer } from "../Buffers/buffer";
import type { GPUParticleSystem } from "./gpuParticleSystem";
import type { DataArray, Nullable } from "../types";
import type { DataBuffer } from "../Buffers/dataBuffer";
import { UniformBufferEffectCommonAccessor } from "../Materials/uniformBufferEffectCommonAccessor";
import type { Effect } from "../Materials/effect";
import "../ShadersWGSL/gpuUpdateParticles.compute";
/** @internal */
export declare class ComputeShaderParticleSystem implements IGPUParticleSystemPlatform {
    private _parent;
    private _engine;
    private _updateComputeShader;
    private _simParamsComputeShader;
    private _bufferComputeShader;
    private _renderVertexBuffers;
    /** @internal */
    readonly alignDataInBuffer = true;
    /** @internal */
    constructor(parent: GPUParticleSystem, engine: WebGPUEngine);
    /** @internal */
    contextLost(): void;
    /** @internal */
    isUpdateBufferCreated(): boolean;
    /** @internal */
    isUpdateBufferReady(): boolean;
    /** @internal */
    createUpdateBuffer(defines: string): UniformBufferEffectCommonAccessor;
    /** @internal */
    createVertexBuffers(updateBuffer: Buffer, renderVertexBuffers: {
        [key: string]: VertexBuffer;
    }): void;
    /** @internal */
    createParticleBuffer(data: number[]): DataArray | DataBuffer;
    /** @internal */
    bindDrawBuffers(index: number, effect: Effect, indexBuffer: Nullable<DataBuffer>): void;
    /** @internal */
    preUpdateParticleBuffer(): void;
    /** @internal */
    updateParticleBuffer(index: number, targetBuffer: Buffer, currentActiveCount: number): void;
    /** @internal */
    releaseBuffers(): void;
    /** @internal */
    releaseVertexBuffers(): void;
}
