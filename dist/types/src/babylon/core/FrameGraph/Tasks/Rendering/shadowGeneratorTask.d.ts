import type { Scene, FrameGraph, FrameGraphObjectList, IShadowLight, FrameGraphTextureHandle, Camera } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { ShadowGenerator } from "../../../Lights/Shadows/shadowGenerator";
/**
 * Task used to generate shadows from a list of objects.
 */
export declare class FrameGraphShadowGeneratorTask extends FrameGraphTask {
    /**
     * The object list that generates shadows.
     */
    objectList: FrameGraphObjectList;
    private _light;
    /**
     * The light to generate shadows from.
     */
    get light(): IShadowLight;
    set light(value: IShadowLight);
    private _camera;
    /**
     * Gets or sets the camera used to generate the shadow generator.
     */
    get camera(): Camera;
    set camera(camera: Camera);
    private _mapSize;
    /**
     * The size of the shadow map.
     */
    get mapSize(): number;
    set mapSize(value: number);
    private _useFloat32TextureType;
    /**
     * If true, the shadow map will use a 32 bits float texture type (else, 16 bits float is used if supported).
     */
    get useFloat32TextureType(): boolean;
    set useFloat32TextureType(value: boolean);
    private _useRedTextureFormat;
    /**
     * If true, the shadow map will use a red texture format (else, a RGBA format is used).
     */
    get useRedTextureFormat(): boolean;
    set useRedTextureFormat(value: boolean);
    private _bias;
    /**
     * The bias to apply to the shadow map.
     */
    get bias(): number;
    set bias(value: number);
    private _normalBias;
    /**
     * The normal bias to apply to the shadow map.
     */
    get normalBias(): number;
    set normalBias(value: number);
    private _darkness;
    /**
     * The darkness of the shadows.
     */
    get darkness(): number;
    set darkness(value: number);
    private _transparencyShadow;
    /**
     * Gets or sets the ability to have transparent shadow
     */
    get transparencyShadow(): boolean;
    set transparencyShadow(value: boolean);
    private _enableSoftTransparentShadow;
    /**
     * Enables or disables shadows with varying strength based on the transparency
     */
    get enableSoftTransparentShadow(): boolean;
    set enableSoftTransparentShadow(value: boolean);
    private _useOpacityTextureForTransparentShadow;
    /**
     * If this is true, use the opacity texture's alpha channel for transparent shadows instead of the diffuse one
     */
    get useOpacityTextureForTransparentShadow(): boolean;
    set useOpacityTextureForTransparentShadow(value: boolean);
    private _filter;
    /**
     * The filter to apply to the shadow map.
     */
    get filter(): number;
    set filter(value: number);
    private _filteringQuality;
    /**
     * The filtering quality to apply to the filter.
     */
    get filteringQuality(): number;
    set filteringQuality(value: number);
    /**
     * The shadow generator.
     */
    readonly shadowGenerator: ShadowGenerator;
    /**
     * The shadow map texture.
     */
    readonly outputTexture: FrameGraphTextureHandle;
    protected _shadowGenerator: ShadowGenerator | undefined;
    protected _createShadowGenerator(): void;
    protected _setupShadowGenerator(): void;
    isReady(): boolean;
    /**
     * Creates a new shadow generator task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param _scene The scene to create the shadow generator for.
     */
    constructor(name: string, frameGraph: FrameGraph, _scene: Scene);
    record(): void;
    dispose(): void;
}
