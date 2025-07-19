import type { IBoundingInfoHelperPlatform } from "./IBoundingInfoHelperPlatform";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import "../../ShadersWGSL/boundingInfo.compute";
/** @internal */
export declare class ComputeShaderBoundingHelper implements IBoundingInfoHelperPlatform {
    private _engine;
    private _computeShadersCache;
    private _positionBuffers;
    private _indexBuffers;
    private _weightBuffers;
    private _indexExtraBuffers;
    private _weightExtraBuffers;
    private _morphTargetInfluenceBuffers;
    private _morphTargetTextureIndexBuffers;
    private _ubos;
    private _uboIndex;
    private _processedMeshes;
    private _computeShaders;
    private _uniqueComputeShaders;
    private _resultBuffers;
    /**
     * Creates a new ComputeShaderBoundingHelper
     * @param engine defines the engine to use
     */
    constructor(engine: AbstractEngine);
    private _getComputeShader;
    private _getUBO;
    private _extractDataAndLink;
    private _prepareStorage;
    /** @internal */
    processAsync(meshes: AbstractMesh | AbstractMesh[]): Promise<void>;
    /** @internal */
    registerMeshListAsync(meshes: AbstractMesh | AbstractMesh[]): Promise<void>;
    /** @internal */
    processMeshList(): void;
    /** @internal */
    fetchResultsForMeshListAsync(): Promise<void>;
    private _disposeCache;
    private _disposeForMeshList;
    /** @internal */
    dispose(): void;
}
