import { ActorTarget } from './actor';
export declare const PRELOAD_POOL_ID = "maplibre_preloaded_worker_pool";
/**
 * Constructs a worker pool.
 */
export declare class WorkerPool {
    static workerCount: number;
    active: {
        [_ in number | string]: boolean;
    };
    workers: Array<ActorTarget>;
    constructor();
    acquire(mapId: number | string): Array<ActorTarget>;
    release(mapId: number | string): void;
    isPreloaded(): boolean;
    numActive(): number;
}
