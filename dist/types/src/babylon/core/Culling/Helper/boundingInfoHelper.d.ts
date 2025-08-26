import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { AbstractEngine } from "core/Engines/abstractEngine";
/**
 * Utility class to help with bounding info management
 * Warning: using the BoundingInfoHelper class may be slower than executing calculations on the CPU!
 * This will happen if there are a lot of meshes / few vertices (like with the BrainStem model)
 * The BoundingInfoHelper will perform better if there are few meshes / a lot of vertices
 *  https://playground.babylonjs.com/#QPOERJ#9 : WebGL
 *  https://playground.babylonjs.com/#QPOERJ#10 : WebGPU
 */
export declare class BoundingInfoHelper {
    private _platform;
    private _engine;
    /**
     * Creates a new BoundingInfoHelper
     * @param engine defines the engine to use
     */
    constructor(engine: AbstractEngine);
    private _initializePlatformAsync;
    /**
     * Compute the bounding info of a mesh / array of meshes using shaders
     * @param target defines the mesh(es) to update
     * @returns a promise that resolves when the bounding info is/are computed
     */
    computeAsync(target: AbstractMesh | AbstractMesh[]): Promise<void>;
    /**
     * Register a mesh / array of meshes to be processed per batch
     * This method must be called before calling batchProcess (which can be called several times) and batchFetchResultsAsync
     * @param target defines the mesh(es) to be processed per batch
     * @returns a promise that resolves when the initialization is done
     */
    batchInitializeAsync(target: AbstractMesh | AbstractMesh[]): Promise<void>;
    /**
     * Processes meshes registered with batchRegisterAsync
     * If called multiple times, the second, third, etc calls will perform a union of the bounding boxes calculated in the previous calls
     */
    batchProcess(): void;
    /**
     * Update the bounding info of the meshes registered with batchRegisterAsync, after batchProcess has been called once or several times
     * @returns a promise that resolves when the bounding info is/are computed
     */
    batchFetchResultsAsync(): Promise<void>;
    /**
     * Dispose and release associated resources
     */
    dispose(): void;
}
