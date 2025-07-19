import { StyleLayer } from '../style_layer';
import { CircleBucket } from '../../data/bucket/circle_bucket';
import { CircleLayoutPropsPossiblyEvaluated, CirclePaintPropsPossiblyEvaluated } from './circle_style_layer_properties.g';
import { Transitionable, Transitioning, Layout, PossiblyEvaluated } from '../properties';
import { mat4 } from 'gl-matrix';
import Point from '@mapbox/point-geometry';
import type { FeatureState, LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { Transform } from '../../geo/transform';
import type { Bucket, BucketParameters } from '../../data/bucket';
import type { CircleLayoutProps, CirclePaintProps } from './circle_style_layer_properties.g';
import type { VectorTileFeature } from '@mapbox/vector-tile';
/**
 * A style layer that defines a circle
 */
export declare class CircleStyleLayer extends StyleLayer {
    _unevaluatedLayout: Layout<CircleLayoutProps>;
    layout: PossiblyEvaluated<CircleLayoutProps, CircleLayoutPropsPossiblyEvaluated>;
    _transitionablePaint: Transitionable<CirclePaintProps>;
    _transitioningPaint: Transitioning<CirclePaintProps>;
    paint: PossiblyEvaluated<CirclePaintProps, CirclePaintPropsPossiblyEvaluated>;
    constructor(layer: LayerSpecification);
    createBucket(parameters: BucketParameters<any>): CircleBucket<any>;
    queryRadius(bucket: Bucket): number;
    queryIntersectsFeature(queryGeometry: Array<Point>, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelsToTileUnits: number, pixelPosMatrix: mat4): boolean;
}
