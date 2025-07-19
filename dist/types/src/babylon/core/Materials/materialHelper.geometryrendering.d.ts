import type { MaterialDefines } from "core/Materials/materialDefines";
import type { Effect } from "core/Materials/effect";
import type { Mesh } from "core/Meshes/mesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import { Matrix } from "core/Maths/math.vector";
/**
 * Type of clear operation to perform on a geometry texture.
 */
export declare const enum GeometryRenderingTextureClearType {
    /**
     * Clear the texture with zero.
     */
    Zero = 0,
    /**
     * Clear the texture with one.
     */
    One = 1,
    /**
     * Clear the texture with the maximum view Z value.
     */
    MaxViewZ = 2
}
/**
 * Configuration for geometry rendering.
 * A configuration is created for each rendering pass a geometry rendering is used in.
 */
export type GeometryRenderingConfiguration = {
    /**
     * Defines used for the geometry rendering.
     */
    defines: {
        [name: string]: number;
    };
    /**
     * Previous world matrices for meshes.
     */
    previousWorldMatrices: {
        [index: number]: Matrix;
    };
    /**
     * Previous view projection matrix.
     */
    previousViewProjection: Matrix;
    /**
     * Current view projection matrix.
     */
    currentViewProjection: Matrix;
    /**
     * Previous bones for skinned meshes.
     */
    previousBones: {
        [index: number]: Float32Array;
    };
    /**
     * Last frame id the configuration was updated.
     */
    lastUpdateFrameId: number;
    /**
     * List of excluded skinned meshes.
     */
    excludedSkinnedMesh: AbstractMesh[];
};
/**
 * Helper class to manage geometry rendering.
 */
export declare class MaterialHelperGeometryRendering {
    /**
     * Descriptions of the geometry textures.
     */
    static readonly GeometryTextureDescriptions: {
        type: number;
        name: string;
        clearType: GeometryRenderingTextureClearType;
        define: string;
        defineIndex: string;
    }[];
    private static _Configurations;
    /**
     * Creates a new geometry rendering configuration.
     * @param renderPassId Render pass id the configuration is created for.
     * @returns The created configuration.
     */
    static CreateConfiguration(renderPassId: number): GeometryRenderingConfiguration;
    /**
     * Deletes a geometry rendering configuration.
     * @param renderPassId The render pass id of the configuration to delete.
     */
    static DeleteConfiguration(renderPassId: number): void;
    /**
     * Gets a geometry rendering configuration.
     * @param renderPassId The render pass id of the configuration to get.
     * @returns The configuration.
     */
    static GetConfiguration(renderPassId: number): GeometryRenderingConfiguration;
    /**
     * Adds uniforms and samplers for geometry rendering.
     * @param uniforms The array of uniforms to add to.
     * @param _samplers The array of samplers to add to.
     */
    static AddUniformsAndSamplers(uniforms: string[], _samplers: string[]): void;
    /**
     * Marks a list of meshes as dirty for geometry rendering.
     * @param renderPassId The render pass id the meshes are marked as dirty for.
     * @param meshes The list of meshes to mark as dirty.
     */
    static MarkAsDirty(renderPassId: number, meshes: AbstractMesh[]): void;
    /**
     * Prepares defines for geometry rendering.
     * @param renderPassId The render pass id the defines are prepared for.
     * @param mesh The mesh the defines are prepared for.
     * @param defines The defines to update according to the geometry rendering configuration.
     */
    static PrepareDefines(renderPassId: number, mesh: AbstractMesh, defines: MaterialDefines): void;
    /**
     * Binds geometry rendering data for a mesh.
     * @param renderPassId The render pass id the geometry rendering data is bound for.
     * @param effect The effect to bind the geometry rendering data to.
     * @param mesh The mesh to bind the geometry rendering data for.
     * @param world The world matrix of the mesh.
     */
    static Bind(renderPassId: number, effect: Effect, mesh: Mesh, world: Matrix): void;
}
