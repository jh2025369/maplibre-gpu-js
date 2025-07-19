import type Point from '@mapbox/point-geometry';
import type { Anchor } from './anchor';
/**
 * Labels placed around really sharp angles aren't readable. Check if any
 * part of the potential label has a combined angle that is too big.
 *
 * @param line - The line to check
 * @param anchor - The point on the line around which the label is anchored.
 * @param labelLength - The length of the label in geometry units.
 * @param windowSize - The check fails if the combined angles within a part of the line that is `windowSize` long is too big.
 * @param maxAngle - The maximum combined angle that any window along the label is allowed to have.
 *
 * @returns whether the label should be placed
 */
export declare function checkMaxAngle(line: Array<Point>, anchor: Anchor, labelLength: number, windowSize: number, maxAngle: number): boolean;
