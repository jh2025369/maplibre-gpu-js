import {mat4} from 'gl-matrix';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

const clippingMaskUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
};

const clippingMaskUniformValues = (matrix: mat4) => ({
    'u_matrix': matrix
});

export {clippingMaskUniforms, clippingMaskUniformValues};
