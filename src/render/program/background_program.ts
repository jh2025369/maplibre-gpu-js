import {bgPatternUniformValues} from './pattern';
import {extend} from '../../util/util';

import type {Painter} from '../painter';
import type {Color, ResolvedImage} from '@maplibre/maplibre-gl-style-spec';
import type {CrossFaded} from '../../style/properties';
import type {CrossfadeParameters} from '../../style/evaluation_parameters';
import type {OverscaledTileID} from '../../source/tile_id';
import {mat4} from 'gl-matrix';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

const backgroundUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_opacity', 1);
    uniformBuffer.addUniform('u_color', 4);
};

const backgroundUniformValues = (matrix: mat4, opacity: number, color: Color) => ({
    'u_matrix': matrix,
    'u_opacity': opacity,
    'u_color': color
});

const backgroundPatternUniformValues = (
    matrix: mat4,
    opacity: number,
    painter: Painter,
    image: CrossFaded<ResolvedImage>,
    tile: {
        tileID: OverscaledTileID;
        tileSize: number;
    },
    crossfade: CrossfadeParameters
) => extend(
    bgPatternUniformValues(image, crossfade, painter, tile),
    {
        'u_matrix': matrix,
        'u_opacity': opacity
    }
);

export {
    backgroundUniforms,
    backgroundUniformValues,
    backgroundPatternUniformValues
};
