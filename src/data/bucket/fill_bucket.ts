import {FillLayoutArray} from '../array_types.g';

import {members as layoutAttributes} from './fill_attributes';
import {SegmentVector} from '../segment';
import {ProgramConfigurationSet} from '../program_configuration';
import {LineIndexArray, TriangleIndexArray} from '../index_array_type';
import earcut from 'earcut';
import {classifyRings} from '../../util/classify_rings';
const EARCUT_MAX_RINGS = 500;
import {register} from '../../util/web_worker_transfer';
import {hasPattern, addPatternDependencies} from './pattern_bucket_features';
import {loadGeometry} from '../load_geometry';
import {toEvaluationFeature} from '../evaluation_feature';
import {EvaluationParameters} from '../../style/evaluation_parameters';

import type {CanonicalTileID} from '../../source/tile_id';
import type {
    Bucket,
    BucketParameters,
    BucketFeature,
    IndexedFeature,
    PopulateParameters
} from '../bucket';
import type {FillStyleLayer} from '../../style/style_layer/fill_style_layer';
import type {WebGPUEngine} from 'core/Engines/webgpuEngine';
import type Point from '@mapbox/point-geometry';
import type {FeatureStates} from '../../source/source_state';
import type {ImagePosition} from '../../render/image_atlas';
import type {VectorTileLayer} from '@mapbox/vector-tile';
import {DataBuffer} from 'core/Buffers/dataBuffer';

export class FillBucket implements Bucket {
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

    constructor(options: BucketParameters<FillStyleLayer>) {
        this.zoom = options.zoom;
        this.overscaling = options.overscaling;
        this.layers = options.layers;
        this.layerIds = this.layers.map(layer => layer.id);
        this.index = options.index;
        this.hasPattern = false;
        this.patternFeatures = [];

        this.layoutVertexArray = new FillLayoutArray();
        this.indexArray = new TriangleIndexArray();
        this.indexArray2 = new LineIndexArray();
        this.programConfigurations = new ProgramConfigurationSet(options.layers, options.zoom);
        this.segments = new SegmentVector();
        this.segments2 = new SegmentVector();
        this.stateDependentLayerIds = this.layers.filter((l) => l.isStateDependent()).map((l) => l.id);
    }

    populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID) {
        this.hasPattern = hasPattern('fill', this.layers, options);
        const fillSortKey = this.layers[0].layout.get('fill-sort-key');
        const sortFeaturesByKey = !fillSortKey.isConstant();
        const bucketFeatures: BucketFeature[] = [];

        for (const {feature, id, index, sourceLayerIndex} of features) {
            const needGeometry = this.layers[0]._featureFilter.needGeometry;
            const evaluationFeature = toEvaluationFeature(feature, needGeometry);

            if (!this.layers[0]._featureFilter.filter(new EvaluationParameters(this.zoom), evaluationFeature, canonical)) continue;

            const sortKey = sortFeaturesByKey ?
                fillSortKey.evaluate(evaluationFeature, {}, canonical, options.availableImages) :
                undefined;

            const bucketFeature: BucketFeature = {
                id,
                properties: feature.properties,
                type: feature.type,
                sourceLayerIndex,
                index,
                geometry: needGeometry ? evaluationFeature.geometry : loadGeometry(feature),
                patterns: {},
                sortKey
            };

            bucketFeatures.push(bucketFeature);
        }

        if (sortFeaturesByKey) {
            bucketFeatures.sort((a, b) => a.sortKey - b.sortKey);
        }

        for (const bucketFeature of bucketFeatures) {
            const {geometry, index, sourceLayerIndex} = bucketFeature;

            if (this.hasPattern) {
                const patternFeature = addPatternDependencies('fill', this.layers, bucketFeature, this.zoom, options);
                // pattern features are added only once the pattern is loaded into the image atlas
                // so are stored during populate until later updated with positions by tile worker in addFeatures
                this.patternFeatures.push(patternFeature);
            } else {
                this.addFeature(bucketFeature, geometry, index, canonical, {});
            }

            const feature = features[index].feature;
            options.featureIndex.insert(feature, geometry, index, sourceLayerIndex, this.index);
        }
    }

    update(states: FeatureStates, vtLayer: VectorTileLayer, imagePositions: {
        [_: string]: ImagePosition;
    }) {
        if (!this.stateDependentLayers.length) return;
        this.programConfigurations.updatePaintArrays(states, vtLayer, this.stateDependentLayers, imagePositions);
    }

    addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: {
        [_: string]: ImagePosition;
    }) {
        for (const feature of this.patternFeatures) {
            this.addFeature(feature, feature.geometry, feature.index, canonical, imagePositions);
        }
    }

    isEmpty() {
        return this.layoutVertexArray.length === 0;
    }

    uploadPending(): boolean {
        return !this.uploaded || this.programConfigurations.needsUpload;
    }
    upload(engine: WebGPUEngine) {
        if (!this.uploaded) {
            this.layoutVertexBuffer = engine.createVertexBuffer(this.layoutVertexArray.arrayBuffer);
            this.indexBuffer = engine.createIndexBuffer(this.indexArray.arrayBuffer);
            this.indexBuffer2 = engine.createIndexBuffer(this.indexArray2.arrayBuffer);
        }
        this.programConfigurations.upload(engine);
        this.uploaded = true;
    }

    destroy() {
        if (!this.layoutVertexBuffer) return;
        this.layoutVertexBuffer.underlyingResource.destroy();
        this.indexBuffer.underlyingResource.destroy();
        this.indexBuffer2.underlyingResource.destroy();
        this.programConfigurations.destroy();
        this.segments.destroy();
        this.segments2.destroy();
    }

    addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: {
        [_: string]: ImagePosition;
    }) {
        for (const polygon of classifyRings(geometry, EARCUT_MAX_RINGS)) {
            let numVertices = 0;
            for (const ring of polygon) {
                numVertices += ring.length;
            }

            const triangleSegment = this.segments.prepareSegment(numVertices, this.layoutVertexArray, this.indexArray);
            const triangleIndex = triangleSegment.vertexLength;

            const flattened = [];
            const holeIndices = [];

            for (const ring of polygon) {
                if (ring.length === 0) {
                    continue;
                }

                if (ring !== polygon[0]) {
                    holeIndices.push(flattened.length / 2);
                }

                const lineSegment = this.segments2.prepareSegment(ring.length, this.layoutVertexArray, this.indexArray2);
                const lineIndex = lineSegment.vertexLength;

                this.layoutVertexArray.emplaceBack(ring[0].x, ring[0].y);
                this.indexArray2.emplaceBack(lineIndex + ring.length - 1, lineIndex);
                flattened.push(ring[0].x);
                flattened.push(ring[0].y);

                for (let i = 1; i < ring.length; i++) {
                    this.layoutVertexArray.emplaceBack(ring[i].x, ring[i].y);
                    this.indexArray2.emplaceBack(lineIndex + i - 1, lineIndex + i);
                    flattened.push(ring[i].x);
                    flattened.push(ring[i].y);
                }

                lineSegment.vertexLength += ring.length;
                lineSegment.primitiveLength += ring.length;
            }

            const indices = earcut(flattened, holeIndices);

            for (let i = 0; i < indices.length; i += 3) {
                this.indexArray.emplaceBack(
                    triangleIndex + indices[i],
                    triangleIndex + indices[i + 1],
                    triangleIndex + indices[i + 2]);
            }

            triangleSegment.vertexLength += numVertices;
            triangleSegment.primitiveLength += indices.length / 3;
        }
        this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, feature, index, imagePositions, canonical);
    }
}

register('FillBucket', FillBucket, {omit: ['layers', 'patternFeatures']});
