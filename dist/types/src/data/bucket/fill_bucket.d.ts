import { FillLayoutArray } from '../array_types.g';
import { SegmentVector } from '../segment';
import { ProgramConfigurationSet } from '../program_configuration';
import { LineIndexArray, TriangleIndexArray } from '../index_array_type';
import type { CanonicalTileID } from '../../source/tile_id';
import type { Bucket, BucketParameters, BucketFeature, IndexedFeature, PopulateParameters } from '../bucket';
import type { FillStyleLayer } from '../../style/style_layer/fill_style_layer';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import type Point from '@mapbox/point-geometry';
import type { FeatureStates } from '../../source/source_state';
import type { ImagePosition } from '../../render/image_atlas';
import type { VectorTileLayer } from '@mapbox/vector-tile';
import { DataBuffer } from 'core/Buffers/dataBuffer';
export declare class FillBucket implements Bucket {
    index: number;
    zoom: number;
    overscaling: number;
    layers: Array<FillStyleLayer>;
    layerIds: Array<string>;
    stateDependentLayers: Array<FillStyleLayer>;
    stateDependentLayerIds: Array<string>;
    patternFeatures: Array<BucketFeature>;
    layoutVertexArray: FillLayoutArray;
    layoutVertexBuffer: DataBuffer;
    indexArray: TriangleIndexArray;
    indexBuffer: DataBuffer;
    indexArray2: LineIndexArray;
    indexBuffer2: DataBuffer;
    hasPattern: boolean;
    programConfigurations: ProgramConfigurationSet<FillStyleLayer>;
    segments: SegmentVector;
    segments2: SegmentVector;
    uploaded: boolean;
    engine: WebGPUEngine;
    constructor(options: BucketParameters<FillStyleLayer>);
    populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
    update(states: FeatureStates, vtLayer: VectorTileLayer, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    isEmpty(): boolean;
    uploadPending(): boolean;
    upload(engine: WebGPUEngine): void;
    destroy(): void;
    addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
}
