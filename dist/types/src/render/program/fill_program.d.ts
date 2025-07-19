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
    u_matrix: {
        value: mat4;
        type: string;
    };
};
declare const fillPatternUniformValues: (matrix: mat4, painter: Painter, crossfade: CrossfadeParameters, tile: Tile) => {
    u_matrix: {
        value: mat4;
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
};
declare const fillOutlineUniformValues: (matrix: mat4, drawingBufferSize: [number, number]) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_world: {
        value: [number, number];
        type: string;
    };
};
declare const fillOutlinePatternUniformValues: (matrix: mat4, painter: Painter, crossfade: CrossfadeParameters, tile: Tile, drawingBufferSize: [number, number]) => {
    u_matrix: {
        value: mat4;
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
    u_world: {
        value: [number, number];
        type: string;
    };
};
export { fillUniformValues, fillPatternUniformValues, fillOutlineUniformValues, fillOutlinePatternUniformValues, fillUniforms, fillOutlineUniforms, fillPatternUniforms, fillOutlinePatternUniforms };
