import type { FrameGraphTextureHandle, Scene, Camera, FrameGraph, FrameGraphObjectList, AbstractMesh, ObjectRendererOptions } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { ObjectRenderer } from "../../../Rendering/objectRenderer";
/**
 * Description of a texture used by the geometry renderer task.
 */
export interface IFrameGraphGeometryRendererTextureDescription {
    /**
     * The type of the texture.
     * The value should be one of the Constants.PREPASS_XXX_TEXTURE_TYPE values.
     */
    type: number;
    /**
     * The type of the texture.
     */
    textureType: number;
    /**
     * The format of the texture.
     */
    textureFormat: number;
}
/**
 * Task used to render geometry to a set of textures.
 */
export declare class FrameGraphGeometryRendererTask extends FrameGraphTask {
    /**
     * The depth texture attachment to use for rendering (optional).
     */
    depthTexture?: FrameGraphTextureHandle;
    private _camera;
    /**
     * Gets or sets the camera used for rendering.
     */
    get camera(): Camera;
    set camera(camera: Camera);
    /**
     * The object list used for rendering.
     */
    objectList: FrameGraphObjectList;
    /**
     * Whether depth testing is enabled (default is true).
     */
    depthTest: boolean;
    /**
     * Whether depth writing is enabled (default is true).
     */
    depthWrite: boolean;
    /**
     * The size of the output textures (default is 100% of the back buffer texture size).
     */
    size: {
        width: number;
        height: number;
    };
    /**
     * Whether the size is a percentage of the back buffer size (default is true).
     */
    sizeIsPercentage: boolean;
    /**
     * The number of samples to use for the output textures (default is 1).
     */
    samples: number;
    /**
     * The list of texture descriptions used by the geometry renderer task.
     */
    textureDescriptions: IFrameGraphGeometryRendererTextureDescription[];
    /**
     * The output depth texture attachment texture.
     * This texture will point to the same texture than the depthTexture property if it is set.
     * Note, however, that the handle itself will be different!
     */
    readonly outputDepthTexture: FrameGraphTextureHandle;
    /**
     * The depth (in view space) output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryViewDepthTexture: FrameGraphTextureHandle;
    /**
     * The depth (in screen space) output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryScreenDepthTexture: FrameGraphTextureHandle;
    /**
     * The normal (in view space) output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryViewNormalTexture: FrameGraphTextureHandle;
    /**
     * The normal (in world space) output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryWorldNormalTexture: FrameGraphTextureHandle;
    /**
     * The position (in local space) output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryLocalPositionTexture: FrameGraphTextureHandle;
    /**
     * The position (in world space) output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryWorldPositionTexture: FrameGraphTextureHandle;
    /**
     * The albedo output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryAlbedoTexture: FrameGraphTextureHandle;
    /**
     * The reflectivity output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryReflectivityTexture: FrameGraphTextureHandle;
    /**
     * The velocity output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryVelocityTexture: FrameGraphTextureHandle;
    /**
     * The linear velocity output texture. Will point to a valid texture only if that texture has been requested in textureDescriptions!
     */
    readonly geometryLinearVelocityTexture: FrameGraphTextureHandle;
    /**
     * The object renderer used by the geometry renderer task.
     */
    get objectRenderer(): ObjectRenderer;
    /**
     * Gets or sets the name of the task.
     */
    get name(): string;
    set name(value: string);
    private readonly _engine;
    private readonly _scene;
    private readonly _renderer;
    private _textureWidth;
    private _textureHeight;
    private _clearAttachmentsLayout;
    private _allAttachmentsLayout;
    /**
     * Constructs a new geometry renderer task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene the frame graph is associated with.
     * @param options The options of the object renderer.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, options?: ObjectRendererOptions);
    /**
     * Gets the list of excluded meshes from the velocity texture.
     */
    get excludedSkinnedMeshFromVelocityTexture(): AbstractMesh[];
    isReady(): boolean;
    record(): void;
    dispose(): void;
    private _createMultiRenderTargetTexture;
    private _checkDepthTextureCompatibility;
    private _buildClearAttachmentsLayout;
    private _registerForRenderPassId;
}
