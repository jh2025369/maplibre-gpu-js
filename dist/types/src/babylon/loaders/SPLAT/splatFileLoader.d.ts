import type { ISceneLoaderPluginAsync, ISceneLoaderPluginFactory, ISceneLoaderAsyncResult, ISceneLoaderProgressEvent, SceneLoaderPluginOptions } from "core/Loading/sceneLoader";
import { SPLATFileLoaderMetadata } from "./splatFileLoader.metadata";
import { AssetContainer } from "core/assetContainer";
import type { Scene } from "core/scene";
import type { SPLATLoadingOptions } from "./splatLoadingOptions";
declare module "core/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the splat loader.
         */
        [SPLATFileLoaderMetadata.name]: Partial<SPLATLoadingOptions>;
    }
}
/**
 * @experimental
 * SPLAT file type loader.
 * This is a babylon scene loader plugin.
 */
export declare class SPLATFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /**
     * Defines the name of the plugin.
     */
    readonly name: "splat";
    private _assetContainer;
    private readonly _loadingOptions;
    /**
     * Defines the extensions the splat loader is able to load.
     * force data to come in as an ArrayBuffer
     */
    readonly extensions: {
        readonly ".splat": {
            readonly isBinary: true;
        };
        readonly ".ply": {
            readonly isBinary: true;
        };
    };
    /**
     * Creates loader for gaussian splatting files
     * @param loadingOptions options for loading and parsing splat and PLY files.
     */
    constructor(loadingOptions?: Partial<Readonly<SPLATLoadingOptions>>);
    private static readonly _DefaultLoadingOptions;
    /** @internal */
    createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
    /**
     * Imports  from the loaded gaussian splatting data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the gaussian splatting data to load
     * @param rootUrl root url to load from
     * @param onProgress callback called while file is loading
     * @param fileName Defines the name of the file to load
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
    private static _BuildPointCloud;
    private static _BuildMesh;
    private _parse;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
    /**
     * Code from https://github.com/dylanebert/gsplat.js/blob/main/src/loaders/PLYLoader.ts Under MIT license
     * Converts a .ply data array buffer to splat
     * if data array buffer is not ply, returns the original buffer
     * @param data the .ply data to load
     * @returns the loaded splat buffer
     */
    private static _ConvertPLYToSplat;
}
