import type { Mesh } from "../../Meshes/mesh";
import type { Scene } from "../../scene";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import { Texture } from "../../Materials/Textures/texture";
import { PostProcessRenderPipeline } from "../../PostProcesses/RenderPipeline/postProcessRenderPipeline";
import type { Camera } from "core/Cameras/camera";
import { RawTexture } from "core/Materials/Textures/rawTexture";
import type { Material } from "core/Materials/material";
import { Observable } from "core/Misc/observable";
interface IblShadowsSettings {
    /**
     * The exponent of the resolution of the voxel shadow grid. Higher resolutions will result in sharper
     * shadows but are more expensive to compute and require more memory.
     * The resolution is calculated as 2 to the power of this number.
     */
    resolutionExp?: number;
    /**
     * The number of different directions to sample during the voxel tracing pass. Higher
     * values will result in better quality, more stable shadows but are more expensive to compute.
     */
    sampleDirections?: number;
    /**
     * How dark the shadows are. 1.0 is full opacity, 0.0 is no shadows.
     */
    shadowOpacity?: number;
    /**
     * The global Y-axis rotation of the IBL for shadows. This should match the Y-rotation of the environment map applied to materials, skybox, etc.
     */
    envRotation?: number;
    /**
     * A factor that controls how long the shadows remain in the scene.
     * 0.0 is no persistence, 1.0 is full persistence.
     * This value applies only while the camera is moving. Once stationary, the pipeline
     * increases remanence automatically to help the shadows converge.
     */
    shadowRemanence?: number;
    /**
     * Render the voxel grid from 3 different axis. This will result in better quality shadows with fewer
     * bits of missing geometry.
     */
    triPlanarVoxelization?: boolean;
    /**
     * A size multiplier for the internal shadow render targets (default 1.0). A value of 1.0 represents full-resolution.
     * Scaling this below 1.0 will result in blurry shadows and potentially more artifacts but
     * could help increase performance on less powerful GPU's.
     */
    shadowRenderSizeFactor?: number;
    /**
     * Separate control for the opacity of the voxel shadows.
     */
    voxelShadowOpacity?: number;
    /**
     * Include screen-space shadows in the IBL shadow pipeline. This adds sharp shadows to small details
     * but only applies close to a shadow-casting object.
     */
    ssShadowsEnabled?: boolean;
    /**
     * The number of samples used in the screen space shadow pass.
     */
    ssShadowSampleCount?: number;
    /**
     * The stride of the screen-space shadow pass. This controls the distance between samples
     * in pixels.
     */
    ssShadowStride?: number;
    /**
     * A scale for the maximum distance a screen-space shadow can be cast in world-space.
     * The maximum distance that screen-space shadows cast is derived from the voxel size
     * and this value so shouldn't need to change if you scale your scene.
     */
    ssShadowDistanceScale?: number;
    /**
     * Screen-space shadow thickness scale. This value controls the assumed thickness of
     * on-screen surfaces in world-space. It scales with the size of the shadow-casting
     * region so shouldn't need to change if you scale your scene.
     */
    ssShadowThicknessScale?: number;
}
/**
 * Voxel-based shadow rendering for IBL's.
 * This should not be instanciated directly, as it is part of a scene component
 */
