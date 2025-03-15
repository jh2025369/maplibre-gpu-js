import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {mat4} from 'gl-matrix';

const terrainPreludeUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_terrain_dim', 1);
    uniformBuffer.addUniform('u_terrain_matrix', 16);
    uniformBuffer.addUniform('u_terrain_unpack', 4);
    uniformBuffer.addUniform('u_terrain_exaggeration', 1);

    return {
        'u_terrain_dim': v => uniformBuffer.updateFloat('u_terrain_dim', v),
        'u_terrain_matrix': v => uniformBuffer.updateMatrices('u_terrain_matrix', v),
        'u_terrain_unpack': v => uniformBuffer.updateUniform('u_terrain_unpack', v, 4),
        'u_terrain_exaggeration': v => uniformBuffer.updateFloat('u_terrain_exaggeration', v),
    };
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
    'u_matrix': matrix,
    'u_ele_delta': eleDelta
});

const terrainDepthUniformValues = (
    matrix: mat4,
    eleDelta: number
) => ({
    'u_matrix': matrix,
    'u_ele_delta': eleDelta
});

const terrainCoordsUniformValues = (
    matrix: mat4,
    coordsId: number,
    eleDelta: number
) => ({
    'u_matrix': matrix,
    'u_terrain_coords_id': coordsId / 255,
    'u_ele_delta': eleDelta
});

export {terrainUniforms, terrainPreludeUniforms, terrainUniformValues, terrainDepthUniformValues, terrainCoordsUniformValues};
