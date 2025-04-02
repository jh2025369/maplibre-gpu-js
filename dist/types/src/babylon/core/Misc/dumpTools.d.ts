import type { AbstractEngine } from "../Engines/abstractEngine";
/**
 * Dumps the current bound framebuffer
 * @param width defines the rendering width
 * @param height defines the rendering height
 * @param engine defines the hosting engine
 * @param successCallback defines the callback triggered once the data are available
 * @param mimeType defines the mime type of the result
 * @param fileName defines the filename to download. If present, the result will automatically be downloaded
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @returns a void promise
 */
export declare function DumpFramebuffer(width: number, height: number, engine: AbstractEngine, successCallback?: (data: string) => void, mimeType?: string, fileName?: string, quality?: number): Promise<void>;
/**
 * Dumps an array buffer
 * @param width defines the rendering width
 * @param height defines the rendering height
 * @param data the data array
 * @param mimeType defines the mime type of the result
 * @param fileName defines the filename to download. If present, the result will automatically be downloaded
 * @param invertY true to invert the picture in the Y dimension
 * @param toArrayBuffer true to convert the data to an ArrayBuffer (encoded as `mimeType`) instead of a base64 string
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @returns a promise that resolve to the final data
 */
export declare function DumpDataAsync(width: number, height: number, data: ArrayBufferView, mimeType?: string, fileName?: string, invertY?: boolean, toArrayBuffer?: boolean, quality?: number): Promise<string | ArrayBuffer>;
/**
 * Dumps an array buffer
 * @param width defines the rendering width
 * @param height defines the rendering height
 * @param data the data array
 * @param successCallback defines the callback triggered once the data are available
 * @param mimeType defines the mime type of the result
 * @param fileName defines the filename to download. If present, the result will automatically be downloaded
 * @param invertY true to invert the picture in the Y dimension
 * @param toArrayBuffer true to convert the data to an ArrayBuffer (encoded as `mimeType`) instead of a base64 string
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 */
export declare function DumpData(width: number, height: number, data: ArrayBufferView, successCallback?: (data: string | ArrayBuffer) => void, mimeType?: string, fileName?: string, invertY?: boolean, toArrayBuffer?: boolean, quality?: number): void;
/**
 * Dispose the dump tools associated resources
 */
export declare function Dispose(): void;
/**
 * Object containing a set of static utilities functions to dump data from a canvas
 * @deprecated use functions
 */
export declare const DumpTools: {
    DumpData: typeof DumpData;
    DumpDataAsync: typeof DumpDataAsync;
    DumpFramebuffer: typeof DumpFramebuffer;
    Dispose: typeof Dispose;
};
