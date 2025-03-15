// import {StencilMode} from '../gl/stencil_mode';
// import {DepthMode} from '../gl/depth_mode';
// import {CullFaceMode} from '../gl/cull_face_mode';
import {Program} from './program';
import {circleUniformValues} from './program/circle_program';
import {SegmentVector} from '../data/segment';
import {OverscaledTileID} from '../source/tile_id';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {CircleStyleLayer} from '../style/style_layer/circle_style_layer';
import type {CircleBucket} from '../data/bucket/circle_bucket';
import type {ProgramConfiguration} from '../data/program_configuration';

// import type {VertexBuffer} from '../gl/vertex_buffer';
// import type {IndexBuffer} from '../gl/index_buffer';
// import type {UniformValues} from './uniform_binding';

import type {TerrainData} from '../render/terrain';
import {VertexBuffer} from 'core/Buffers/buffer';

// type TileRenderState = {
//     programConfiguration: ProgramConfiguration;
//     program: Program<any>;
//     layoutVertexBuffer: VertexBuffer;
//     indexBuffer: IndexBuffer;
//     uniformValues: UniformValues<CircleUniformsType>;
//     terrainData: TerrainData;
// };

// type SegmentsTileRenderState = {
//     segments: SegmentVector;
//     sortKey: number;
//     state: TileRenderState;
// };

export function drawCircles(painter: Painter, sourceCache: SourceCache, layer: CircleStyleLayer, coords: Array<OverscaledTileID>) {

    if (painter.renderPass !== 'translucent') return;

    const opacity = layer.paint.get('circle-opacity');
    const strokeWidth = layer.paint.get('circle-stroke-width');
    const strokeOpacity = layer.paint.get('circle-stroke-opacity');
    const sortFeaturesByKey = !layer.layout.get('circle-sort-key').isConstant();

    if (opacity.constantOr(1) === 0 && (strokeWidth.constantOr(1) === 0 || strokeOpacity.constantOr(1) === 0)) {
        return;
    }

    const engine = painter.engine;

    const segmentsRenderStates = [];

    for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];

        const tile = sourceCache.getTile(coord);
        const bucket: CircleBucket<any> = (tile.getBucket(layer) as any);
        if (!bucket) continue;

        const programConfiguration = bucket.programConfigurations.get(layer.id);

        const program = painter.useProgram('circle', programConfiguration);

        painter.depthModeForSublayer(0, false);
        painter.colorModeForRenderPass();

        const layoutVertexBuffer = bucket.layoutVertexBuffer;
        const indexBuffer = bucket.indexBuffer;
        const vertexArray = bucket.layoutVertexArray;
        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);
        const uniformValues = circleUniformValues(painter, coord, tile, layer);

        const state = {
            programConfiguration,
            program,
            layoutVertexBuffer,
            indexBuffer,
            uniformValues,
            terrainData,
            bucket,
            vertexArray
        };

        if (sortFeaturesByKey) {
            const oldSegments = bucket.segments.get();
            for (const segment of oldSegments) {
                segmentsRenderStates.push({
                    segments: new SegmentVector([segment]),
                    sortKey: (segment.sortKey as any as number),
                    state,
                });
            }
        } else {
            segmentsRenderStates.push({
                segments: bucket.segments,
                sortKey: 0,
                state,
            });
        }

    }

    if (sortFeaturesByKey) {
        segmentsRenderStates.sort((a, b) => a.sortKey - b.sortKey);
    }

    for (const segmentsState of segmentsRenderStates) {
        const {programConfiguration, program, layoutVertexBuffer, indexBuffer, uniformValues, terrainData, vertexArray} = segmentsState.state;
        const segments = segmentsState.segments;
        const data = layoutVertexBuffer;
        const layerID = layer.id;

        const vertexBufferPos = new VertexBuffer(engine, data, 'a_pos', {
            updatable: true,
            label: `Geometry_${layerID}_pos`,
            offset: 0,
            stride: vertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos': vertexBufferPos,
        };

        program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, indexBuffer, segments,
            layer.paint, painter.transform.zoom, programConfiguration);
    }
}
