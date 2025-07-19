import type { AbstractMesh, EffectLayer, Scene } from "core/index";
/**
 * Options for the snapshot rendering helper
 */
export interface SnapshotRenderingHelpersOptions {
    /**
     * Maximum number of influences for morph target managers
     * In FAST snapshot mode, the number of influences must be fixed and cannot change from one frame to the next.
     * morphTargetsNumMaxInfluences is the maximum number of non-zero influences allowed in a morph target manager.
     * The final value defined for a morph target manager is: Math.min(morphTargetManager.numTargets, morphTargetsNumMaxInfluences)
     * Default: 20
     */
    morphTargetsNumMaxInfluences?: number;
}
/**
 * A helper class to simplify work with FAST snapshot mode (WebGPU only - can be used in WebGL too, but won't do anything).
 */
export declare class SnapshotRenderingHelper {
    private readonly _engine;
    private readonly _scene;
    private readonly _options;
    private readonly _onBeforeRenderObserver;
    private _onBeforeRenderObserverUpdateLayer;
    private readonly _onResizeObserver;
    private _disableRenderingRefCount;
    private _currentPerformancePriorityMode;
    private _pendingCurrentPerformancePriorityMode?;
    /**
     * Creates a new snapshot rendering helper
     * Note that creating an instance of the helper will set the snapshot rendering mode to SNAPSHOTRENDERING_FAST but will not enable snapshot rendering (engine.snapshotRendering is not updated).
     * Note also that fixMeshes() is called as part of the construction
     * @param scene The scene to use the helper in
     * @param options The options for the helper
     */
    constructor(scene: Scene, options?: SnapshotRenderingHelpersOptions);
    /**
     * Enable snapshot rendering
     * Use this method instead of engine.snapshotRendering=true, to make sure everything is ready before enabling snapshot rendering.
     * Note that this method is ref-counted and works in pair with disableSnapshotRendering(): you should call enableSnapshotRendering() as many times as you call disableSnapshotRendering().
     */
    enableSnapshotRendering(): void;
    /**
     * Disable snapshot rendering
     * Note that this method is ref-counted and works in pair with disableSnapshotRendering(): you should call enableSnapshotRendering() as many times as you call disableSnapshotRendering().
     */
    disableSnapshotRendering(): void;
    /**
     * Fix meshes for snapshot rendering.
     * This method will make sure that some features are disabled or fixed to make sure snapshot rendering works correctly.
     * @param meshes List of meshes to fix. If not provided, all meshes in the scene will be fixed.
     */
    fixMeshes(meshes?: AbstractMesh[]): void;
    /**
     * Call this method to update a mesh on the GPU after some properties have changed (position, rotation, scaling, visibility).
     * @param mesh The mesh to update. Can be a single mesh or an array of meshes to update.
     */
    updateMesh(mesh: AbstractMesh | AbstractMesh[]): void;
    /**
     * Update the meshes used in an effect layer to ensure that snapshot rendering works correctly for these meshes in this layer.
     * @param effectLayer The effect layer
     * @param autoUpdate If true, the helper will automatically update the effect layer meshes with each frame. If false, you'll need to call this method manually when the camera or layer meshes move or rotate.
     */
    updateMeshesForEffectLayer(effectLayer: EffectLayer, autoUpdate?: boolean): void;
    /**
     * Dispose the helper
     */
    dispose(): void;
    private get _fastSnapshotRenderingEnabled();
    private _updateMeshMatricesForRenderPassId;
    private _executeAtFrame;
}
