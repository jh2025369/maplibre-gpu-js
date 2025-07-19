/// <reference types="gl-matrix" />
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { Tile } from '../../source/tile';
import type { OverscaledTileID } from '../../source/tile_id';
import { CircleStyleLayer } from '../../style/style_layer/circle_style_layer';
import { Painter } from '../painter';
declare const circleUniforms: (uniformBuffer: UniformBuffer) => void;
declare const circleUniformValues: (painter: Painter, coord: OverscaledTileID, tile: Tile, layer: CircleStyleLayer) => {
    u_matrix: {
        value: import("gl-matrix").mat4;
        type: string;
    };
    u_pitch_with_map: {
        value: number;
        type: string;
    };
    u_scale_with_map: {
        value: number;
        type: string;
    };
    u_extrude_scale: {
        value: [number, number];
        type: string;
    };
    u_device_pixel_ratio: {
        value: number;
        type: string;
    };
    u_camera_to_center_distance: {
        value: number;
        type: string;
    };
};
export { circleUniforms, circleUniformValues };
