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
        'u_matrix': matrix,
        'u_camera_to_center_distance': transform.cameraToCenterDistance,
        'u_pixels_to_tile_units': pixelRatio,
        'u_extrude_scale': [transform.pixelsToGLUnits[0] / (pixelRatio * scale),
            transform.pixelsToGLUnits[1] / (pixelRatio * scale)],
        'u_overscale_factor': overscaleFactor
    };
};

const collisionCircleUniformValues = (matrix: mat4, invMatrix: mat4, transform: Transform) => {
    return {
        'u_matrix': matrix,
        'u_inv_matrix': invMatrix,
        'u_camera_to_center_distance': transform.cameraToCenterDistance,
        'u_viewport_size': [transform.width, transform.height]
    };
};

export {collisionUniforms, collisionUniformValues, collisionCircleUniforms, collisionCircleUniformValues};
