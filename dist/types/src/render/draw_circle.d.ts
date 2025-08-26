import { OverscaledTileID } from '../source/tile_id';
import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { CircleStyleLayer } from '../style/style_layer/circle_style_layer';
export declare function drawCircles(painter: Painter, sourceCache: SourceCache, layer: CircleStyleLayer, coords: Array<OverscaledTileID>): void;
