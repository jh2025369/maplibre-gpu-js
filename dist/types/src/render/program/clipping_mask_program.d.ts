import { mat4 } from 'gl-matrix';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const clippingMaskUniforms: (uniformBuffer: UniformBuffer) => void;
declare const clippingMaskUniformValues: (matrix: mat4) => {
    u_matrix: mat4;
};
export { clippingMaskUniforms, clippingMaskUniformValues };
