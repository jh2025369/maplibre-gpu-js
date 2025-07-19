import { DracoCompression } from "core/Meshes/Compression/dracoCompression";
import type { Nullable } from "core/types";
import type { Geometry } from "core/Meshes/geometry";
import type { Mesh } from "core/Meshes/mesh";
import type { IMeshPrimitive } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_draco_mesh_compression extension.
         */
        ["KHR_draco_mesh_compression"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
 */
export declare class KHR_draco_mesh_compression implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_draco_mesh_compression";
    /**
     * The draco compression used to decode vertex data or DracoCompression.Default if not defined
     */
    dracoCompression?: DracoCompression;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines whether to use the normalized flag from the glTF accessor instead of the Draco data. Defaults to true.
     */
    useNormalizedFlagFromAccessor: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    _loadVertexDataAsync(context: string, primitive: IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
}
