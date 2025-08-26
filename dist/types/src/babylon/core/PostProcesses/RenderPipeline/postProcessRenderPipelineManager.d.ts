import type { Camera, IReadonlyObservable, PostProcessRenderPipeline } from "core/index";
/**
 * PostProcessRenderPipelineManager class
 * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/postProcessRenderPipeline
 */
export declare class PostProcessRenderPipelineManager {
    private readonly _renderPipelines;
    private readonly _onNewPipelineAddedObservable;
    private readonly _onPipelineRemovedObservable;
    /**
     * Initializes a PostProcessRenderPipelineManager
     * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/postProcessRenderPipeline
     */
    constructor();
    /**
     * An event triggered when a pipeline is added to the manager
     */
    get onNewPipelineAddedObservable(): IReadonlyObservable<PostProcessRenderPipeline>;
    /**
     * An event triggered when a pipeline is removed from the manager
     */
    get onPipelineRemovedObservable(): IReadonlyObservable<PostProcessRenderPipeline>;
    /**
     * Gets the list of supported render pipelines
     */
    get supportedPipelines(): PostProcessRenderPipeline[];
    /**
     * Adds a pipeline to the manager
     * @param renderPipeline The pipeline to add
     */
    addPipeline(renderPipeline: PostProcessRenderPipeline): void;
    /**
     * Remove the pipeline from the manager
     * @param renderPipelineName the name of the pipeline to remove
     */
    removePipeline(renderPipelineName: string): void;
    /**
     * Attaches a camera to the pipeline
     * @param renderPipelineName The name of the pipeline to attach to
     * @param cameras the camera to attach
     * @param unique if the camera can be attached multiple times to the pipeline
     */
    attachCamerasToRenderPipeline(renderPipelineName: string, cameras: Camera[] | Camera, unique?: boolean): void;
    /**
     * Detaches a camera from the pipeline
     * @param renderPipelineName The name of the pipeline to detach from
     * @param cameras the camera to detach
     */
    detachCamerasFromRenderPipeline(renderPipelineName: string, cameras: Camera[] | Camera): void;
    /**
     * Enables an effect by name on a pipeline
     * @param renderPipelineName the name of the pipeline to enable the effect in
     * @param renderEffectName the name of the effect to enable
     * @param cameras the cameras that the effect should be enabled on
     */
    enableEffectInPipeline(renderPipelineName: string, renderEffectName: string, cameras: Camera[] | Camera): void;
    /**
     * Disables an effect by name on a pipeline
     * @param renderPipelineName the name of the pipeline to disable the effect in
     * @param renderEffectName the name of the effect to disable
     * @param cameras the cameras that the effect should be disabled on
     */
    disableEffectInPipeline(renderPipelineName: string, renderEffectName: string, cameras: Camera[] | Camera): void;
    /**
     * Updates the state of all contained render pipelines and disposes of any non supported pipelines
     */
    update(): void;
    /** @internal */
    _rebuild(): void;
    /**
     * Disposes of the manager and pipelines
     */
    dispose(): void;
}
