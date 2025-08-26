import type { ISceneLoaderPluginAsync, ISceneLoaderPluginFactory, ISceneLoaderAsyncResult, SceneLoaderPluginOptions } from "core/Loading/sceneLoader";
import { AssetContainer } from "core/assetContainer";
import type { Scene } from "core/scene";
import type { BVHLoadingOptions } from "./bvhLoadingOptions";
import { BVHFileLoaderMetadata } from "./bvhFileLoader.metadata";
declare module "core/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the bvh loader.
         */
        [BVHFileLoaderMetadata.name]: Partial<BVHLoadingOptions>;
    }
}
/**
 * @experimental
 * BVH file type loader.
 * This is a babylon scene loader plugin.
 */
export declare class BVHFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /**
     * Name of the loader ("bvh")
     */
    readonly name: "bvh";
    /** @internal */
    readonly extensions: {
        readonly ".bvh": {
            readonly isBinary: false;
        };
    };
    private readonly _loadingOptions;
    /**
     * Creates loader for bvh motion files
     * @param loadingOptions - Options for the bvh loader
     */
    constructor(loadingOptions?: Partial<Readonly<BVHLoadingOptions>>);
    private static get _DefaultLoadingOptions();
    /** @internal */
    createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    canDirectLoad(): boolean;
    /**
     * Imports  from the loaded gaussian splatting data and adds them to the scene
     * @param _meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the bvh data to load
     * @returns a promise containing the loaded skeletons and animations
     */
    importMeshAsync(_meshesNames: string | readonly string[] | null | undefined, scene: Scene, data: unknown): Promise<ISceneLoaderAsyncResult>;
    /**
     * Imports all objects from the loaded bvh data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the bvh data to load
     * @returns a promise which completes when objects have been loaded to the scene
     */
    loadAsync(scene: Scene, data: unknown): Promise<void>;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @returns The loaded asset container
     */
    loadAssetContainerAsync(scene: Scene, data: unknown): Promise<AssetContainer>;
}
