import { ShaderLanguage } from "core/Materials/shaderLanguage";
import { ShaderMaterial } from "core/Materials/shaderMaterial";
import type { IVector2Like } from "core/Maths/math.like";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Nullable } from "core/types";
/**
 * Class used to store the result of a GPU picking operation
 */
export interface IGPUPickingInfo {
    /**
     * Picked mesh
     */
    mesh: AbstractMesh;
    /**
     * Picked thin instance index
     */
    thinInstanceIndex?: number;
}
/**
 * Stores the result of a multi GPU piciking operation
 */
export interface IGPUMultiPickingInfo {
    /**
     * Picked mesh
     */
    meshes: Nullable<AbstractMesh>[];
    /**
     * Picked thin instance index
     */
    thinInstanceIndexes?: number[];
}
/**
 * Class used to perform a picking operation using GPU
 * GPUPIcker can pick meshes, instances and thin instances
 */
export declare class GPUPicker {
    private _pickingTexture;
    private _idMap;
    private _thinIdMap;
    private _idColors;
    private _cachedScene;
    private _engine;
    private _defaultRenderMaterial;
    private _pickableMeshes;
    private _meshMaterialMap;
    private _readbuffer;
    private _meshRenderingCount;
    private readonly _attributeName;
    /** Shader language used by the generator */
    protected _shaderLanguage: ShaderLanguage;
    private static _TempColor;
    /**
     * Gets the shader language used in this generator.
     */
    get shaderLanguage(): ShaderLanguage;
    private _pickingInProgress;
    /**
     * Gets a boolean indicating if the picking is in progress
     */
    get pickingInProgress(): boolean;
    private static _IdToRgb;
    private _getColorIdFromReadBuffer;
    private static _SetColorData;
    private _createRenderTarget;
    private _createColorMaterialAsync;
    private _materialBindCallback;
    private _generateColorData;
    private _generateThinInstanceColorData;
    /**
     * Set the list of meshes to pick from
     * Set that value to null to clear the list (and avoid leaks)
     * The module will read and delete from the array provided by reference. Disposing the module or setting the value to null will clear the array.
     * @param list defines the list of meshes to pick from
     */
    setPickingList(list: Nullable<Array<AbstractMesh | {
        mesh: AbstractMesh;
        material: ShaderMaterial;
    }>>): void;
    /**
     * Execute a picking operation
     * @param x defines the X coordinates where to run the pick
     * @param y defines the Y coordinates where to run the pick
     * @param disposeWhenDone defines a boolean indicating we do not want to keep resources alive (false by default)
     * @returns A promise with the picking results
     */
    pickAsync(x: number, y: number, disposeWhenDone?: boolean): Promise<Nullable<IGPUPickingInfo>>;
    /**
     * Execute a picking operation on multiple coordinates
     * @param xy defines the X,Y coordinates where to run the pick
     * @param disposeWhenDone defines a boolean indicating we do not want to keep resources alive (false by default)
     * @returns A promise with the picking results. Always returns an array with the same length as the number of coordinates. The mesh or null at the index where no mesh was picked.
     */
    multiPickAsync(xy: IVector2Like[], disposeWhenDone?: boolean): Promise<Nullable<IGPUMultiPickingInfo>>;
    private _prepareForPicking;
    private _preparePickingBuffer;
    private _executePicking;
    private _executeMultiPicking;
    private _enableScissor;
    private _disableScissor;
    /**
     * @returns true if rendering if the picking texture has finished, otherwise false
     */
    private _checkRenderStatus;
    private _getMeshFromMultiplePoints;
    /**
     * Updates the render list with the current pickable meshes.
     */
    private _updateRenderList;
    private _readTexturePixelsAsync;
    /** Release the resources */
    dispose(): void;
}
