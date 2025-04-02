/// <reference types="gl-matrix" />
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { Tile } from '../../source/tile';
import type { OverscaledTileID } from '../../source/tile_id';
import { CircleStyleLayer } from '../../style/style_layer/circle_style_layer';
import { Painter } from '../painter';
declare const circleUniforms: (uniformBuffer: UniformBuffer) => void;
declare const circleUniformValues: (painter: Painter, coord: OverscaledTileID, tile: Tile, layer: CircleStyleLayer) => {
    u_matrix: import("gl-matrix").mat4;
    u_pitch_with_map: number;
    u_scale_with_map: number;
    u_extrude_scale: [number, number];
    u_device_pixel_ratio: number;
    u_camera_to_center_distance: number;
};
export { circleUniforms, circleUniformValues };
