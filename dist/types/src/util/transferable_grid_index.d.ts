export type SerializedGrid = {
    buffer: ArrayBuffer;
};
export declare class TransferableGridIndex {
    cells: number[][];
    arrayBuffer: ArrayBuffer;
    d: number;
    keys: number[];
    bboxes: number[];
    n: number;
    extent: number;
    padding: number;
    scale: any;
    uid: number;
    min: number;
    max: number;
    constructor(extent: number | ArrayBuffer, n?: number, padding?: number);
    insert(key: number, x1: number, y1: number, x2: number, y2: number): void;
    _insertReadonly(): void;
    _insertCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, uid: number): void;
    query(x1: number, y1: number, x2: number, y2: number, intersectionTest?: Function): number[];
    _queryCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, result: any, seenUids: any, intersectionTest: Function): void;
    _forEachCell(x1: number, y1: number, x2: number, y2: number, fn: Function, arg1: any, arg2: any, intersectionTest: any): void;
    _convertFromCellCoord(x: any): number;
    _convertToCellCoord(x: any): number;
    toArrayBuffer(): ArrayBuffer;
    static serialize(grid: TransferableGridIndex, transferables?: Array<Transferable>): SerializedGrid;
    static deserialize(serialized: SerializedGrid): TransferableGridIndex;
}
