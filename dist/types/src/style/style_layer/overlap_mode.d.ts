import { SymbolLayoutPropsPossiblyEvaluated } from './symbol_style_layer_properties.g';
import type { SymbolLayoutProps } from './symbol_style_layer_properties.g';
import { PossiblyEvaluated } from '../properties';
/**
 * The overlap mode for properties like `icon-overlap`and `text-overlap`
 */
export type OverlapMode = 'never' | 'always' | 'cooperative';
export declare function getOverlapMode(layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>, overlapProp: 'icon-overlap', allowOverlapProp: 'icon-allow-overlap'): OverlapMode;
export declare function getOverlapMode(layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>, overlapProp: 'text-overlap', allowOverlapProp: 'text-allow-overlap'): OverlapMode;
