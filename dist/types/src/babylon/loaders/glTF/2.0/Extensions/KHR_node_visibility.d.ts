import type { GLTFLoader } from "../glTFLoader";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_node_visibility extension.
         */
        ["KHR_node_visibility"]: {};
    }
}
/**
 * Loader extension for KHR_node_visibility
 */
export declare class KHR_node_visibility implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_node_visibility";
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
