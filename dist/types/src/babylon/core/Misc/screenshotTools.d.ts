import type { Camera } from "../Cameras/camera";
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { IScreenshotSize } from "./interfaces/screenshotSize";
import type { AbstractEngine } from "../Engines/abstractEngine";
/**
 * Captures a screenshot of the current rendering
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
 * @param engine defines the rendering engine
 * @param camera defines the source camera. If the camera is not the scene's active camera, {@link CreateScreenshotUsingRenderTarget} will be used instead, and `useFill` will be ignored
 * @param size This parameter can be set to a single number or to an object with the
 * following (optional) properties: precision, width, height. If a single number is passed,
 * it will be used for both width and height. If an object is passed, the screenshot size
 * will be derived from the parameters. The precision property is a multiplier allowing
 * rendering at a higher or lower resolution
 * @param successCallback defines the callback receives a single parameter which contains the
 * screenshot as a string of base64-encoded characters. This string can be assigned to the
 * src parameter of an <img> to display it
 * @param mimeType defines the MIME type of the screenshot image (default: image/png).
 * Check your browser for supported MIME types
 * @param forceDownload force the system to download the image even if a successCallback is provided
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @param useFill fill the screenshot dimensions with the render canvas and clip any overflow. If false, fit the canvas within the screenshot, as in letterboxing.
 */
export declare function CreateScreenshot(engine: AbstractEngine, camera: Camera, size: IScreenshotSize | number, successCallback?: (data: string) => void, mimeType?: string, forceDownload?: boolean, quality?: number, useFill?: boolean): void;
/**
 * Captures a screenshot of the current rendering
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
 * @param engine defines the rendering engine
 * @param camera defines the source camera. If the camera is not the scene's active camera, {@link CreateScreenshotUsingRenderTarget} will be used instead, and `useFill` will be ignored
 * @param size This parameter can be set to a single number or to an object with the
 * following (optional) properties: precision, width, height. If a single number is passed,
 * it will be used for both width and height. If an object is passed, the screenshot size
 * will be derived from the parameters. The precision property is a multiplier allowing
 * rendering at a higher or lower resolution
 * @param mimeType defines the MIME type of the screenshot image (default: image/png).
 * Check your browser for supported MIME types
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @param useFill fill the screenshot dimensions with the render canvas and clip any overflow. If false, fit the canvas within the screenshot, as in letterboxing.
 * @returns screenshot as a string of base64-encoded characters. This string can be assigned
 * to the src parameter of an <img> to display it
 */
export declare function CreateScreenshotAsync(engine: AbstractEngine, camera: Camera, size: IScreenshotSize | number, mimeType?: string, quality?: number, useFill?: boolean): Promise<string>;
/**
 * Captures and automatically downloads a screenshot of the current rendering for a specific size. This will render the entire canvas but will generate a blink (due to canvas resize)
 * If screenshot image data is needed, use {@link CreateScreenshotAsync} instead.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
 * @param engine defines the rendering engine
 * @param camera defines the source camera. If the camera is not the scene's active camera, {@link CreateScreenshotUsingRenderTarget} will be used instead, and `useFill` will be ignored
 * @param width defines the expected width
 * @param height defines the expected height
 * @param mimeType defines the MIME type of the screenshot image (default: image/png).
 * Check your browser for supported MIME types
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @param useFill fill the screenshot dimensions with the render canvas and clip any overflow. If false, fit the canvas within the screenshot, as in letterboxing.
 * @returns promise that resolves once the screenshot is taken
 */
export declare function CreateScreenshotWithResizeAsync(engine: AbstractEngine, camera: Camera, width: number, height: number, mimeType?: string, quality?: number, useFill?: boolean): Promise<void>;
/**
 * Generates an image screenshot from the specified camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
 * @param engine The engine to use for rendering
 * @param camera The camera to use for rendering
 * @param size This parameter can be set to a single number or to an object with the
 * following (optional) properties: precision, width, height, finalWidth, finalHeight. If a single number is passed,
 * it will be used for both width and height, as well as finalWidth, finalHeight. If an object is passed, the screenshot size
 * will be derived from the parameters. The precision property is a multiplier allowing
 * rendering at a higher or lower resolution
 * @param successCallback The callback receives a single parameter which contains the
 * screenshot as a string of base64-encoded characters. This string can be assigned to the
 * src parameter of an <img> to display it
 * @param mimeType The MIME type of the screenshot image (default: image/png).
 * Check your browser for supported MIME types
 * @param samples Texture samples (default: 1)
 * @param antialiasing Whether antialiasing should be turned on or not (default: false)
 * @param fileName A name for for the downloaded file.
 * @param renderSprites Whether the sprites should be rendered or not (default: false)
 * @param enableStencilBuffer Whether the stencil buffer should be enabled or not (default: false)
 * @param useLayerMask if the camera's layer mask should be used to filter what should be rendered (default: true)
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @param customizeTexture An optional callback that can be used to modify the render target texture before taking the screenshot. This can be used, for instance, to enable camera post-processes before taking the screenshot.
 * @param customDumpData The function to use to dump the data. If not provided, the default DumpData function will be used.
 */
