/// <reference types="gl-matrix" />
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { Tile } from '../../source/tile';
import { OverscaledTileID } from '../../source/tile_id';
import { CrossfadeParameters } from '../../style/evaluation_parameters';
import { CrossFaded } from '../../style/properties';
import { LineStyleLayer } from '../../style/style_layer/line_style_layer';
import { Painter } from '../painter';
declare const lineUniforms: (uniformBuffer: UniformBuffer) => void;
declare const lineGradientUniforms: (uniformBuffer: UniformBuffer) => void;
declare const linePatternUniforms: (uniformBuffer: UniformBuffer) => void;
declare const lineSDFUniforms: (uniformBuffer: UniformBuffer) => void;
declare const lineUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, coord: OverscaledTileID) => {
    u_matrix: {
        value: import("gl-matrix").mat4;
        type: string;
    };
    u_ratio: {
        value: number;
        type: string;
    };
    u_device_pixel_ratio: {
        value: number;
        type: string;
    };
    u_units_to_pixels: {
        value: number[];
        type: string;
    };
};
declare const lineGradientUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, imageHeight: number, coord: OverscaledTileID) => any;
declare const linePatternUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, crossfade: CrossfadeParameters, coord: OverscaledTileID) => {
    u_matrix: {
        value: import("gl-matrix").mat4;
        type: string;
    };
    u_texsize: {
        value: number[];
        type: string;
    };
    u_ratio: {
        value: number;
        type: string;
    };
    u_device_pixel_ratio: {
        value: number;
        type: string;
    };
    u_scale: {
        value: number[];
        type: string;
    };
    u_fade: {
        value: number;
        type: string;
    };
    u_units_to_pixels: {
        value: number[];
        type: string;
    };
};
declare const lineSDFUniformValues: (painter: Painter, tile: Tile, layer: LineStyleLayer, dasharray: CrossFaded<Array<number>>, crossfade: CrossfadeParameters, coord: OverscaledTileID) => any;
export { lineUniforms, lineGradientUniforms, linePatternUniforms, lineSDFUniforms, lineUniformValues, linePatternUniformValues, lineSDFUniformValues, lineGradientUniformValues };
