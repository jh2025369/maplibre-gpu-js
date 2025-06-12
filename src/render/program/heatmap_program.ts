import {mat4} from 'gl-matrix';
import {pixelsToTileUnits} from '../../source/pixels_to_tile_units';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

import type {Tile} from '../../source/tile';
import type {Painter} from '../painter';
import type {HeatmapStyleLayer} from '../../style/style_layer/heatmap_style_layer';

const heatmapUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_extrude_scale', 1);
    uniformBuffer.addUniform('u_intensity', 1);
};

const heatmapTextureUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_world', 2);
    uniformBuffer.addUniform('u_opacity', 1);
};

const heatmapUniformValues = (matrix: mat4, tile: Tile, zoom: number, intensity: number) => ({
    'u_matrix': {value: matrix, type: 'mat4'},
    'u_extrude_scale': {value: pixelsToTileUnits(tile, 1, zoom), type: 'float'},
    'u_intensity': {value: intensity, type: 'float'}
});

const heatmapTextureUniformValues = (
    painter: Painter,
    layer: HeatmapStyleLayer
) => {
    const matrix = mat4.create();
    mat4.orthoZO(matrix, 0, painter.width, painter.height, 0, 0, 1);

    const engine = painter.engine;

    return {
        'u_matrix': {value: matrix, type: 'mat4'},
        'u_world': {value: [engine._renderingCanvas.width, engine._renderingCanvas.height], type: 'vec2'},
        'u_opacity': {value: layer.paint.get('heatmap-opacity'), type: 'float'}
    };
};

export {
    heatmapUniforms,
    heatmapTextureUniforms,
    heatmapUniformValues,
    heatmapTextureUniformValues
};
