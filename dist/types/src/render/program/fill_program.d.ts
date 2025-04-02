import { mat4 } from 'gl-matrix';
import { Painter } from '../painter';
import { Tile } from '../../source/tile';
import { CrossfadeParameters } from '../../style/evaluation_parameters';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const fillUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillPatternUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillOutlineUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillOutlinePatternUniforms: (uniformBuffer: UniformBuffer) => void;
declare const fillUniformValues: (matrix: mat4) => {
    u_matrix: mat4;
};
declare const fillPatternUniformValues: (matrix: mat4, painter: Painter, crossfade: CrossfadeParameters, tile: Tile) => {
    u_matrix: mat4;
} & {
    u_texsize: number[];
    u_scale: number[];
    u_fade: number;
    u_pixel_coord_upper: number[];
    u_pixel_coord_lower: number[];
};
declare const fillOutlineUniformValues: (matrix: mat4, drawingBufferSize: [number, number]) => {
    u_matrix: mat4;
    u_world: [number, number];
};
declare const fillOutlinePatternUniformValues: (matrix: mat4, painter: Painter, crossfade: CrossfadeParameters, tile: Tile, drawingBufferSize: [number, number]) => {
    u_matrix: mat4;
} & {
    u_texsize: number[];
    u_scale: number[];
    u_fade: number;
    u_pixel_coord_upper: number[];
    u_pixel_coord_lower: number[];
} & {
    u_world: [number, number];
};
export { fillUniformValues, fillPatternUniformValues, fillOutlineUniformValues, fillOutlinePatternUniformValues, fillUniforms, fillOutlineUniforms, fillPatternUniforms, fillOutlinePatternUniforms };
