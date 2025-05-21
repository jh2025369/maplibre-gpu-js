import type { RasterStyleLayer } from '../../style/style_layer/raster_style_layer';
import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials';
declare const rasterUniforms: (uniformBuffer: UniformBuffer) => void;
declare const rasterUniformValues: (matrix: mat4, parentTL: [number, number], parentScaleBy: number, fade: {
    mix: number;
    opacity: number;
}, layer: RasterStyleLayer) => {
    u_matrix: mat4;
    u_tl_parent: [number, number];
    u_scale_parent: number;
    u_buffer_scale: number;
    u_fade_t: number;
    u_opacity: number;
    u_brightness_low: number;
    u_brightness_high: number;
    u_saturation_factor: number;
    u_contrast_factor: any;
    u_spin_weights: number[];
};
export { rasterUniforms, rasterUniformValues };
