import type { ProcessingOptions } from "./shaderProcessingOptions";
import type { WebRequest } from "../../Misc/webRequest";
import type { LoadFileError } from "../../Misc/fileTools";
import type { IOfflineProvider } from "../../Offline/IOfflineProvider";
import type { IFileRequest } from "../../Misc/fileRequest";
import type { AbstractEngine } from "../abstractEngine";
/** @internal */
export declare function Initialize(options: ProcessingOptions): void;
/** @internal */
export declare function Process(sourceCode: string, options: ProcessingOptions, callback: (migratedCode: string, codeBeforeMigration: string) => void, engine?: AbstractEngine): void;
/** @internal */
export declare function PreProcess(sourceCode: string, options: ProcessingOptions, callback: (migratedCode: string, codeBeforeMigration: string) => void, engine: AbstractEngine): void;
/** @internal */
export declare function Finalize(vertexCode: string, fragmentCode: string, options: ProcessingOptions): {
    vertexCode: string;
    fragmentCode: string;
};
/** @internal */
export declare function _ProcessIncludes(sourceCode: string, options: ProcessingOptions, callback: (data: any) => void): void;
/** @internal */
export declare const _functionContainer: {
    /**
     * Loads a file from a url
     * @param url url to load
     * @param onSuccess callback called when the file successfully loads
     * @param onProgress callback called while file is loading (if the server supports this mode)
     * @param offlineProvider defines the offline provider for caching
     * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
     * @param onError callback called when the file fails to load
     * @returns a file request object
     * @internal
     */
    loadFile: (url: string, onSuccess: (data: string | ArrayBuffer, responseURL?: string) => void, onProgress?: (ev: ProgressEvent) => void, offlineProvider?: IOfflineProvider, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void) => IFileRequest;
};
