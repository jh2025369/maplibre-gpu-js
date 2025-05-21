import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import { SubMesh } from "../subMesh";
import type { AbstractMesh } from "../abstractMesh";
import { Mesh } from "../mesh";
import "core/Meshes/thinInstanceMesh";
import type { Material } from "core/Materials/material";
/**
 * Representation of the types
 */
declare const enum PLYType {
    FLOAT = 0,
    INT = 1,
    UINT = 2,
    DOUBLE = 3,
    UCHAR = 4,
    UNDEFINED = 5
}
/**
 * Usage types of the PLY values
 */
declare const enum PLYValue {
    MIN_X = 0,
    MIN_Y = 1,
    MIN_Z = 2,
    MAX_X = 3,
    MAX_Y = 4,
    MAX_Z = 5,
    MIN_SCALE_X = 6,
    MIN_SCALE_Y = 7,
    MIN_SCALE_Z = 8,
    MAX_SCALE_X = 9,
    MAX_SCALE_Y = 10,
    MAX_SCALE_Z = 11,
    PACKED_POSITION = 12,
    PACKED_ROTATION = 13,
    PACKED_SCALE = 14,
    PACKED_COLOR = 15,
    X = 16,
    Y = 17,
    Z = 18,
    SCALE_0 = 19,
    SCALE_1 = 20,
    SCALE_2 = 21,
    DIFFUSE_RED = 22,
    DIFFUSE_GREEN = 23,
    DIFFUSE_BLUE = 24,
    OPACITY = 25,
    F_DC_0 = 26,
    F_DC_1 = 27,
    F_DC_2 = 28,
    F_DC_3 = 29,
    ROT_0 = 30,
    ROT_1 = 31,
    ROT_2 = 32,
    ROT_3 = 33,
    UNDEFINED = 34
}
/**
 * Property field found in PLY header
 */
export type PlyProperty = {
    /**
     * Value usage
     */
    value: PLYValue;
    /**
     * Value type
     */
    type: PLYType;
    /**
     * offset in byte from te beginning of the splat
     */
    offset: number;
};
/**
 * meta info on Splat file
 */
export interface PLYHeader {
    /**
     * number of splats
     */
    vertexCount: number;
    /**
     * number of spatial chunks for compressed ply
     */
    chunkCount: number;
    /**
     * length in bytes of the vertex info
     */
    rowVertexLength: number;
    /**
     * length in bytes of the chunk
     */
    rowChunkLength: number;
    /**
     * array listing properties per vertex
     */
    vertexProperties: PlyProperty[];
    /**
     * array listing properties per chunk
     */
    chunkProperties: PlyProperty[];
    /**
     * data view for parsing chunks and vertices
     */
    dataView: DataView;
    /**
     * buffer for the data view
     */
    buffer: ArrayBuffer;
}
/**
 * Class used to render a gaussian splatting mesh
 */
