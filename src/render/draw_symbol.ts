import Point from '@mapbox/point-geometry';
import {drawCollisionDebug} from './draw_collision_debug';

import {SegmentVector} from '../data/segment';
import {pixelsToTileUnits} from '../source/pixels_to_tile_units';
import * as symbolProjection from '../symbol/projection';
import {EvaluatedZoomSize, evaluateSizeForFeature, evaluateSizeForZoom} from '../symbol/symbol_size';
import {mat4} from 'gl-matrix';
import {addDynamicAttributes} from '../data/bucket/symbol_bucket';

import {getAnchorAlignment, WritingMode} from '../symbol/shaping';
import ONE_EM from '../symbol/one_em';

import {
    symbolIconUniformValues,
    symbolSDFUniformValues,
    symbolTextAndIconUniformValues
} from './program/symbol_program';

import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {SymbolStyleLayer} from '../style/style_layer/symbol_style_layer';

import type {OverscaledTileID} from '../source/tile_id';
import type {CrossTileID, VariableOffset} from '../symbol/placement';
import type {SymbolBucket, SymbolBuffers} from '../data/bucket/symbol_bucket';
import type {TerrainData} from '../render/terrain';
import type {SymbolLayerSpecification} from '@maplibre/maplibre-gl-style-spec';
import type {Transform} from '../geo/transform';
import type {Program} from './program';
import type {TextAnchor} from '../style/style_layer/variable_text_anchor';
import {Texture} from 'core/Materials/Textures/texture';
import {Constants} from 'core/Engines';
import {UniformBuffer, VertexBuffer} from 'core/index';

const identityMat4 = mat4.identity(new Float32Array(16));

export function drawSymbols(painter: Painter, sourceCache: SourceCache, layer: SymbolStyleLayer, coords: Array<OverscaledTileID>, variableOffsets: {
    [_ in CrossTileID]: VariableOffset;
}) {
    if (painter.renderPass !== 'translucent') return;

    // Disable the stencil test so that labels aren't clipped to tile boundaries.
    const hasVariablePlacement = layer._unevaluatedLayout.hasValue('text-variable-anchor') || layer._unevaluatedLayout.hasValue('text-variable-anchor-offset');

    //Compute variable-offsets before painting since icons and text data positioning
    //depend on each other in this case.
    if (hasVariablePlacement) {
        updateVariableAnchors(coords, painter, layer, sourceCache,
            layer.layout.get('text-rotation-alignment'),
            layer.layout.get('text-pitch-alignment'),
            variableOffsets
        );
    }

    if (layer.paint.get('icon-opacity').constantOr(1) !== 0) {
        drawLayerSymbols(painter, sourceCache, layer, coords, false,
            layer.paint.get('icon-translate'),
            layer.paint.get('icon-translate-anchor'),
            layer.layout.get('icon-rotation-alignment'),
            layer.layout.get('icon-pitch-alignment'),
            layer.layout.get('icon-keep-upright')
        );
    }

    if (layer.paint.get('text-opacity').constantOr(1) !== 0) {
        drawLayerSymbols(painter, sourceCache, layer, coords, true,
            layer.paint.get('text-translate'),
            layer.paint.get('text-translate-anchor'),
            layer.layout.get('text-rotation-alignment'),
            layer.layout.get('text-pitch-alignment'),
            layer.layout.get('text-keep-upright')
        );
    }

    if (sourceCache.map.showCollisionBoxes) {
        drawCollisionDebug(painter, sourceCache, layer, coords, layer.paint.get('text-translate'),
            layer.paint.get('text-translate-anchor'), true);
        drawCollisionDebug(painter, sourceCache, layer, coords, layer.paint.get('icon-translate'),
            layer.paint.get('icon-translate-anchor'), false);
    }
}

function calculateVariableRenderShift(
    anchor: TextAnchor,
    width: number,
    height: number,
    textOffset: [number, number],
    textBoxScale: number,
    renderTextSize: number): Point {
    const {horizontalAlign, verticalAlign} = getAnchorAlignment(anchor);
    const shiftX = -(horizontalAlign - 0.5) * width;
    const shiftY = -(verticalAlign - 0.5) * height;
    return new Point(
        (shiftX / textBoxScale + textOffset[0]) * renderTextSize,
        (shiftY / textBoxScale + textOffset[1]) * renderTextSize
    );
}

