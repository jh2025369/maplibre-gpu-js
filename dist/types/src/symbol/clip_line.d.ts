import Point from '@mapbox/point-geometry';
/**
 * Returns the part of a multiline that intersects with the provided rectangular box.
 *
 * @param lines - the lines to check
 * @param x1 - the left edge of the box
 * @param y1 - the top edge of the box
 * @param x2 - the right edge of the box
 * @param y2 - the bottom edge of the box
 * @returns lines
 */
export declare function clipLine(lines: Array<Array<Point>>, x1: number, y1: number, x2: number, y2: number): Array<Array<Point>>;
