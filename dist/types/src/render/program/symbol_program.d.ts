import { UniformBuffer } from 'core/Materials/uniformBuffer';
import type { Painter } from '../painter';
import { mat4 } from 'gl-matrix';
declare const symbolIconUniforms: (uniformBuffer: UniformBuffer) => void;
declare const symbolSDFUniforms: (uniformBuffer: UniformBuffer) => void;
declare const symbolTextAndIconUniforms: (uniformBuffer: UniformBuffer) => void;
declare const symbolIconUniformValues: (functionType: string, size: {
    uSizeT: number;
    uSize: number;
}, rotateInShader: boolean, pitchWithMap: boolean, painter: Painter, matrix: mat4, labelPlaneMatrix: mat4, glCoordMatrix: mat4, isText: boolean, texSize: [number, number]) => {
    u_is_size_zoom_constant: {
        value: number;
        type: string;
    };
    u_is_size_feature_constant: {
        value: number;
        type: string;
    };
    u_size_t: {
        value: number;
        type: string;
    };
    u_size: {
        value: number;
        type: string;
    };
    u_camera_to_center_distance: {
        value: number;
        type: string;
    };
    u_pitch: {
        value: number;
        type: string;
    };
    u_rotate_symbol: {
        value: number;
        type: string;
    };
    u_aspect_ratio: {
        value: number;
        type: string;
    };
    u_fade_change: {
        value: number;
        type: string;
    };
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_label_plane_matrix: {
        value: mat4;
        type: string;
    };
    u_coord_matrix: {
        value: mat4;
        type: string;
    };
    u_is_text: {
        value: number;
        type: string;
    };
    u_pitch_with_map: {
        value: number;
        type: string;
    };
    u_texsize: {
        value: [number, number];
        type: string;
    };
};
declare const symbolSDFUniformValues: (functionType: string, size: {
    uSizeT: number;
    uSize: number;
}, rotateInShader: boolean, pitchWithMap: boolean, painter: Painter, matrix: mat4, labelPlaneMatrix: mat4, glCoordMatrix: mat4, isText: boolean, texSize: [number, number], isHalo: boolean) => {
    u_is_size_zoom_constant: {
        value: number;
        type: string;
    };
    u_is_size_feature_constant: {
        value: number;
        type: string;
    };
    u_size_t: {
        value: number;
        type: string;
    };
    u_size: {
        value: number;
        type: string;
    };
    u_camera_to_center_distance: {
        value: number;
        type: string;
    };
    u_pitch: {
        value: number;
        type: string;
    };
    u_rotate_symbol: {
        value: number;
        type: string;
    };
    u_aspect_ratio: {
        value: number;
        type: string;
    };
    u_fade_change: {
        value: number;
        type: string;
    };
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_label_plane_matrix: {
        value: mat4;
        type: string;
    };
    u_coord_matrix: {
        value: mat4;
        type: string;
    };
    u_is_text: {
        value: number;
        type: string;
    };
    u_pitch_with_map: {
        value: number;
        type: string;
    };
    u_texsize: {
        value: [number, number];
        type: string;
    };
} & {
    u_gamma_scale: {
        value: number;
        type: string;
    };
    u_device_pixel_ratio: {
        value: number;
        type: string;
    };
    u_is_halo: {
        value: number;
        type: string;
    };
};
declare const symbolTextAndIconUniformValues: (functionType: string, size: {
    uSizeT: number;
    uSize: number;
}, rotateInShader: boolean, pitchWithMap: boolean, painter: Painter, matrix: mat4, labelPlaneMatrix: mat4, glCoordMatrix: mat4, texSizeSDF: [number, number], texSizeIcon: [number, number]) => {
    u_is_size_zoom_constant: {
        value: number;
        type: string;
    };
    u_is_size_feature_constant: {
        value: number;
        type: string;
    };
    u_size_t: {
        value: number;
        type: string;
    };
    u_size: {
        value: number;
        type: string;
    };
    u_camera_to_center_distance: {
        value: number;
        type: string;
    };
    u_pitch: {
        value: number;
        type: string;
    };
    u_rotate_symbol: {
        value: number;
        type: string;
    };
    u_aspect_ratio: {
        value: number;
        type: string;
    };
    u_fade_change: {
        value: number;
        type: string;
    };
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_label_plane_matrix: {
        value: mat4;
        type: string;
    };
    u_coord_matrix: {
        value: mat4;
        type: string;
    };
    u_is_text: {
        value: number;
        type: string;
    };
    u_pitch_with_map: {
        value: number;
        type: string;
    };
    u_texsize: {
        value: [number, number];
        type: string;
    };
} & {
    u_gamma_scale: {
        value: number;
        type: string;
    };
    u_device_pixel_ratio: {
        value: number;
        type: string;
    };
    u_is_halo: {
        value: number;
        type: string;
    };
} & {
    u_texsize_icon: {
        value: [number, number];
        type: string;
    };
};
export { symbolIconUniforms, symbolSDFUniforms, symbolIconUniformValues, symbolSDFUniformValues, symbolTextAndIconUniformValues, symbolTextAndIconUniforms };
