import { Anchor } from '../symbol/anchor';
import type Point from '@mapbox/point-geometry';
import type { Shaping, PositionedIcon } from './shaping';
export { getAnchors, getCenterAnchor };
declare function getCenterAnchor(line: Array<Point>, maxAngle: number, shapedText: Shaping, shapedIcon: PositionedIcon, glyphSize: number, boxScale: number): Anchor;
declare function getAnchors(line: Array<Point>, spacing: number, maxAngle: number, shapedText: Shaping, shapedIcon: PositionedIcon, glyphSize: number, boxScale: number, overscaling: number, tileExtent: number): any[];
