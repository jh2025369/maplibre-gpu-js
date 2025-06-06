import type {RasterStyleLayer} from '../../style/style_layer/raster_style_layer';
import {mat4} from 'gl-matrix';
import {UniformBuffer} from 'core/Materials';

const rasterUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_tl_parent', 2);
    uniformBuffer.addUniform('u_scale_parent', 1);
    uniformBuffer.addUniform('u_buffer_scale', 1);
    uniformBuffer.addUniform('u_fade_t', 1);
    uniformBuffer.addUniform('u_opacity', 1);
    uniformBuffer.addUniform('u_brightness_low', 1);
    uniformBuffer.addUniform('u_brightness_high', 1);
    uniformBuffer.addUniform('u_saturation_factor', 1);
    uniformBuffer.addUniform('u_contrast_factor', 1);
    uniformBuffer.addUniform('u_spin_weights', 3);
};

const rasterUniformValues = (
    matrix: mat4,
    parentTL: [number, number],
    parentScaleBy: number,
    fade: {
        mix: number;
        opacity: number;
    },
    layer: RasterStyleLayer
) => ({
    'u_matrix': {value: matrix, type: 'mat4'},
    'u_tl_parent': {value: parentTL, type: 'vec2'},
    'u_scale_parent': {value: parentScaleBy, type: 'float'},
    'u_buffer_scale': {value: 1, type: 'float'},
    'u_fade_t': {value: fade.mix, type: 'float'},
    'u_opacity': {value: fade.opacity * layer.paint.get('raster-opacity'), type: 'float'},
    'u_brightness_low': {value: layer.paint.get('raster-brightness-min'), type: 'float'},
    'u_brightness_high': {value: layer.paint.get('raster-brightness-max'), type: 'float'},
    'u_saturation_factor': {value: saturationFactor(layer.paint.get('raster-saturation')), type: 'float'},
    'u_contrast_factor': {value: contrastFactor(layer.paint.get('raster-contrast')), type: 'float'},
    'u_spin_weights': {value: spinWeights(layer.paint.get('raster-hue-rotate')), type: 'vec3'}
});

function spinWeights(angle) {
    angle *= Math.PI / 180;
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return [
        (2 * c + 1) / 3,
        (-Math.sqrt(3) * s - c + 1) / 3,
        (Math.sqrt(3) * s - c + 1) / 3
    ];
}

function contrastFactor(contrast) {
    return contrast > 0 ?
        1 / (1 - contrast) :
        1 + contrast;
}

function saturationFactor(saturation) {
    return saturation > 0 ?
        1 - 1 / (1.001 - saturation) :
        -saturation;
}

export {rasterUniforms, rasterUniformValues};