export declare class GaussianSplattingMesh extends Mesh {
    private _vertexCount;
    private _worker;
    private _frameIdLastUpdate;
    private _modelViewMatrix;
    private _depthMix;
    private _canPostToWorker;
    private _readyToDisplay;
    private _covariancesATexture;
    private _covariancesBTexture;
    private _centersTexture;
    private _colorsTexture;
    private _splatPositions;
    private _splatIndex;
    private _covariancesA;
    private _covariancesB;
    private _colors;
    private readonly _keepInRam;
    private _delayedTextureUpdate;
    private _oldDirection;
    private _useRGBACovariants;
    private _material;
    private _tmpCovariances;
    private _sortIsDirty;
    private static _RowOutputLength;
    private static _SH_C0;
    private static _SplatBatchSize;
    private static _PlyConversionBatchSize;
    /**
     * Set the number of batch (a batch is 16384 splats) after which a display update is performed
     * A value of 0 (default) means display update will not happens before splat is ready.
     */
    static ProgressiveUpdateAmount: number;
    /**
     * Gets the covariancesA texture
     */
    get covariancesATexture(): BaseTexture;
    /**
     * Gets the covariancesB texture
     */
    get covariancesBTexture(): BaseTexture;
    /**
     * Gets the centers texture
     */
    get centersTexture(): BaseTexture;
    /**
     * Gets the colors texture
     */
    get colorsTexture(): BaseTexture;
    /**
     * set rendering material
     */
    set material(value: Material);
    /**
     * get rendering material
     */
    get material(): Nullable<Material>;
    /**
     * Creates a new gaussian splatting mesh
     * @param name defines the name of the mesh
     * @param url defines the url to load from (optional)
     * @param scene defines the hosting scene (optional)
     * @param keepInRam keep datas in ram for editing purpose
     */
    constructor(name: string, url?: Nullable<string>, scene?: Nullable<Scene>, keepInRam?: boolean);
    /**
     * Returns the class name
     * @returns "GaussianSplattingMesh"
     */
    getClassName(): string;
    /**
     * Returns the total number of vertices (splats) within the mesh
     * @returns the total number of vertices
     */
    getTotalVertices(): number;
    /**
     * Is this node ready to be used/rendered
     * @param completeCheck defines if a complete check (including materials and lights) has to be done (false by default)
     * @returns true when ready
     */
    isReady(completeCheck?: boolean): boolean;
    /** @internal */
    _postToWorker(forced?: boolean): void;
    /**
     * Triggers the draw call for the mesh. Usually, you don't need to call this method by your own because the mesh rendering is handled by the scene rendering manager
     * @param subMesh defines the subMesh to render
     * @param enableAlphaMode defines if alpha mode can be changed
     * @param effectiveMeshReplacement defines an optional mesh used to provide info for the rendering
     * @returns the current mesh
     */
    render(subMesh: SubMesh, enableAlphaMode: boolean, effectiveMeshReplacement?: AbstractMesh): Mesh;
    private static _TypeNameToEnum;
    private static _ValueNameToEnum;
    /**
     * Parse a PLY file header and returns metas infos on splats and chunks
     * @param data the loaded buffer
     * @returns a PLYHeader
     */
    static ParseHeader(data: ArrayBuffer): PLYHeader | null;
    private static _GetCompressedChunks;
    private static _GetSplat;
    /**
     * Converts a .ply data array buffer to splat
     * if data array buffer is not ply, returns the original buffer
     * @param data the .ply data to load
     * @param useCoroutine use coroutine and yield
     * @returns the loaded splat buffer
     */
    static ConvertPLYToSplat(data: ArrayBuffer, useCoroutine?: boolean): Generator<any, ArrayBuffer, unknown>;
    /**
     * Converts a .ply data array buffer to splat
     * if data array buffer is not ply, returns the original buffer
     * @param data the .ply data to load
     * @returns the loaded splat buffer
     */
    static ConvertPLYToSplatAsync(data: ArrayBuffer): Promise<ArrayBuffer>;
    /**
     * Loads a .splat Gaussian Splatting array buffer asynchronously
     * @param data arraybuffer containing splat file
     * @returns a promise that resolves when the operation is complete
     */
    loadDataAsync(data: ArrayBuffer): Promise<void>;
    /**
     * Loads a .splat Gaussian or .ply Splatting file asynchronously
     * @param url path to the splat file to load
     * @returns a promise that resolves when the operation is complete
     * @deprecated Please use SceneLoader.ImportMeshAsync instead
     */
    loadFileAsync(url: string): Promise<void>;
    /**
     * Releases resources associated with this mesh.
     * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
     */
    dispose(doNotRecurse?: boolean): void;
    private _copyTextures;
    /**
     * Returns a new Mesh object generated from the current mesh properties.
     * @param name is a string, the name given to the new mesh
     * @returns a new Gaussian Splatting Mesh
     */
    clone(name?: string): GaussianSplattingMesh;
    private static _CreateWorker;
    private _makeSplat;
    private _updateTextures;
    private _updateData;
    /**
     * Update asynchronously the buffer
     * @param data array buffer containing center, color, orientation and scale of splats
     * @returns a promise
     */
    updateDataAsync(data: ArrayBuffer): Promise<void>;
    /**
     * @experimental
     * Update data from GS (position, orientation, color, scaling)
     * @param data array that contain all the datas
     */
    updateData(data: ArrayBuffer): void;
    private _updateSplatIndexBuffer;
    private _updateSubTextures;
    private _instanciateWorker;
    private _getTextureSize;
}
export {};
