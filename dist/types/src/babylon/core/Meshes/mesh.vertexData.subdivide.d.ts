import { VertexData } from "./mesh.vertexData";
/**
 * Inspired by https://github.com/stevinz/three-subdivide
 * Thanks a lot to https://github.com/stevinz
 */
/**
 * Interface used to configure the subdivision process
 */
export interface ISubdivideOptions {
    /** Apply only flat subdivision - false by default */
    flatOnly?: boolean;
    /** Split all triangles at edges shared by coplanar triangles - true by default*/
    split?: boolean;
    /**  Should UV values be averaged during subdivision - false by default */
    uvSmooth?: boolean;
    /** Should edges / breaks in geometry be ignored during subdivision? - false by default */
    preserveEdges?: boolean;
    /** How much to weigh favoring heavy corners vs favoring Loop's formula - 1 by default*/
    weight?: number;
}
/**
 * Subdivide a vertexData using Loop algorithm
 * @param vertexData The vertexData to subdivide
 * @param level The number of times to subdivide
 * @param options The options to use when subdividing
 * @returns The subdivided vertexData
 */
export declare function Subdivide(vertexData: VertexData, level: number, options?: Partial<ISubdivideOptions>): VertexData;
