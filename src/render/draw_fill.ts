import {Color} from '@maplibre/maplibre-gl-style-spec';
import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {FillStyleLayer} from '../style/style_layer/fill_style_layer';
import type {OverscaledTileID} from '../source/tile_id';
import {FillBucket} from '../data/bucket/fill_bucket';
import {updatePatternPositionsInProgram} from './update_pattern_positions_in_program';
import {
    fillUniformValues,
    fillPatternUniformValues,
    fillOutlineUniformValues,
    fillOutlinePatternUniformValues
} from './program/fill_program';
import {VertexBuffer} from 'core/Buffers/buffer';

export function drawFill(painter: Painter, sourceCache: SourceCache, layer: FillStyleLayer, coords: Array<OverscaledTileID>) {
    const color = layer.paint.get('fill-color');
    const opacity = layer.paint.get('fill-opacity');
    if (opacity.constantOr(1) === 0) return;

    const pattern = layer.paint.get('fill-pattern');
    const pass = painter.opaquePassEnabledForLayer() && (!pattern.constantOr(1 as any) && color.constantOr(Color.transparent).a === 1 && opacity.constantOr(0) === 1) ? 'opaque' : 'translucent';
    //Draw fill
    if (painter.renderPass === pass) {
        drawFillTiles(painter, sourceCache, layer, coords, false);
    }
    // Draw stroke
    if (painter.renderPass === 'translucent' && layer.paint.get('fill-antialias')) {
        drawFillTiles(painter, sourceCache, layer, coords, true);
    }
}
function drawFillTiles(painter: Painter,
    sourceCache: SourceCache,
    layer: FillStyleLayer,
    coords: Array<OverscaledTileID>,
    isOutline: boolean) {
    const engine = painter.engine;
    const fillPropertyName = 'fill-pattern';

    const patternProperty = layer.paint.get(fillPropertyName);
    const image = patternProperty && patternProperty.constantOr(1 as any);
    const crossfade = layer.getCrossfadeParameters();
    let programName = '', indexBuffer, segments, uniformValues;

    let drawMode;
    if (!isOutline) {
        programName = image ? 'fillPattern' : 'fill';
        drawMode = 0;
    } else {
        programName = image && !layer.getPaintProperty('fill-outline-color') ? 'fillOutlinePattern' : 'fillOutline';
        drawMode = 1;
    }
    const constantPattern = patternProperty.constantOr(null);

    for (const coord of coords) {
        const tile = sourceCache.getTile(coord);
        if (image && !tile.patternsLoaded()) continue;
        const bucket:FillBucket = (tile.getBucket(layer) as any);
        if (!bucket) continue;
        const programConfiguration = bucket.programConfigurations.get(layer.id);

        const program = painter.useProgram(programName, programConfiguration);
        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);
        if (image) {
            engine.setTexture2(tile.imageAtlasTexture, 'u_image');
            programConfiguration.updatePaintBuffers(engine, crossfade);
        }
        updatePatternPositionsInProgram(programConfiguration, fillPropertyName, constantPattern, tile, layer);
        const terrainCoord = terrainData ? coord : null;
        const posMatrix = terrainCoord ? terrainCoord.posMatrix : coord.posMatrix;
        const tileMatrix = painter.translatePosMatrix(posMatrix, tile,
            layer.paint.get('fill-translate'), layer.paint.get('fill-translate-anchor'));

        if (!isOutline) {
            indexBuffer = bucket.indexBuffer;
            segments = bucket.segments;
            uniformValues = image ?
                fillPatternUniformValues(tileMatrix, painter, crossfade, tile) :
                fillUniformValues(tileMatrix);

            painter.depthModeForSublayer(1, painter.renderPass === 'opaque');
        } else {
            indexBuffer = bucket.indexBuffer2;
            segments = bucket.segments2;
            const drawingBufferSize = [engine._renderingCanvas.width, engine._renderingCanvas.height] as [number, number];
            uniformValues = (programName === 'fillOutlinePattern' && image) ?
                fillOutlinePatternUniformValues(tileMatrix, painter, crossfade, tile, drawingBufferSize) :
                fillOutlineUniformValues(tileMatrix, drawingBufferSize);

            painter.depthModeForSublayer(layer.getPaintProperty('fill-outline-color') ? 2 : 0, false);
        }
        const layerID = layer.id;
        const data = bucket.layoutVertexBuffer;
        const vertexArray = bucket.layoutVertexArray;
        const vertexBufferPosNormal = new VertexBuffer(engine, data, 'a_pos', {
            updatable: true,
            label: `Geometry_${layerID}_a_pos`,
            offset: 0,
            stride: vertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBuffers = {
            'a_pos': vertexBufferPosNormal
        };

        painter.colorModeForRenderPass();
        painter.stencilModeForClipping(coord);

        program.draw(engine, drawMode, uniformValues, terrainData, layer.id, vertexBuffers, indexBuffer, segments,
            layer.paint, painter.transform.zoom, programConfiguration);
    }
}

