import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { BackgroundStyleLayer } from '../style/style_layer/background_style_layer';
import { OverscaledTileID } from '../source/tile_id';
export declare function drawBackground(painter: Painter, sourceCache: SourceCache, layer: BackgroundStyleLayer, coords?: Array<OverscaledTileID>): void;
