import type { VertexBuffer, Buffer } from "../Buffers/buffer";
import type { ThinEngine } from "../Engines/thinEngine";
import type { Effect } from "../Materials/effect";
import type { IGPUParticleSystemPlatform } from "./IGPUParticleSystemPlatform";
import type { GPUParticleSystem } from "./gpuParticleSystem";
import type { DataArray, Nullable } from "../types";
import type { DataBuffer } from "../Buffers/dataBuffer";
import { UniformBufferEffectCommonAccessor } from "../Materials/uniformBufferEffectCommonAccessor";
import "../Shaders/gpuUpdateParticles.fragment";
import "../Shaders/gpuUpdateParticles.vertex";
/** @internal */
export declare class WebGL2ParticleSystem implements IGPUParticleSystemPlatform {
    private _parent;
    private _engine;
    private _updateEffect;
    private _updateEffectOptions;
    private _renderVAO;
    private _updateVAO;
    private _renderVertexBuffers;
    /** @internal */
    readonly alignDataInBuffer = false;
    /** @internal */
    constructor(parent: GPUParticleSystem, engine: ThinEngine);
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
    private _createUpdateVAO;
}
