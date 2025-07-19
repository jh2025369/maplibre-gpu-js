import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import type { Tile } from '../../source/tile';
import type { Painter } from '../painter';
import type { HeatmapStyleLayer } from '../../style/style_layer/heatmap_style_layer';
declare const heatmapUniforms: (uniformBuffer: UniformBuffer) => void;
declare const heatmapTextureUniforms: (uniformBuffer: UniformBuffer) => void;
declare const heatmapUniformValues: (matrix: mat4, tile: Tile, zoom: number, intensity: number) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_extrude_scale: {
        value: number;
        type: string;
    };
    u_intensity: {
        value: number;
        type: string;
    };
};
declare const heatmapTextureUniformValues: (painter: Painter, layer: HeatmapStyleLayer) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_world: {
        value: number[];
        type: string;
    };
    u_opacity: {
        value: number;
        type: string;
    };
};
export { heatmapUniforms, heatmapTextureUniforms, heatmapUniformValues, heatmapTextureUniformValues };
