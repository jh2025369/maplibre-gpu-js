import { StyleLayer } from '../style_layer';
import { FillBucket } from '../../data/bucket/fill_bucket';
import { FillLayoutPropsPossiblyEvaluated, FillPaintPropsPossiblyEvaluated } from './fill_style_layer_properties.g';
import { Transitionable, Transitioning, Layout, PossiblyEvaluated } from '../properties';
import type { FeatureState, LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { BucketParameters } from '../../data/bucket';
import type Point from '@mapbox/point-geometry';
import type { FillLayoutProps, FillPaintProps } from './fill_style_layer_properties.g';
import type { EvaluationParameters } from '../evaluation_parameters';
import type { Transform } from '../../geo/transform';
import type { VectorTileFeature } from '@mapbox/vector-tile';
export declare class FillStyleLayer extends StyleLayer {
    _unevaluatedLayout: Layout<FillLayoutProps>;
    layout: PossiblyEvaluated<FillLayoutProps, FillLayoutPropsPossiblyEvaluated>;
    _transitionablePaint: Transitionable<FillPaintProps>;
    _transitioningPaint: Transitioning<FillPaintProps>;
    paint: PossiblyEvaluated<FillPaintProps, FillPaintPropsPossiblyEvaluated>;
    constructor(layer: LayerSpecification);
    recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
    createBucket(parameters: BucketParameters<any>): FillBucket;
    queryRadius(): number;
    queryIntersectsFeature(queryGeometry: Array<Point>, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelsToTileUnits: number): boolean;
    isTileClipped(): boolean;
}
