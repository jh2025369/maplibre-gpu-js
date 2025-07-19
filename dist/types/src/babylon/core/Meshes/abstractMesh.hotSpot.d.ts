import { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "./abstractMesh";
/**
 * Data for mesh hotspot computation
 */
export type HotSpotQuery = {
    /**
     * 3 point indices
     */
    pointIndex: [number, number, number];
    /**
     * 3 barycentric coordinates
     */
    barycentric: [number, number, number];
};
/**
 * Return a transformed local position from a mesh and vertex index
 * @param mesh mesh used to get vertex array from
 * @param index vertex index
 * @param res resulting local position
 * @returns false if it was not possible to compute the position for that vertex
 */
export declare function GetTransformedPosition(mesh: AbstractMesh, index: number, res: Vector3): boolean;
/**
 * Compute a world space hotspot position
 * TmpVectors.Vector3[0..4] are modified by this function. Do not use them as result output.
 * @param mesh mesh used to get hotspot from
 * @param hotSpotQuery point indices and barycentric
 * @param resPosition output world position
 * @param resNormal optional output world normal
 * @returns false if it was not possible to compute the hotspot position
 */
export declare function GetHotSpotToRef(mesh: AbstractMesh, hotSpotQuery: HotSpotQuery, resPosition: Vector3, resNormal?: Vector3): boolean;
