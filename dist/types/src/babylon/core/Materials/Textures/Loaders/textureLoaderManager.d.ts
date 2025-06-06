import type { IInternalTextureLoader } from "./internalTextureLoader";
import type { Nullable } from "../../../types";
/**
 * Registers a texture loader.
 * If a loader for the extension exists in the registry, it will be replaced.
 * @param extension The name of the loader extension.
 * @param loaderFactory The factory function that creates the loader extension.
 */
export declare function registerTextureLoader(extension: string, loaderFactory: (mimeType?: string) => IInternalTextureLoader | Promise<IInternalTextureLoader>): void;
/**
 * Unregisters a texture loader.
 * @param extension The name of the loader extension.
 * @returns A boolean indicating whether the extension has been unregistered
 */
export declare function unregisterTextureLoader(extension: string): boolean;
/**
 * Function used to get the correct texture loader for a specific extension.
 * @param extension defines the file extension of the file being loaded
 * @param mimeType defines the optional mime type of the file being loaded
 * @returns the IInternalTextureLoader or null if it wasn't found
 */
export declare function _GetCompatibleTextureLoader(extension: string, mimeType?: string): Nullable<Promise<IInternalTextureLoader>>;
