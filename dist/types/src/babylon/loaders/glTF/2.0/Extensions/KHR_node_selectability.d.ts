import type { GLTFLoader } from "../glTFLoader";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_selectability extension.
         */
        ["KHR_node_selectability"]: {};
    }
}
/**
 * Loader extension for KHR_selectability
 */
export declare class KHR_node_selectability implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_node_selectability";
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
