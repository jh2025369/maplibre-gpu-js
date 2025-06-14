import type { Nullable } from "../types";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { WebXRRenderTarget } from "./webXRTypes";
import type { WebXRSessionManager } from "./webXRSessionManager";
import { Observable } from "../Misc/observable";
/**
 * Configuration object for WebXR output canvas
 */
export declare class WebXRManagedOutputCanvasOptions {
    /**
     * An optional canvas in case you wish to create it yourself and provide it here.
     * If not provided, a new canvas will be created
     */
    canvasElement?: HTMLCanvasElement;
    /**
     * Options for this XR Layer output
     */
    canvasOptions?: XRWebGLLayerInit;
    /**
     * CSS styling for a newly created canvas (if not provided)
     */
    newCanvasCssStyle?: string;
    /**
     * Get the default values of the configuration object
     * @param engine defines the engine to use (can be null)
     * @returns default values of this configuration object
     */
    static GetDefaults(engine?: AbstractEngine): WebXRManagedOutputCanvasOptions;
}
/**
 * Creates a canvas that is added/removed from the webpage when entering/exiting XR
 */
export declare class WebXRManagedOutputCanvas implements WebXRRenderTarget {
    private _options;
    private _canvas;
    private _engine;
    private _originalCanvasSize;
    /**
     * Rendering context of the canvas which can be used to display/mirror xr content
     */
    canvasContext: WebGL2RenderingContext;
    /**
     * xr layer for the canvas
     */
    xrLayer: Nullable<XRWebGLLayer>;
    private _xrLayerWrapper;
    /**
     * Observers registered here will be triggered when the xr layer was initialized
     */
    onXRLayerInitObservable: Observable<XRWebGLLayer>;
    private _canvasCompatiblePromise;
    /**
     * Initializes the canvas to be added/removed upon entering/exiting xr
     * @param _xrSessionManager The XR Session manager
     * @param _options optional configuration for this canvas output. defaults will be used if not provided
     */
    constructor(_xrSessionManager: WebXRSessionManager, _options?: WebXRManagedOutputCanvasOptions);
    /**
     * Disposes of the object
     */
    dispose(): void;
    private _makeCanvasCompatibleAsync;
    /**
     * Initializes a XRWebGLLayer to be used as the session's baseLayer.
     * @param xrSession xr session
     * @returns a promise that will resolve once the XR Layer has been created
     */
    initializeXRLayerAsync(xrSession: XRSession): Promise<XRWebGLLayer>;
    private _addCanvas;
    private _removeCanvas;
    private _setCanvasSize;
    private _setManagedOutputCanvas;
}
