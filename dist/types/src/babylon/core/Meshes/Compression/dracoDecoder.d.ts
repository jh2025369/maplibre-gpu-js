import { DracoCodec, type IDracoCodecConfiguration } from "./dracoCodec";
import { Geometry } from "../geometry";
import type { BoundingInfo } from "../../Culling/boundingInfo";
import type { Scene } from "../../scene";
import type { Nullable } from "../../types";
import type { MeshData } from "./dracoDecoder.types";
/**
 * @experimental This class is an experimental version of `DracoCompression` and is subject to change.
 *
 * Draco Decoder (https://google.github.io/draco/)
 *
 * This class wraps the Draco decoder module.
 *
 * By default, the configuration points to a copy of the Draco decoder files for glTF from the Babylon.js cdn https://cdn.babylonjs.com/draco_wasm_wrapper_gltf.js.
 *
 * To update the configuration, use the following code:
 * ```javascript
 *     DracoDecoder.DefaultConfiguration = {
 *          wasmUrl: "<url to the WebAssembly library>",
 *          wasmBinaryUrl: "<url to the WebAssembly binary>",
 *          fallbackUrl: "<url to the fallback JavaScript library>",
 *     };
 * ```
 *
 * Draco has two versions, one for WebAssembly and one for JavaScript. The decoder configuration can be set to only support WebAssembly or only support the JavaScript version.
 * Decoding will automatically fallback to the JavaScript version if WebAssembly version is not configured or if WebAssembly is not supported by the browser.
 * Use `DracoDecoder.DefaultAvailable` to determine if the decoder configuration is available for the current context.
 *
 * To decode Draco compressed data, get the default DracoDecoder object and call decodeMeshToGeometryAsync:
 * ```javascript
 *     var geometry = await DracoDecoder.Default.decodeMeshToGeometryAsync(data);
 * ```
 */
export declare class DracoDecoder extends DracoCodec {
    /**
     * Default configuration for the DracoDecoder. Defaults to the following:
     * - numWorkers: 50% of the available logical processors, capped to 4. If no logical processors are available, defaults to 1.
     * - wasmUrl: `"https://cdn.babylonjs.com/draco_wasm_wrapper_gltf.js"`
     * - wasmBinaryUrl: `"https://cdn.babylonjs.com/draco_decoder_gltf.wasm"`
     * - fallbackUrl: `"https://cdn.babylonjs.com/draco_decoder_gltf.js"`
     */
    static DefaultConfiguration: IDracoCodecConfiguration;
    /**
     * Returns true if the decoder's `DefaultConfiguration` is available.
     */
    static get DefaultAvailable(): boolean;
    protected static _Default: Nullable<DracoDecoder>;
    /**
     * Default instance for the DracoDecoder.
     */
    static get Default(): DracoDecoder;
    /**
     * Reset the default DracoDecoder object to null and disposing the removed default instance.
     * Note that if the workerPool is a member of the static DefaultConfiguration object it is recommended not to run dispose,
     * unless the static worker pool is no longer needed.
     * @param skipDispose set to true to not dispose the removed default instance
     */
    static ResetDefault(skipDispose?: boolean): void;
    protected _isModuleAvailable(): boolean;
    protected _createModuleAsync(wasmBinary?: ArrayBuffer, jsModule?: unknown /** DracoDecoderModule */): Promise<{
        module: unknown; /** DecoderModule */
    }>;
    protected _getWorkerContent(): string;
    /**
     * Creates a new Draco decoder.
     * @param configuration Optional override of the configuration for the DracoDecoder. If not provided, defaults to {@link DracoDecoder.DefaultConfiguration}.
     */
    constructor(configuration?: IDracoCodecConfiguration);
    /**
     * Decode Draco compressed mesh data to mesh data.
     * @param data The ArrayBuffer or ArrayBufferView of the compressed Draco data
     * @param attributes A map of attributes from vertex buffer kinds to Draco unique ids
     * @param gltfNormalizedOverride A map of attributes from vertex buffer kinds to normalized flags to override the Draco normalization
     * @returns A promise that resolves with the decoded mesh data
     */
    decodeMeshToMeshDataAsync(data: ArrayBuffer | ArrayBufferView, attributes?: {
        [kind: string]: number;
    }, gltfNormalizedOverride?: {
        [kind: string]: boolean;
    }): Promise<MeshData>;
    /**
     * Decode Draco compressed mesh data to Babylon geometry.
     * @param name The name to use when creating the geometry
     * @param scene The scene to use when creating the geometry
     * @param data The ArrayBuffer or ArrayBufferView of the Draco compressed data
     * @param attributes A map of attributes from vertex buffer kinds to Draco unique ids
     * @returns A promise that resolves with the decoded geometry
     */
    decodeMeshToGeometryAsync(name: string, scene: Scene, data: ArrayBuffer | ArrayBufferView, attributes?: {
        [kind: string]: number;
    }): Promise<Geometry>;
    /** @internal */
    _decodeMeshToGeometryForGltfAsync(name: string, scene: Scene, data: ArrayBuffer | ArrayBufferView, attributes: {
        [kind: string]: number;
    }, gltfNormalizedOverride: {
        [kind: string]: boolean;
    }, boundingInfo: Nullable<BoundingInfo>): Promise<Geometry>;
}
