import Point from '@mapbox/point-geometry';
import type { StyleLayer } from '../style/style_layer';
import type { CircleBucket } from '../data/bucket/circle_bucket';
import type { LineBucket } from '../data/bucket/line_bucket';
export declare function getMaximumPaintValue(property: string, layer: StyleLayer, bucket: CircleBucket<any> | LineBucket): number;
export declare function translateDistance(translate: [number, number]): number;
export declare function translate(queryGeometry: Array<Point>, translate: [number, number], translateAnchor: 'viewport' | 'map', bearing: number, pixelsToTileUnits: number): any[];
export declare function offsetLine(rings: Array<Array<Point>>, offset: number): Point[][];
