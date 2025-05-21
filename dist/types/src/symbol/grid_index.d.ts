import type { OverlapMode } from '../style/style_layer/overlap_mode';
type QueryResult<T> = {
    key: T;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
/**
 * A key for the grid
 */
export type GridKey = {
    overlapMode?: OverlapMode;
};
/**
 * @internal
 * GridIndex is a data structure for testing the intersection of
 * circles and rectangles in a 2d plane.
 * It is optimized for rapid insertion and querying.
 * GridIndex splits the plane into a set of "cells" and keeps track
 * of which geometries intersect with each cell. At query time,
 * full geometry comparisons are only done for items that share
 * at least one cell. As long as the geometries are relatively
 * uniformly distributed across the plane, this greatly reduces
 * the number of comparisons necessary.
 */
export declare class GridIndex<T extends GridKey> {
    circleKeys: Array<T>;
    boxKeys: Array<T>;
    boxCells: Array<Array<number>>;
    circleCells: Array<Array<number>>;
    bboxes: Array<number>;
    circles: Array<number>;
    xCellCount: number;
    yCellCount: number;
    width: number;
    height: number;
    xScale: number;
    yScale: number;
    boxUid: number;
    circleUid: number;
    constructor(width: number, height: number, cellSize: number);
    keysLength(): number;
    insert(key: T, x1: number, y1: number, x2: number, y2: number): void;
    insertCircle(key: T, x: number, y: number, radius: number): void;
    private _insertBoxCell;
    private _insertCircleCell;
    private _query;
    query(x1: number, y1: number, x2: number, y2: number): Array<QueryResult<T>>;
    hitTest(x1: number, y1: number, x2: number, y2: number, overlapMode: OverlapMode, predicate?: (key: T) => boolean): boolean;
    hitTestCircle(x: number, y: number, radius: number, overlapMode: OverlapMode, predicate?: (key: T) => boolean): boolean;
    private _queryCell;
    private _queryCellCircle;
    private _forEachCell;
    private _convertToXCellCoord;
    private _convertToYCellCoord;
    private _circlesCollide;
    private _circleAndRectCollide;
}
export {};
