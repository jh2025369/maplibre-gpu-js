import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {mat4} from 'gl-matrix';

const terrainPreludeUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_terrain_dim', 1);
    uniformBuffer.addUniform('u_terrain_matrix', 16);
    uniformBuffer.addUniform('u_terrain_unpack', 4);
    uniformBuffer.addUniform('u_terrain_exaggeration', 1);
};

const terrainUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_ele_delta', 1);
    uniformBuffer.addUniform('u_terrain_coords_id', 1);
};

const terrainUniformValues = (
    matrix: mat4,
    eleDelta: number
) => ({
    'u_matrix': {value: matrix, type: 'mat4'},
    'u_ele_delta': {value: eleDelta, type: 'float'}
});

const terrainDepthUniformValues = (
    matrix: mat4,
    eleDelta: number
) => ({
    'u_matrix': {value: matrix, type: 'mat4'},
    'u_ele_delta': {value: eleDelta, type: 'float'}
});

const terrainCoordsUniformValues = (
    matrix: mat4,
    coordsId: number,
    eleDelta: number
) => ({
    'u_matrix': {value: matrix, type: 'mat4'},
    'u_terrain_coords_id': {value: coordsId / 255, type: 'float'},
    'u_ele_delta': {value: eleDelta, type: 'float'}
});

export {terrainUniforms, terrainPreludeUniforms, terrainUniformValues, terrainDepthUniformValues, terrainCoordsUniformValues};
