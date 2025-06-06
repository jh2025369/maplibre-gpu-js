import {InternalTextureSource, Texture} from 'core/Materials';
import {VertexBuffer} from 'core/Buffers';
import {Constants} from 'core/Engines/constants';
import * as WebGPUConstants from 'core/Engines/WebGPU/webgpuConstants';
import {Tile} from '../source/tile';
import {
    hillshadeUniformValues,
    hillshadeUniformPrepareValues
} from './program/hillshade_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {HillshadeStyleLayer} from '../style/style_layer/hillshade_style_layer';
import type {OverscaledTileID} from '../source/tile_id';
import {RGBAImage} from 'util/image';
import {Color} from '@maplibre/maplibre-gl-style-spec';

export function drawHillshade(painter: Painter, sourceCache: SourceCache, layer: HillshadeStyleLayer, tileIDs: Array<OverscaledTileID>) {
    if (painter.renderPass !== 'offscreen' && painter.renderPass !== 'translucent') return;

    const engine = painter.engine;

    const [stencilModes, coords] = painter.renderPass === 'translucent' ?
        painter.stencilConfigForOverlap(tileIDs) : [{}, tileIDs];

    for (const coord of coords) {
        const tile = sourceCache.getTile(coord);
        if (typeof tile.needsHillshadePrepare !== 'undefined' && tile.needsHillshadePrepare && painter.renderPass === 'offscreen') {
            prepareHillshade(painter, tile, layer);
        } else if (painter.renderPass === 'translucent') {
            renderHillshade(painter, coord, tile, layer, stencilModes[coord.overscaledZ]);
        }
    }

    engine._viewport(0, 0, painter.width, painter.height);
}

function renderHillshade(
    painter: Painter,
    coord: OverscaledTileID,
    tile: Tile,
    layer: HillshadeStyleLayer,
    stencilValue: number) {

    const engine = painter.engine;
    const fbo = tile.fbo;
    if (!fbo) return;

    const program = painter.useProgram('hillshade');
    painter.depthModeForSublayer(0, false);
    painter.colorModeForRenderPass();

    if (stencilValue >= 0) {
        engine._cacheRenderPipeline.setStencilState(true, Constants.GREATER, Constants.KEEP, Constants.REPLACE, Constants.KEEP, 0xFF, 0xFF);
        engine._stencilStateComposer.stencilMaterial.enabled = true;
        engine._stencilStateComposer.stencilMaterial.funcRef = stencilValue;
    } else {
        engine._cacheRenderPipeline.resetStencilState();
    }

    const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);

    engine._setInternalTexture('u_image', fbo.texture);

    const layerID = layer.id;
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

    const terrainCoord = terrainData ? coord : null;
    const uniformValues = hillshadeUniformValues(painter, tile, layer, terrainCoord);

    program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, painter.quadTriangleIndexBuffer, painter.rasterBoundsSegments);
}

// hillshade rendering is done in two steps. the prepare step first calculates the slope of the terrain in the x and y
// directions for each pixel, and saves those values to a framebuffer texture in the r and g channels.
function prepareHillshade(
    painter: Painter,
    tile: Tile,
    layer: HillshadeStyleLayer) {

    const engine = painter.engine;
    const dem = tile.dem;
    const layerID = layer.id;
    if (dem && dem.data) {
        const tileSize = dem.dim;
        const textureStride = dem.stride;

        const pixelData = dem.getPixels();

        // context.pixelStoreUnpackPremultiplyAlpha.set(false);
        tile.demTexture = tile.demTexture || painter.getTileTexture(textureStride);
        if (tile.demTexture) {
            const demTexture = tile.demTexture;
            engine._textureHelper.updateTexture(pixelData.data, demTexture._texture, pixelData.width,
                pixelData.height, 0, WebGPUConstants.TextureFormat.RGBA8Unorm, 0, 0, false, false, 0, 0);

            demTexture.updateSamplingMode(Texture.NEAREST_NEAREST_MIPLINEAR);
            demTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            demTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            demTexture.wrapR = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        } else {
            tile.demTexture = engine.createTextureNoUrl(
                pixelData,
                true,
                false,
                false,
                Texture.NEAREST_SAMPLINGMODE,
                pixelData.data.buffer,
                Constants.TEXTUREFORMAT_RGBA
            );
            tile.demTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            tile.demTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        }

        let fbo = tile.fbo;

        if (!fbo) {
            const size = {width: tileSize, height: tileSize};
            // const renderTexture = engine._createInternalTexture(
            //     size,
            //     {
            //         generateMipMaps: false,
            //         samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
            //         creationFlags: 0,
            //         samples: undefined,
            //         label: `renderTarget_${layerID}`,
            //         format: Constants.TEXTUREFORMAT_RGBA,
            //         type: Constants.TEXTURETYPE_UNSIGNED_BYTE
            //     },
            //     true,
            //     InternalTextureSource.RenderTarget
            // );
            // engine._textureHelper.createGPUTextureForInternalTexture(renderTexture, undefined, undefined, undefined, 0);

            const renderTargetOptions = {
                generateMipMaps: false,
                type: Constants.TEXTURETYPE_UNSIGNED_BYTE,
                format: Constants.TEXTUREFORMAT_RGBA,
                samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
                generateDepthBuffer: true,
                generateStencilBuffer: true,
                samples: undefined,
                creationFlags: 0,
                noColorAttachment: false,
                useSRGBBuffer: false,
                colorAttachment: undefined,
                label: 'renderTarget',
            };
            fbo = tile.fbo = engine.createRenderTargetTexture(size, renderTargetOptions);
        }

        engine.bindFramebuffer(fbo, undefined, undefined, undefined, false, 0, 0);
        if (!tile.renderPassDescriptor) {
            engine._startRenderTargetRenderPass(engine._currentRenderTarget, true, Color.transparent, true, true);
            tile.renderPassDescriptor = engine._getCurrentRenderPassWrapper().renderPassDescriptor;
        } else {
            engine._currentRenderPass = engine._renderEncoder.beginRenderPass(tile.renderPassDescriptor);
        }

        const program = painter.useProgram('hillshadePrepare');
        painter.depthModeForSublayer(0, false);
        painter.colorModeForRenderPass();

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

        engine.setTexture2(tile.demTexture, 'u_image');

        const uniformValues = hillshadeUniformPrepareValues(tile.tileID, dem);

        program.draw(engine, 0, uniformValues, null, layerID, vertexBuffers, painter.quadTriangleIndexBuffer, painter.rasterBoundsSegments);

        tile.needsHillshadePrepare = false;
        engine.endFrame();
        engine.unBindFramebuffer(engine._currentRenderTarget);
    }
}
