import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {extend} from '../../util/util';

import type {Painter} from '../painter';
import {mat4} from 'gl-matrix';

const symbolIconUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_is_size_zoom_constant', 1);
    uniformBuffer.addUniform('u_is_size_feature_constant', 1);
    uniformBuffer.addUniform('u_size_t', 1);
    uniformBuffer.addUniform('u_size', 1);
    uniformBuffer.addUniform('u_camera_to_center_distance', 1);
    uniformBuffer.addUniform('u_pitch', 1);
    uniformBuffer.addUniform('u_rotate_symbol', 1);
    uniformBuffer.addUniform('u_aspect_ratio', 1);
    uniformBuffer.addUniform('u_fade_change', 1);
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_label_plane_matrix', 16);
    uniformBuffer.addUniform('u_coord_matrix', 16);
    uniformBuffer.addUniform('u_is_text', 1);
    uniformBuffer.addUniform('u_pitch_with_map', 1);
    uniformBuffer.addUniform('u_texsize', 2);
};

const symbolSDFUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_is_size_zoom_constant', 1);
    uniformBuffer.addUniform('u_is_size_feature_constant', 1);
    uniformBuffer.addUniform('u_size_t', 1);
    uniformBuffer.addUniform('u_size', 1);
    uniformBuffer.addUniform('u_camera_to_center_distance', 1);
    uniformBuffer.addUniform('u_pitch', 1);
    uniformBuffer.addUniform('u_rotate_symbol', 1);
    uniformBuffer.addUniform('u_aspect_ratio', 1);
    uniformBuffer.addUniform('u_fade_change', 1);
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_label_plane_matrix', 16);
    uniformBuffer.addUniform('u_coord_matrix', 16);
    uniformBuffer.addUniform('u_is_text', 1);
    uniformBuffer.addUniform('u_pitch_with_map', 1);
    uniformBuffer.addUniform('u_texsize', 2);
    uniformBuffer.addUniform('u_gamma_scale', 1);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
    uniformBuffer.addUniform('u_is_halo', 1);
};

const symbolTextAndIconUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_is_size_zoom_constant', 1);
    uniformBuffer.addUniform('u_is_size_feature_constant', 1);
    uniformBuffer.addUniform('u_size_t', 1);
    uniformBuffer.addUniform('u_size', 1);
    uniformBuffer.addUniform('u_camera_to_center_distance', 1);
    uniformBuffer.addUniform('u_pitch', 1);
    uniformBuffer.addUniform('u_rotate_symbol', 1);
    uniformBuffer.addUniform('u_aspect_ratio', 1);
    uniformBuffer.addUniform('u_fade_change', 1);
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_label_plane_matrix', 16);
    uniformBuffer.addUniform('u_coord_matrix', 16);
    uniformBuffer.addUniform('u_is_text', 1);
    uniformBuffer.addUniform('u_pitch_with_map', 1);
    uniformBuffer.addUniform('u_texsize', 2);
    uniformBuffer.addUniform('u_texsize_icon', 2);
    uniformBuffer.addUniform('u_gamma_scale', 1);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
    uniformBuffer.addUniform('u_is_halo', 1);
};

const symbolIconUniformValues = (
    functionType: string,
    size: {
        uSizeT: number;
        uSize: number;
    },
    rotateInShader: boolean,
    pitchWithMap: boolean,
    painter: Painter,
    matrix: mat4,
    labelPlaneMatrix: mat4,
    glCoordMatrix: mat4,
    isText: boolean,
    texSize: [number, number]
) => {
    const transform = painter.transform;

    return {
        'u_is_size_zoom_constant': {value: +(functionType === 'constant' || functionType === 'source'), type: 'u32'},
        'u_is_size_feature_constant': {value: +(functionType === 'constant' || functionType === 'camera'), type: 'u32'},
        'u_size_t': {value: size ? size.uSizeT : 0, type: 'float'},
        'u_size': {value: size ? size.uSize : 0, type: 'float'},
        'u_camera_to_center_distance': {value: transform.cameraToCenterDistance, type: 'float'},
        'u_pitch': {value: transform.pitch / 360 * 2 * Math.PI, type: 'float'},
        'u_rotate_symbol': {value: +rotateInShader, type: 'u32'},
        'u_aspect_ratio': {value: transform.width / transform.height, type: 'float'},
        'u_fade_change': {value: painter.options.fadeDuration ? painter.symbolFadeChange : 1, type: 'float'},
        'u_matrix': {value: matrix, type: 'mat4'},
        'u_label_plane_matrix': {value: labelPlaneMatrix, type: 'mat4'},
        'u_coord_matrix': {value: glCoordMatrix, type: 'mat4'},
        'u_is_text': {value: +isText, type: 'u32'},
        'u_pitch_with_map': {value: +pitchWithMap, type: 'u32'},
        'u_texsize': {value: texSize, type: 'vec2'}
    };
};

const symbolSDFUniformValues = (
    functionType: string,
    size: {
        uSizeT: number;
        uSize: number;
    },
    rotateInShader: boolean,
    pitchWithMap: boolean,
    painter: Painter,
    matrix: mat4,
    labelPlaneMatrix: mat4,
    glCoordMatrix: mat4,
    isText: boolean,
    texSize: [number, number],
    isHalo: boolean
) => {
    const transform = painter.transform;

    return extend(symbolIconUniformValues(functionType, size,
        rotateInShader, pitchWithMap, painter, matrix, labelPlaneMatrix,
        glCoordMatrix, isText, texSize), {
        'u_gamma_scale': {
            value: (pitchWithMap ? Math.cos(transform._pitch) * transform.cameraToCenterDistance : 1),
            type: 'float'
        },
        'u_device_pixel_ratio': {value: painter.pixelRatio, type: 'float'},
        'u_is_halo': {value: +isHalo, type: 'u32'}
    });
};

const symbolTextAndIconUniformValues = (
    functionType: string,
    size: {
        uSizeT: number;
        uSize: number;
    },
    rotateInShader: boolean,
    pitchWithMap: boolean,
    painter: Painter,
    matrix: mat4,
    labelPlaneMatrix: mat4,
    glCoordMatrix: mat4,
    texSizeSDF: [number, number],
    texSizeIcon: [number, number]
) => {
    return extend(symbolSDFUniformValues(functionType, size,
        rotateInShader, pitchWithMap, painter, matrix, labelPlaneMatrix,
        glCoordMatrix, true, texSizeSDF, true), {
        'u_texsize_icon': {value: texSizeIcon, type: 'vec2'}
    });
};

export {symbolIconUniforms, symbolSDFUniforms, symbolIconUniformValues, symbolSDFUniformValues, symbolTextAndIconUniformValues, symbolTextAndIconUniforms};
