import { DEMData } from '../data/dem_data';
import type { Actor } from '../util/actor';
import type { WorkerDEMTileParameters, TileParameters } from './worker_source';
export declare class RasterDEMTileWorkerSource {
    actor: Actor;
    loaded: {
        [_: string]: DEMData;
    };
    constructor();
    loadTile(params: WorkerDEMTileParameters): Promise<DEMData | null>;
    removeTile(params: TileParameters): void;
}
