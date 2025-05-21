import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { mat4 } from 'gl-matrix';
declare const terrainPreludeUniforms: (uniformBuffer: UniformBuffer) => {
    u_terrain_dim: (v: any) => void;
    u_terrain_matrix: (v: any) => void;
    u_terrain_unpack: (v: any) => void;
    u_terrain_exaggeration: (v: any) => void;
};
declare const terrainUniforms: (uniformBuffer: UniformBuffer) => void;
declare const terrainUniformValues: (matrix: mat4, eleDelta: number) => {
    u_matrix: mat4;
    u_ele_delta: number;
};
declare const terrainDepthUniformValues: (matrix: mat4, eleDelta: number) => {
    u_matrix: mat4;
    u_ele_delta: number;
};
declare const terrainCoordsUniformValues: (matrix: mat4, coordsId: number, eleDelta: number) => {
    u_matrix: mat4;
    u_terrain_coords_id: number;
    u_ele_delta: number;
};
export { terrainUniforms, terrainPreludeUniforms, terrainUniformValues, terrainDepthUniformValues, terrainCoordsUniformValues };
