import {pixelsToTileUnits} from '../../source/pixels_to_tile_units';

import type {Transform} from '../../geo/transform';
import type {Tile} from '../../source/tile';
import {mat4} from 'gl-matrix';
import {UniformBuffer} from 'core/index';

const collisionUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_camera_to_center_distance', 1);
    uniformBuffer.addUniform('u_pixels_to_tile_units', 1);
    uniformBuffer.addUniform('u_extrude_scale', 2);
    uniformBuffer.addUniform('u_overscale_factor', 1);
};

const collisionCircleUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_inv_matrix', 16);
    uniformBuffer.addUniform('u_camera_to_center_distance', 1);
    uniformBuffer.addUniform('u_viewport_size', 2);
};

const collisionUniformValues = (matrix: mat4, transform: Transform, tile: Tile) => {
    const pixelRatio = pixelsToTileUnits(tile, 1, transform.zoom);
    const scale = Math.pow(2, transform.zoom - tile.tileID.overscaledZ);
    const overscaleFactor = tile.tileID.overscaleFactor();
    return {
        'u_matrix': {value: matrix, type: 'mat4'},
        'u_camera_to_center_distance': {value: transform.cameraToCenterDistance, type: 'float'},
        'u_pixels_to_tile_units': {value: pixelRatio, type: 'float'},
        'u_extrude_scale': {
            value: [
                transform.pixelsToGLUnits[0] / (pixelRatio * scale),
                transform.pixelsToGLUnits[1] / (pixelRatio * scale)
            ],
            type: 'vec2'
        },
        'u_overscale_factor': {value: overscaleFactor, type: 'float'}
    };
};

const collisionCircleUniformValues = (matrix: mat4, invMatrix: mat4, transform: Transform) => {
    return {
        'u_matrix': {value: matrix, type: 'mat4'},
        'u_inv_matrix': {value: invMatrix, type: 'mat4'},
        'u_camera_to_center_distance': {value: transform.cameraToCenterDistance, type: 'float'},
        'u_viewport_size': {
            value: [transform.width, transform.height],
            type: 'vec2'
        }
    };
};

export {collisionUniforms, collisionUniformValues, collisionCircleUniforms, collisionCircleUniformValues};
