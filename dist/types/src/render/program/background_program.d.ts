import type { Painter } from '../painter';
import type { Color, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
import type { CrossFaded } from '../../style/properties';
import type { CrossfadeParameters } from '../../style/evaluation_parameters';
import type { OverscaledTileID } from '../../source/tile_id';
import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const backgroundUniforms: (uniformBuffer: UniformBuffer) => void;
declare const backgroundUniformValues: (matrix: mat4, opacity: number, color: Color) => {
    u_matrix: mat4;
    u_opacity: number;
    u_color: Color;
};
declare const backgroundPatternUniformValues: (matrix: mat4, opacity: number, painter: Painter, image: CrossFaded<ResolvedImage>, tile: {
    tileID: OverscaledTileID;
    tileSize: number;
}, crossfade: CrossfadeParameters) => {
    u_image: number;
    u_pattern_tl_a: any;
    u_pattern_br_a: any;
    u_pattern_tl_b: any;
    u_pattern_br_b: any;
    u_texsize: number[];
    u_mix: number;
    u_pattern_size_a: any;
    u_pattern_size_b: any;
    u_scale_a: number;
    u_scale_b: number;
    u_tile_units_to_pixels: number;
    u_pixel_coord_upper: number[];
    u_pixel_coord_lower: number[];
} & {
    u_matrix: mat4;
    u_opacity: number;
};
export { backgroundUniforms, backgroundUniformValues, backgroundPatternUniformValues };
