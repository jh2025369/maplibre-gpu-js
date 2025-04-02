import type { Scene } from "../../scene";
import { Matrix } from "../../Maths/math.vector";
import { PostProcess } from "../../PostProcesses/postProcess";
import type { IblShadowsRenderPipeline } from "./iblShadowsRenderPipeline";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
/**
 * Build cdf maps for IBL importance sampling during IBL shadow computation.
 * This should not be instanciated directly, as it is part of a scene component
 * @internal
 */
export declare class _IblShadowsVoxelTracingPass {
    private _scene;
    private _engine;
    private _renderPipeline;
    private _voxelShadowOpacity;
    /**
     * The opacity of the shadow cast from the voxel grid
     */
    get voxelShadowOpacity(): number;
    /**
     * The opacity of the shadow cast from the voxel grid
     */
    set voxelShadowOpacity(value: number);
    private _sssSamples;
    private _sssStride;
    private _sssMaxDist;
    private _sssThickness;
    private _ssShadowOpacity;
    /**
     * The opacity of the screen-space shadow
     */
    get ssShadowOpacity(): number;
    /**
     * The opacity of the screen-space shadow
     */
    set ssShadowOpacity(value: number);
    /**
     * The number of samples used in the screen space shadow pass.
     */
    get sssSamples(): number;
    /**
     * The number of samples used in the screen space shadow pass.
     */
    set sssSamples(value: number);
    /**
     * The stride used in the screen space shadow pass. This controls the distance between samples.
     */
    get sssStride(): number;
    /**
     * The stride used in the screen space shadow pass. This controls the distance between samples.
     */
    set sssStride(value: number);
    /**
     * The maximum distance that the screen-space shadow will be able to occlude.
     */
    get sssMaxDist(): number;
    /**
     * The maximum distance that the screen-space shadow will be able to occlude.
     */
    set sssMaxDist(value: number);
    /**
     * The thickness of the screen-space shadow
     */
    get sssThickness(): number;
    /**
     * The thickness of the screen-space shadow
     */
    set sssThickness(value: number);
    private _outputTexture;
    private _cameraInvView;
    private _cameraInvProj;
    private _invWorldScaleMatrix;
    private _frameId;
    private _sampleDirections;
    private _shadowParameters;
    private _sssParameters;
    private _opacityParameters;
    private _voxelBiasParameters;
    private _voxelNormalBias;
    /**
     * The bias to apply to the voxel sampling in the direction of the surface normal of the geometry.
     */
    get voxelNormalBias(): number;
    set voxelNormalBias(value: number);
    private _voxelDirectionBias;
    /**
     * The bias to apply to the voxel sampling in the direction of the light.
     */
    get voxelDirectionBias(): number;
    set voxelDirectionBias(value: number);
    /**
     * Is the effect enabled
     */
    enabled: boolean;
    /**
     * The number of directions to sample for the voxel tracing.
     */
    get sampleDirections(): number;
    /**
     * The number of directions to sample for the voxel tracing.
     */
    set sampleDirections(value: number);
    /**
     * The current rotation of the environment map, in radians.
     */
    get envRotation(): number;
    /**
     * The current rotation of the environment map, in radians.
     */
    set envRotation(value: number);
    /** Enable the debug view for this pass */
    debugEnabled: boolean;
    /**
     * Returns the output texture of the pass.
     * @returns The output texture.
     */
    getOutputTexture(): ProceduralTexture;
    /**
     * Gets the debug pass post process. This will create the resources for the pass
     * if they don't already exist.
     * @returns The post process
     */
    getDebugPassPP(): PostProcess;
    private _debugPassName;
    /**
     * The name of the debug pass
     */
    get debugPassName(): string;
    /** The default rotation of the environment map will align the shadows with the default lighting orientation */
    private _envRotation;
    /**
     * Set the matrix to use for scaling the world space to voxel space
     * @param matrix The matrix to use for scaling the world space to voxel space
     */
    setWorldScaleMatrix(matrix: Matrix): void;
    private _debugVoxelMarchEnabled;
    private _debugPassPP;
    private _debugSizeParams;
    /**
     * Sets params that control the position and scaling of the debug display on the screen.
     * @param x Screen X offset of the debug display (0-1)
     * @param y Screen Y offset of the debug display (0-1)
     * @param widthScale X scale of the debug display (0-1)
     * @param heightScale Y scale of the debug display (0-1)
     */
    setDebugDisplayParams(x: number, y: number, widthScale: number, heightScale: number): void;
    /**
     * Creates the debug post process effect for this pass
     */
    private _createDebugPass;
    /**
     * Instantiates the shadow voxel-tracing pass
     * @param scene Scene to attach to
     * @param iblShadowsRenderPipeline The IBL shadows render pipeline
     * @returns The shadow voxel-tracing pass
     */
    constructor(scene: Scene, iblShadowsRenderPipeline: IblShadowsRenderPipeline);
    private _createTextures;
    private _setBindings;
    /**
     * Called by render pipeline when canvas resized.
     * @param scaleFactor The factor by which to scale the canvas size.
     */
    resize(scaleFactor?: number): void;
    /**
     * Checks if the pass is ready
     * @returns true if the pass is ready
     */
    isReady(): boolean;
    /**
     * Disposes the associated resources
     */
    dispose(): void;
}
