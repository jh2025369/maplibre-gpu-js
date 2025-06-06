import { FillExtrusionLayoutArray, PosArray } from '../array_types.g';
import { SegmentVector } from '../segment';
import { ProgramConfigurationSet } from '../program_configuration';
import { TriangleIndexArray } from '../index_array_type';
import type { CanonicalTileID } from '../../source/tile_id';
import type { Bucket, BucketParameters, BucketFeature, IndexedFeature, PopulateParameters } from '../bucket';
import type { FillExtrusionStyleLayer } from '../../style/style_layer/fill_extrusion_style_layer';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import type Point from '@mapbox/point-geometry';
import type { FeatureStates } from '../../source/source_state';
import type { ImagePosition } from '../../render/image_atlas';
import type { VectorTileLayer } from '@mapbox/vector-tile';
import { DataBuffer } from 'core/Buffers/dataBuffer';
export declare class FillExtrusionBucket implements Bucket {
    index: number;
    zoom: number;
    overscaling: number;
    layers: Array<FillExtrusionStyleLayer>;
    layerIds: Array<string>;
    stateDependentLayers: Array<FillExtrusionStyleLayer>;
    stateDependentLayerIds: Array<string>;
    layoutVertexArray: FillExtrusionLayoutArray;
    layoutVertexBuffer: DataBuffer;
    centroidVertexArray: PosArray;
    centroidVertexBuffer: DataBuffer;
    indexArray: TriangleIndexArray;
    indexBuffer: DataBuffer;
    hasPattern: boolean;
    programConfigurations: ProgramConfigurationSet<FillExtrusionStyleLayer>;
    segments: SegmentVector;
    uploaded: boolean;
    features: Array<BucketFeature>;
    engine: WebGPUEngine;
    constructor(options: BucketParameters<FillExtrusionStyleLayer>);
    populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
    addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    update(states: FeatureStates, vtLayer: VectorTileLayer, imagePositions: {
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