export declare function CreateScreenshotUsingRenderTarget(engine: AbstractEngine, camera: Camera, size: IScreenshotSize | number, successCallback?: (data: string) => void, mimeType?: string, samples?: number, antialiasing?: boolean, fileName?: string, renderSprites?: boolean, enableStencilBuffer?: boolean, useLayerMask?: boolean, quality?: number, customizeTexture?: (texture: RenderTargetTexture) => void, customDumpData?: (width: number, height: number, data: ArrayBufferView, successCallback?: (data: string | ArrayBuffer) => void, mimeType?: string, fileName?: string, invertY?: boolean, toArrayBuffer?: boolean, quality?: number) => void): void;
/**
 * Generates an image screenshot from the specified camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
 * @param engine The engine to use for rendering
 * @param camera The camera to use for rendering
 * @param size This parameter can be set to a single number or to an object with the
 * following (optional) properties: precision, width, height. If a single number is passed,
 * it will be used for both width and height. If an object is passed, the screenshot size
 * will be derived from the parameters. The precision property is a multiplier allowing
 * rendering at a higher or lower resolution
 * @param mimeType The MIME type of the screenshot image (default: image/png).
 * Check your browser for supported MIME types
 * @param samples Texture samples (default: 1)
 * @param antialiasing Whether antialiasing should be turned on or not (default: false)
 * @param fileName A name for for the downloaded file.
 * @param renderSprites Whether the sprites should be rendered or not (default: false)
 * @param enableStencilBuffer Whether the stencil buffer should be enabled or not (default: false)
 * @param useLayerMask if the camera's layer mask should be used to filter what should be rendered (default: true)
 * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
 * @param customizeTexture An optional callback that can be used to modify the render target texture before taking the screenshot. This can be used, for instance, to enable camera post-processes before taking the screenshot.
 * @param customDumpData The function to use to dump the data. If not provided, the default DumpData function will be used.
 * @returns screenshot as a string of base64-encoded characters. This string can be assigned
 * to the src parameter of an <img> to display it
 */
export declare function CreateScreenshotUsingRenderTargetAsync(engine: AbstractEngine, camera: Camera, size: IScreenshotSize | number, mimeType?: string, samples?: number, antialiasing?: boolean, fileName?: string, renderSprites?: boolean, enableStencilBuffer?: boolean, useLayerMask?: boolean, quality?: number, customizeTexture?: (texture: RenderTargetTexture) => void, customDumpData?: (width: number, height: number, data: ArrayBufferView, successCallback?: (data: string | ArrayBuffer) => void, mimeType?: string, fileName?: string, invertY?: boolean, toArrayBuffer?: boolean, quality?: number) => void): Promise<string>;
/**
 * Class containing a set of static utilities functions for screenshots
 */
