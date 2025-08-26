import type { Nullable } from "core/types";
import type { TransformNode } from "core/Meshes/transformNode";
import type { INode } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_ies extension.
         */
        ["EXT_lights_ies"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_ies)
 */
export declare class EXT_lights_ies implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "EXT_lights_ies";
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
