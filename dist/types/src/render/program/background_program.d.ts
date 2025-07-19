import type { Painter } from '../painter';
import type { Color, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
import type { CrossFaded } from '../../style/properties';
import type { CrossfadeParameters } from '../../style/evaluation_parameters';
import type { OverscaledTileID } from '../../source/tile_id';
import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const backgroundUniforms: (uniformBuffer: UniformBuffer) => void;
declare const backgroundUniformValues: (matrix: mat4, opacity: number, color: Color) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_opacity: {
        value: number;
        type: string;
    };
    u_color: {
        value: import("@maplibre/maplibre-gl-style-spec").RGBColor;
        type: string;
    };
};
declare const backgroundPatternUniformValues: (matrix: mat4, opacity: number, painter: Painter, image: CrossFaded<ResolvedImage>, tile: {
    tileID: OverscaledTileID;
    tileSize: number;
}, crossfade: CrossfadeParameters) => {
    u_pattern_tl_a: {
        value: any;
        type: string;
    };
    u_pattern_br_a: {
        value: any;
        type: string;
    };
    u_pattern_tl_b: {
        value: any;
        type: string;
    };
    u_pattern_br_b: {
        value: any;
        type: string;
    };
    u_texsize: {
        value: number[];
        type: string;
    };
    u_mix: {
        value: number;
        type: string;
    };
    u_pattern_size_a: {
        value: any;
        type: string;
    };
    u_pattern_size_b: {
        value: any;
        type: string;
    };
    u_scale_a: {
        value: number;
        type: string;
    };
    u_scale_b: {
        value: number;
        type: string;
    };
    u_tile_units_to_pixels: {
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
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_opacity: {
        value: number;
        type: string;
    };
};
export { backgroundUniforms, backgroundUniformValues, backgroundPatternUniformValues };
