import { Evented } from '../util/evented';
import type { Source } from './source';
import type { Map } from '../ui/map';
import type { Dispatcher } from '../util/dispatcher';
import type { Tile } from './tile';
import type { Actor } from '../util/actor';
import type { GeoJSONSourceSpecification, PromoteIdSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { GeoJSONSourceDiff } from './geojson_source_diff';
import type { GeoJSONWorkerOptions } from './geojson_worker_source';
/**
 * Options object for GeoJSONSource.
 */
export type GeoJSONSourceOptions = GeoJSONSourceSpecification & {
    workerOptions?: GeoJSONWorkerOptions;
    collectResourceTiming?: boolean;
    data: GeoJSON.GeoJSON | string;
};
export type GeoJSONSourceIntenalOptions = {
    data?: GeoJSON.GeoJSON | string | undefined;
    cluster?: boolean;
    clusterMaxZoom?: number;
    clusterRadius?: number;
    clusterMinPoints?: number;
    generateId?: boolean;
};
/**
 * The cluster options to set
 */
export type SetClusterOptions = {
    /**
     * Whether or not to cluster
     */
    cluster?: boolean;
    /**
     * The cluster's max zoom
     */
    clusterMaxZoom?: number;
    /**
     * The cluster's radius
     */
    clusterRadius?: number;
};
/**
 * A source containing GeoJSON.
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/#sources-geojson) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *     type: 'geojson',
 *     data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
 * });
 * ```
 *
 * @example
 * ```ts
 * map.addSource('some id', {
 *    type: 'geojson',
 *    data: {
 *        "type": "FeatureCollection",
 *        "features": [{
 *            "type": "Feature",
 *            "properties": {},
 *            "geometry": {
 *                "type": "Point",
 *                "coordinates": [
 *                    -76.53063297271729,
 *                    39.18174077994108
 *                ]
 *            }
 *        }]
 *    }
 * });
 * ```
 *
 * @example
 * ```ts
 * map.getSource('some id').setData({
 *   "type": "FeatureCollection",
 *   "features": [{
 *       "type": "Feature",
 *       "properties": { "name": "Null Island" },
 *       "geometry": {
 *           "type": "Point",
 *           "coordinates": [ 0, 0 ]
 *       }
 *   }]
 * });
 * ```
 * @see [Draw GeoJSON points](https://maplibre.org/maplibre-gl-js/docs/examples/geojson-markers/)
 * @see [Add a GeoJSON line](https://maplibre.org/maplibre-gl-js/docs/examples/geojson-line/)
 * @see [Create a heatmap from points](https://maplibre.org/maplibre-gl-js/docs/examples/heatmap/)
 * @see [Create and style clusters](https://maplibre.org/maplibre-gl-js/docs/examples/cluster/)
 */
export declare class GeoJSONSource extends Evented implements Source {
    type: 'geojson';
    id: string;
    minzoom: number;
    maxzoom: number;
    tileSize: number;
    attribution: string;
    promoteId: PromoteIdSpecification;
    isTileClipped: boolean;
    reparseOverscaled: boolean;
    _data: GeoJSON.GeoJSON | string | undefined;
    _options: GeoJSONSourceIntenalOptions;
    workerOptions: GeoJSONWorkerOptions;
    map: Map;
    actor: Actor;
    _pendingLoads: number;
    _collectResourceTiming: boolean;
    _removed: boolean;
    /** @internal */
    constructor(id: string, options: GeoJSONSourceOptions, dispatcher: Dispatcher, eventedParent: Evented);
    load(): Promise<void>;
    onAdd(map: Map): void;
    /**
     * Sets the GeoJSON data and re-renders the map.
     *
     * @param data - A GeoJSON data object or a URL to one. The latter is preferable in the case of large GeoJSON files.
     * @returns `this`
     */
    setData(data: GeoJSON.GeoJSON | string): this;
    /**
     * Updates the source's GeoJSON, and re-renders the map.
     *
     * For sources with lots of features, this method can be used to make updates more quickly.
     *
     * This approach requires unique IDs for every feature in the source. The IDs can either be specified on the feature,
     * or by using the promoteId option to specify which property should be used as the ID.
     *
     * It is an error to call updateData on a source that did not have unique IDs for each of its features already.
     *
     * Updates are applied on a best-effort basis, updating an ID that does not exist will not result in an error.
     *
     * @param diff - The changes that need to be applied.
     * @returns `this`
     */
    updateData(diff: GeoJSONSourceDiff): this;
    /**
     * To disable/enable clustering on the source options
     * @param options - The options to set
     * @returns `this`
     * @example
     * ```ts
     * map.getSource('some id').setClusterOptions({cluster: false});
     * map.getSource('some id').setClusterOptions({cluster: false, clusterRadius: 50, clusterMaxZoom: 14});
     * ```
     */
    setClusterOptions(options: SetClusterOptions): this;
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId - The value of the cluster's `cluster_id` property.
     * @returns a promise that is resolved with the zoom number
     */
    getClusterExpansionZoom(clusterId: number): Promise<number>;
    /**
     * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
     *
     * @param clusterId - The value of the cluster's `cluster_id` property.
     * @returns a promise that is resolved when the features are retrieved
     */
    getClusterChildren(clusterId: number): Promise<Array<GeoJSON.Feature>>;
    /**
     * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
     *
     * @param clusterId - The value of the cluster's `cluster_id` property.
     * @param limit - The maximum number of features to return.
     * @param offset - The number of features to skip (e.g. for pagination).
     * @returns a promise that is resolved when the features are retreived
     * @example
     * Retrieve cluster leaves on click
     * ```ts
     * map.on('click', 'clusters', (e) => {
     *   let features = map.queryRenderedFeatures(e.point, {
     *     layers: ['clusters']
     *   });
     *
     *   let clusterId = features[0].properties.cluster_id;
     *   let pointCount = features[0].properties.point_count;
     *   let clusterSource = map.getSource('clusters');
     *
     *   const features = await clusterSource.getClusterLeaves(clusterId, pointCount) 0, function(error, features) {
     *   // Print cluster leaves in the console
     *   console.log('Cluster leaves:', features);
     * });
     * ```
     */
    getClusterLeaves(clusterId: number, limit: number, offset: number): Promise<Array<GeoJSON.Feature>>;
    /**
     * Responsible for invoking WorkerSource's geojson.loadData target, which
     * handles loading the geojson data and preparing to serve it up as tiles,
     * using geojson-vt or supercluster as appropriate.
     * @param diff - the diff object
     */
    _updateWorkerData(diff?: GeoJSONSourceDiff): Promise<void>;
    loaded(): boolean;
    loadTile(tile: Tile): Promise<void>;
    abortTile(tile: Tile): Promise<void>;
    unloadTile(tile: Tile): Promise<void>;
    onRemove(): void;
    serialize(): GeoJSONSourceSpecification;
    hasTransition(): boolean;
}
