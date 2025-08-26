import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { SymbolStyleLayer } from '../style/style_layer/symbol_style_layer';
import type { OverscaledTileID } from '../source/tile_id';
import type { CrossTileID, VariableOffset } from '../symbol/placement';
export declare function drawSymbols(painter: Painter, sourceCache: SourceCache, layer: SymbolStyleLayer, coords: Array<OverscaledTileID>, variableOffsets: {
    [_ in CrossTileID]: VariableOffset;
}): void;
