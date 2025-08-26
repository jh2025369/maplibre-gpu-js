import KDBush from 'kdbush';
import { SymbolInstanceArray } from '../data/array_types.g';
import type { SymbolInstance } from '../data/array_types.g';
import type { OverscaledTileID } from '../source/tile_id';
import type { SymbolBucket } from '../data/bucket/symbol_bucket';
import type { StyleLayer } from '../style/style_layer';
import type { Tile } from '../source/tile';
export declare const KDBUSH_THRESHHOLD = 128;
interface SymbolsByKeyEntry {
    index?: KDBush;
    positions?: {
        x: number;
        y: number;
    }[];
    crossTileIDs: number[];
}
declare class TileLayerIndex {
    tileID: OverscaledTileID;
    bucketInstanceId: number;
    _symbolsByKey: Record<number, SymbolsByKeyEntry>;
    constructor(tileID: OverscaledTileID, symbolInstances: SymbolInstanceArray, bucketInstanceId: number);
    getScaledCoordinates(symbolInstance: SymbolInstance, childTileID: OverscaledTileID): {
        x: number;
        y: number;
    };
    findMatches(symbolInstances: SymbolInstanceArray, newTileID: OverscaledTileID, zoomCrossTileIDs: {
        [crossTileID: number]: boolean;
    }): void;
    getCrossTileIDsLists(): number[][];
}
declare class CrossTileIDs {
    maxCrossTileID: number;
    constructor();
    generate(): number;
}
declare class CrossTileSymbolLayerIndex {
    indexes: {
        [zoom in string | number]: {
            [tileId in string | number]: TileLayerIndex;
        };
    };
    usedCrossTileIDs: {
        [zoom in string | number]: {
            [crossTileID: number]: boolean;
        };
    };
    lng: number;
    constructor();
    handleWrapJump(lng: number): void;
    addBucket(tileID: OverscaledTileID, bucket: SymbolBucket, crossTileIDs: CrossTileIDs): boolean;
    removeBucketCrossTileIDs(zoom: string | number, removedBucket: TileLayerIndex): void;
    removeStaleBuckets(currentIDs: {
        [k in string | number]: boolean;
    }): boolean;
}
export declare class CrossTileSymbolIndex {
    layerIndexes: {
        [layerId: string]: CrossTileSymbolLayerIndex;
    };
    crossTileIDs: CrossTileIDs;
    maxBucketInstanceId: number;
    bucketsInCurrentPlacement: {
        [_: number]: boolean;
    };
    constructor();
    addLayer(styleLayer: StyleLayer, tiles: Array<Tile>, lng: number): boolean;
    pruneUnusedLayers(usedLayers: Array<string>): void;
}
export {};
