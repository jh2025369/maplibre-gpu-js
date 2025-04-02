import { mat4, vec3 } from 'gl-matrix';
import type { Painter } from '../painter';
import type { OverscaledTileID } from '../../source/tile_id';
import type { CrossfadeParameters } from '../../style/evaluation_parameters';
import type { Tile } from '../../source/tile';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const fillExtrusionUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillExtrusionPatternUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillExtrusionUniformValues: (matrix: mat4, painter: Painter, shouldUseVerticalGradient: boolean, opacity: number) => {
    u_matrix: mat4;
    u_lightpos: vec3;
    u_lightintensity: number;
    u_lightcolor: number[];
    u_vertical_gradient: number;
    u_opacity: number;
};
declare const fillExtrusionPatternUniformValues: (matrix: mat4, painter: Painter, shouldUseVerticalGradient: boolean, opacity: number, coord: OverscaledTileID, crossfade: CrossfadeParameters, tile: Tile) => {
    u_matrix: mat4;
    u_lightpos: vec3;
    u_lightintensity: number;
    u_lightcolor: number[];
    u_vertical_gradient: number;
    u_opacity: number;
} & {
    u_texsize: number[];
    u_scale: number[];
    u_fade: number;
    u_pixel_coord_upper: number[];
    u_pixel_coord_lower: number[];
} & {
    u_height_factor: number;
};
export { fillExtrusionUniforms, fillExtrusionPatternUniforms, fillExtrusionUniformValues, fillExtrusionPatternUniformValues };
