import { ExpiryData } from '../util/ajax';
import { WorkerTile } from './worker_tile';
import type { WorkerSource, WorkerTileParameters, TileParameters, WorkerTileResult } from '../source/worker_source';
import type { IActor } from '../util/actor';
import type { StyleLayerIndex } from '../style/style_layer_index';
import type { VectorTile } from '@mapbox/vector-tile';
export type LoadVectorTileResult = {
    vectorTile: VectorTile;
    rawData: ArrayBuffer;
    resourceTiming?: Array<PerformanceResourceTiming>;
} & ExpiryData;
type FetchingState = {
    rawTileData: ArrayBuffer;
    cacheControl: ExpiryData;
    resourceTiming: any;
};
export type AbortVectorData = () => void;
export type LoadVectorData = (params: WorkerTileParameters, abortController: AbortController) => Promise<LoadVectorTileResult | null>;
/**
 * The {@link WorkerSource} implementation that supports {@link VectorTileSource}.
 * This class is designed to be easily reused to support custom source types
 * for data formats that can be parsed/converted into an in-memory VectorTile
 * representation. To do so, override its `loadVectorTile` method.
 */
export declare class VectorTileWorkerSource implements WorkerSource {
    actor: IActor;
    layerIndex: StyleLayerIndex;
    availableImages: Array<string>;
    fetching: {
        [_: string]: FetchingState;
    };
    loading: {
        [_: string]: WorkerTile;
    };
    loaded: {
        [_: string]: WorkerTile;
    };
    /**
     * @param loadVectorData - Optional method for custom loading of a VectorTile
     * object based on parameters passed from the main-thread Source. See
     * {@link VectorTileWorkerSource#loadTile}. The default implementation simply
     * loads the pbf at `params.url`.
     */
    constructor(actor: IActor, layerIndex: StyleLayerIndex, availableImages: Array<string>);
    /**
     * Loads a vector tile
     */
    loadVectorTile(params: WorkerTileParameters, abortController: AbortController): Promise<LoadVectorTileResult>;
    /**
     * Implements {@link WorkerSource#loadTile}. Delegates to
     * {@link VectorTileWorkerSource#loadVectorData} (which by default expects
     * a `params.url` property) for fetching and producing a VectorTile object.
     */
    loadTile(params: WorkerTileParameters): Promise<WorkerTileResult | null>;
    /**
     * Implements {@link WorkerSource#reloadTile}.
     */
    reloadTile(params: WorkerTileParameters): Promise<WorkerTileResult>;
    /**
     * Implements {@link WorkerSource#abortTile}.
     */
    abortTile(params: TileParameters): Promise<void>;
    /**
     * Implements {@link WorkerSource#removeTile}.
     */
    removeTile(params: TileParameters): Promise<void>;
}
export {};
