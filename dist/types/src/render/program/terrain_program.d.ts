import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { mat4 } from 'gl-matrix';
declare const terrainPreludeUniforms: (uniformBuffer: UniformBuffer) => void;
declare const terrainUniforms: (uniformBuffer: UniformBuffer) => void;
declare const terrainUniformValues: (matrix: mat4, eleDelta: number) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_ele_delta: {
        value: number;
        type: string;
    };
};
declare const terrainDepthUniformValues: (matrix: mat4, eleDelta: number) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_ele_delta: {
        value: number;
        type: string;
    };
};
declare const terrainCoordsUniformValues: (matrix: mat4, coordsId: number, eleDelta: number) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_terrain_coords_id: {
        value: number;
        type: string;
    };
    u_ele_delta: {
        value: number;
        type: string;
    };
};
export { terrainUniforms, terrainPreludeUniforms, terrainUniformValues, terrainDepthUniformValues, terrainCoordsUniformValues };
