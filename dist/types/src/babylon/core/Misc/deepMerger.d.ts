/**
 * Merges a series of objects into a single object, deeply.
 * @param objects The objects to merge (objects later in the list take precedence).
 * @returns The merged object.
 */
export declare function deepMerge<T extends object>(...objects: T[]): T;
