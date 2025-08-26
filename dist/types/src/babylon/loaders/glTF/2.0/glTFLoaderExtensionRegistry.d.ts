import type { GLTFLoader } from "./glTFLoader";
import type { IGLTFLoaderExtension } from "./glTFLoaderExtension";
interface IRegisteredGLTFExtension {
    isGLTFExtension: boolean;
    factory: GLTFExtensionFactory;
}
export type GLTFExtensionFactory = (loader: GLTFLoader) => IGLTFLoaderExtension | Promise<IGLTFLoaderExtension>;
/**
 * All currently registered glTF 2.0 loader extensions.
 */
export declare const registeredGLTFExtensions: ReadonlyMap<string, Readonly<IRegisteredGLTFExtension>>;
/**
 * Registers a loader extension.
 * @param name The name of the loader extension.
 * @param isGLTFExtension If the loader extension is a glTF extension, then it will only be used for glTF files that use the corresponding glTF extension. Otherwise, it will be used for all loaded glTF files.
 * @param factory The factory function that creates the loader extension.
 */
export declare function registerGLTFExtension(name: string, isGLTFExtension: boolean, factory: GLTFExtensionFactory): void;
/**
 * Unregisters a loader extension.
 * @param name The name of the loader extension.
 * @returns A boolean indicating whether the extension has been unregistered
 */
export declare function unregisterGLTFExtension(name: string): boolean;
export {};