export declare class IblShadowsRenderPipeline extends PostProcessRenderPipeline {
    /**
     * The scene that this pipeline is attached to
     */
    scene: Scene;
    private _allowDebugPasses;
    private _debugPasses;
    private _geometryBufferRenderer;
    private _shadowCastingMeshes;
    private _voxelRenderer;
    private _importanceSamplingRenderer;
    private _voxelTracingPass;
    private _spatialBlurPass;
    private _accumulationPass;
    private _noiseTexture;
    /**
     * Raw texture to be used before final data is available.
     * @internal
     */
    _dummyTexture2d: RawTexture;
    private _dummyTexture3d;
    private _shadowOpacity;
    private _enabled;
    private _materialsWithRenderPlugin;
    /**
     * Observable that triggers when the shadow renderer is ready
     */
    onShadowTextureReadyObservable: Observable<void>;
    /**
     * Observable that triggers when a new IBL is set and the importance sampling is ready
     */
    onNewIblReadyObservable: Observable<void>;
    /**
     * The current world-space size of that the voxel grid covers in the scene.
     */
    voxelGridSize: number;
    /**
     * Reset the shadow accumulation. This has a similar affect to lowering the remanence for a single frame.
     * This is useful when making a sudden change to the IBL.
     */
    resetAccumulation(): void;
    /**
     * How dark the shadows appear. 1.0 is full opacity, 0.0 is no shadows.
     */
    get shadowOpacity(): number;
    set shadowOpacity(value: number);
    private _renderSizeFactor;
    /**
     * A multiplier for the render size of the shadows. Used for rendering lower-resolution shadows.
     */
    get shadowRenderSizeFactor(): number;
    set shadowRenderSizeFactor(value: number);
    /**
     * How dark the voxel shadows appear. 1.0 is full opacity, 0.0 is no shadows.
     */
    get voxelShadowOpacity(): number;
    set voxelShadowOpacity(value: number);
    /**
     * How dark the screen-space shadows appear. 1.0 is full opacity, 0.0 is no shadows.
     */
    get ssShadowOpacity(): number;
    set ssShadowOpacity(value: number);
    /**
     * The number of samples used in the screen space shadow pass.
     */
    get ssShadowSampleCount(): number;
    set ssShadowSampleCount(value: number);
    /**
     * The stride of the screen-space shadow pass. This controls the distance between samples
     * in pixels.
     */
    get ssShadowStride(): number;
    set ssShadowStride(value: number);
    private _sssMaxDistScale;
    /**
     * A scale for the maximum distance a screen-space shadow can be cast in world-space.
     * The maximum distance that screen-space shadows cast is derived from the voxel size
     * and this value so shouldn't need to change if you scale your scene
     */
    get ssShadowDistanceScale(): number;
    set ssShadowDistanceScale(value: number);
    private _sssThicknessScale;
    /**
     * Screen-space shadow thickness scale. This value controls the assumed thickness of
     * on-screen surfaces in world-space. It scales with the size of the shadow-casting
     * region so shouldn't need to change if you scale your scene.
     */
    get ssShadowThicknessScale(): number;
    set ssShadowThicknessScale(value: number);
    /**
     * Set the IBL image to be used for shadowing. It can be either a cubemap
     * or a 2D equirectangular texture.
     * @param iblSource The texture to use for IBL shadowing
     */
    setIblTexture(iblSource: BaseTexture): void;
    /**
     * Returns the texture containing the voxel grid data
     * @returns The texture containing the voxel grid data
     * @internal
     */
    _getVoxelGridTexture(): Texture;
    /**
     * Returns the texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @returns The texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @internal
     */
    _getIcdfyTexture(): Texture;
    /**
     * Returns the texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @returns The texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @internal
     */
    _getIcdfxTexture(): Texture;
    /**
     * Returns the noise texture.
     * @returns The noise texture.
     * @internal
     */
    _getNoiseTexture(): Texture;
    /**
     * Returns the voxel-tracing texture.
     * @returns The voxel-tracing texture.
     * @internal
     */
    _getVoxelTracingTexture(): Texture;
    /**
     * Returns the spatial blur texture.
     * @returns The spatial blur texture.
     * @internal
     */
    _getSpatialBlurTexture(): Texture;
    /**
     * Returns the accumulated shadow texture.
     * @returns The accumulated shadow texture.
     * @internal
     */
    _getAccumulatedTexture(): Texture;
    private _gbufferDebugPass;
    private _gbufferDebugEnabled;
    private _gBufferDebugSizeParams;
    /**
     * Turn on or off the debug view of the G-Buffer. This will display only the targets
     * of the g-buffer that are used by the shadow pipeline.
     */
    get gbufferDebugEnabled(): boolean;
    set gbufferDebugEnabled(enabled: boolean);
    /**
     * Turn on or off the debug view of the CDF importance sampling data
     */
    get importanceSamplingDebugEnabled(): boolean;
    /**
     * Turn on or off the debug view of the CDF importance sampling data
     */
    set importanceSamplingDebugEnabled(enabled: boolean);
    /**
     * This displays the voxel grid in slices spread across the screen.
     * It also displays what slices of the model are stored in each layer
     * of the voxel grid. Each red stripe represents one layer while each gradient
     * (from bright red to black) represents the layers rendered in a single draw call.
     */
    get voxelDebugEnabled(): boolean;
    set voxelDebugEnabled(enabled: boolean);
    /**
     * When using tri-planar voxelization (the default), this value can be used to
     * display only the voxelization result for that axis. z-axis = 0, y-axis = 1, x-axis = 2
     */
    get voxelDebugAxis(): number;
    set voxelDebugAxis(axisNum: number);
    /**
     * Displays a given mip of the voxel grid. `voxelDebugAxis` must be undefined in this
     * case because we only generate mips for the combined voxel grid.
     */
    set voxelDebugDisplayMip(mipNum: number);
    /**
     * Display the debug view for just the shadow samples taken this frame.
     */
    get voxelTracingDebugEnabled(): boolean;
    set voxelTracingDebugEnabled(enabled: boolean);
    /**
     * Display the debug view for the spatial blur pass
     */
    get spatialBlurPassDebugEnabled(): boolean;
    set spatialBlurPassDebugEnabled(enabled: boolean);
    /**
     * Display the debug view for the shadows accumulated over time.
     */
    get accumulationPassDebugEnabled(): boolean;
    set accumulationPassDebugEnabled(enabled: boolean);
    /**
     * Add a mesh to be used for shadow-casting in the IBL shadow pipeline.
     * These meshes will be written to the voxel grid.
     * @param mesh A mesh or list of meshes that you want to cast shadows
     */
    addShadowCastingMesh(mesh: Mesh | Mesh[]): void;
    /**
     * Remove a mesh from the shadow-casting list. The mesh will no longer be written
     * to the voxel grid and will not cast shadows.
     * @param mesh The mesh or list of meshes that you don't want to cast shadows.
     */
    removeShadowCastingMesh(mesh: Mesh | Mesh[]): void;
    /**
     * The exponent of the resolution of the voxel shadow grid. Higher resolutions will result in sharper
     * shadows but are more expensive to compute and require more memory.
     * The resolution is calculated as 2 to the power of this number.
     */
    get resolutionExp(): number;
    set resolutionExp(newResolution: number);
    /**
     * The number of different directions to sample during the voxel tracing pass
     */
    get sampleDirections(): number;
    /**
     * The number of different directions to sample during the voxel tracing pass
     */
    set sampleDirections(value: number);
    /**
     * The decree to which the shadows persist between frames. 0.0 is no persistence, 1.0 is full persistence.
     **/
    get shadowRemanence(): number;
    /**
     * The decree to which the shadows persist between frames. 0.0 is no persistence, 1.0 is full persistence.
     **/
    set shadowRemanence(value: number);
    /**
     * The global Y-axis rotation of the IBL for shadows. This should match the Y-rotation of the environment map applied to materials, skybox, etc.
     */
    get envRotation(): number;
    /**
     * The global Y-axis rotation of the IBL for shadows. This should match the Y-rotation of the environment map applied to materials, skybox, etc.
     */
    set envRotation(value: number);
    /**
     * Allow debug passes to be enabled. Default is false.
     */
    get allowDebugPasses(): boolean;
    /**
     * Allow debug passes to be enabled. Default is false.
     */
    set allowDebugPasses(value: boolean);
    /**
     *  Support test.
     */
    static get IsSupported(): boolean;
    /**
     * Toggle the shadow tracing on or off
     * @param enabled Toggle the shadow tracing on or off
     */
    toggleShadow(enabled: boolean): void;
    /**
     * Trigger the scene to be re-voxelized. This should be run when any shadow-casters have been added, removed or moved.
     */
    updateVoxelization(): void;
    /**
     * Trigger the scene bounds of shadow-casters to be calculated. This is the world size that the voxel grid will cover and will always be a cube.
     */
    updateSceneBounds(): void;
    /**
     * @param name The rendering pipeline name
     * @param scene The scene linked to this pipeline
     * @param options Options to configure the pipeline
     * @param cameras Cameras to apply the pipeline to.
     */
    constructor(name: string, scene: Scene, options?: Partial<IblShadowsSettings>, cameras?: Camera[]);
    private _handleResize;
    private _getGBufferDebugPass;
    private _createDebugPasses;
    private _disposeEffectPasses;
    private _disposeDebugPasses;
    private _updateDebugPasses;
    /**
     * Update the SS shadow max distance and thickness based on the voxel grid size and resolution.
     * The max distance should be just a little larger than the world size of a single voxel.
     */
    private _updateSSShadowParams;
    /**
     * Apply the shadows to a material or array of materials. If no material is provided, all
     * materials in the scene will be added.
     * @param material Material that will be affected by the shadows. If not provided, all materials of the scene will be affected.
     */
    addShadowReceivingMaterial(material?: Material | Material[]): void;
    /**
     * Remove a material from the list of materials that receive shadows. If no material
     * is provided, all materials in the scene will be removed.
     * @param material The material or array of materials that will no longer receive shadows
     */
    removeShadowReceivingMaterial(material: Material | Material[]): void;
    protected _addShadowSupportToMaterial(material: Material): void;
    protected _setPluginParameters(): void;
    private _updateBeforeRender;
    private _listenForCameraChanges;
    /**
     * Checks if the IBL shadow pipeline is ready to render shadows
     * @returns true if the IBL shadow pipeline is ready to render the shadows
     */
    isReady(): boolean;
    /**
     * Get the class name
     * @returns "IBLShadowsRenderPipeline"
     */
    getClassName(): string;
    /**
     * Disposes the IBL shadow pipeline and associated resources
     */
    dispose(): void;
}
export {};
