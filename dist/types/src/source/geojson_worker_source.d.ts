import Supercluster, { type Options as SuperclusterOptions, type ClusterProperties } from 'supercluster';
import geojsonvt, { type Options as GeoJSONVTOptions } from 'geojson-vt';
import { VectorTileWorkerSource } from './vector_tile_worker_source';
import type { WorkerTileParameters, WorkerTileResult } from '../source/worker_source';
import type { LoadVectorTileResult } from './vector_tile_worker_source';
import type { RequestParameters } from '../util/ajax';
import { type GeoJSONSourceDiff, GeoJSONFeatureId } from './geojson_source_diff';
import type { ClusterIDAndSource, GeoJSONWorkerSourceLoadDataResult, RemoveSourceParams } from '../util/actor_messages';
/**
 * The geojson worker options that can be passed to the worker
 */
export type GeoJSONWorkerOptions = {
    source?: string;
    cluster?: boolean;
    geojsonVtOptions?: GeoJSONVTOptions;
    superclusterOptions?: SuperclusterOptions<any, any>;
    clusterProperties?: ClusterProperties;
    filter?: Array<unknown>;
    promoteId?: string;
    collectResourceTiming?: boolean;
};
/**
 * Parameters needed to load a geojson to the wokrer
 */
export type LoadGeoJSONParameters = GeoJSONWorkerOptions & {
    type: 'geojson';
    request?: RequestParameters;
    /**
     * Literal GeoJSON data. Must be provided if `request.url` is not.
     */
    data?: string;
    dataDiff?: GeoJSONSourceDiff;
};
export type LoadGeoJSON = (params: LoadGeoJSONParameters, abortController: AbortController) => Promise<GeoJSON.GeoJSON>;
type GeoJSONIndex = ReturnType<typeof geojsonvt> | Supercluster;
/**
 * The {@link WorkerSource} implementation that supports {@link GeoJSONSource}.
 * This class is designed to be easily reused to support custom source types
 * for data formats that can be parsed/converted into an in-memory GeoJSON
 * representation. To do so, create it with
 * `new GeoJSONWorkerSource(actor, layerIndex, customLoadGeoJSONFunction)`.
 * For a full example, see [mapbox-gl-topojson](https://github.com/developmentseed/mapbox-gl-topojson).
 */
export declare class GeoJSONWorkerSource extends VectorTileWorkerSource {
    _pendingRequest: AbortController;
    _geoJSONIndex: GeoJSONIndex;
    _dataUpdateable: Map<GeoJSONFeatureId, import("geojson").Feature<import("geojson").Geometry, {
        [name: string]: any;
    }>>;
    loadVectorTile(params: WorkerTileParameters, _abortController: AbortController): Promise<LoadVectorTileResult | null>;
    /**
     * Fetches (if appropriate), parses, and index geojson data into tiles. This
     * preparatory method must be called before {@link GeoJSONWorkerSource#loadTile}
     * can correctly serve up tiles.
     *
     * Defers to {@link GeoJSONWorkerSource#loadGeoJSON} for the fetching/parsing,
     *
     * When a `loadData` request comes in while a previous one is being processed,
     * the previous one is aborted.
     *
     * @param params - the parameters
     * @returns a promise that resolves when the data is loaded and parsed into a GeoJSON object
     */
    loadData(params: LoadGeoJSONParameters): Promise<GeoJSONWorkerSourceLoadDataResult>;
    /**
    * Implements {@link WorkerSource#reloadTile}.
    *
    * If the tile is loaded, uses the implementation in VectorTileWorkerSource.
    * Otherwise, such as after a setData() call, we load the tile fresh.
    *
    * @param params - the parameters
    * @returns A promise that resolves when the tile is reloaded
    */
    reloadTile(params: WorkerTileParameters): Promise<WorkerTileResult>;
    /**
     * Fetch and parse GeoJSON according to the given params.
     *
     * GeoJSON is loaded and parsed from `params.url` if it exists, or else
     * expected as a literal (string or object) `params.data`.
     *
     * @param params - the parameters
     * @param abortController - the abort controller that allows aborting this operation
     * @returns a promise that resolves when the data is loaded
     */
    loadGeoJSON(params: LoadGeoJSONParameters, abortController: AbortController): Promise<GeoJSON.GeoJSON>;
    removeSource(_params: RemoveSourceParams): Promise<void>;
    getClusterExpansionZoom(params: ClusterIDAndSource): number;
    getClusterChildren(params: ClusterIDAndSource): Array<GeoJSON.Feature>;
    getClusterLeaves(params: {
        clusterId: number;
        limit: number;
        offset: number;
    }): Array<GeoJSON.Feature>;
}
export {};
