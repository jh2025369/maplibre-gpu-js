import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { HillshadeStyleLayer } from '../style/style_layer/hillshade_style_layer';
import type { OverscaledTileID } from '../source/tile_id';
export declare function drawHillshade(painter: Painter, sourceCache: SourceCache, layer: HillshadeStyleLayer, tileIDs: Array<OverscaledTileID>): void;
