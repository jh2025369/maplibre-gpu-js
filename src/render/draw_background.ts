import {
    backgroundUniformValues,
    backgroundPatternUniformValues
} from './program/background_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {BackgroundStyleLayer} from '../style/style_layer/background_style_layer';
import {OverscaledTileID} from '../source/tile_id';
import {VertexBuffer} from 'core/Buffers/buffer';

export function drawBackground(painter: Painter, sourceCache: SourceCache, layer: BackgroundStyleLayer, coords?: Array<OverscaledTileID>) {
    const color = layer.paint.get('background-color');
    const opacity = layer.paint.get('background-opacity');

    if (opacity === 0) return;

    const engine = painter.engine;
    const transform = painter.transform;
    const tileSize = transform.tileSize;
    const image = layer.paint.get('background-pattern');
    if (painter.isPatternMissing(image)) return;

    const pass = (!image && color.a === 1 && opacity === 1 && painter.opaquePassEnabledForLayer()) ? 'opaque' : 'translucent';
    if (painter.renderPass !== pass) return;

    const program = painter.useProgram(image ? 'backgroundPattern' : 'background');

    painter.depthModeForSublayer(0, pass === 'opaque');
    painter.colorModeForRenderPass();

    const tileIDs = coords ? coords : transform.coveringTiles({tileSize, terrain: painter.style.map.terrain});

    if (image) {
        painter.imageManager.bind(engine, 'u_image');
    }

    const layerID = layer.id;

    const vertexBuffer = new VertexBuffer(engine, painter.tileExtentBuffer, 'a_pos', {
        updatable: true,
        label: `Geometry_${layerID}_data`,
        offset: 0,
        stride: 4,
        size: 1,
        type: VertexBuffer.UNSIGNED_INT,
        useBytes: true
    });

    const crossfade = layer.getCrossfadeParameters();
    for (const tileID of tileIDs) {
        const matrix = coords ? tileID.posMatrix : painter.transform.calculatePosMatrix(tileID.toUnwrapped());
        const uniformValues = image ?
            backgroundPatternUniformValues(matrix, opacity, painter, image, {tileID, tileSize}, crossfade) :
            backgroundUniformValues(matrix, opacity, color);
        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(tileID);

        const vertexBuffers = {
            'a_pos': vertexBuffer
        };

        program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, painter.quadTriangleIndexBuffer,
            painter.tileExtentSegments);
    }
}
