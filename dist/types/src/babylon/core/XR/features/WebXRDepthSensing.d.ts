import { RawTexture } from "../../Materials/Textures/rawTexture";
import type { WebXRSessionManager } from "../webXRSessionManager";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
export type WebXRDepthUsage = "cpu" | "gpu";
export type WebXRDepthDataFormat = "ushort" | "float" | "luminance-alpha";
/**
 * Options for Depth Sensing feature
 */
export interface IWebXRDepthSensingOptions {
    /**
     *  The desired depth sensing usage for the session
     */
    usagePreference: WebXRDepthUsage[];
    /**
     * The desired depth sensing data format for the session
     */
    dataFormatPreference: WebXRDepthDataFormat[];
    /**
     * Depth sensing will be enabled on all materials per default, if the GPU variant is enabled.
     * If you just want to use the texture or the CPU variant instead set this to true.
     */
    disableDepthSensingOnMaterials?: boolean;
    /**
     * If set to true the occluded pixels will not be discarded but the pixel color will be changed based on the occlusion factor
     * Enabling this will lead to worse performance but slightly better outcome.
     * It is possible we will change this in the future to look even better.
     */
    useToleranceFactorForDepthSensing?: boolean;
    /**
     * If set to true the texture will be set to be used for visualization.
     * In this case it will probably NOT work correctly on the materials.
     * So be aware that, for the time being, you can only use one or the other.
     */
    prepareTextureForVisualization?: boolean;
}
type GetDepthInMetersType = (x: number, y: number) => number;
/**
 * WebXR Feature for WebXR Depth Sensing Module
 * @since 5.49.1
 */
export declare class WebXRDepthSensing extends WebXRAbstractFeature {
    readonly options: IWebXRDepthSensingOptions;
    private _width;
    private _height;
    private _rawValueToMeters;
    private _textureType;
    private _normDepthBufferFromNormView;
    private _cachedDepthBuffer;
    private _cachedWebGLTexture;
    private _cachedDepthImageTexture;
    private _onCameraObserver;
    /**
     * Width of depth data. If depth data is not exist, returns null.
     */
    get width(): Nullable<number>;
    /**
     * Height of depth data. If depth data is not exist, returns null.
     */
    get height(): Nullable<number>;
    /**
     * Scale factor by which the raw depth values must be multiplied in order to get the depths in meters.
     */
    get rawValueToMeters(): Nullable<number>;
    /**
     * An XRRigidTransform that needs to be applied when indexing into the depth buffer.
     */
    get normDepthBufferFromNormView(): Nullable<XRRigidTransform>;
    /**
     * Describes which depth-sensing usage ("cpu" or "gpu") is used.
     */
    get depthUsage(): WebXRDepthUsage;
    /**
     * Describes which depth sensing data format ("ushort" or "float") is used.
     */
    get depthDataFormat(): WebXRDepthDataFormat;
    /**
     * Latest cached InternalTexture which containing depth buffer information.
     * This can be used when the depth usage is "gpu".
     * @deprecated This will be removed in the future. Use latestDepthImageTexture
     */
    get latestInternalTexture(): Nullable<InternalTexture>;
    /**
     * cached depth buffer
     */
    get latestDepthBuffer(): Nullable<ArrayBufferView>;
    /**
     * Event that notify when `DepthInformation.getDepthInMeters` is available.
     * `getDepthInMeters` method needs active XRFrame (not available for cached XRFrame)
     */
    onGetDepthInMetersAvailable: Observable<GetDepthInMetersType>;
    /**
     * Latest cached Texture of depth image which is made from the depth buffer data.
     */
    get latestDepthImageTexture(): Nullable<RawTexture>;
    /**
     * XRWebGLBinding which is used for acquiring WebGLDepthInformation
     */
    private _glBinding?;
    /**
     * The module's name
     */
    static readonly Name = "xr-depth-sensing";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Creates a new instance of the depth sensing feature
     * @param _xrSessionManager the WebXRSessionManager
     * @param options options for WebXR Depth Sensing Feature
     */
    constructor(_xrSessionManager: WebXRSessionManager, options: IWebXRDepthSensingOptions);
    /**
     * attach this feature
     * Will usually be called by the features manager
     * @param force should attachment be forced (even when already attached)
     * @returns true if successful.
     */
    attach(force?: boolean): boolean;
    detach(): boolean;
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose(): void;
    protected _onXRFrame(_xrFrame: XRFrame): void;
    private _updateDepthInformationAndTextureCPUDepthUsage;
    private _updateDepthInformationAndTextureWebGLDepthUsage;
    /**
     * Extends the session init object if needed
     * @returns augmentation object for the xr session init object.
     */
    getXRSessionInitExtension(): Promise<Partial<XRSessionInit>>;
    private _getInternalTextureFromDepthInfo;
}
export {};
