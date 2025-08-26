import type { FrameGraph, FrameGraphTextureHandle, Scene, AbstractEngine, ThinEffectLayer, FrameGraphRenderPass, FrameGraphRenderContext } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { FrameGraphObjectRendererTask } from "../Rendering/objectRendererTask";
import { FrameGraphClearTextureTask } from "../Texture/clearTextureTask";
import { FrameGraphBlurTask } from "../PostProcesses/blurTask";
import { FrameGraphPostProcessTask } from "../PostProcesses/postProcessTask";
import { ThinGlowBlurPostProcess } from "../../../Layers/thinEffectLayer";
declare class FrameGraphGlowBlurTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinGlowBlurPostProcess;
    /**
     * Constructs a new glow blur task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param thinPostProcess The thin post process to use for the glow blur effect. If not provided, a new one will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinGlowBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
/**
 * @internal
 */
export declare class FrameGraphBaseLayerTask extends FrameGraphTask {
    private _setRenderTargetDepth;
    private _notifyBlurObservable;
    /**
     * The target texture to apply the effect layer to.
     * The effect will be blended with the contents of this texture.
     */
    targetTexture: FrameGraphTextureHandle;
    /**
     * The object renderer task used to render the objects in the texture to which the layer will be applied.
     * This is needed because the layer may have to inject code in the rendering manager used by object renderer task.
     */
    objectRendererTask: FrameGraphObjectRendererTask;
    /**
     * The layer texture to render the effect into.
     * If not provided, a default texture will be created.
     */
    layerTexture?: FrameGraphTextureHandle;
    /**
     * The output texture of the task (same as targetTexture, but the handle will be different).
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The layer object. Use this object to update the layer properties.
     */
    readonly layer: ThinEffectLayer;
    /**
     * The name of the task.
     */
    get name(): string;
    set name(name: string);
    protected readonly _scene: Scene;
    protected readonly _engine: AbstractEngine;
    protected readonly _clearLayerTextures: FrameGraphClearTextureTask;
    protected readonly _objectRendererForLayer: FrameGraphObjectRendererTask;
    protected readonly _blurX: Array<FrameGraphBlurTask | FrameGraphGlowBlurTask>;
    protected readonly _blurY: Array<FrameGraphBlurTask | FrameGraphGlowBlurTask>;
    private readonly _onBeforeBlurTask;
    private readonly _onAfterBlurTask;
    private _onBeforeObservableObserver;
    private _onAfterObservableObserver;
    private _onAfterRenderingGroupObserver;
    /**
     * Constructs a new layer task.
     * @param name Name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param scene The scene to render the layer in.
     * @param layer The layer.
     * @param numBlurPasses The number of blur passes applied by the layer.
     * @param useCustomBlur If true, the layer will use a custom blur post process instead of the default one.
     * @param _setRenderTargetDepth If true, the task will set the render target depth.
     * @param _notifyBlurObservable If true, the task will notify before and after blurring occurs.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, layer: ThinEffectLayer, numBlurPasses: number, useCustomBlur?: boolean, _setRenderTargetDepth?: boolean, _notifyBlurObservable?: boolean);
    isReady(): boolean;
    record(): void;
    private _clearAfterRenderingGroupObserver;
    dispose(): void;
}
export {};
