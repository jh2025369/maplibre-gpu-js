import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { AbstractEngine } from "core/Engines/abstractEngine";
/**
 * Utility class to help with bounding info management
 * Warning: using the BoundingInfoHelper class may be slower than executing calculations on the CPU!
 * This will happen if there are a lot of meshes / few vertices (like with the BrainStem model)
 * The BoundingInfoHelper will perform better if there are few meshes / a lot of vertices
 * #BCNJD4#56 =\> does not use the BoundingInfoHelper class, performs calculations on the CPU
 * #BCNJD4#55 =\> same as #56 but use the BoundingInfoHelper class
 * #BCNJD4#40 =\> example with bones and morphs (webGL2)
 * #BCNJD4#42 =\> example with bones and morphs (webGPU)
 * #HPV2TZ#475 =\> only morph (webGL2)
 * #HPV2TZ#476 =\> only morph (webGPU)
 * #B8B8Z2#51 =\> Large scale test (CPU) =\> for each mesh, this test calculates a bounding box which is the union of the bounding boxes of all the frames in a given animation
 * #B8B8Z2#49 =\> Large scale test (webGL2)
 * #B8B8Z2#50 =\> Large scale test (webGPU)
 */
export declare class BoundingInfoHelper {
    private _platform;
    private _engine;
    /**
     * Creates a new BoundingInfoHelper
     * @param engine defines the engine to use
     */
    constructor(engine: AbstractEngine);
    private _initializePlatform;
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
