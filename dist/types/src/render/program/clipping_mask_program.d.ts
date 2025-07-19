import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const clippingMaskUniforms: (uniformBuffer: UniformBuffer) => void;
declare const clippingMaskUniformValues: (matrix: mat4) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
};
export { clippingMaskUniforms, clippingMaskUniformValues };
