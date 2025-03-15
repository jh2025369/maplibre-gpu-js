import {clamp} from '../util/util';

import {ImgSource as ImageSource} from '../source/image_source';
import {browser} from '../util/browser';
import {rasterUniformValues} from './program/raster_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {RasterStyleLayer} from '../style/style_layer/raster_style_layer';
import type {OverscaledTileID} from '../source/tile_id';
import {Texture} from 'core/Materials';
import {Constants} from 'core/Engines';
import {VertexBuffer} from 'core/Buffers';

export function drawRaster(painter: Painter, sourceCache: SourceCache, layer: RasterStyleLayer, tileIDs: Array<OverscaledTileID>) {
    if (painter.renderPass !== 'translucent') return;
    if (layer.paint.get('raster-opacity') === 0) return;
    if (!tileIDs.length) return;

    const engine = painter.engine;
    const source = sourceCache.getSource();
    const program = painter.useProgram('raster');

    painter.colorModeForRenderPass();

    const [stencilModes, coords] = source instanceof ImageSource ? [{}, tileIDs] :
        painter.stencilConfigForOverlap(tileIDs);

    const minTileZ = coords[coords.length - 1].overscaledZ;

    const align = !painter.options.moving;
    for (const coord of coords) {
        // Set the lower zoom level to sublayer 0, and higher zoom levels to higher sublayers
        // Use gl.LESS to prevent double drawing in areas where tiles overlap.
        painter.depthModeForSublayer(coord.overscaledZ - minTileZ, layer.paint.get('raster-opacity') === 1, Constants.LESS);

        const tile = sourceCache.getTile(coord);

        tile.registerFadeDuration(layer.paint.get('raster-fade-duration'));

        const parentTile = sourceCache.findLoadedParent(coord, 0),
            fade = getFadeValues(tile, parentTile, sourceCache, layer, painter.transform, painter.style.map.terrain);

        let parentScaleBy, parentTL;

        const textureFilter = layer.paint.get('raster-resampling') === 'nearest' ?  Texture.NEAREST_LINEAR_MIPNEAREST : Texture.LINEAR_LINEAR_MIPNEAREST;
        engine.updateTextureSamplingMode(textureFilter, tile.texture._texture, true);
        tile.texture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        tile.texture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        tile.texture.wrapR = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        engine.setTexture2(tile.texture, 'u_image0');

        if (parentTile) {
            engine.updateTextureSamplingMode(textureFilter, parentTile.texture._texture, true);
            parentTile.texture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            parentTile.texture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            parentTile.texture.wrapR = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            engine.setTexture2(parentTile.texture, 'u_image1');
            parentScaleBy = Math.pow(2, parentTile.tileID.overscaledZ - tile.tileID.overscaledZ);
            parentTL = [tile.tileID.canonical.x * parentScaleBy % 1, tile.tileID.canonical.y * parentScaleBy % 1];

        } else {
            engine.setTexture2(tile.texture, 'u_image1');
        }

        const layerID = layer.id;
        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);
        const terrainCoord = terrainData ? coord : null;
        const posMatrix = terrainCoord ? terrainCoord.posMatrix : painter.transform.calculatePosMatrix(coord.toUnwrapped(), align);
        const uniformValues = rasterUniformValues(posMatrix, parentTL || [0, 0], parentScaleBy || 1, fade, layer);

        if (source instanceof ImageSource) {
            engine._cacheRenderPipeline.resetStencilState();

            const vertexBufferPos = new VertexBuffer(engine, source.boundsBuffer, 'a_pos', {
                updatable: true,
                label: `Geometry_${layerID}_pos`,
                offset: 0,
                stride: 4 * 4,
                size: 2,
                type: VertexBuffer.FLOAT,
                useBytes: true
            });

            const vertexBufferTexturePos = new VertexBuffer(engine, source.boundsBuffer, 'a_texture_pos', {
                updatable: true,
                label: `Geometry_${layerID}_texture_pos`,
                offset: 2 * Float32Array.BYTES_PER_ELEMENT,
                stride: 4 * 4,
                size: 2,
                type: VertexBuffer.FLOAT,
                useBytes: true
            });

            const vertexBuffers = {
                'a_pos': vertexBufferPos,
                'a_texture_pos': vertexBufferTexturePos,
            };

            program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, painter.quadTriangleIndexBuffer,
                source.boundsSegments);
        } else {
            if (stencilModes[coord.overscaledZ] >= 0) {
                engine._cacheRenderPipeline.setStencilState(true, Constants.GREATER, Constants.KEEP, Constants.REPLACE, Constants.KEEP, 0xFF, 0xFF);
                engine._stencilStateComposer.stencilMaterial.enabled = true;
                engine._stencilStateComposer.stencilMaterial.funcRef = stencilModes[coord.overscaledZ];
            } else {
                engine._cacheRenderPipeline.resetStencilState();
            }

            const vertexBufferPos = new VertexBuffer(engine, painter.rasterBoundsBuffer, 'a_pos', {
                updatable: true,
                label: `Geometry_${layerID}_pos`,
                offset: 0,
                stride: 4 * 4,
                size: 2,
                type: VertexBuffer.FLOAT,
                useBytes: true
            });

            const vertexBufferTexturePos = new VertexBuffer(engine, painter.rasterBoundsBuffer, 'a_texture_pos', {
                updatable: true,
                label: `Geometry_${layerID}_texture_pos`,
                offset: 2 * Float32Array.BYTES_PER_ELEMENT,
                stride: 4 * 4,
                size: 2,
                type: VertexBuffer.FLOAT,
                useBytes: true
            });

            const vertexBuffers = {
                'a_pos': vertexBufferPos,
                'a_texture_pos': vertexBufferTexturePos,
            };

            program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, painter.quadTriangleIndexBuffer,
                painter.rasterBoundsSegments);
        }
    }
}

function getFadeValues(tile, parentTile, sourceCache, layer, transform, terrain) {
    const fadeDuration = layer.paint.get('raster-fade-duration');

    if (!terrain && fadeDuration > 0) {
        const now = browser.now();
        const sinceTile = (now - tile.timeAdded) / fadeDuration;
        const sinceParent = parentTile ? (now - parentTile.timeAdded) / fadeDuration : -1;

        const source = sourceCache.getSource();
        const idealZ = transform.coveringZoomLevel({
            tileSize: source.tileSize,
            roundZoom: source.roundZoom
        });

        // if no parent or parent is older, fade in; if parent is younger, fade out
        const fadeIn = !parentTile || Math.abs(parentTile.tileID.overscaledZ - idealZ) > Math.abs(tile.tileID.overscaledZ - idealZ);

        const childOpacity = (fadeIn && tile.refreshedUponExpiration) ? 1 : clamp(fadeIn ? sinceTile : 1 - sinceParent, 0, 1);

        // we don't crossfade tiles that were just refreshed upon expiring:
        // once they're old enough to pass the crossfading threshold
        // (fadeDuration), unset the `refreshedUponExpiration` flag so we don't
        // incorrectly fail to crossfade them when zooming
        if (tile.refreshedUponExpiration && sinceTile >= 1) tile.refreshedUponExpiration = false;

        if (parentTile) {
            return {
                opacity: 1,
                mix: 1 - childOpacity
            };
        } else {
            return {
                opacity: childOpacity,
                mix: 0
            };
        }
    } else {
        return {
            opacity: 1,
            mix: 0
        };
    }
}
