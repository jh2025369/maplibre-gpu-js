import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { FillStyleLayer } from '../style/style_layer/fill_style_layer';
import type { OverscaledTileID } from '../source/tile_id';
export declare function drawFill(painter: Painter, sourceCache: SourceCache, layer: FillStyleLayer, coords: Array<OverscaledTileID>): void;
