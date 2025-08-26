import type { GLTFLoader } from "../glTFLoader";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_node_hoverability extension.
         */
        ["KHR_node_hoverability"]: {};
    }
}
/**
 * Loader extension for KHR_node_hoverability
 * @see https://github.com/KhronosGroup/glTF/pull/2426
 */
export declare class KHR_node_hoverability implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_node_hoverability";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    onReady(): Promise<void>;
    dispose(): void;
}
