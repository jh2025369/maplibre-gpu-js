import {patternUniformValues} from './pattern';

import {mat3, mat4, vec3} from 'gl-matrix';
import {extend} from '../../util/util';

import type {Painter} from '../painter';
import type {OverscaledTileID} from '../../source/tile_id';
import type {CrossfadeParameters} from '../../style/evaluation_parameters';
import type {Tile} from '../../source/tile';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

const fillExtrusionUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_lightpos', 3);
    uniformBuffer.addUniform('u_lightintensity', 1);
    uniformBuffer.addUniform('u_lightcolor', 3);
    uniformBuffer.addUniform('u_vertical_gradient', 1);
    uniformBuffer.addUniform('u_opacity', 1);
};

const fillExtrusionPatternUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_lightpos', 3);
    uniformBuffer.addUniform('u_lightintensity', 1);
    uniformBuffer.addUniform('u_lightcolor', 3);
    uniformBuffer.addUniform('u_vertical_gradient', 1);
    uniformBuffer.addUniform('u_height_factor', 1);
    uniformBuffer.addUniform('u_texsize', 2);
    uniformBuffer.addUniform('u_pixel_coord_upper', 2);
    uniformBuffer.addUniform('u_pixel_coord_lower', 2);
    uniformBuffer.addUniform('u_scale', 3);
    uniformBuffer.addUniform('u_fade', 1);
    uniformBuffer.addUniform('u_opacity', 1);
};

const fillExtrusionUniformValues = (
    matrix: mat4,
    painter: Painter,
    shouldUseVerticalGradient: boolean,
    opacity: number
) => {
    const light = painter.style.light;
    const _lp = light.properties.get('position');
    const lightPos = [_lp.x, _lp.y, _lp.z] as vec3;
    const lightMat = mat3.create();
    if (light.properties.get('anchor') === 'viewport') {
        mat3.fromRotation(lightMat, -painter.transform.angle);
    }
    vec3.transformMat3(lightPos, lightPos, lightMat);

    const lightColor = light.properties.get('color');

    return {
        'u_matrix': matrix,
        'u_lightpos': lightPos,
        'u_lightintensity': light.properties.get('intensity'),
        'u_lightcolor': [lightColor.r, lightColor.g, lightColor.b],
        'u_vertical_gradient': +shouldUseVerticalGradient,
        'u_opacity': opacity
    };
};

const fillExtrusionPatternUniformValues = (
    matrix: mat4,
    painter: Painter,
    shouldUseVerticalGradient: boolean,
    opacity: number,
    coord: OverscaledTileID,
    crossfade: CrossfadeParameters,
    tile: Tile
) => {
    return extend(fillExtrusionUniformValues(matrix, painter, shouldUseVerticalGradient, opacity),
        patternUniformValues(crossfade, painter, tile),
        {
            'u_height_factor': -Math.pow(2, coord.overscaledZ) / tile.tileSize / 8
        });
};

export {
    fillExtrusionUniforms,
    fillExtrusionPatternUniforms,
    fillExtrusionUniformValues,
    fillExtrusionPatternUniformValues
};
