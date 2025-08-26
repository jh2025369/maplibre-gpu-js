import type { Nullable } from "core/types";
import type { TransformNode } from "core/Meshes/transformNode";
import type { INode } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_lights_punctual extension.
         */
        ["KHR_lights_punctual"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
export declare class KHR_lights implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_lights_punctual";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /** hidden */
    private _loader;
    private _lights?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
}
