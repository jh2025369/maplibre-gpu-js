import Point from '@mapbox/point-geometry';
import { GridIndex } from './grid_index';
import { mat4 } from 'gl-matrix';
import type { Transform } from '../geo/transform';
import type { SingleCollisionBox } from '../data/bucket/symbol_bucket';
import type { GlyphOffsetArray, SymbolLineVertexArray } from '../data/array_types.g';
import type { OverlapMode } from '../style/style_layer/overlap_mode';
export type FeatureKey = {
    bucketInstanceId: number;
    featureIndex: number;
    collisionGroupID: number;
    overlapMode: OverlapMode;
};
/**
 * @internal
 * A collision index used to prevent symbols from overlapping. It keep tracks of
 * where previous symbols have been placed and is used to check if a new
 * symbol overlaps with any previously added symbols.
 *
 * There are two steps to insertion: first placeCollisionBox/Circles checks if
 * there's room for a symbol, then insertCollisionBox/Circles actually puts the
 * symbol in the index. The two step process allows paired symbols to be inserted
 * together even if they overlap.
 */
export declare class CollisionIndex {
    grid: GridIndex<FeatureKey>;
    ignoredGrid: GridIndex<FeatureKey>;
    transform: Transform;
    pitchfactor: number;
    screenRightBoundary: number;
    screenBottomBoundary: number;
    gridRightBoundary: number;
    gridBottomBoundary: number;
    perspectiveRatioCutoff: number;
    constructor(transform: Transform, grid?: GridIndex<FeatureKey>, ignoredGrid?: GridIndex<FeatureKey>);
    placeCollisionBox(collisionBox: SingleCollisionBox, overlapMode: OverlapMode, textPixelRatio: number, posMatrix: mat4, collisionGroupPredicate?: (key: FeatureKey) => boolean, getElevation?: (x: number, y: number) => number): {
        box: Array<number>;
        offscreen: boolean;
    };
    placeCollisionCircles(overlapMode: OverlapMode, symbol: any, lineVertexArray: SymbolLineVertexArray, glyphOffsetArray: GlyphOffsetArray, fontSize: number, posMatrix: mat4, labelPlaneMatrix: mat4, labelToScreenMatrix: mat4, showCollisionCircles: boolean, pitchWithMap: boolean, collisionGroupPredicate: (key: FeatureKey) => boolean, circlePixelDiameter: number, textPixelPadding: number, getElevation: (x: number, y: number) => number): {
        circles: Array<number>;
        offscreen: boolean;
        collisionDetected: boolean;
    };
    /**
     * Because the geometries in the CollisionIndex are an approximation of the shape of
     * symbols on the map, we use the CollisionIndex to look up the symbol part of
     * `queryRenderedFeatures`.
     */
    queryRenderedSymbols(viewportQueryGeometry: Array<Point>): {};
    insertCollisionBox(collisionBox: Array<number>, overlapMode: OverlapMode, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
    insertCollisionCircles(collisionCircles: Array<number>, overlapMode: OverlapMode, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
    projectAndGetPerspectiveRatio(posMatrix: mat4, x: number, y: number, getElevation?: (x: number, y: number) => number): {
        point: Point;
        perspectiveRatio: number;
    };
    isOffscreen(x1: number, y1: number, x2: number, y2: number): boolean;
    isInsideGrid(x1: number, y1: number, x2: number, y2: number): boolean;
    getViewportMatrix(): mat4;
}
