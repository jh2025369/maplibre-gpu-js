import type { FrameGraphTextureHandle, FrameGraph, Scene } from "core/index";
import { CascadedShadowGenerator } from "../../../Lights/Shadows/cascadedShadowGenerator";
import { FrameGraphShadowGeneratorTask } from "./shadowGeneratorTask";
import { DepthTextureType, ThinMinMaxReducer } from "../../../Misc/thinMinMaxReducer";
/**
 * Task used to generate a cascaded shadow map from a list of objects.
 */
export declare class FrameGraphCascadedShadowGeneratorTask extends FrameGraphShadowGeneratorTask {
    protected _shadowGenerator: CascadedShadowGenerator | undefined;
    /**
     * Checks if a shadow generator task is a cascaded shadow generator task.
     * @param task The task to check.
     * @returns True if the task is a cascaded shadow generator task, else false.
     */
    static IsCascadedShadowGenerator(task: FrameGraphShadowGeneratorTask): task is FrameGraphCascadedShadowGeneratorTask;
    /**
     * The depth texture used by the autoCalcDepthBounds feature (optional if autoCalcDepthBounds is set to false)
     * This texture is used to compute the min/max depth bounds of the scene to setup the cascaded shadow generator.
     * Warning: Do not set a texture if you are not using the autoCalcDepthBounds feature, to avoid generating a depth texture that will not be used.
     */
    depthTexture?: FrameGraphTextureHandle;
    /**
     * The type of the depth texture used by the autoCalcDepthBounds feature.
     */
    depthTextureType: DepthTextureType;
    private _numCascades;
    /**
     * The number of cascades.
     */
    get numCascades(): number;
    set numCascades(value: number);
    private _debug;
    /**
     * Gets or sets a value indicating whether the shadow generator should display the cascades.
     */
    get debug(): boolean;
    set debug(value: boolean);
    private _stabilizeCascades;
    /**
     * Gets or sets a value indicating whether the shadow generator should stabilize the cascades.
     */
    get stabilizeCascades(): boolean;
    set stabilizeCascades(value: boolean);
    private _lambda;
    /**
     * Gets or sets the lambda parameter of the shadow generator.
     */
    get lambda(): number;
    set lambda(value: number);
    private _cascadeBlendPercentage;
    /**
     * Gets or sets the cascade blend percentage.
     */
    get cascadeBlendPercentage(): number;
    set cascadeBlendPercentage(value: number);
    private _depthClamp;
    /**
     * Gets or sets a value indicating whether the shadow generator should use depth clamping.
     */
    get depthClamp(): boolean;
    set depthClamp(value: boolean);
    private _autoCalcDepthBounds;
    /**
     * Gets or sets a value indicating whether the shadow generator should automatically calculate the depth bounds.
     */
    get autoCalcDepthBounds(): boolean;
    set autoCalcDepthBounds(value: boolean);
    private _currentAutoCalcDepthBoundsCounter;
    private _autoCalcDepthBoundsRefreshRate;
    /**
     * Defines the refresh rate of the min/max computation used when autoCalcDepthBounds is set to true
     * Use 0 to compute just once, 1 to compute on every frame, 2 to compute every two frames and so on...
     */
    get autoCalcDepthBoundsRefreshRate(): number;
    set autoCalcDepthBoundsRefreshRate(value: number);
    private _shadowMaxZ;
    /**
     * Gets or sets the maximum shadow Z value.
     */
    get shadowMaxZ(): number;
    set shadowMaxZ(value: number);
    protected readonly _thinMinMaxReducer: ThinMinMaxReducer;
    /**
     * Creates a new shadow generator task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene to create the shadow generator for.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    protected _createShadowGenerator(): void;
    protected _setupShadowGenerator(): void;
    record(): void;
    dispose(): void;
}
