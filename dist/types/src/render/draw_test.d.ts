import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { LineStyleLayer } from '../style/style_layer/line_style_layer';
import type { OverscaledTileID } from '../source/tile_id';
export declare function drawTest(painter: Painter, sourceCache: SourceCache, layer: LineStyleLayer, coords: Array<OverscaledTileID>): void;
