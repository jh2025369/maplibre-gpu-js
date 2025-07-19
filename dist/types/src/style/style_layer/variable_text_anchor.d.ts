import { VariableAnchorOffsetCollection } from '@maplibre/maplibre-gl-style-spec';
import { SymbolFeature } from '../../data/bucket/symbol_bucket';
import { CanonicalTileID } from '../../source/tile_id';
import { SymbolStyleLayer } from './symbol_style_layer';
export declare enum TextAnchorEnum {
    'center' = 1,
    'left' = 2,
    'right' = 3,
    'top' = 4,
    'bottom' = 5,
    'top-left' = 6,
    'top-right' = 7,
    'bottom-left' = 8,
    'bottom-right' = 9
}
export type TextAnchor = keyof typeof TextAnchorEnum;
export declare const INVALID_TEXT_OFFSET: number;
export declare function evaluateVariableOffset(anchor: TextAnchor, offset: [number, number]): [number, number];
export declare function getTextVariableAnchorOffset(layer: SymbolStyleLayer, feature: SymbolFeature, canonical: CanonicalTileID): VariableAnchorOffsetCollection | null;
