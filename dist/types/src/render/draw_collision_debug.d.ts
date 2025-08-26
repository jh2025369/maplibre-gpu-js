import type { Painter } from './painter';
import type { SourceCache } from '../source/source_cache';
import type { StyleLayer } from '../style/style_layer';
import type { OverscaledTileID } from '../source/tile_id';
export declare function drawCollisionDebug(painter: Painter, sourceCache: SourceCache, layer: StyleLayer, coords: Array<OverscaledTileID>, translate: [number, number], translateAnchor: 'map' | 'viewport', isText: boolean): void;
