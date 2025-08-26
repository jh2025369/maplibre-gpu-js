import type { Nullable } from "core/types";
import type { IDracoAttributeData, IDracoEncodedMeshData, IDracoEncoderOptions } from "./dracoEncoder.types";
/**
 * @internal
 */
export declare function EncodeMesh(module: unknown /** EncoderModule */, attributes: Array<IDracoAttributeData>, indices: Nullable<Uint16Array | Uint32Array>, options: IDracoEncoderOptions): Nullable<IDracoEncodedMeshData>;
/**
 * The worker function that gets converted to a blob url to pass into a worker.
 * To be used if a developer wants to create their own worker instance and inject it instead of using the default worker.
 */
export declare function EncoderWorkerFunction(): void;
/**
 * @internal
 */
export declare function DecodeMesh(module: unknown /** DecoderModule */, data: Int8Array, attributeIDs: Record<string, number> | undefined, onIndicesData: (indices: Uint16Array | Uint32Array) => void, onAttributeData: (kind: string, data: ArrayBufferView, size: number, offset: number, stride: number, normalized: boolean) => void): number;
/**
 * The worker function that gets converted to a blob url to pass into a worker.
 * To be used if a developer wants to create their own worker instance and inject it instead of using the default worker.
 */
export declare function DecoderWorkerFunction(): void;
export { DecoderWorkerFunction as workerFunction };
/**
 * Initializes a worker that was created for the draco agent pool
 * @param worker  The worker to initialize
 * @param wasmBinary The wasm binary to load into the worker
 * @param moduleUrl The url to the draco decoder module (optional)
 * @returns A promise that resolves when the worker is initialized
 */
export declare function initializeWebWorker(worker: Worker, wasmBinary?: ArrayBuffer, moduleUrl?: string): Promise<Worker>;
