import { Actor, ActorTarget } from '../util/actor';
import { StyleLayerIndex } from '../style/style_layer_index';
import { RasterDEMTileWorkerSource } from './raster_dem_tile_worker_source';
import type { WorkerSource, WorkerSourceConstructor } from '../source/worker_source';
import type { WorkerGlobalScopeInterface } from '../util/web_worker';
/**
 * The Worker class responsidble for background thread related execution
 */
export default class Worker {
    self: WorkerGlobalScopeInterface & ActorTarget;
    actor: Actor;
    layerIndexes: {
        [_: string]: StyleLayerIndex;
    };
    availableImages: {
        [_: string]: Array<string>;
    };
    externalWorkerSourceTypes: {
        [_: string]: WorkerSourceConstructor;
    };
    /**
     * This holds a cache for the already created worker source instances.
     * The cache is build with the following hierarchy:
     * [mapId][sourceType][sourceName]: worker source instance
     * sourceType can be 'vector' for example
     */
    workerSources: {
        [_: string]: {
            [_: string]: {
                [_: string]: WorkerSource;
            };
        };
    };
    /**
     * This holds a cache for the already created DEM worker source instances.
     * The cache is build with the following hierarchy:
     * [mapId][sourceType]: DEM worker source instance
     * sourceType can be 'raster-dem' for example
     */
    demWorkerSources: {
        [_: string]: {
            [_: string]: RasterDEMTileWorkerSource;
        };
    };
    referrer: string;
    constructor(self: WorkerGlobalScopeInterface & ActorTarget);
    private _setImages;
    private _syncRTLPluginState;
    private _getAvailableImages;
    private _getLayerIndex;
    /**
     * This is basically a lazy initialization of a worker per mapId and sourceType and sourceName
     * @param mapId - the mapId
     * @param sourceType - the source type - 'vector' for example
     * @param sourceName - the source name - 'osm' for example
     * @returns a new instance or a cached one
     */
    private _getWorkerSource;
    /**
     * This is basically a lazy initialization of a worker per mapId and source
     * @param mapId - the mapId
     * @param sourceType - the source type - 'raster-dem' for example
     * @returns a new instance or a cached one
     */
    private _getDEMWorkerSource;
}
