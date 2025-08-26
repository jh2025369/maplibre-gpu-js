import type { SourceCache } from './source_cache';
import type { StyleLayer } from '../style/style_layer';
import type { CollisionIndex } from '../symbol/collision_index';
import type { Transform } from '../geo/transform';
import type { RetainedQueryData } from '../symbol/placement';
import type { FilterSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { MapGeoJSONFeature } from '../util/vectortile_to_geojson';
import type Point from '@mapbox/point-geometry';
/**
 * Options to pass to query the map for the rendered features
 */
export type QueryRenderedFeaturesOptions = {
    /**
     * An array of [style layer IDs](https://maplibre.org/maplibre-style-spec/#layer-id) for the query to inspect.
     * Only features within these layers will be returned. If this parameter is undefined, all layers will be checked.
     */
    layers?: Array<string>;
    /**
     * A [filter](https://maplibre.org/maplibre-style-spec/layers/#filter) to limit query results.
     */
    filter?: FilterSpecification;
    /**
     * An array of string representing the available images
     */
    availableImages?: Array<string>;
    /**
     * Whether to check if the [options.filter] conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
     */
    validate?: boolean;
};
/**
 * The options object related to the {@link Map#querySourceFeatures} method
 */
export type QuerySourceFeatureOptions = {
    /**
     * The name of the source layer to query. *For vector tile sources, this parameter is required.* For GeoJSON sources, it is ignored.
     */
    sourceLayer?: string;
    /**
     * A [filter](https://maplibre.org/maplibre-style-spec/layers/#filter)
     * to limit query results.
     */
    filter?: FilterSpecification;
    /**
     * Whether to check if the [parameters.filter] conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
     * @defaultValue true
     */
    validate?: boolean;
};
export declare function queryRenderedFeatures(sourceCache: SourceCache, styleLayers: {
    [_: string]: StyleLayer;
}, serializedLayers: {
    [_: string]: any;
}, queryGeometry: Array<Point>, params: QueryRenderedFeaturesOptions, transform: Transform): {
    [key: string]: Array<{
        featureIndex: number;
        feature: MapGeoJSONFeature;
    }>;
};
export declare function queryRenderedSymbols(styleLayers: {
    [_: string]: StyleLayer;
}, serializedLayers: {
    [_: string]: StyleLayer;
}, sourceCaches: {
    [_: string]: SourceCache;
}, queryGeometry: Array<Point>, params: QueryRenderedFeaturesOptions, collisionIndex: CollisionIndex, retainedQueryData: {
    [_: number]: RetainedQueryData;
}): {};
export declare function querySourceFeatures(sourceCache: SourceCache, params: QuerySourceFeatureOptions): any[];
