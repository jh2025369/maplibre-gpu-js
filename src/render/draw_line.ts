import {
    lineUniformValues,
    linePatternUniformValues,
    lineSDFUniformValues,
    lineGradientUniformValues
} from './program/line_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {LineStyleLayer} from '../style/style_layer/line_style_layer';
import type {LineBucket} from '../data/bucket/line_bucket';
import type {OverscaledTileID} from '../source/tile_id';
import {VertexBuffer} from 'core/Buffers/buffer';
import {EXTENT} from '../data/extent';
import {clamp, nextPowerOfTwo} from '../util/util';
import {renderColorRamp} from '../util/color_ramp';
import {Constants} from 'core/Engines/constants';
import {Texture} from 'core/Materials/Textures/texture';
import * as WebGPUConstants from 'core/Engines/WebGPU/webgpuConstants';

export function drawLine(painter: Painter, sourceCache: SourceCache, layer: LineStyleLayer, coords: Array<OverscaledTileID>) {

    if (painter.renderPass !== 'translucent') return;

    const engine = painter.engine;

    const opacity = layer.paint.get('line-opacity');
    const width = layer.paint.get('line-width');
    if (opacity.constantOr(1) === 0 || width.constantOr(1) === 0) return;

    const dasharray = layer.paint.get('line-dasharray');
    const patternProperty = layer.paint.get('line-pattern');
    const image = patternProperty.constantOr(1 as any);

    const gradient = layer.paint.get('line-gradient');
    const crossfade = layer.getCrossfadeParameters();

    let firstTile = true;

    for (const coord of coords) {
        const tile = sourceCache.getTile(coord);

        if (image && !tile.patternsLoaded()) continue;

        const bucket: LineBucket = (tile.getBucket(layer) as any);
        if (!bucket) continue;

        const programConfiguration = bucket.programConfigurations.get(layer.id);
        const programId =
            image ? 'linePattern' :
                dasharray ? 'lineSDF' :
                    gradient ? 'lineGradient' : 'line';

        const program = painter.useProgram(programId, programConfiguration);

        painter.depthModeForSublayer(0, false);
        painter.colorModeForRenderPass();

        const programChanged = firstTile;
        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);

        const constantPattern = patternProperty.constantOr(null);
        if (constantPattern && tile.imageAtlas) {
            const atlas = tile.imageAtlas;
            const posTo = atlas.patternPositions[constantPattern.to.toString()];
            const posFrom = atlas.patternPositions[constantPattern.from.toString()];
            if (posTo && posFrom) programConfiguration.setConstantPatternPositions(posTo, posFrom);
        }

        const terrainCoord = terrainData ? coord : null;
        const uniformValues = image ? linePatternUniformValues(painter, tile, layer, crossfade, terrainCoord) :
            dasharray ? lineSDFUniformValues(painter, tile, layer, dasharray, crossfade, terrainCoord) :
                gradient ? lineGradientUniformValues(painter, tile, layer, bucket.lineClipsArray.length, terrainCoord) :
                    lineUniformValues(painter, tile, layer, terrainCoord);

        if (image) {
            engine.setTexture2(tile.imageAtlasTexture, 'u_image');
            programConfiguration.updatePaintBuffers(engine, crossfade);
        } else if (dasharray && (programChanged || painter.lineAtlas.dirty)) {
            painter.lineAtlas.bind(engine);
        } else if (gradient) {
            const layerGradient = bucket.gradients[layer.id];
            let gradientTexture = layerGradient.texture;
            if (layer.gradientVersion !== layerGradient.version) {
                let textureResolution = 256;
                if (layer.stepInterpolant) {
                    const sourceMaxZoom = sourceCache.getSource().maxzoom;
                    const potentialOverzoom = coord.canonical.z === sourceMaxZoom ?
                        Math.ceil(1 << (painter.transform.maxZoom - coord.canonical.z)) : 1;
                    const lineLength = bucket.maxLineLength / EXTENT;
                    // Logical pixel tile size is 512px, and 1024px right before current zoom + 1
                    const maxTilePixelSize = 1024;
                    // Maximum possible texture coverage heuristic, bound by hardware max texture size
                    const maxTextureCoverage = lineLength * maxTilePixelSize * potentialOverzoom;
                    textureResolution = clamp(nextPowerOfTwo(maxTextureCoverage), 256, 256 * 64);
                }
                layerGradient.gradient = renderColorRamp({
                    expression: layer.gradientExpression(),
                    evaluationKey: 'lineProgress',
                    resolution: textureResolution,
                    image: layerGradient.gradient || undefined,
                    clips: bucket.lineClipsArray
                });
                if (layerGradient.texture) {
                    engine._textureHelper.updateTexture(layerGradient.gradient.data, layerGradient.texture._texture, layerGradient.gradient.width,
                        layerGradient.gradient.height, 0, WebGPUConstants.TextureFormat.RGBA8Unorm, 0, 0, false, true, 0, 0);
                } else {
                    layerGradient.texture = engine.createTextureNoUrl(
                        layerGradient.gradient,
                        true,
                        false,
                        true,
                        layer.stepInterpolant ? Texture.NEAREST_SAMPLINGMODE : Texture.BILINEAR_SAMPLINGMODE,
                        layerGradient.gradient.data.buffer,
                        Constants.TEXTUREFORMAT_RGBA
                    );
                    layerGradient.texture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
                    layerGradient.texture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
                }
                layerGradient.version = layer.gradientVersion;
                gradientTexture = layerGradient.texture;
            }
            const filter = layer.stepInterpolant ? Texture.NEAREST_NEAREST_MIPLINEAR : Texture.TRILINEAR_SAMPLINGMODE;
            gradientTexture.updateSamplingMode(filter);
            gradientTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            gradientTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            gradientTexture.wrapR = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            engine.setTexture2(gradientTexture, 'u_image');
        }

        const layerID = layer.id;
        const data = bucket.layoutVertexBuffer || bucket.layoutVertexBuffer2;
        const vertexArray = bucket.layoutVertexArray || bucket.layoutVertexArray2;
        const vertexBufferPosNormal = new VertexBuffer(engine, data, 'a_pos_normal', {
            updatable: true,
            label: `Geometry_${layerID}_pos_normal`,
            offset: 0,
            stride: vertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });

        const vertexBufferData = new VertexBuffer(engine, data, 'a_data', {
            updatable: true,
            label: `Geometry_${layerID}_data`,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT,
            stride: vertexArray.bytesPerElement,
            size: 1,
            type: VertexBuffer.UNSIGNED_INT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos_normal': vertexBufferPosNormal,
            'a_data': vertexBufferData
        };

        painter.stencilModeForClipping(coord);

        program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, bucket.indexBuffer,
            bucket.segments, layer.paint, painter.transform.zoom, programConfiguration);

        firstTile = false;
    }
}
