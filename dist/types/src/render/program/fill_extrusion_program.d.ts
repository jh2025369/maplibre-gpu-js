import { mat4, vec3 } from 'gl-matrix';
import type { Painter } from '../painter';
import type { OverscaledTileID } from '../../source/tile_id';
import type { CrossfadeParameters } from '../../style/evaluation_parameters';
import type { Tile } from '../../source/tile';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const fillExtrusionUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillExtrusionPatternUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillExtrusionUniformValues: (matrix: mat4, painter: Painter, shouldUseVerticalGradient: boolean, opacity: number) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_lightpos: {
        value: vec3;
        type: string;
    };
    u_lightintensity: {
        value: number;
        type: string;
    };
    u_lightcolor: {
        value: number[];
        type: string;
    };
    u_vertical_gradient: {
        value: number;
        type: string;
    };
    u_opacity: {
        value: number;
        type: string;
    };
};
declare const fillExtrusionPatternUniformValues: (matrix: mat4, painter: Painter, shouldUseVerticalGradient: boolean, opacity: number, coord: OverscaledTileID, crossfade: CrossfadeParameters, tile: Tile) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_lightpos: {
        value: vec3;
        type: string;
    };
    u_lightintensity: {
        value: number;
        type: string;
    };
    u_lightcolor: {
        value: number[];
        type: string;
    };
    u_vertical_gradient: {
        value: number;
        type: string;
    };
    u_opacity: {
        value: number;
        type: string;
    };
} & {
    u_texsize: {
        value: number[];
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
    u_pixel_coord_upper: {
        value: number[];
        type: string;
    };
    u_pixel_coord_lower: {
        value: number[];
        type: string;
    };
} & {
    u_height_factor: {
        value: number;
        type: string;
    };
};
export { fillExtrusionUniforms, fillExtrusionPatternUniforms, fillExtrusionUniformValues, fillExtrusionPatternUniformValues };