function updateVariableAnchors(coords: Array<OverscaledTileID>,
    painter: Painter,
    layer:SymbolStyleLayer, sourceCache: SourceCache,
    rotationAlignment: SymbolLayerSpecification['layout']['text-rotation-alignment'],
    pitchAlignment: SymbolLayerSpecification['layout']['text-pitch-alignment'],
    variableOffsets: {[_ in CrossTileID]: VariableOffset}) {
    const tr = painter.transform;
    const rotateWithMap = rotationAlignment === 'map';
    const pitchWithMap = pitchAlignment === 'map';

    for (const coord of coords) {
        const tile = sourceCache.getTile(coord);
        const bucket = tile.getBucket(layer) as SymbolBucket;
        if (!bucket || !bucket.text || !bucket.text.segments.get().length) continue;

        const sizeData = bucket.textSizeData;
        const size = evaluateSizeForZoom(sizeData, tr.zoom);

        const pixelToTileScale = pixelsToTileUnits(tile, 1, painter.transform.zoom);
        const labelPlaneMatrix = symbolProjection.getLabelPlaneMatrix(coord.posMatrix, pitchWithMap, rotateWithMap, painter.transform, pixelToTileScale);
        const updateTextFitIcon = layer.layout.get('icon-text-fit') !== 'none' && bucket.hasIconData();

        if (size) {
            const tileScale = Math.pow(2, tr.zoom - tile.tileID.overscaledZ);
            const getElevation = painter.style.map.terrain ? (x: number, y: number) => painter.style.map.terrain.getElevation(coord, x, y) : null;
            updateVariableAnchorsForBucket(bucket, rotateWithMap, pitchWithMap, variableOffsets,
                tr, labelPlaneMatrix, coord.posMatrix, tileScale, size, updateTextFitIcon, getElevation);
        }
    }
}

function updateVariableAnchorsForBucket(
    bucket: SymbolBucket,
    rotateWithMap: boolean,
    pitchWithMap: boolean,
    variableOffsets: {[_ in CrossTileID]: VariableOffset},
    transform: Transform,
    labelPlaneMatrix: mat4,
    posMatrix: mat4,
    tileScale: number,
    size: EvaluatedZoomSize,
    updateTextFitIcon: boolean,
    getElevation: (x: number, y: number) => number) {
    const placedSymbols = bucket.text.placedSymbolArray;
    const dynamicTextLayoutVertexArray = bucket.text.dynamicLayoutVertexArray;
    const dynamicIconLayoutVertexArray = bucket.icon.dynamicLayoutVertexArray;
    const placedTextShifts = {};

    dynamicTextLayoutVertexArray.clear();
    for (let s = 0; s < placedSymbols.length; s++) {
        const symbol = placedSymbols.get(s);
        const skipOrientation = bucket.allowVerticalPlacement && !symbol.placedOrientation;
        const variableOffset = (!symbol.hidden && symbol.crossTileID && !skipOrientation) ? variableOffsets[symbol.crossTileID] : null;

        if (!variableOffset) {
            // These symbols are from a justification that is not being used, or a label that wasn't placed
            // so we don't need to do the extra math to figure out what incremental shift to apply.
            symbolProjection.hideGlyphs(symbol.numGlyphs, dynamicTextLayoutVertexArray);
        } else  {
            const tileAnchor = new Point(symbol.anchorX, symbol.anchorY);
            const projectedAnchor = symbolProjection.project(tileAnchor, pitchWithMap ? posMatrix : labelPlaneMatrix, getElevation);
            const perspectiveRatio = symbolProjection.getPerspectiveRatio(transform.cameraToCenterDistance, projectedAnchor.signedDistanceFromCamera);
            let renderTextSize = evaluateSizeForFeature(bucket.textSizeData, size, symbol) * perspectiveRatio / ONE_EM;
            if (pitchWithMap) {
                // Go from size in pixels to equivalent size in tile units
                renderTextSize *= bucket.tilePixelRatio / tileScale;
            }

            const {width, height, anchor, textOffset, textBoxScale} = variableOffset;

            const shift = calculateVariableRenderShift(
                anchor, width, height, textOffset, textBoxScale, renderTextSize);

            // Usual case is that we take the projected anchor and add the pixel-based shift
            // calculated above. In the (somewhat weird) case of pitch-aligned text, we add an equivalent
            // tile-unit based shift to the anchor before projecting to the label plane.
            const shiftedAnchor = pitchWithMap ?
                symbolProjection.project(tileAnchor.add(shift), labelPlaneMatrix, getElevation).point :
                projectedAnchor.point.add(rotateWithMap ?
                    shift.rotate(-transform.angle) :
                    shift);

            const angle = (bucket.allowVerticalPlacement && symbol.placedOrientation === WritingMode.vertical) ? Math.PI / 2 : 0;
            for (let g = 0; g < symbol.numGlyphs; g++) {
                addDynamicAttributes(dynamicTextLayoutVertexArray, shiftedAnchor, angle);
            }
            //Only offset horizontal text icons
            if (updateTextFitIcon && symbol.associatedIconIndex >= 0) {
                placedTextShifts[symbol.associatedIconIndex] = {shiftedAnchor, angle};
            }
        }
    }

    if (updateTextFitIcon) {
        dynamicIconLayoutVertexArray.clear();
        const placedIcons = bucket.icon.placedSymbolArray;
        for (let i = 0; i < placedIcons.length; i++) {
            const placedIcon = placedIcons.get(i);
            if (placedIcon.hidden) {
                symbolProjection.hideGlyphs(placedIcon.numGlyphs, dynamicIconLayoutVertexArray);
            } else {
                const shift = placedTextShifts[i];
                if (!shift) {
                    symbolProjection.hideGlyphs(placedIcon.numGlyphs, dynamicIconLayoutVertexArray);
                } else {
                    for (let g = 0; g < placedIcon.numGlyphs; g++) {
                        addDynamicAttributes(dynamicIconLayoutVertexArray, shift.shiftedAnchor, shift.angle);
                    }
                }
            }
        }
        bucket.engine.updateDynamicVertexBuffer(bucket.icon.dynamicLayoutVertexBuffer, dynamicIconLayoutVertexArray.arrayBuffer);
    }
    bucket.engine.updateDynamicVertexBuffer(bucket.text.dynamicLayoutVertexBuffer, dynamicTextLayoutVertexArray.arrayBuffer);
}

