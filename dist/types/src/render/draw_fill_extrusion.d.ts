import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { FillExtrusionStyleLayer } from '../style/style_layer/fill_extrusion_style_layer';
import type { OverscaledTileID } from '../source/tile_id';
export declare function drawFillExtrusion(painter: Painter, source: SourceCache, layer: FillExtrusionStyleLayer, coords: Array<OverscaledTileID>): void;
