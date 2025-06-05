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
        'u_is_size_zoom_constant': +(functionType === 'constant' || functionType === 'source'),
        'u_is_size_feature_constant': +(functionType === 'constant' || functionType === 'camera'),
        'u_size_t': size ? size.uSizeT : 0,
        'u_size': size ? size.uSize : 0,
        'u_camera_to_center_distance': transform.cameraToCenterDistance,
        'u_pitch': transform.pitch / 360 * 2 * Math.PI,
        'u_rotate_symbol': +rotateInShader,
        'u_aspect_ratio': transform.width / transform.height,
        'u_fade_change': painter.options.fadeDuration ? painter.symbolFadeChange : 1,
        'u_matrix': matrix,
        'u_label_plane_matrix': labelPlaneMatrix,
        'u_coord_matrix': glCoordMatrix,
        'u_is_text': +isText,
        'u_pitch_with_map': +pitchWithMap,
        'u_texsize': texSize
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
        'u_gamma_scale': (pitchWithMap ? Math.cos(transform._pitch) * transform.cameraToCenterDistance : 1),
        'u_device_pixel_ratio': painter.pixelRatio,
        'u_is_halo': +isHalo
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
        'u_texsize_icon': texSizeIcon
    });
};

export {symbolIconUniforms, symbolSDFUniforms, symbolIconUniformValues, symbolSDFUniformValues, symbolTextAndIconUniformValues, symbolTextAndIconUniforms};
