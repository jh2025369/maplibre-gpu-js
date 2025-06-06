import { StyleLayer } from '../style_layer';
import { SymbolBucket, SymbolFeature } from '../../data/bucket/symbol_bucket';
import { SymbolLayoutPropsPossiblyEvaluated, SymbolPaintPropsPossiblyEvaluated } from './symbol_style_layer_properties.g';
import { Transitionable, Transitioning, Layout, PossiblyEvaluated, PropertyValue } from '../properties';
import type { BucketParameters } from '../../data/bucket';
import type { SymbolLayoutProps, SymbolPaintProps } from './symbol_style_layer_properties.g';
import type { EvaluationParameters } from '../evaluation_parameters';
import type { Feature, LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { CanonicalTileID } from '../../source/tile_id';
export declare class SymbolStyleLayer extends StyleLayer {
    _unevaluatedLayout: Layout<SymbolLayoutProps>;
    layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>;
    _transitionablePaint: Transitionable<SymbolPaintProps>;
    _transitioningPaint: Transitioning<SymbolPaintProps>;
    paint: PossiblyEvaluated<SymbolPaintProps, SymbolPaintPropsPossiblyEvaluated>;
    constructor(layer: LayerSpecification);
    recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
    getValueAndResolveTokens(name: any, feature: Feature, canonical: CanonicalTileID, availableImages: Array<string>): any;
    createBucket(parameters: BucketParameters<any>): SymbolBucket;
    queryRadius(): number;
    queryIntersectsFeature(): boolean;
    _setPaintOverrides(): void;
    _handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
    static hasPaintOverride(layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>, propertyName: string): boolean;
}
export type SymbolPadding = [number, number, number, number];
export declare function getIconPadding(layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>, feature: SymbolFeature, canonical: CanonicalTileID, pixelRatio?: number): SymbolPadding;
