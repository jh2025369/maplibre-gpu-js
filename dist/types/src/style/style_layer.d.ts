import { Evented } from '../util/evented';
import { Layout, Transitionable, Transitioning, Properties } from './properties';
import type { Bucket } from '../data/bucket';
import type Point from '@mapbox/point-geometry';
import type { FeatureFilter, FeatureState, LayerSpecification, FilterSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { TransitionParameters, PropertyValue } from './properties';
import { EvaluationParameters } from './evaluation_parameters';
import type { CrossfadeParameters } from './evaluation_parameters';
import type { Transform } from '../geo/transform';
import type { CustomLayerInterface } from './style_layer/custom_style_layer';
import type { Map } from '../ui/map';
import type { StyleSetterOptions } from './style';
import { mat4 } from 'gl-matrix';
import type { VectorTileFeature } from '@mapbox/vector-tile';
/**
 * A base class for style layers
 */
export declare abstract class StyleLayer extends Evented {
    id: string;
    metadata: unknown;
    type: LayerSpecification['type'] | CustomLayerInterface['type'];
    source: string;
    sourceLayer: string;
    minzoom: number;
    maxzoom: number;
    filter: FilterSpecification | void;
    visibility: 'visible' | 'none' | void;
    _crossfadeParameters: CrossfadeParameters;
    _unevaluatedLayout: Layout<any>;
    readonly layout: unknown;
    _transitionablePaint: Transitionable<any>;
    _transitioningPaint: Transitioning<any>;
    readonly paint: unknown;
    _featureFilter: FeatureFilter;
    readonly onAdd: ((map: Map) => void);
    readonly onRemove: ((map: Map) => void);
    queryRadius?(bucket: Bucket): number;
    queryIntersectsFeature?(queryGeometry: Array<Point>, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelsToTileUnits: number, pixelPosMatrix: mat4): boolean | number;
    constructor(layer: LayerSpecification | CustomLayerInterface, properties: Readonly<{
        layout?: Properties<any>;
        paint?: Properties<any>;
    }>);
    getCrossfadeParameters(): CrossfadeParameters;
    getLayoutProperty(name: string): any;
    setLayoutProperty(name: string, value: any, options?: StyleSetterOptions): void;
    getPaintProperty(name: string): unknown;
    setPaintProperty(name: string, value: unknown, options?: StyleSetterOptions): boolean;
    _handleSpecialPaintPropertyUpdate(_: string): void;
    _handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
    isHidden(zoom: number): boolean;
    updateTransitions(parameters: TransitionParameters): void;
    hasTransition(): boolean;
    recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
    serialize(): LayerSpecification;
    _validate(validate: Function, key: string, name: string, value: unknown, options?: StyleSetterOptions): boolean;
    is3D(): boolean;
    isTileClipped(): boolean;
    hasOffscreenPass(): boolean;
    resize(): void;
    isStateDependent(): boolean;
}
