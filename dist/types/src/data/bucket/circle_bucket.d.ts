import { CircleLayoutArray } from '../array_types.g';
import { SegmentVector } from '../segment';
import { ProgramConfigurationSet } from '../program_configuration';
import { TriangleIndexArray } from '../index_array_type';
import type { CanonicalTileID } from '../../source/tile_id';
import type { Bucket, BucketParameters, BucketFeature, IndexedFeature, PopulateParameters } from '../bucket';
import type { CircleStyleLayer } from '../../style/style_layer/circle_style_layer';
import type { HeatmapStyleLayer } from '../../style/style_layer/heatmap_style_layer';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import type Point from '@mapbox/point-geometry';
import type { FeatureStates } from '../../source/source_state';
import type { ImagePosition } from '../../render/image_atlas';
import type { VectorTileLayer } from '@mapbox/vector-tile';
import { DataBuffer } from 'core/Buffers/dataBuffer';
/**
 * @internal
 * Circles are represented by two triangles.
 *
 * Each corner has a pos that is the center of the circle and an extrusion
 * vector that is where it points.
 */
export declare class CircleBucket<Layer extends CircleStyleLayer | HeatmapStyleLayer> implements Bucket {
    index: number;
    zoom: number;
    overscaling: number;
    layerIds: Array<string>;
    layers: Array<Layer>;
    stateDependentLayers: Array<Layer>;
    stateDependentLayerIds: Array<string>;
    layoutVertexArray: CircleLayoutArray;
    layoutVertexBuffer: DataBuffer;
    indexArray: TriangleIndexArray;
    indexBuffer: DataBuffer;
    hasPattern: boolean;
    programConfigurations: ProgramConfigurationSet<Layer>;
    segments: SegmentVector;
    uploaded: boolean;
    engine: WebGPUEngine;
    constructor(options: BucketParameters<Layer>);
    populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
    update(states: FeatureStates, vtLayer: VectorTileLayer, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    isEmpty(): boolean;
    uploadPending(): boolean;
    upload(engine: WebGPUEngine): void;
    destroy(): void;
    addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID): void;
}
