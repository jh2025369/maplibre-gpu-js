import {
    fillExtrusionUniformValues,
    fillExtrusionPatternUniformValues,
} from './program/fill_extrusion_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {FillExtrusionStyleLayer} from '../style/style_layer/fill_extrusion_style_layer';
import type {FillExtrusionBucket} from '../data/bucket/fill_extrusion_bucket';
import type {OverscaledTileID} from '../source/tile_id';

import {updatePatternPositionsInProgram} from './update_pattern_positions_in_program';
import {Constants} from 'core/Engines/constants';
import {VertexBuffer} from 'core/Buffers/buffer';

export function drawFillExtrusion(painter: Painter, source: SourceCache, layer: FillExtrusionStyleLayer, coords: Array<OverscaledTileID>) {
    const opacity = layer.paint.get('fill-extrusion-opacity');
    if (opacity === 0) {
        return;
    }
    const engine = painter.engine;

    if (painter.renderPass === 'translucent') {
        if (opacity === 1 && !layer.paint.get('fill-extrusion-pattern').constantOr(1 as any)) {
            drawExtrusionTiles(painter, source, layer, coords, () => {
                engine._cacheRenderPipeline.setDepthCompare(Constants.LEQUAL);
                engine._viewportDepthRange(...painter.depthRangeFor3D);
                painter.colorModeForRenderPass();
            });

        } else {
            // Draw transparent buildings in two passes so that only the closest surface is drawn.
            // First draw all the extrusions into only the depth buffer. No colors are drawn.
            drawExtrusionTiles(painter, source, layer, coords, () => {
                engine._cacheRenderPipeline.setDepthCompare(Constants.LEQUAL);
                engine._viewportDepthRange(...painter.depthRangeFor3D);
                engine._cacheRenderPipeline.setWriteMask(0);
            });

            // Then draw all the extrusions a second type, only coloring fragments if they have the
            // same depth value as the closest fragment in the previous pass. Use the stencil buffer
            // to prevent the second draw in cases where we have coincident polygons.
            drawExtrusionTiles(painter, source, layer, coords, () => {
                engine._cacheRenderPipeline.setWriteMask(0xf);
                painter.stencilModeFor3D();
                painter.colorModeForRenderPass();
            });
        }
    }
}

function drawExtrusionTiles(
    painter: Painter,
    source: SourceCache,
    layer: FillExtrusionStyleLayer,
    coords: OverscaledTileID[],
    callback: () => void) {
    const engine = painter.engine;
    const fillPropertyName = 'fill-extrusion-pattern';
    const patternProperty = layer.paint.get(fillPropertyName);
    const image = patternProperty.constantOr(1 as any);
    const crossfade = layer.getCrossfadeParameters();
    const opacity = layer.paint.get('fill-extrusion-opacity');
    const constantPattern = patternProperty.constantOr(null);
    for (const coord of coords) {
        const tile = source.getTile(coord);
        const bucket: FillExtrusionBucket = (tile.getBucket(layer) as any);
        if (!bucket) continue;

        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);
        const programConfiguration = bucket.programConfigurations.get(layer.id);
        const program = painter.useProgram(image ? 'fillExtrusionPattern' : 'fillExtrusion', programConfiguration);
        callback();

        if (image) {
            engine.setTexture2(tile.imageAtlasTexture, 'u_image');
            programConfiguration.updatePaintBuffers(engine, crossfade);
        }

        updatePatternPositionsInProgram(programConfiguration, fillPropertyName, constantPattern, tile, layer);

        const matrix = painter.translatePosMatrix(
            coord.posMatrix,
            tile,
            layer.paint.get('fill-extrusion-translate'),
            layer.paint.get('fill-extrusion-translate-anchor'));

        const shouldUseVerticalGradient = layer.paint.get('fill-extrusion-vertical-gradient');
        const uniformValues = image ?
            fillExtrusionPatternUniformValues(matrix, painter, shouldUseVerticalGradient, opacity, coord, crossfade, tile) :
            fillExtrusionUniformValues(matrix, painter, shouldUseVerticalGradient, opacity);

        const vertexBufferPos = new VertexBuffer(engine, bucket.layoutVertexBuffer, 'a_pos', {
            updatable: true,
            label: `Geometry_${layer.id}_pos`,
            offset: 0,
            stride: bucket.layoutVertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBufferNormalEd = new VertexBuffer(engine, bucket.layoutVertexBuffer, 'a_normal_ed', {
            updatable: true,
            label: `Geometry_${layer.id}_normal_ed`,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT,
            stride: bucket.layoutVertexArray.bytesPerElement,
            size: 4,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos': vertexBufferPos,
            'a_normal_ed': vertexBufferNormalEd
        };

        if (painter.style.map.terrain) {
            const vertexBufferCentroid = new VertexBuffer(engine, bucket.centroidVertexBuffer, 'a_centroid', {
                updatable: true,
                label: `Geometry_${layer.id}_centroid`,
                offset: 0,
                stride: bucket.centroidVertexArray.bytesPerElement,
                size: 2,
                type: VertexBuffer.FLOAT,
                useBytes: true
            });

            vertexBuffers['a_centroid'] = vertexBufferCentroid;
        }

        engine._cacheRenderPipeline.setCullEnabled(true);
        engine._cacheRenderPipeline.setFrontFace(1);

        program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, bucket.indexBuffer,
            bucket.segments, layer.paint, painter.transform.zoom, programConfiguration);
    }
}
