import Point from '@mapbox/point-geometry';
import { mat4, vec4 } from 'gl-matrix';
import type { Painter } from '../render/painter';
import type { Transform } from '../geo/transform';
import type { SymbolBucket } from '../data/bucket/symbol_bucket';
import type { GlyphOffsetArray, SymbolLineVertexArray, SymbolDynamicLayoutArray } from '../data/array_types.g';
export { updateLineLabels, hideGlyphs, getLabelPlaneMatrix, getGlCoordMatrix, project, getPerspectiveRatio, placeFirstAndLastGlyph, placeGlyphAlongLine, xyTransformMat4, projectVertexToViewport, findOffsetIntersectionPoint, transformToOffsetNormal };
declare function getLabelPlaneMatrix(posMatrix: mat4, pitchWithMap: boolean, rotateWithMap: boolean, transform: Transform, pixelsToTileUnits: number): mat4;
declare function getGlCoordMatrix(posMatrix: mat4, pitchWithMap: boolean, rotateWithMap: boolean, transform: Transform, pixelsToTileUnits: number): mat4;
declare function project(point: Point, matrix: mat4, getElevation?: (x: number, y: number) => number): {
    point: Point;
    signedDistanceFromCamera: any;
};
declare function getPerspectiveRatio(cameraToCenterDistance: number, signedDistanceFromCamera: number): number;
declare function updateLineLabels(bucket: SymbolBucket, posMatrix: mat4, painter: Painter, isText: boolean, labelPlaneMatrix: mat4, glCoordMatrix: mat4, pitchWithMap: boolean, keepUpright: boolean, rotateToLine: boolean, getElevation: (x: number, y: number) => number): void;
type FirstAndLastGlyphPlacement = {
    first: PlacedGlyph;
    last: PlacedGlyph;
} | null;
declare function placeFirstAndLastGlyph(fontScale: number, glyphOffsetArray: GlyphOffsetArray, lineOffsetX: number, lineOffsetY: number, flip: boolean, anchorPoint: Point, tileAnchorPoint: Point, symbol: any, lineVertexArray: SymbolLineVertexArray, labelPlaneMatrix: mat4, projectionCache: ProjectionCache, rotateToLine: boolean, getElevation: (x: number, y: number) => number): FirstAndLastGlyphPlacement;
type IndexToPointCache = {
    [lineIndex: number]: Point;
};
/**
 * We calculate label-plane projected points for line vertices as we place glyphs along the line
 * Since we will use the same vertices for potentially many glyphs, cache the results for this bucket
 * over the course of the render. Each vertex location also potentially has one offset equivalent
 * for us to hold onto. The vertex indices are per-symbol-bucket.
 */
type ProjectionCache = {
    /**
     * tile-unit vertices projected into label-plane units
     */
    projections: IndexToPointCache;
    /**
     * label-plane vertices which have been shifted to follow an offset line
     */
    offsets: IndexToPointCache;
};
/**
 * Arguments necessary to project a vertex to the label plane
 */
type ProjectionArgs = {
    /**
     * Used to cache results, save cost if projecting the same vertex multiple times
     */
    projectionCache: ProjectionCache;
    /**
     * The array of tile-unit vertices transferred from worker
     */
    lineVertexArray: SymbolLineVertexArray;
    /**
     * Label plane projection matrix
     */
    labelPlaneMatrix: mat4;
    /**
     * Function to get elevation at a point
     * @param x - the x coordinate
     * @param y - the y coordinate
    */
    getElevation: (x: number, y: number) => number;
    /**
     * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera
     */
    tileAnchorPoint: Point;
    /**
     * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera
     */
    distanceFromAnchor: number;
    /**
     * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera
     */
    previousVertex: Point;
    /**
     * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera
     */
    direction: number;
    /**
     * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera
     */
    absOffsetX: number;
};
/**
 * Transform a vertex from tile coordinates to label plane coordinates
 * @param index - index of vertex to project
 * @param projectionArgs - necessary data to project a vertex
 * @returns the vertex projected to the label plane
 */
declare function projectVertexToViewport(index: number, projectionArgs: ProjectionArgs): Point;
/**
 * Calculate the normal vector for a line segment
 * @param segmentVector - will be mutated as a tiny optimization
 * @param offset - magnitude of resulting vector
 * @param direction - direction of line traversal
 * @returns a normal vector from the segment, with magnitude equal to offset amount
 */
declare function transformToOffsetNormal(segmentVector: Point, offset: number, direction: number): Point;
/**
 * Construct offset line segments for the current segment and the next segment, then extend/shrink
 * the segments until they intersect. If the segments are parallel, then they will touch with no modification.
 *
 * @param index - Index of the current vertex
 * @param prevToCurrentOffsetNormal - Normal vector of the line segment from the previous vertex to the current vertex
 * @param currentVertex - Current (non-offset) vertex projected to the label plane
 * @param lineStartIndex - Beginning index for the line this label is on
 * @param lineEndIndex - End index for the line this label is on
 * @param offsetPreviousVertex - The previous vertex projected to the label plane, and then offset along the previous segments normal
 * @param lineOffsetY - Magnitude of the offset
 * @param projectionArgs - Necessary data for tile-to-label-plane projection
 * @returns The point at which the current and next line segments intersect, once offset and extended/shrunk to their meeting point
 */
declare function findOffsetIntersectionPoint(index: number, prevToCurrentOffsetNormal: Point, currentVertex: Point, lineStartIndex: number, lineEndIndex: number, offsetPreviousVertex: Point, lineOffsetY: number, projectionArgs: ProjectionArgs): Point;
/**
 * Placed Glyph type
 */
type PlacedGlyph = {
    /**
     * The point at which the glyph should be placed, in label plane coordinates
     */
    point: Point;
    /**
     * The angle at which the glyph should be placed
     */
    angle: number;
    /**
     * The label-plane path used to reach this glyph: used only for collision detection
     */
    path: Array<Point>;
};
declare function placeGlyphAlongLine(offsetX: number, lineOffsetX: number, lineOffsetY: number, flip: boolean, anchorPoint: Point, tileAnchorPoint: Point, anchorSegment: number, lineStartIndex: number, lineEndIndex: number, lineVertexArray: SymbolLineVertexArray, labelPlaneMatrix: mat4, projectionCache: ProjectionCache, rotateToLine: boolean, getElevation: (x: number, y: number) => number): PlacedGlyph | null;
declare function hideGlyphs(num: number, dynamicLayoutVertexArray: SymbolDynamicLayoutArray): void;
declare function xyTransformMat4(out: vec4, a: vec4, m: mat4): vec4;
