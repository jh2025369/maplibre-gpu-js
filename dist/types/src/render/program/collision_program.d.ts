import type { Transform } from '../../geo/transform';
import type { Tile } from '../../source/tile';
import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/index';
declare const collisionUniforms: (uniformBuffer: UniformBuffer) => void;
declare const collisionCircleUniforms: (uniformBuffer: UniformBuffer) => void;
declare const collisionUniformValues: (matrix: mat4, transform: Transform, tile: Tile) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_camera_to_center_distance: {
        value: number;
        type: string;
    };
    u_pixels_to_tile_units: {
        value: number;
        type: string;
    };
    u_extrude_scale: {
        value: number[];
        type: string;
    };
    u_overscale_factor: {
        value: number;
        type: string;
    };
};
declare const collisionCircleUniformValues: (matrix: mat4, invMatrix: mat4, transform: Transform) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_inv_matrix: {
        value: mat4;
        type: string;
    };
    u_camera_to_center_distance: {
        value: number;
        type: string;
    };
    u_viewport_size: {
        value: number[];
        type: string;
    };
};
export { collisionUniforms, collisionUniformValues, collisionCircleUniforms, collisionCircleUniformValues };
