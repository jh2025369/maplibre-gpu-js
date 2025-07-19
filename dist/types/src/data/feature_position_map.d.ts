type SerializedFeaturePositionMap = {
    ids: Float64Array;
    positions: Uint32Array;
};
type FeaturePosition = {
    index: number;
    start: number;
    end: number;
};
export declare class FeaturePositionMap {
    ids: Array<number>;
    positions: Array<number>;
    indexed: boolean;
    constructor();
    add(id: unknown, index: number, start: number, end: number): void;
    getPositions(id: unknown): Array<FeaturePosition>;
    static serialize(map: FeaturePositionMap, transferables: Array<ArrayBuffer>): SerializedFeaturePositionMap;
    static deserialize(obj: SerializedFeaturePositionMap): FeaturePositionMap;
}
export {};
