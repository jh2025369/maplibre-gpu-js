/// <reference types="gl-matrix" />
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { Tile } from '../../source/tile';
import { OverscaledTileID } from '../../source/tile_id';
import { CrossfadeParameters } from '../../style/evaluation_parameters';
import { CrossFaded } from '../../style/properties';
import { LineStyleLayer } from '../../style/style_layer/line_style_layer';
import { Painter } from '../painter';
declare const lineUniforms: (uniformBuffer: UniformBuffer) => void;
declare const lineSDFUniforms: (uniformBuffer: UniformBuffer) => void;
declare const lineUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, coord: OverscaledTileID) => {
    u_matrix: import("gl-matrix").mat4;
    u_ratio: number;
    u_device_pixel_ratio: number;
    u_units_to_pixels: number[];
};
declare const lineGradientUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, imageHeight: number, coord: OverscaledTileID) => any;
declare const linePatternUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, crossfade: CrossfadeParameters, coord: OverscaledTileID) => {
    u_matrix: import("gl-matrix").mat4;
    u_texsize: number[];
    u_ratio: number;
    u_device_pixel_ratio: number;
    u_image: number;
    u_scale: number[];
    u_fade: number;
    u_units_to_pixels: number[];
};
declare const lineSDFUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, dasharray: CrossFaded<Array<number>>, crossfade: CrossfadeParameters, coord: OverscaledTileID) => any;
export { lineUniforms, lineSDFUniforms, lineUniformValues, linePatternUniformValues, lineSDFUniformValues, lineGradientUniformValues };
