import type { CollisionBoxArray } from '../data/array_types.g';
import type { Anchor } from './anchor';
import { SymbolPadding } from '../style/style_layer/symbol_style_layer';
/**
 * A CollisionFeature represents the area of the tile covered by a single label.
 * It is used with CollisionIndex to check if the label overlaps with any
 * previous labels. A CollisionFeature is mostly just a set of CollisionBox
 * objects.
 */
export declare class CollisionFeature {
    boxStartIndex: number;
    boxEndIndex: number;
    circleDiameter: number;
    /**
     * Create a CollisionFeature, adding its collision box data to the given collisionBoxArray in the process.
     * For line aligned labels a collision circle diameter is computed instead.
     *
     * @param anchor - The point along the line around which the label is anchored.
     * @param shaped - The text or icon shaping results.
     * @param boxScale - A magic number used to convert from glyph metrics units to geometry units.
     * @param padding - The amount of padding to add around the label edges.
     * @param alignLine - Whether the label is aligned with the line or the viewport.
     */
    constructor(collisionBoxArray: CollisionBoxArray, anchor: Anchor, featureIndex: number, sourceLayerIndex: number, bucketIndex: number, shaped: any, boxScale: number, padding: SymbolPadding, alignLine: boolean, rotate: number);
}
