/**
 * A way to indentify a feature, either by string or by number
 */
export type GeoJSONFeatureId = number | string;
/**
 * The geojson source diff object
 */
export type GeoJSONSourceDiff = {
    /**
     * When set to `true` it will remove all features
     */
    removeAll?: boolean;
    /**
     * An array of features IDs to remove
     */
    remove?: Array<GeoJSONFeatureId>;
    /**
     * An array of features to add
     */
    add?: Array<GeoJSON.Feature>;
    /**
     * An array of update objects
     */
    update?: Array<GeoJSONFeatureDiff>;
};
/**
 * A geojson feature diff object
 */
export type GeoJSONFeatureDiff = {
    /**
     * The feature ID
     */
    id: GeoJSONFeatureId;
    /**
     * If it's a new geometry, place it here
     */
    newGeometry?: GeoJSON.Geometry;
    /**
     * Setting to `true` will remove all preperties
     */
    removeAllProperties?: boolean;
    /**
     * The properties keys to remove
     */
    removeProperties?: Array<string>;
    /**
     * The properties to add or update along side their values
     */
    addOrUpdateProperties?: Array<{
        key: string;
        value: any;
    }>;
};
export type UpdateableGeoJSON = GeoJSON.Feature | GeoJSON.FeatureCollection | undefined;
export declare function isUpdateableGeoJSON(data: GeoJSON.GeoJSON | undefined, promoteId?: string): data is UpdateableGeoJSON;
export declare function toUpdateable(data: UpdateableGeoJSON, promoteId?: string): Map<GeoJSONFeatureId, import("geojson").Feature<import("geojson").Geometry, {
    [name: string]: any;
}>>;
export declare function applySourceDiff(updateable: Map<GeoJSONFeatureId, GeoJSON.Feature>, diff: GeoJSONSourceDiff, promoteId?: string): void;
