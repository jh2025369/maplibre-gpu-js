import { CollisionBoxArray } from '../data/array_types.g';
import { OverscaledTileID } from './tile_id';
import type { IActor } from '../util/actor';
import type { StyleLayerIndex } from '../style/style_layer_index';
import type { WorkerTileParameters, WorkerTileResult } from '../source/worker_source';
import type { PromoteIdSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { VectorTile } from '@mapbox/vector-tile';
export declare class WorkerTile {
    tileID: OverscaledTileID;
    uid: string | number;
    zoom: number;
    pixelRatio: number;
    tileSize: number;
    source: string;
    promoteId: PromoteIdSpecification;
    overscaling: number;
    showCollisionBoxes: boolean;
    collectResourceTiming: boolean;
    returnDependencies: boolean;
    status: 'parsing' | 'done';
    data: VectorTile;
    collisionBoxArray: CollisionBoxArray;
    abort: AbortController;
    vectorTile: VectorTile;
    inFlightDependencies: AbortController[];
    constructor(params: WorkerTileParameters);
    parse(data: VectorTile, layerIndex: StyleLayerIndex, availableImages: Array<string>, actor: IActor): Promise<WorkerTileResult>;
}
