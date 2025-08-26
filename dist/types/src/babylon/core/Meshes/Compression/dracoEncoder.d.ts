import { DracoCodec, type IDracoCodecConfiguration } from "./dracoCodec";
import type { IDracoAttributeData, IDracoEncodedMeshData, IDracoEncoderOptions } from "./dracoEncoder.types";
import type { Nullable } from "../../types";
import { Mesh } from "../mesh";
import type { Geometry } from "../geometry";
/**
 * @experimental This class is subject to change.
 *
 * Draco Encoder (https://google.github.io/draco/)
 *
 * This class wraps the Draco encoder module.
 *
 * By default, the configuration points to a copy of the Draco encoder files from the Babylon.js cdn https://cdn.babylonjs.com/draco_encoder_wasm_wrapper.js.
 *
 * To update the configuration, use the following code:
 * ```javascript
 *     DracoEncoder.DefaultConfiguration = {
 *          wasmUrl: "<url to the WebAssembly library>",
 *          wasmBinaryUrl: "<url to the WebAssembly binary>",
 *          fallbackUrl: "<url to the fallback JavaScript library>",
 *     };
 * ```
 *
 * Draco has two versions, one for WebAssembly and one for JavaScript. The encoder configuration can be set to only support WebAssembly or only support the JavaScript version.
 * Decoding will automatically fallback to the JavaScript version if WebAssembly version is not configured or if WebAssembly is not supported by the browser.
 * Use `DracoEncoder.DefaultAvailable` to determine if the encoder configuration is available for the current context.
 *
 * To encode Draco compressed data, get the default DracoEncoder object and call encodeMeshAsync:
 * ```javascript
 *     var dracoData = await DracoEncoder.Default.encodeMeshAsync(mesh);
 * ```
 *
 * Currently, DracoEncoder only encodes to meshes. Encoding to point clouds is not yet supported.
 *
 * Only position, normal, color, and UV attributes are supported natively by the encoder. All other attributes are treated as generic. This means that,
 * when decoding these generic attributes later, additional information about their original Babylon types will be needed to interpret the data correctly.
 * You can use the return value of `encodeMeshAsync` to source this information, specifically the `attributes` field. E.g.,
 * ```javascript
 *    var dracoData = await DracoEncoder.Default.encodeMeshAsync(mesh);
 *    var meshData = await DracoDecoder.Default.decodeMeshToMeshDataAsync(dracoData.data, dracoData.attributes);
 * ```
 *
 * By default, DracoEncoder will encode all available attributes of the mesh. To exclude specific attributes, use the following code:
 * ```javascript
 *    var options = { excludedAttributes: [VertexBuffer.MatricesIndicesKind, VertexBuffer.MatricesWeightsKind] };
 *    var dracoData = await DracoDecoder.Default.encodeMeshAsync(mesh, options);
 * ```
 */
export declare class DracoEncoder extends DracoCodec {
    /**
     * Default configuration for the DracoEncoder. Defaults to the following:
     * - numWorkers: 50% of the available logical processors, capped to 4. If no logical processors are available, defaults to 1.
     * - wasmUrl: `"https://cdn.babylonjs.com/draco_encoder_wasm_wrapper.js"`
     * - wasmBinaryUrl: `"https://cdn.babylonjs.com/draco_encoder.wasm"`
     * - fallbackUrl: `"https://cdn.babylonjs.com/draco_encoder.js"`
     */
    static DefaultConfiguration: IDracoCodecConfiguration;
    /**
     * Returns true if the encoder's `DefaultConfiguration` is available.
     */
    static get DefaultAvailable(): boolean;
    protected static _Default: Nullable<DracoEncoder>;
    /**
     * Default instance for the DracoEncoder.
     */
    static get Default(): DracoEncoder;
    /**
     * Reset the default DracoEncoder object to null and disposing the removed default instance.
     * Note that if the workerPool is a member of the static DefaultConfiguration object it is recommended not to run dispose,
     * unless the static worker pool is no longer needed.
     * @param skipDispose set to true to not dispose the removed default instance
     */
    static ResetDefault(skipDispose?: boolean): void;
    protected _isModuleAvailable(): boolean;
    protected _createModuleAsync(wasmBinary?: ArrayBuffer, jsModule?: unknown /** DracoEncoderModule */): Promise<{
        module: unknown; /** EncoderModule */
    }>;
    protected _getWorkerContent(): string;
    /**
     * Creates a new Draco encoder.
     * @param configuration Optional override of the configuration for the DracoEncoder. If not provided, defaults to {@link DracoEncoder.DefaultConfiguration}.
     */
    constructor(configuration?: IDracoCodecConfiguration);
    /**
     * @internal
     */
    _encodeAsync(attributes: Array<IDracoAttributeData>, indices: Nullable<Uint16Array | Uint32Array>, options?: IDracoEncoderOptions): Promise<Nullable<IDracoEncodedMeshData>>;
    /**
     * Encodes a mesh or geometry into a Draco-encoded mesh data.
     * @param input the mesh or geometry to encode
     * @param options options for the encoding
     * @returns a promise that resolves to the newly-encoded data
     */
    encodeMeshAsync(input: Mesh | Geometry, options?: IDracoEncoderOptions): Promise<Nullable<IDracoEncodedMeshData>>;
}