function getSymbolProgramName(isSDF: boolean, isText: boolean, bucket: SymbolBucket) {
    if (bucket.iconsInText && isText) {
        return 'symbolTextAndIcon';
    } else if (isSDF) {
        return 'symbolSDF';
    } else {
        return 'symbolIcon';
    }
}

function drawLayerSymbols(
    painter: Painter,
    sourceCache: SourceCache,
    layer: SymbolStyleLayer,
    coords: Array<OverscaledTileID>,
    isText: boolean,
    translate: [number, number],
    translateAnchor: 'map' | 'viewport',
    rotationAlignment: SymbolLayerSpecification['layout']['text-rotation-alignment'],
    pitchAlignment: SymbolLayerSpecification['layout']['text-pitch-alignment'],
    keepUpright: boolean) {

    const engine = painter.engine;
    const tr = painter.transform;

    const rotateWithMap = rotationAlignment === 'map';
    const pitchWithMap = pitchAlignment === 'map';
    const alongLine = rotationAlignment !== 'viewport' && layer.layout.get('symbol-placement') !== 'point';
    // Line label rotation happens in `updateLineLabels`
    // Pitched point labels are automatically rotated by the labelPlaneMatrix projection
    // Unpitched point labels need to have their rotation applied after projection
    const rotateInShader = rotateWithMap && !pitchWithMap && !alongLine;

    const hasSortKey = !layer.layout.get('symbol-sort-key').isConstant();
    let sortFeaturesByKey = false;

    const hasVariablePlacement = layer._unevaluatedLayout.hasValue('text-variable-anchor') || layer._unevaluatedLayout.hasValue('text-variable-anchor-offset');

    const tileRenderState = [];

    for (const coord of coords) {
        const tile = sourceCache.getTile(coord);
        const bucket = tile.getBucket(layer) as SymbolBucket;
        if (!bucket) continue;
        const buffers = isText ? bucket.text : bucket.icon;

        if (!buffers || !buffers.segments.get().length || !buffers.hasVisibleVertices) continue;

        const isSDF = isText || bucket.sdfIcons;

        const sizeData = isText ? bucket.textSizeData : bucket.iconSizeData;
        const transformed = pitchWithMap || tr.pitch !== 0;

        const programName = getSymbolProgramName(isSDF, isText, bucket);
        const size = evaluateSizeForZoom(sizeData, tr.zoom);
        const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);

        let texSize: [number, number];
        let texSizeIcon: [number, number] = [0, 0];
        let atlasTexture: Texture;
        let atlasInterpolation;
        let atlasTextureIcon = null;
        let atlasInterpolationIcon;
        if (isText) {
            atlasTexture = tile.glyphAtlasTexture;
            atlasInterpolation = Texture.TRILINEAR_SAMPLINGMODE;
            const size = tile.glyphAtlasTexture.getSize();
            texSize = [size.width, size.height];
            if (bucket.iconsInText) {
                const size1 = tile.imageAtlasTexture.getSize();
                texSizeIcon = [size1.width, size1.height];
                atlasTextureIcon = tile.imageAtlasTexture;
                const zoomDependentSize = sizeData.kind === 'composite' || sizeData.kind === 'camera';
                atlasInterpolationIcon = transformed || painter.options.rotating || painter.options.zooming || zoomDependentSize ? Texture.TRILINEAR_SAMPLINGMODE : Texture.NEAREST_NEAREST_MIPLINEAR;
            }
        } else {
            const iconScaled = layer.layout.get('icon-size').constantOr(0) !== 1 || bucket.iconsNeedLinear;
            atlasTexture = tile.imageAtlasTexture;
            atlasInterpolation = isSDF || painter.options.rotating || painter.options.zooming || iconScaled || transformed ?
                Texture.TRILINEAR_SAMPLINGMODE :
                Texture.NEAREST_NEAREST_MIPLINEAR;
            const size = tile.imageAtlasTexture.getSize();
            texSize = [size.width, size.height];
        }

        const s = pixelsToTileUnits(tile, 1, painter.transform.zoom);
        const labelPlaneMatrix = symbolProjection.getLabelPlaneMatrix(coord.posMatrix, pitchWithMap, rotateWithMap, painter.transform, s);
        const glCoordMatrix = symbolProjection.getGlCoordMatrix(coord.posMatrix, pitchWithMap, rotateWithMap, painter.transform, s);

        const hasVariableAnchors = hasVariablePlacement && bucket.hasTextData();
        const updateTextFitIcon = layer.layout.get('icon-text-fit') !== 'none' &&
            hasVariableAnchors &&
            bucket.hasIconData();

        if (alongLine) {
            const getElevation = painter.style.map.terrain ? (x: number, y: number) => painter.style.map.terrain.getElevation(coord, x, y) : null;
            const rotateToLine = layer.layout.get('text-rotation-alignment') === 'map';
            symbolProjection.updateLineLabels(bucket, coord.posMatrix, painter, isText, labelPlaneMatrix, glCoordMatrix, pitchWithMap, keepUpright, rotateToLine, getElevation);
        }

        const matrix = painter.translatePosMatrix(coord.posMatrix, tile, translate, translateAnchor),
            uLabelPlaneMatrix = (alongLine || (isText && hasVariablePlacement) || updateTextFitIcon) ? identityMat4 : labelPlaneMatrix,
            uglCoordMatrix = painter.translatePosMatrix(glCoordMatrix, tile, translate, translateAnchor, true);

        const hasHalo = isSDF && layer.paint.get(isText ? 'text-halo-width' : 'icon-halo-width').constantOr(1) !== 0;

        let uniformValues;
        if (isSDF) {
            if (!bucket.iconsInText) {
                uniformValues = symbolSDFUniformValues(sizeData.kind,
                    size, rotateInShader, pitchWithMap, painter, matrix,
                    uLabelPlaneMatrix, uglCoordMatrix, isText, texSize, true);
            } else {
                uniformValues = symbolTextAndIconUniformValues(sizeData.kind,
                    size, rotateInShader, pitchWithMap, painter, matrix,
                    uLabelPlaneMatrix, uglCoordMatrix, texSize, texSizeIcon);
            }
        } else {
            uniformValues = symbolIconUniformValues(sizeData.kind,
                size, rotateInShader, pitchWithMap, painter, matrix,
                uLabelPlaneMatrix, uglCoordMatrix, isText, texSize);
        }

        const state = {
            programName,
            buffers,
            uniformValues,
            atlasTexture,
            atlasTextureIcon,
            atlasInterpolation,
            atlasInterpolationIcon,
            isSDF,
            hasHalo
        };

        if (hasSortKey && bucket.canOverlap) {
            sortFeaturesByKey = true;
            const oldSegments = buffers.segments.get();
            for (const segment of oldSegments) {
                tileRenderState.push({
                    segments: new SegmentVector([segment]),
                    sortKey: segment.sortKey,
                    state,
                    terrainData
                });
            }
        } else {
            tileRenderState.push({
                segments: buffers.segments,
                sortKey: 0,
                state,
                terrainData
            });
        }
    }

    if (sortFeaturesByKey) {
        tileRenderState.sort((a, b) => a.sortKey - b.sortKey);
    }

    for (const segmentState of tileRenderState) {
        const state = segmentState.state;

        const programConfiguration = state.buffers.programConfigurations.get(layer.id);
        const program = painter.useProgram(state.programName, programConfiguration);
        painter.colorModeForRenderPass();
        painter.depthModeForSublayer(0, false);

        state.atlasTexture.updateSamplingMode(state.atlasInterpolation);
        state.atlasTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        state.atlasTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        state.atlasTexture.wrapR = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        engine.setTexture2(state.atlasTexture, 'u_texture');

        if (state.atlasTextureIcon) {
            state.atlasTextureIcon.updateSamplingMode(state.atlasInterpolationIcon);
            state.atlasTextureIcon.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            state.atlasTextureIcon.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            state.atlasTextureIcon.wrapR = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            engine.setTexture2(state.atlasTextureIcon, 'u_texture_icon');
        }

        if (state.isSDF) {
            const uniformValues = state.uniformValues;
            if (state.hasHalo) {
                uniformValues['u_is_halo'].value = 1;
                drawSymbolElements(state.buffers, segmentState.segments, layer, painter, program, uniformValues, segmentState.terrainData);
            }
            uniformValues['u_is_halo'].value = 0;
        }
        drawSymbolElements(state.buffers, segmentState.segments, layer, painter, program, state.uniformValues, segmentState.terrainData);
    }
}

