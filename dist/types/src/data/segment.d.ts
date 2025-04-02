import { DataBuffer } from 'core/Buffers/dataBuffer';
import type { StructArray } from '../util/struct_array';
/**
 * @internal
 * A single segment of a vector
 */
export type Segment = {
    sortKey?: number;
    vertexOffset: number;
    primitiveOffset: number;
    vertexLength: number;
    primitiveLength: number;
    vaos: {
        [_: string]: DataBuffer;
    };
};
/**
 * @internal
 * Used for calculations on vector segments
 */
export declare class SegmentVector {
    static MAX_VERTEX_ARRAY_LENGTH: number;
    segments: Array<Segment>;
    constructor(segments?: Array<Segment>);
    prepareSegment(numVertices: number, layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
    get(): Segment[];
    destroy(): void;
    static simpleSegment(vertexOffset: number, primitiveOffset: number, vertexLength: number, primitiveLength: number): SegmentVector;
}
