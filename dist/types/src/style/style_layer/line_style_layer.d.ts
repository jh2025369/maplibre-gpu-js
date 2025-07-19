import Point from '@mapbox/point-geometry';
import { StyleLayer } from '../style_layer';
import { LineBucket } from '../../data/bucket/line_bucket';
import { LineLayoutPropsPossiblyEvaluated, LinePaintPropsPossiblyEvaluated } from './line_style_layer_properties.g';
import { EvaluationParameters } from '../evaluation_parameters';
import { Transitionable, Transitioning, Layout, PossiblyEvaluated, DataDrivenProperty } from '../properties';
import type { FeatureState, LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { Bucket, BucketParameters } from '../../data/bucket';
import type { LineLayoutProps, LinePaintProps } from './line_style_layer_properties.g';
import type { Transform } from '../../geo/transform';
import type { VectorTileFeature } from '@mapbox/vector-tile';
export declare class LineFloorwidthProperty extends DataDrivenProperty<number> {
    useIntegerZoom: true;
    possiblyEvaluate(value: any, parameters: any): import("../properties").PossiblyEvaluatedPropertyValue<number>;
    evaluate(value: any, globals: any, feature: any, featureState: any): number;
}
export declare class LineStyleLayer extends StyleLayer {
    _unevaluatedLayout: Layout<LineLayoutProps>;
    layout: PossiblyEvaluated<LineLayoutProps, LineLayoutPropsPossiblyEvaluated>;
    gradientVersion: number;
    stepInterpolant: boolean;
    _transitionablePaint: Transitionable<LinePaintProps>;
    _transitioningPaint: Transitioning<LinePaintProps>;
    paint: PossiblyEvaluated<LinePaintProps, LinePaintPropsPossiblyEvaluated>;
    constructor(layer: LayerSpecification);
    _handleSpecialPaintPropertyUpdate(name: string): void;
    gradientExpression(): import("@maplibre/maplibre-gl-style-spec").StylePropertyExpression;
    recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
    createBucket(parameters: BucketParameters<any>): LineBucket;
    queryRadius(bucket: Bucket): number;
    queryIntersectsFeature(queryGeometry: Array<Point>, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelsToTileUnits: number): boolean;
    isTileClipped(): boolean;
}
