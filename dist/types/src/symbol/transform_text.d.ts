import type { SymbolStyleLayer } from '../style/style_layer/symbol_style_layer';
import type { Feature } from '@maplibre/maplibre-gl-style-spec';
import { Formatted } from '@maplibre/maplibre-gl-style-spec';
export declare function transformText(text: Formatted, layer: SymbolStyleLayer, feature: Feature): Formatted;
