import {mat4} from 'gl-matrix';
import {Painter} from '../painter';
import {Tile} from '../../source/tile';
import {CrossfadeParameters} from '../../style/evaluation_parameters';
import {extend} from '../../util/util';
import {patternUniformValues} from './pattern';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

const fillUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
};
const fillPatternUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_texsize', 2);
    uniformBuffer.addUniform('u_fade', 1);
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_pixel_coord_upper', 2);
    uniformBuffer.addUniform('u_pixel_coord_lower', 2);
    uniformBuffer.addUniform('u_scale', 3);
};
const fillOutlineUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_world', 2);
};
const fillOutlinePatternUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_texsize', 2);
    uniformBuffer.addUniform('u_fade', 1);
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_world', 2);
    uniformBuffer.addUniform('u_pixel_coord_upper', 2);
    uniformBuffer.addUniform('u_pixel_coord_lower', 2);
    uniformBuffer.addUniform('u_scale', 3);
};

const fillUniformValues = (matrix: mat4) => {
    return {'u_matrix': matrix};
};
const fillPatternUniformValues = (
    matrix: mat4,
    painter: Painter,
    crossfade: CrossfadeParameters,
    tile: Tile
) => extend(
    fillUniformValues(matrix),
    patternUniformValues(crossfade, painter, tile)
);
const fillOutlineUniformValues = (matrix: mat4, drawingBufferSize: [number, number]) => {
    return {
        'u_matrix': matrix,
        'u_world': drawingBufferSize,
    };
};
const fillOutlinePatternUniformValues = (
    matrix: mat4,
    painter: Painter,
    crossfade: CrossfadeParameters,
    tile: Tile,
    drawingBufferSize: [number, number]
) => extend(
    fillPatternUniformValues(matrix, painter, crossfade, tile),
    {
        'u_world': drawingBufferSize
    }
);

export {
    fillUniformValues,
    fillPatternUniformValues,
    fillOutlineUniformValues,
    fillOutlinePatternUniformValues,
    fillUniforms,
    fillOutlineUniforms,
    fillPatternUniforms,
    fillOutlinePatternUniforms
};
