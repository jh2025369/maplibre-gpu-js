import Point from '@mapbox/point-geometry';
import { TransferableGridIndex } from '../util/transferable_grid_index';
import { DictionaryCoder } from '../util/dictionary_coder';
import { GeoJSONFeature } from '../util/vectortile_to_geojson';
import { OverscaledTileID } from '../source/tile_id';
import { SourceFeatureState } from '../source/source_state';
import { FeatureIndexArray } from './array_types.g';
import { mat4 } from 'gl-matrix';
import type { StyleLayer } from '../style/style_layer';
import type { FeatureFilter, FilterSpecification, PromoteIdSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { Transform } from '../geo/transform';
import type { VectorTileFeature, VectorTileLayer } from '@mapbox/vector-tile';
type QueryParameters = {
    scale: number;
    pixelPosMatrix: mat4;
    transform: Transform;
    tileSize: number;
    queryGeometry: Array<Point>;
    cameraQueryGeometry: Array<Point>;
    queryPadding: number;
    params: {
        filter: FilterSpecification;
        layers: Array<string>;
        availableImages: Array<string>;
    };
};
/**
 * An in memory index class to allow fast interaction with features
 */
export declare class FeatureIndex {
    tileID: OverscaledTileID;
    x: number;
    y: number;
    z: number;
    grid: TransferableGridIndex;
    grid3D: TransferableGridIndex;
    featureIndexArray: FeatureIndexArray;
    promoteId?: PromoteIdSpecification;
    rawTileData: ArrayBuffer;
    bucketLayerIDs: Array<Array<string>>;
    vtLayers: {
        [_: string]: VectorTileLayer;
    };
    sourceLayerCoder: DictionaryCoder;
    constructor(tileID: OverscaledTileID, promoteId?: PromoteIdSpecification | null);
    insert(feature: VectorTileFeature, geometry: Array<Array<Point>>, featureIndex: number, sourceLayerIndex: number, bucketIndex: number, is3D?: boolean): void;
    loadVTLayers(): {
        [_: string]: VectorTileLayer;
    };
    query(args: QueryParameters, styleLayers: {
        [_: string]: StyleLayer;
    }, serializedLayers: {
        [_: string]: any;
    }, sourceFeatureState: SourceFeatureState): {
        [_: string]: Array<{
            featureIndex: number;
            feature: GeoJSONFeature;
        }>;
    };
    loadMatchingFeature(result: {
        [_: string]: Array<{
            featureIndex: number;
            feature: GeoJSONFeature;
            intersectionZ?: boolean | number;
        }>;
    }, bucketIndex: number, sourceLayerIndex: number, featureIndex: number, filter: FeatureFilter, filterLayerIDs: Array<string>, availableImages: Array<string>, styleLayers: {
        [_: string]: StyleLayer;
    }, serializedLayers: {
        [_: string]: any;
    }, sourceFeatureState?: SourceFeatureState, intersectionTest?: (feature: VectorTileFeature, styleLayer: StyleLayer, featureState: any, id: string | number | void) => boolean | number): void;
    lookupSymbolFeatures(symbolFeatureIndexes: Array<number>, serializedLayers: {
        [_: string]: StyleLayer;
    }, bucketIndex: number, sourceLayerIndex: number, filterSpec: FilterSpecification, filterLayerIDs: Array<string>, availableImages: Array<string>, styleLayers: {
        [_: string]: StyleLayer;
    }): {};
    hasLayer(id: string): boolean;
    getId(feature: VectorTileFeature, sourceLayerId: string): string | number;
}
export {};
