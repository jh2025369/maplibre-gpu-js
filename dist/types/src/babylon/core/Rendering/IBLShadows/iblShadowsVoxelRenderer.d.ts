import { RenderTargetTexture } from "../../Materials/Textures/renderTargetTexture";
import { Matrix } from "../../Maths/math.vector";
import type { Mesh } from "../../Meshes/mesh";
import type { Scene } from "../../scene";
import { Observable } from "../../Misc/observable";
import { PostProcess } from "../../PostProcesses/postProcess";
import { ProceduralTexture } from "../../Materials/Textures/Procedurals/proceduralTexture";
import type { IblShadowsRenderPipeline } from "./iblShadowsRenderPipeline";
/**
 * Voxel-based shadow rendering for IBL's.
 * This should not be instanciated directly, as it is part of a scene component
 * @internal
 * @see https://playground.babylonjs.com/#8R5SSE#222
 */
export declare class _IblShadowsVoxelRenderer {
    private _scene;
    private _engine;
    private _voxelGridRT;
    private _voxelGridXaxis;
    private _voxelGridYaxis;
    private _voxelGridZaxis;
    private _voxelMrtsXaxis;
    private _voxelMrtsYaxis;
    private _voxelMrtsZaxis;
    private _isVoxelGrid3D;
    private _voxelMaterial;
    private _voxelSlabDebugMaterial;
    /**
     * Return the voxel grid texture.
     * @returns The voxel grid texture.
     */
    getVoxelGrid(): ProceduralTexture | RenderTargetTexture;
    /**
     * Observable that triggers when the voxelization is complete
     */
    onVoxelizationCompleteObservable: Observable<void>;
    /**
     * The debug pass post process
     * @returns The debug pass post process
     */
    getDebugPassPP(): PostProcess;
    private _maxDrawBuffers;
    private _renderTargets;
    private _triPlanarVoxelization;
    /**
     * Whether to use tri-planar voxelization. More expensive, but can help with artifacts.
     */
    get triPlanarVoxelization(): boolean;
    /**
     * Whether to use tri-planar voxelization. More expensive, but can help with artifacts.
     */
    set triPlanarVoxelization(enabled: boolean);
    private _voxelizationInProgress;
    private _invWorldScaleMatrix;
    /**
     * Set the matrix to use for scaling the world space to voxel space
     * @param matrix The matrix to use for scaling the world space to voxel space
     */
    setWorldScaleMatrix(matrix: Matrix): void;
    /**
     * @returns Whether voxelization is currently happening.
     */
    isVoxelizationInProgress(): boolean;
    private _voxelResolution;
    private _voxelResolutionExp;
    /**
     * Resolution of the voxel grid. The final resolution will be 2^resolutionExp.
     */
    get voxelResolutionExp(): number;
    /**
     * Resolution of the voxel grid. The final resolution will be 2^resolutionExp.
     */
    set voxelResolutionExp(resolutionExp: number);
    private _copyMipEffectRenderer;
    private _copyMipEffectWrapper;
    private _mipArray;
    private _voxelSlabDebugRT;
    private _voxelDebugPass;
    private _voxelDebugEnabled;
    /**
     * Shows only the voxels that were rendered along a particular axis (while using triPlanarVoxelization).
     * If not set, the combined voxel grid will be shown.
     * Note: This only works when the debugMipNumber is set to 0 because we don't generate mips for each axis.
     * @param axis The axis to show (0 = x, 1 = y, 2 = z)
     */
    set voxelDebugAxis(axis: number);
    get voxelDebugAxis(): number;
    private _voxelDebugAxis;
    private _debugSizeParams;
    private _includedMeshes;
    /**
     * Sets params that control the position and scaling of the debug display on the screen.
     * @param x Screen X offset of the debug display (0-1)
     * @param y Screen Y offset of the debug display (0-1)
     * @param widthScale X scale of the debug display (0-1)
     * @param heightScale Y scale of the debug display (0-1)
     */
    setDebugDisplayParams(x: number, y: number, widthScale: number, heightScale: number): void;
    private _debugMipNumber;
    /**
     * The mip level to show in the debug display
     * @param mipNum The mip level to show in the debug display
     */
    setDebugMipNumber(mipNum: number): void;
    private _debugPassName;
    /**
     * Sets the name of the debug pass
     */
    get debugPassName(): string;
    /**
     * Enable or disable the debug view for this pass
     */
    get voxelDebugEnabled(): boolean;
    set voxelDebugEnabled(enabled: boolean);
    private _setDebugBindingsBound;
    /**
     * Creates the debug post process effect for this pass
     */
    private _createDebugPass;
    /**
     * Instanciates the voxel renderer
     * @param scene Scene to attach to
     * @param iblShadowsRenderPipeline The render pipeline this pass is associated with
     * @param resolutionExp Resolution of the voxel grid. The final resolution will be 2^resolutionExp.
     * @param triPlanarVoxelization Whether to use tri-planar voxelization. More expensive, but can help with artifacts.
     * @returns The voxel renderer
     */
    constructor(scene: Scene, iblShadowsRenderPipeline: IblShadowsRenderPipeline, resolutionExp?: number, triPlanarVoxelization?: boolean);
    private _generateMipMaps;
    private _generateMipMap;
    private _copyMipMaps;
    private _copyMipMap;
    private _computeNumberOfSlabs;
    private _createTextures;
    private _createVoxelMRTs;
    private _disposeVoxelTextures;
    private _createVoxelMaterials;
    private _setDebugBindings;
    /**
     * Checks if the voxel renderer is ready to voxelize scene
     * @returns true if the voxel renderer is ready to voxelize scene
     */
    isReady(): boolean;
    /**
     * If the MRT's are already in the list of render targets, this will
     * remove them so that they don't get rendered again.
     */
    private _stopVoxelization;
    private _removeVoxelRTs;
    /**
     * Renders voxel grid of scene for IBL shadows
     * @param includedMeshes
     */
    updateVoxelGrid(includedMeshes: Mesh[]): void;
    private _renderVoxelGridBound;
    private _renderVoxelGrid;
    private _addRTsForRender;
    /**
     * Called by the pipeline to resize resources.
     */
    resize(): void;
    /**
     * Disposes the voxel renderer and associated resources
     */
    dispose(): void;
}
