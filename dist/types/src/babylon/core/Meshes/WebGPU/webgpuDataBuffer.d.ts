import { DataBuffer } from "../../Buffers/dataBuffer";
import type { Nullable } from "../../types";
/** @internal */
export declare class WebGPUDataBuffer extends DataBuffer {
    private _buffer;
    engineId: number;
    set buffer(buffer: Nullable<GPUBuffer>);
    constructor(resource?: GPUBuffer, capacity?: number);
    get underlyingResource(): any;
}
