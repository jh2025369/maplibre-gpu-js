import type { Nullable } from "core/types";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { INode, IMeshPrimitive, IMesh } from "../glTFLoaderInterfaces";
import type { TransformNode } from "core/Meshes/transformNode";
import type { MaterialVariantsController } from "../../glTFFileLoader";
export { MaterialVariantsController };
declare module "../../glTFFileLoader" {
    type MaterialVariantsController = {
        /**
         * The list of available variant names for this asset.
         */
        readonly variants: readonly string[];
        /**
         * Gets or sets the selected variant.
         */
        selectedVariant: string;
    };
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_variants extension.
         */
        ["KHR_materials_variants"]: Partial<{
            /**
             * Specifies the name of the variant that should be selected by default.
             */
            defaultVariant: string;
            /**
             * Defines a callback that will be called if material variants are loaded.
             * @experimental
             */
            onLoaded: (controller: MaterialVariantsController) => void;
        }>;
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
 */
export declare class KHR_materials_variants implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_materials_variants";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _variants?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * Gets the list of available variant names for this asset.
     * @param rootNode The glTF root node
     * @returns the list of all the variant names for this model
     */
    static GetAvailableVariants(rootNode: TransformNode): string[];
    /**
     * Gets the list of available variant names for this asset.
     * @param rootNode The glTF root node
     * @returns the list of all the variant names for this model
     */
    getAvailableVariants(rootNode: TransformNode): string[];
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootNode The glTF root node
     * @param variantName The variant name(s) to select.
     */
    static SelectVariant(rootNode: TransformNode, variantName: string | string[]): void;
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootNode The glTF root node
     * @param variantName The variant name(s) to select.
     */
    selectVariant(rootNode: TransformNode, variantName: string | string[]): void;
    /**
     * Reset back to the original before selecting a variant.
     * @param rootNode The glTF root node
     */
    static Reset(rootNode: TransformNode): void;
    /**
     * Reset back to the original before selecting a variant.
     * @param rootNode The glTF root node
     */
    reset(rootNode: TransformNode): void;
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootNode The glTF root node
     * @returns The selected variant name(s).
     */
    static GetLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootNode The glTF root node
     * @returns The selected variant name(s).
     */
    getLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
    private static _GetExtensionMetadata;
    /** @internal */
    onLoading(): void;
    /** @internal */
    onReady(): void;
    /**
     * @internal
     */
    _loadMeshPrimitiveAsync(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
}