function drawSymbolElements(
    buffers: SymbolBuffers,
    segments: SegmentVector,
    layer: SymbolStyleLayer,
    painter: Painter,
    program: Program,
    uniformValues: UniformBuffer,
    terrainData: TerrainData) {

    const engine = painter.engine;
    const layerID = layer.id;

    const vertexBufferPosOffset = new VertexBuffer(engine, buffers.layoutVertexBuffer, 'a_pos_offset', {
        updatable: true,
        label: `Geometry_${layerID}_pos_offset`,
        offset: 0,
        stride: buffers.layoutVertexArray.bytesPerElement,
        size: 4,
        type: VertexBuffer.SHORT,
        useBytes: true
    });
    const vertexBufferData = new VertexBuffer(engine, buffers.layoutVertexBuffer, 'a_data', {
        updatable: true,
        label: `Geometry_${layerID}_data`,
        offset: 4 * Int16Array.BYTES_PER_ELEMENT,
        stride: buffers.layoutVertexArray.bytesPerElement,
        size: 4,
        type: VertexBuffer.UNSIGNED_SHORT,
        useBytes: true
    });
    const vertexBufferPixeloffset = new VertexBuffer(engine, buffers.layoutVertexBuffer, 'a_pixeloffset', {
        updatable: true,
        label: `Geometry_${layerID}_pixeloffset`,
        offset: 8 * Int16Array.BYTES_PER_ELEMENT,
        stride: buffers.layoutVertexArray.bytesPerElement,
        size: 4,
        type: VertexBuffer.SHORT,
        useBytes: true
    });
    const vertexBufferProjectedPos = new VertexBuffer(engine, buffers.dynamicLayoutVertexBuffer, 'a_projected_pos', {
        updatable: true,
        label: `Geometry_${layerID}_projected_pos`,
        offset: 0,
        stride: buffers.dynamicLayoutVertexArray.bytesPerElement,
        size: 3,
        type: VertexBuffer.FLOAT,
        useBytes: true
    });
    const vertexBufferFadeOpacity = new VertexBuffer(engine, buffers.opacityVertexBuffer, 'a_fade_opacity', {
        updatable: true,
        label: `Geometry_${layerID}_fade_opacity`,
        offset: 0,
        stride: buffers.opacityVertexArray.bytesPerElement,
        size: 1,
        type: VertexBuffer.UNSIGNED_INT,
        useBytes: true
    });

    const vertexBuffers = {
        'a_pos_offset': vertexBufferPosOffset,
        'a_data': vertexBufferData,
        'a_pixeloffset': vertexBufferPixeloffset,
        'a_projected_pos': vertexBufferProjectedPos,
        'a_fade_opacity': vertexBufferFadeOpacity
    };
    program.draw(engine, 0, uniformValues, terrainData, layer.id, vertexBuffers, buffers.indexBuffer, segments, layer.paint,
        painter.transform.zoom, buffers.programConfigurations.get(layer.id));
}