export declare const ScreenshotTools: {
    /**
     * Captures a screenshot of the current rendering
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
     * @param engine defines the rendering engine
     * @param camera defines the source camera. If the camera is not the scene's active camera, {@link CreateScreenshotUsingRenderTarget} will be used instead, and `useFill` will be ignored
     * @param size This parameter can be set to a single number or to an object with the
     * following (optional) properties: precision, width, height. If a single number is passed,
     * it will be used for both width and height. If an object is passed, the screenshot size
     * will be derived from the parameters. The precision property is a multiplier allowing
     * rendering at a higher or lower resolution
     * @param successCallback defines the callback receives a single parameter which contains the
     * screenshot as a string of base64-encoded characters. This string can be assigned to the
     * src parameter of an <img> to display it
     * @param mimeType defines the MIME type of the screenshot image (default: image/png).
     * Check your browser for supported MIME types
     * @param forceDownload force the system to download the image even if a successCallback is provided
     * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
     * @param useFill fill the screenshot dimensions with the render canvas and clip any overflow. If false, fit the canvas within the screenshot, as in letterboxing.
     */
    CreateScreenshot: typeof CreateScreenshot;
    /**
     * Captures a screenshot of the current rendering
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
     * @param engine defines the rendering engine
     * @param camera defines the source camera. If the camera is not the scene's active camera, {@link CreateScreenshotUsingRenderTarget} will be used instead, and `useFill` will be ignored
     * @param size This parameter can be set to a single number or to an object with the
     * following (optional) properties: precision, width, height. If a single number is passed,
     * it will be used for both width and height. If an object is passed, the screenshot size
     * will be derived from the parameters. The precision property is a multiplier allowing
     * rendering at a higher or lower resolution
     * @param mimeType defines the MIME type of the screenshot image (default: image/png).
     * Check your browser for supported MIME types
     * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
     * @param useFill fill the screenshot dimensions with the render canvas and clip any overflow. If false, fit the canvas within the screenshot, as in letterboxing.
     * @returns screenshot as a string of base64-encoded characters. This string can be assigned
     * to the src parameter of an <img> to display it
     */
    CreateScreenshotAsync: typeof CreateScreenshotAsync;
    /**
     * Captures and automatically downloads a screenshot of the current rendering for a specific size. This will render the entire canvas but will generate a blink (due to canvas resize)
     * If screenshot image data is needed, use {@link CreateScreenshotAsync} instead.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
     * @param engine defines the rendering engine
     * @param camera defines the source camera. If the camera is not the scene's active camera, {@link CreateScreenshotUsingRenderTarget} will be used instead, and `useFill` will be ignored
     * @param width defines the expected width
     * @param height defines the expected height
     * @param mimeType defines the MIME type of the screenshot image (default: image/png).
     * Check your browser for supported MIME types
     * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
     * @param useFill fill the screenshot dimensions with the render canvas and clip any overflow. If false, fit the canvas within the screenshot, as in letterboxing.
     * @returns promise that resolves once the screenshot is taken
     */
    CreateScreenshotWithResizeAsync: typeof CreateScreenshotWithResizeAsync;
    /**
     * Generates an image screenshot from the specified camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
     * @param engine The engine to use for rendering
     * @param camera The camera to use for rendering
     * @param size This parameter can be set to a single number or to an object with the
     * following (optional) properties: precision, width, height. If a single number is passed,
     * it will be used for both width and height. If an object is passed, the screenshot size
     * will be derived from the parameters. The precision property is a multiplier allowing
     * rendering at a higher or lower resolution
     * @param successCallback The callback receives a single parameter which contains the
     * screenshot as a string of base64-encoded characters. This string can be assigned to the
     * src parameter of an <img> to display it
     * @param mimeType The MIME type of the screenshot image (default: image/png).
     * Check your browser for supported MIME types
     * @param samples Texture samples (default: 1)
     * @param antialiasing Whether antialiasing should be turned on or not (default: false)
     * @param fileName A name for for the downloaded file.
     * @param renderSprites Whether the sprites should be rendered or not (default: false)
     * @param enableStencilBuffer Whether the stencil buffer should be enabled or not (default: false)
     * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
     */
    CreateScreenshotUsingRenderTarget: typeof CreateScreenshotUsingRenderTarget;
    /**
     * Generates an image screenshot from the specified camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToPNG
     * @param engine The engine to use for rendering
     * @param camera The camera to use for rendering
     * @param size This parameter can be set to a single number or to an object with the
     * following (optional) properties: precision, width, height. If a single number is passed,
     * it will be used for both width and height. If an object is passed, the screenshot size
     * will be derived from the parameters. The precision property is a multiplier allowing
     * rendering at a higher or lower resolution
     * @param mimeType The MIME type of the screenshot image (default: image/png).
     * Check your browser for supported MIME types
     * @param samples Texture samples (default: 1)
     * @param antialiasing Whether antialiasing should be turned on or not (default: false)
     * @param fileName A name for for the downloaded file.
     * @param renderSprites Whether the sprites should be rendered or not (default: false)
     * @param quality The quality of the image if lossy mimeType is used (e.g. image/jpeg, image/webp). See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | HTMLCanvasElement.toBlob()}'s `quality` parameter.
     * @returns screenshot as a string of base64-encoded characters. This string can be assigned
     * to the src parameter of an <img> to display it
     */
    CreateScreenshotUsingRenderTargetAsync: typeof CreateScreenshotUsingRenderTargetAsync;
};
