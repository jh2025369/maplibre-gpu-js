import type { VectorTileFeature } from '@mapbox/vector-tile';
import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
/**
 * A helper for type to omit a property from a type
 */
type DistributiveKeys<T> = T extends T ? keyof T : never;
/**
 * A helper for type to omit a property from a type
 */
type DistributiveOmit<T, K extends DistributiveKeys<T>> = T extends unknown ? Omit<T, K> : never;
/**
 * An extended geojson feature used by the events to return data to the listener
 */
export type MapGeoJSONFeature = GeoJSONFeature & {
    layer: DistributiveOmit<LayerSpecification, 'source'> & {
        source: string;
    };
    source: string;
    sourceLayer?: string;
    state: {
        [key: string]: any;
    };
};
/**
 * A geojson feature
 */
export declare class GeoJSONFeature {
    type: 'Feature';
    _geometry: GeoJSON.Geometry;
    properties: {
        [name: string]: any;
    };
    id: number | string | undefined;
    _vectorTileFeature: VectorTileFeature;
    constructor(vectorTileFeature: VectorTileFeature, z: number, x: number, y: number, id: string | number | undefined);
    get geometry(): GeoJSON.Geometry;
    set geometry(g: GeoJSON.Geometry);
    toJSON(): any;
}
export {};
