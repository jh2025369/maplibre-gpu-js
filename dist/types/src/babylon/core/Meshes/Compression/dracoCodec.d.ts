import type { WorkerPool } from "../../Misc/workerPool";
import type { IDisposable } from "../../scene";
/**
 * Configuration for using a Draco codec.
 */
export interface IDracoCodecConfiguration {
    /**
     * The url to the WebAssembly module.
     */
    wasmUrl?: string;
    /**
     * The url to the WebAssembly binary.
     */
    wasmBinaryUrl?: string;
    /**
     * The url to the fallback JavaScript module.
     */
    fallbackUrl?: string;
    /**
     * The number of workers for async operations. Specify `0` to disable web workers and run synchronously in the current context.
     */
    numWorkers?: number;
    /**
     * Optional worker pool to use for async encoding/decoding.
     * If provided, the worker pool will be used as is: no Draco scripts will be loaded, and numWorkers will be ignored.
     */
    workerPool?: WorkerPool;
    /**
     * Optional ArrayBuffer of the WebAssembly binary.
     * If provided it will be used instead of loading the binary from wasmBinaryUrl.
     */
    wasmBinary?: ArrayBuffer;
    /**
     * The codec module if already available.
     */
    jsModule?: unknown;
}
/**
 * @internal
 */
export declare function _GetDefaultNumWorkers(): number;
/**
 * @internal
 */
export declare function _IsConfigurationAvailable(config: IDracoCodecConfiguration): boolean;
/**
 * Base class for a Draco codec.
 * @internal
 */
export declare abstract class DracoCodec implements IDisposable {
    protected _workerPoolPromise?: Promise<WorkerPool>;
    protected _modulePromise?: Promise<{
        module: unknown; /** DecoderModule | EncoderModule */
    }>;
    /**
     * Checks if the default codec JS module is in scope.
     */
    protected abstract _isModuleAvailable(): boolean;
    /**
     * Creates the JS Module for the corresponding wasm.
     */
    protected abstract _createModuleAsync(wasmBinary?: ArrayBuffer, jsModule?: unknown /** DracoDecoderModule | DracoEncoderModule */): Promise<{
        module: unknown; /** DecoderModule | EncoderModule */
    }>;
    /**
     * Returns the worker content.
     */
    protected abstract _getWorkerContent(): string;
    /**
     * Constructor
     * @param configuration The configuration for the DracoCodec instance.
     */
    constructor(configuration: IDracoCodecConfiguration);
    /**
     * Returns a promise that resolves when ready. Call this manually to ensure the draco codec is ready before use.
     * @returns a promise that resolves when ready
     */
    whenReadyAsync(): Promise<void>;
    /**
     * Stop all async operations and release resources.
     */
    dispose(): void;
}
