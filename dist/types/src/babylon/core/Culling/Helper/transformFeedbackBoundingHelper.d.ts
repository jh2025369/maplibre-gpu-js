import type { ThinEngine } from "core/Engines/thinEngine";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { IBoundingInfoHelperPlatform } from "./IBoundingInfoHelperPlatform";
import "../../Shaders/gpuTransform.vertex";
import "../../Shaders/gpuTransform.fragment";
/** @internal */
export declare class TransformFeedbackBoundingHelper implements IBoundingInfoHelperPlatform {
    private static _Min;
    private static _Max;
    private _engine;
    private _buffers;
    private _effects;
    private _meshList;
    private _meshListCounter;
    /**
     * Creates a new TransformFeedbackBoundingHelper
     * @param engine defines the engine to use
     */
    constructor(engine: ThinEngine);
    /** @internal */
    processAsync(meshes: AbstractMesh | AbstractMesh[]): Promise<void>;
    private _processMeshList;
    private _compute;
    /** @internal */
    registerMeshListAsync(meshes: AbstractMesh | AbstractMesh[]): Promise<void>;
    /** @internal */
    processMeshList(): void;
    /** @internal */
    fetchResultsForMeshListAsync(): Promise<void>;
    /** @internal */
    dispose(): void;
}
