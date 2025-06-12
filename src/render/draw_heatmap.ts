import {
    heatmapUniformValues,
    heatmapTextureUniformValues
} from './program/heatmap_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {HeatmapStyleLayer} from '../style/style_layer/heatmap_style_layer';
import type {HeatmapBucket} from '../data/bucket/heatmap_bucket';
import type {OverscaledTileID} from '../source/tile_id';

import {Constants} from 'core/Engines/constants';
import {WebGPUEngine} from 'core/Engines';
import {VertexBuffer} from 'core/Buffers';
import {Texture} from 'core/Materials/Textures/texture';
import {Color} from '@maplibre/maplibre-gl-style-spec';

export function drawHeatmap(painter: Painter, sourceCache: SourceCache, layer: HeatmapStyleLayer, coords: Array<OverscaledTileID>) {
    if (layer.paint.get('heatmap-opacity') === 0) {
        return;
    }

    if (painter.renderPass === 'offscreen') {
        const engine = painter.engine;

        bindFramebuffer(engine, painter, layer);

        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];

            // Skip tiles that have uncovered parents to avoid flickering; we don't need
            // to use complex tile masking here because the change between zoom levels is subtle,
            // so it's fine to simply render the parent until all its 4 children are loaded
            if (sourceCache.hasRenderableParent(coord)) continue;

            const tile = sourceCache.getTile(coord);
            const bucket: HeatmapBucket = (tile.getBucket(layer) as any);
            if (!bucket) continue;

            const programConfiguration = bucket.programConfigurations.get(layer.id);
            const program = painter.useProgram('heatmap', programConfiguration);
            const {zoom} = painter.transform;

            // Allow kernels to be drawn across boundaries, so that
            // large kernels are not clipped to tiles
            // Turn on additive blending for kernels, which is a key aspect of kernel density estimation formula
            engine._cacheRenderPipeline.setDepthTestEnabled(false);
            engine._cacheRenderPipeline.setAlphaBlendEnabled(true);
            engine.setAlphaEquation(Constants.ALPHA_EQUATION_ADD);
            engine.setAlphaMode(Constants.ALPHA_ONEONE_ONEONE);

            const uniformValues = heatmapUniformValues(coord.posMatrix, tile, zoom, layer.paint.get('heatmap-intensity'));

            const layerID = layer.id;
            const vertexBufferPos = new VertexBuffer(engine, bucket.layoutVertexBuffer, 'a_pos', {
                updatable: true,
                label: `Geometry_${layerID}_pos`,
                offset: 0,
                stride: bucket.layoutVertexArray.bytesPerElement,
                size: 2,
                type: VertexBuffer.FLOAT,
                useBytes: true
            });

            const vertexBuffers = {
                'a_pos': vertexBufferPos,
            };

            program.draw(engine, 0, uniformValues, null, layerID, vertexBuffers, bucket.indexBuffer,
                bucket.segments, layer.paint, painter.transform.zoom, programConfiguration);
        }

        engine.endFrame();
        engine.unBindFramebuffer(engine._currentRenderTarget);
        engine._viewport(0, 0, painter.width, painter.height);

    } else if (painter.renderPass === 'translucent') {
        renderTextureToMap(painter, layer);
    }
}

function bindFramebuffer(engine: WebGPUEngine, painter: Painter, layer: HeatmapStyleLayer) {
    // Use a 4x downscaled screen texture for better performance
    let fbo = layer.heatmapFbo;
    if (!fbo) {
        const size = {width: painter.width / 4, height: painter.height / 4};
        const renderTargetOptions = {
            generateMipMaps: false,
            type: Constants.TEXTURETYPE_HALF_FLOAT,
            format: Constants.TEXTUREFORMAT_RGBA,
            samplingMode: Texture.BILINEAR_SAMPLINGMODE,
            generateDepthBuffer: true,
            generateStencilBuffer: true,
            samples: undefined,
            creationFlags: 0,
            noColorAttachment: false,
            useSRGBBuffer: false,
            colorAttachment: undefined,
            label: 'renderTarget',
        };
        fbo = layer.heatmapFbo = engine.createRenderTargetTexture(size, renderTargetOptions);
    }

    engine.bindFramebuffer(fbo, undefined, undefined, undefined, false, 0, 0);
    if (!layer.renderPassDescriptor) {
        engine._startRenderTargetRenderPass(engine._currentRenderTarget, true, Color.transparent, true, true);
        layer.renderPassDescriptor = engine._getCurrentRenderPassWrapper().renderPassDescriptor;
    } else {
        engine._currentRenderPass = engine._renderEncoder.beginRenderPass(layer.renderPassDescriptor);
    }
}

function renderTextureToMap(painter: Painter, layer: HeatmapStyleLayer) {
    const engine = painter.engine;
    const program = painter.useProgram('heatmapTexture');

    painter.colorModeForRenderPass();
    engine._cacheRenderPipeline.setDepthTestEnabled(false);
    engine._cacheRenderPipeline.setDepthWriteEnabled(false);

    // Here we bind two different textures from which we'll sample in drawing
    // heatmaps: the kernel texture, prepared in the offscreen pass, and a
    // color ramp texture.
    const fbo = layer.heatmapFbo;
    if (!fbo) return;
    engine._setInternalTexture('u_image', fbo.texture);

    let colorRampTexture = layer.colorRampTexture;
    if (!colorRampTexture) {
        colorRampTexture = layer.colorRampTexture = engine.createTextureNoUrl(
            layer.colorRamp,
            true,
            false,
            true,
            Texture.BILINEAR_SAMPLINGMODE,
            layer.colorRamp.data.buffer,
            Constants.TEXTUREFORMAT_RGBA
        );
        colorRampTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        colorRampTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
    }
    engine.setTexture2(colorRampTexture, 'u_color_ramp');

    const uniformValues = heatmapTextureUniformValues(painter, layer);

    const layerID = layer.id;
    const vertexBufferPos = new VertexBuffer(engine, painter.viewportBuffer, 'a_pos', {
        updatable: true,
        label: `Geometry_${layerID}_pos`,
        offset: 0,
        stride: 2 * 2,
        size: 2,
        type: VertexBuffer.UNSIGNED_SHORT,
        useBytes: true
    });

    const vertexBuffers = {
        'a_pos': vertexBufferPos,
    };

    program.draw(engine, 0, uniformValues, null, layerID, vertexBuffers, painter.quadTriangleIndexBuffer,
        painter.viewportSegments, layer.paint, painter.transform.zoom);
}
