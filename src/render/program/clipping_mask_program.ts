import {mat4} from 'gl-matrix';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

const clippingMaskUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
};

const clippingMaskUniformValues = (matrix: mat4) => ({
    'u_matrix': {value: matrix, type: 'mat4'}
});

export {clippingMaskUniforms, clippingMaskUniformValues};
