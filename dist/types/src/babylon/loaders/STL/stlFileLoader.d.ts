import type { Nullable } from "core/types";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { ISceneLoaderPlugin } from "core/Loading/sceneLoader";
import { AssetContainer } from "core/assetContainer";
import type { Scene } from "core/scene";
import { STLFileLoaderMetadata } from "./stlFileLoader.metadata";
import "core/Materials/standardMaterial";
declare module "core/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the stl loader.
         */
        [STLFileLoaderMetadata.name]: {};
    }
}
/**
 * STL file type loader.
 * This is a babylon scene loader plugin.
 */
export declare class STLFileLoader implements ISceneLoaderPlugin {
    /** @internal */
    solidPattern: RegExp;
    /** @internal */
    facetsPattern: RegExp;
    /** @internal */
    normalPattern: RegExp;
    /** @internal */
    vertexPattern: RegExp;
    /**
     * Defines the name of the plugin.
     */
    readonly name: "stl";
    /**
     * Defines the extensions the stl loader is able to load.
     * force data to come in as an ArrayBuffer
     * we'll convert to string if it looks like it's an ASCII .stl
     */
    readonly extensions: {
        readonly ".stl": {
            readonly isBinary: true;
        };
    };
    /**
     * Defines if Y and Z axes are swapped or not when loading an STL file.
     * The default is false to maintain backward compatibility. When set to
     * true, coordinates from the STL file are used without change.
     */
    static DO_NOT_ALTER_FILE_COORDINATES: boolean;
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param meshes The meshes array to import into
     * @returns True if successful or false otherwise
     */
    importMesh(meshesNames: any, scene: Scene, data: any, rootUrl: string, meshes: Nullable<AbstractMesh[]>): boolean;
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns true if successful or false otherwise
     */
    load(scene: Scene, data: any, rootUrl: string): boolean;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    loadAssetContainer(scene: Scene, data: string, rootUrl: string): AssetContainer;
    private _isBinary;
    private _parseBinary;
    private _parseASCII;
}
