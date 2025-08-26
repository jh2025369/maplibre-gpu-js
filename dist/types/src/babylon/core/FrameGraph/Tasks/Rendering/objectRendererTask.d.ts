import type { FrameGraph, FrameGraphTextureHandle, Scene, Camera, FrameGraphObjectList, FrameGraphRenderContext, ObjectRendererOptions, Nullable, Observer, FrameGraphShadowGeneratorTask, FrameGraphRenderPass } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { ObjectRenderer } from "../../../Rendering/objectRenderer";
/**
 * Task used to render objects to a texture.
 */
export declare class FrameGraphObjectRendererTask extends FrameGraphTask {
    /**
     * The target texture where the objects will be rendered.
     */
    targetTexture: FrameGraphTextureHandle | FrameGraphTextureHandle[];
    /**
     * The depth attachment texture where the objects will be rendered (optional).
     */
    depthTexture?: FrameGraphTextureHandle;
    /**
     * The shadow generators used to render the objects (optional).
     */
    shadowGenerators?: FrameGraphShadowGeneratorTask[];
    private _camera;
    /**
     * Gets or sets the camera used to render the objects.
     */
    get camera(): Camera;
    set camera(camera: Camera);
    /**
     * The list of objects to render.
     */
    objectList: FrameGraphObjectList;
    /**
     * If depth testing should be enabled (default is true).
     */
    depthTest: boolean;
    /**
     * If depth writing should be enabled (default is true).
     */
    depthWrite: boolean;
    /**
     * If shadows should be disabled (default is false).
     */
    disableShadows: boolean;
    /**
     * If image processing should be disabled (default is false).
     * false means that the default image processing configuration will be applied (the one from the scene)
     */
    disableImageProcessing: boolean;
    /**
     * Sets this property to true if this task is the main object renderer of the frame graph.
     * It will help to locate the main object renderer in the frame graph when multiple object renderers are used.
     * This is useful for the inspector to know which object renderer to use for additional rendering features like wireframe rendering or frustum light debugging.
     * It is also used to determine the main camera used by the frame graph: this is the camera used by the main object renderer.
     */
    isMainObjectRenderer: boolean;
    /**
     * The output texture.
     * This texture will point to the same texture than the targetTexture property if it is set.
     * Note, however, that the handle itself will be different!
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The output depth attachment texture.
     * This texture will point to the same texture than the depthTexture property if it is set.
     * Note, however, that the handle itself will be different!
     */
    readonly outputDepthTexture: FrameGraphTextureHandle;
    /**
     * The object renderer used to render the objects.
     */
    get objectRenderer(): ObjectRenderer;
    get name(): string;
    set name(value: string);
    protected readonly _scene: Scene;
    protected readonly _renderer: ObjectRenderer;
    protected _textureWidth: number;
    protected _textureHeight: number;
    protected _onBeforeRenderObservable: Nullable<Observer<number>>;
    protected _onAfterRenderObservable: Nullable<Observer<number>>;
    protected _externalObjectRenderer: boolean;
    /**
     * Constructs a new object renderer task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene the frame graph is associated with.
     * @param options The options of the object renderer.
     * @param existingObjectRenderer An existing object renderer to use (optional). If provided, the options parameter will be ignored.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, options?: ObjectRendererOptions, existingObjectRenderer?: ObjectRenderer);
    isReady(): boolean;
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
    dispose(): void;
    protected _setLightsForShadow(): void;
}
