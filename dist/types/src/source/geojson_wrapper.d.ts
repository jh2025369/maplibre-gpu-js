import type { VectorTileFeature, VectorTileLayer, VectorTile } from '@mapbox/vector-tile';
import type { TileFeature, AnyProps } from 'supercluster';
import type { Feature as GeoJSONVTFeature } from 'geojson-vt';
export type Feature = TileFeature<AnyProps, AnyProps> | GeoJSONVTFeature;
export declare class GeoJSONWrapper implements VectorTile, VectorTileLayer {
    layers: {
        [_: string]: VectorTileLayer;
    };
    name: string;
    extent: number;
    length: number;
    _features: Array<Feature>;
    constructor(features: Array<Feature>);
    feature(i: number): VectorTileFeature;
}
