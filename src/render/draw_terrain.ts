import {terrainUniformValues, terrainDepthUniformValues, terrainCoordsUniformValues} from './program/terrain_program';
import type {Painter} from './painter';
import type {Tile} from '../source/tile';
import {Color} from '@maplibre/maplibre-gl-style-spec';
import {Terrain} from './terrain';
import {Constants} from 'core/Engines';
import {VertexBuffer} from 'core/Buffers';

/**
 * Redraw the Depth Framebuffer
 * @param painter - the painter
 * @param terrain - the terrain
 */
function drawDepth(painter: Painter, terrain: Terrain) {
    const engine = painter.engine;
    const mesh = terrain.getTerrainMesh();
    const tiles = terrain.sourceCache.getRenderableTiles();
    const program = painter.useProgram('terrainDepth');

    engine._cacheRenderPipeline.setDepthCompare(Constants.LEQUAL);
    engine._cacheRenderPipeline.setCullEnabled(true);
    engine._cacheRenderPipeline.setFrontFace(1);

    engine.bindFramebuffer(terrain.getFramebuffer('depth'), undefined, undefined, undefined, false, 0, 0);
    engine._viewport(0, 0, painter.width  / devicePixelRatio, painter.height / devicePixelRatio);
    engine._startRenderTargetRenderPass(engine._currentRenderTarget, true, Color.transparent, true, false);
    terrain.coordsIndex = [];
    for (const tile of tiles) {
        const terrainData = terrain.getTerrainData(tile.tileID);
        const posMatrix = painter.transform.calculatePosMatrix(tile.tileID.toUnwrapped());
        const uniformValues = terrainDepthUniformValues(posMatrix, terrain.getMeshFrameDelta(painter.transform.zoom));

        const vertexBufferPos = new VertexBuffer(engine, mesh.vertexBuffer, 'a_pos3d', {
            updatable: true,
            label: 'terrainDepth',
            offset: 0,
            stride: 4 * 3,
            size: 3,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos3d': vertexBufferPos
        };

        program.draw(engine, 0, uniformValues, terrainData, 'terrain', vertexBuffers, mesh.indexBuffer, mesh.segments);
        terrain.coordsIndex.push(tile.tileID.key);
    }
    engine.endFrame();
    engine.unBindFramebuffer(engine._currentRenderTarget);
    engine._viewport(0, 0, painter.width, painter.height);
}

/**
 * Redraw the Coords Framebuffers
 * @param painter - the painter
 * @param terrain - the terrain
 */
function drawCoords(painter: Painter, terrain: Terrain) {
    const engine = painter.engine;
    const mesh = terrain.getTerrainMesh();
    const coords = terrain.getCoordsTexture();
    const tiles = terrain.sourceCache.getRenderableTiles();

    // draw tile-coords into framebuffer
    const program = painter.useProgram('terrainCoords');

    engine._cacheRenderPipeline.setDepthCompare(Constants.LEQUAL);
    engine._cacheRenderPipeline.setCullEnabled(true);
    engine._cacheRenderPipeline.setFrontFace(1);

    engine.bindFramebuffer(terrain.getFramebuffer('coords'), undefined, undefined, undefined, false, 0, 0);
    engine._viewport(0, 0, painter.width / devicePixelRatio, painter.height / devicePixelRatio);
    engine._startRenderTargetRenderPass(engine._currentRenderTarget, true, Color.transparent, true, false);
    terrain.coordsIndex = [];
    for (const tile of tiles) {
        const terrainData = terrain.getTerrainData(tile.tileID);
        engine.setTexture2(coords, 'u_texture');
        const posMatrix = painter.transform.calculatePosMatrix(tile.tileID.toUnwrapped());
        const uniformValues = terrainCoordsUniformValues(posMatrix, 255 - terrain.coordsIndex.length, terrain.getMeshFrameDelta(painter.transform.zoom));

        const vertexBufferPos = new VertexBuffer(engine, mesh.vertexBuffer, 'a_pos3d', {
            updatable: true,
            label: 'terrainCoords',
            offset: 0,
            stride: 4 * 3,
            size: 3,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos3d': vertexBufferPos
        };

        program.draw(engine, 0, uniformValues, terrainData, 'terrain', vertexBuffers, mesh.indexBuffer, mesh.segments);
        terrain.coordsIndex.push(tile.tileID.key);
    }
    engine.endFrame();
    engine.unBindFramebuffer(engine._currentRenderTarget);
    engine._viewport(0, 0, painter.width, painter.height);
}

function drawTerrain(painter: Painter, terrain: Terrain, tiles: Array<Tile>) {
    const engine = painter.engine;
    const program = painter.useProgram('terrain');
    const mesh = terrain.getTerrainMesh();

    painter.colorModeForRenderPass();
    engine._cacheRenderPipeline.setDepthCompare(Constants.LEQUAL);
    engine._viewportDepthRange(...painter.depthRangeFor3D);
    engine._cacheRenderPipeline.setCullEnabled(true);
    engine._cacheRenderPipeline.setFrontFace(1);

    engine._viewport(0, 0, painter.width, painter.height);

    for (const tile of tiles) {
        const texture = painter.renderToTexture.getTexture(tile);
        const terrainData = terrain.getTerrainData(tile.tileID);
        engine.setTexture2(texture, 'u_texture');
        const posMatrix = painter.transform.calculatePosMatrix(tile.tileID.toUnwrapped());
        const uniformValues = terrainUniformValues(posMatrix, terrain.getMeshFrameDelta(painter.transform.zoom));

        const vertexBufferPos = new VertexBuffer(engine, mesh.vertexBuffer, 'a_pos3d', {
            updatable: true,
            label: 'terrain',
            offset: 0,
            stride: 4 * 3,
            size: 3,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos3d': vertexBufferPos
        };

        program.draw(engine, 0, uniformValues, terrainData, 'terrain', vertexBuffers, mesh.indexBuffer, mesh.segments);
    }

}

export {
    drawTerrain,
    drawDepth,
    drawCoords
};
