import { Mesh } from "./mesh";
import type { IDisposable, Scene } from "core/scene";
import { VertexData } from "./mesh.vertexData";
import type { Material } from "core/Materials/material";
/**
 * Interface to customize the Manifold library import
 */
export interface ICSG2Options {
    /**
     * Custom manifold URL
     */
    manifoldUrl?: string;
    /**
     * Custom manifold instance
     */
    manifoldInstance: any;
    /**
     * Custom manifold mesh instance
     */
    manifoldMeshInstance: any;
}
/**
 * Interface to customize the mesh rebuild options
 */
export interface IMeshRebuildOptions {
    /**
     * Rebuild normals
     */
    rebuildNormals?: boolean;
    /**
     * True to center the mesh on 0,0,0
     */
    centerMesh?: boolean;
    /**
     * Defines a material to use for that mesh. When not defined the system will either reuse the one from the source or create a multimaterial if several materials were involved
     */
    materialToUse?: Material;
}
/**
 * Interface to customize the vertex data rebuild options
 */
export interface IVertexDataRebuildOptions {
    /**
     * Rebuild normals
     */
    rebuildNormals?: boolean;
}
/**
 * Wrapper around the Manifold library
 * https://manifoldcad.org/
 * Use this class to perform fast boolean operations on meshes
 * #IW43EB#15 - basic operations
 * #JUKXQD#6104 - skull vs box
 * #JUKXQD#6111 - skull vs vertex data
 */
export declare class CSG2 implements IDisposable {
    private _manifold;
    private _numProp;
    private _vertexStructure;
    /**
     * Return the size of a vertex (at least 3 for the position)
     */
    get numProp(): number;
    private constructor();
    private _process;
    /**
     * Run a difference operation between two CSG
     * @param csg defines the CSG to use to create the difference
     * @returns a new csg
     */
    subtract(csg: CSG2): CSG2;
    /**
     * Run an intersection operation between two CSG
     * @param csg defines the CSG to use to create the intersection
     * @returns a new csg
     */
    intersect(csg: CSG2): CSG2;
    /**
     * Run an union operation between two CSG
     * @param csg defines the CSG to use to create the union
     * @returns a new csg
     */
    add(csg: CSG2): CSG2;
    /**
     * Print debug information about the CSG
     */
    printDebug(): void;
    /**
     * Generate a vertex data from the CSG
     * @param options defines the options to use to rebuild the vertex data
     * @returns a new vertex data
     */
    toVertexData(options?: Partial<IVertexDataRebuildOptions>): VertexData;
    /**
     * Generate a mesh from the CSG
     * @param name defines the name of the mesh
     * @param scene defines the scene to use to create the mesh
     * @param options defines the options to use to rebuild the mesh
     * @returns a new Mesh
     */
    toMesh(name: string, scene?: Scene, options?: Partial<IMeshRebuildOptions>): Mesh;
    /**
     * Dispose the CSG resources
     */
    dispose(): void;
    private static _ProcessData;
    private static _Construct;
    /**
     * Create a new Constructive Solid Geometry from a vertexData
     * @param vertexData defines the vertexData to use to create the CSG
     * @returns a new CSG2 class
     */
    static FromVertexData(vertexData: VertexData): CSG2;
    /**
     * Create a new Constructive Solid Geometry from a mesh
     * @param mesh defines the mesh to use to create the CSG
     * @param ignoreWorldMatrix defines if the world matrix should be ignored
     * @returns a new CSG2 class
     */
    static FromMesh(mesh: Mesh, ignoreWorldMatrix?: boolean): CSG2;
}
/**
 * Checks if the Manifold library is ready
 * @returns true if the Manifold library is ready
 */
export declare function IsCSG2Ready(): boolean;
/**
 * Initialize the Manifold library
 * @param options defines the options to use to initialize the library
 */
export declare function InitializeCSG2Async(options?: Partial<ICSG2Options>): Promise<void>;
