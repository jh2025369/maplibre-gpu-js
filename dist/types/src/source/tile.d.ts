import '../data/feature_index';
import type { FeatureIndex } from '../data/feature_index';
import { GeoJSONFeature } from '../util/vectortile_to_geojson';
import { CollisionBoxArray } from '../data/array_types.g';
import { Texture } from 'core/Materials/Textures/texture';
import { SourceFeatureState } from '../source/source_state';
import type { Bucket } from '../data/bucket';
import type { StyleLayer } from '../style/style_layer';
import type { WorkerTileResult } from './worker_source';
import type { Actor } from '../util/actor';
import type { DEMData } from '../data/dem_data';
import type { AlphaImage } from '../util/image';
import type { ImageAtlas } from '../render/image_atlas';
import type { ImageManager } from '../render/image_manager';
import type { OverscaledTileID } from './tile_id';
import type { Transform } from '../geo/transform';
import type { LayerFeatureStates } from './source_state';
import type { FilterSpecification } from '@maplibre/maplibre-gl-style-spec';
import type Point from '@mapbox/point-geometry';
import { mat4 } from 'gl-matrix';
import type { VectorTileLayer } from '@mapbox/vector-tile';
import { ExpiryData } from '../util/ajax';
import { WebGPUEngine } from 'core/Engines/webgpuEngine';
import { RenderTargetWrapper } from 'core/Engines/renderTargetWrapper';
/**
 * The tile's state, can be:
 *
 * - `loading` Tile data is in the process of loading.
 * - `loaded` Tile data has been loaded. Tile can be rendered.
 * - `reloading` Tile data has been loaded and is being updated. Tile can be rendered.
 * - `unloaded` Tile data has been deleted.
 * - `errored` Tile data was not loaded because of an error.
 * - `expired` Tile data was previously loaded, but has expired per its HTTP headers and is in the process of refreshing.
 */
export type TileState = 'loading' | 'loaded' | 'reloading' | 'unloaded' | 'errored' | 'expired';
/**
 * A tile object is the combination of a Coordinate, which defines
 * its place, as well as a unique ID and data tracking for its content
 */
export declare class Tile {
    tileID: OverscaledTileID;
    uid: number;
    uses: number;
    tileSize: number;
    buckets: {
        [_: string]: Bucket;
    };
    latestFeatureIndex: FeatureIndex;
    latestRawTileData: ArrayBuffer;
    imageAtlas: ImageAtlas;
    imageAtlasTexture: Texture;
    glyphAtlasImage: AlphaImage;
    glyphAtlasTexture: Texture;
    expirationTime: any;
    expiredRequestCount: number;
    state: TileState;
    timeAdded: number;
    fadeEndTime: number;
    collisionBoxArray: CollisionBoxArray;
    redoWhenDone: boolean;
    showCollisionBoxes: boolean;
    placementSource: any;
    actor: Actor;
    vtLayers: {
        [_: string]: VectorTileLayer;
    };
    neighboringTiles: any;
    dem: DEMData;
    demMatrix: mat4;
    aborted: boolean;
    needsHillshadePrepare: boolean;
    needsTerrainPrepare: boolean;
    abortController: AbortController;
    texture: any;
    fbo: RenderTargetWrapper;
    renderPassDescriptor: GPURenderPassDescriptor;
    demTexture: Texture;
    refreshedUponExpiration: boolean;
    reloadPromise: {
        resolve: () => void;
        reject: () => void;
    };
    resourceTiming: Array<PerformanceResourceTiming>;
    queryPadding: number;
    symbolFadeHoldUntil: number;
    hasSymbolBuckets: boolean;
    hasRTLText: boolean;
    dependencies: any;
    rtt: Array<{
        id: number;
        stamp: number;
    }>;
    rttCoords: {
        [_: string]: string;
    };
    /**
     * @param tileID - the tile ID
     * @param size - The tile size
     */
    constructor(tileID: OverscaledTileID, size: number);
    registerFadeDuration(duration: number): void;
    wasRequested(): boolean;
    clearTextures(painter: any): void;
    /**
     * Given a data object with a 'buffers' property, load it into
     * this tile's elementGroups and buffers properties and set loaded
     * to true. If the data is null, like in the case of an empty
     * GeoJSON tile, no-op but still set loaded to true.
     * @param data - The data from the worker
     * @param painter - the painter
     * @param justReloaded - `true` to just reload
     */
    loadVectorData(data: WorkerTileResult, painter: any, justReloaded?: boolean | null): void;
    /**
     * Release any data or WebGL resources referenced by this tile.
     */
    unloadVectorData(): void;
    getBucket(layer: StyleLayer): Bucket;
    upload(engine: WebGPUEngine): void;
    prepare(imageManager: ImageManager, engine: WebGPUEngine): void;
    queryRenderedFeatures(layers: {
        [_: string]: StyleLayer;
    }, serializedLayers: {
        [_: string]: any;
    }, sourceFeatureState: SourceFeatureState, queryGeometry: Array<Point>, cameraQueryGeometry: Array<Point>, scale: number, params: {
        filter: FilterSpecification;
        layers: Array<string>;
        availableImages: Array<string>;
    }, transform: Transform, maxPitchScaleFactor: number, pixelPosMatrix: mat4): {
        [_: string]: Array<{
            featureIndex: number;
            feature: GeoJSONFeature;
        }>;
    };
    querySourceFeatures(result: Array<GeoJSONFeature>, params?: {
        sourceLayer?: string;
        filter?: FilterSpecification;
        validate?: boolean;
    }): void;
    hasData(): boolean;
    patternsLoaded(): boolean;
    setExpiryData(data: ExpiryData): void;
    getExpiryTimeout(): number;
    setFeatureState(states: LayerFeatureStates, painter: any): void;
    holdingForFade(): boolean;
    symbolFadeFinished(): boolean;
    clearFadeHold(): void;
    setHoldDuration(duration: number): void;
    setDependencies(namespace: string, dependencies: Array<string>): void;
    hasDependency(namespaces: Array<string>, keys: Array<string>): boolean;
}
