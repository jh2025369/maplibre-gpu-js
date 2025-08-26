import type { IndicesArray } from "core/types";
/**
 * Sort (in place) the index array so that faces with common indices are close
 * @param indices the array of indices to sort
 */
export declare function OptimizeIndices(indices: IndicesArray): void;
