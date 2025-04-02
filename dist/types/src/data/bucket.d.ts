import type { CollisionBoxArray } from './array_types.g';
import type { Style } from '../style/style';
import type { TypedStyleLayer } from '../style/style_layer/typed_style_layer';
import type { FeatureIndex } from './feature_index';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import type { FeatureStates } from '../source/source_state';
import type { ImagePosition } from '../render/image_atlas';
import type { CanonicalTileID } from '../source/tile_id';
import type { VectorTileFeature, VectorTileLayer } from '@mapbox/vector-tile';
import Point from '@mapbox/point-geometry';
export type BucketParameters<Layer extends TypedStyleLayer> = {
    index: number;
    layers: Array<Layer>;
    zoom: number;
    pixelRatio: number;
    overscaling: number;
    collisionBoxArray: CollisionBoxArray;
    sourceLayerIndex: number;
    sourceID: string;
};
export type PopulateParameters = {
    featureIndex: FeatureIndex;
    iconDependencies: {};
    patternDependencies: {};
    glyphDependencies: {};
    availableImages: Array<string>;
};
export type IndexedFeature = {
    feature: VectorTileFeature;
    id: number | string;
    index: number;
    sourceLayerIndex: number;
};
export type BucketFeature = {
    index: number;
    sourceLayerIndex: number;
    geometry: Array<Array<Point>>;
    properties: any;
    type: 0 | 1 | 2 | 3;
    id?: any;
    readonly patterns: {
        [_: string]: {
            'min': string;
            'mid': string;
            'max': string;
        };
    };
    sortKey?: number;
};
/**
 * The `Bucket` interface is the single point of knowledge about turning vector
 * tiles into WebGL buffers.
 *
 * `Bucket` is an abstract interface. An implementation exists for each style layer type.
 * Create a bucket via the `StyleLayer#createBucket` method.
 *
 * The concrete bucket types, using layout options from the style layer,
 * transform feature geometries into vertex and index data for use by the
 * vertex shader.  They also (via `ProgramConfiguration`) use feature
 * properties and the zoom level to populate the attributes needed for
 * data-driven styling.
 *
 * Buckets are designed to be built on a worker thread and then serialized and
 * transferred back to the main thread for rendering.  On the worker side, a
 * bucket's vertex, index, and attribute data is stored in `bucket.arrays: ArrayGroup`.
 * When a bucket's data is serialized and sent back to the main thread,
 * is gets deserialized (using `new Bucket(serializedBucketData)`, with
 * the array data now stored in `bucket.buffers: BufferGroup`. BufferGroups
 * hold the same data as ArrayGroups, but are tuned for consumption by WebGL.
 */
export interface Bucket {
    layerIds: Array<string>;
    hasPattern: boolean;
    engine: WebGPUEngine;
    readonly layers: Array<any>;
    readonly stateDependentLayers: Array<any>;
    readonly stateDependentLayerIds: Array<string>;
    populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
    update(states: FeatureStates, vtLayer: VectorTileLayer, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    isEmpty(): boolean;
    upload(engine: WebGPUEngine): void;
    uploadPending(): boolean;
    /**
     * Release the WebGL resources associated with the buffers. Note that because
     * buckets are shared between layers having the same layout properties, they
     * must be destroyed in groups (all buckets for a tile, or all symbol buckets).
     */
    destroy(): void;
}
export declare function deserialize(input: Array<Bucket>, style: Style): {
    [_: string]: Bucket;
};
