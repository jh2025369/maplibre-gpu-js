import { Vector3, Vector2 } from "./math.vector";
/**
 * Contains position and normal vectors for a vertex
 */
export declare class PositionNormalVertex {
    /** [Vector3.Zero()] the position of the vertex (defaut: 0,0,0) */
    position: Vector3;
    /** [Vector3.Up()] the normal of the vertex (defaut: 0,1,0) */
    normal: Vector3;
    /**
     * Creates a PositionNormalVertex
     * @param position the position of the vertex (defaut: 0,0,0)
     * @param normal the normal of the vertex (defaut: 0,1,0)
     */
    constructor(
    /** [Vector3.Zero()] the position of the vertex (defaut: 0,0,0) */
    position?: Vector3, 
    /** [Vector3.Up()] the normal of the vertex (defaut: 0,1,0) */
    normal?: Vector3);
    /**
     * Clones the PositionNormalVertex
     * @returns the cloned PositionNormalVertex
     */
    clone(): PositionNormalVertex;
}
/**
 * Contains position, normal and uv vectors for a vertex
 */
export declare class PositionNormalTextureVertex {
    /** [Vector3.Zero()] the position of the vertex (defaut: 0,0,0) */
    position: Vector3;
    /** [Vector3.Up()] the normal of the vertex (defaut: 0,1,0) */
    normal: Vector3;
    /** [Vector3.Zero()] the uv of the vertex (default: 0,0) */
    uv: Vector2;
    /**
     * Creates a PositionNormalTextureVertex
     * @param position the position of the vertex (defaut: 0,0,0)
     * @param normal the normal of the vertex (defaut: 0,1,0)
     * @param uv the uv of the vertex (default: 0,0)
     */
    constructor(
    /** [Vector3.Zero()] the position of the vertex (defaut: 0,0,0) */
    position?: Vector3, 
    /** [Vector3.Up()] the normal of the vertex (defaut: 0,1,0) */
    normal?: Vector3, 
    /** [Vector3.Zero()] the uv of the vertex (default: 0,0) */
    uv?: Vector2);
    /**
     * Clones the PositionNormalTextureVertex
     * @returns the cloned PositionNormalTextureVertex
     */
    clone(): PositionNormalTextureVertex;
}
