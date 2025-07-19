import Point from '@mapbox/point-geometry';
/**
 * Finds an approximation of a polygon's Pole Of Inaccessibiliy https://en.wikipedia.org/wiki/Pole_of_inaccessibility
 * This is a copy of http://github.com/mapbox/polylabel adapted to use Points
 *
 * @param polygonRings - first item in array is the outer ring followed optionally by the list of holes, should be an element of the result of util/classify_rings
 * @param precision - Specified in input coordinate units. If 0 returns after first run, if `> 0` repeatedly narrows the search space until the radius of the area searched for the best pole is less than precision
 * @param debug - Print some statistics to the console during execution
 * @returns Pole of Inaccessibiliy.
 */
export declare function findPoleOfInaccessibility(polygonRings: Array<Array<Point>>, precision?: number, debug?: boolean): Point;
