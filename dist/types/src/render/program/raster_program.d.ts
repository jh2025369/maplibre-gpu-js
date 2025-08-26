import type { RasterStyleLayer } from '../../style/style_layer/raster_style_layer';
import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials';
declare const rasterUniforms: (uniformBuffer: UniformBuffer) => void;
declare const rasterUniformValues: (matrix: mat4, parentTL: [number, number], parentScaleBy: number, fade: {
    mix: number;
    opacity: number;
}, layer: RasterStyleLayer) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_tl_parent: {
        value: [number, number];
        type: string;
    };
    u_scale_parent: {
        value: number;
        type: string;
    };
    u_buffer_scale: {
        value: number;
        type: string;
    };
    u_fade_t: {
        value: number;
        type: string;
    };
    u_opacity: {
        value: number;
        type: string;
    };
    u_brightness_low: {
        value: number;
        type: string;
    };
    u_brightness_high: {
        value: number;
        type: string;
    };
    u_saturation_factor: {
        value: number;
        type: string;
    };
    u_contrast_factor: {
        value: any;
        type: string;
    };
    u_spin_weights: {
        value: number[];
        type: string;
    };
};
export { rasterUniforms, rasterUniformValues };
