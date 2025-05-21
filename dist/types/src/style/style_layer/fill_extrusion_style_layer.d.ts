import { StyleLayer } from '../style_layer';
import { FillExtrusionBucket } from '../../data/bucket/fill_extrusion_bucket';
import { FillExtrusionPaintPropsPossiblyEvaluated } from './fill_extrusion_style_layer_properties.g';
import { Transitionable, Transitioning, PossiblyEvaluated } from '../properties';
import { mat4 } from 'gl-matrix';
import Point from '@mapbox/point-geometry';
import type { FeatureState, LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { BucketParameters } from '../../data/bucket';
import type { FillExtrusionPaintProps } from './fill_extrusion_style_layer_properties.g';
import type { Transform } from '../../geo/transform';
import type { VectorTileFeature } from '@mapbox/vector-tile';
export declare class Point3D extends Point {
    z: number;
}
export declare class FillExtrusionStyleLayer extends StyleLayer {
    _transitionablePaint: Transitionable<FillExtrusionPaintProps>;
    _transitioningPaint: Transitioning<FillExtrusionPaintProps>;
    paint: PossiblyEvaluated<FillExtrusionPaintProps, FillExtrusionPaintPropsPossiblyEvaluated>;
    constructor(layer: LayerSpecification);
    createBucket(parameters: BucketParameters<FillExtrusionStyleLayer>): FillExtrusionBucket;
    queryRadius(): number;
    is3D(): boolean;
    queryIntersectsFeature(queryGeometry: Array<Point>, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelsToTileUnits: number, pixelPosMatrix: mat4): boolean | number;
}
export declare function getIntersectionDistance(projectedQueryGeometry: Array<Point3D>, projectedFace: Array<Point3D>): number;
