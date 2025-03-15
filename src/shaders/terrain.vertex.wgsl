#include<preludeVertex>

struct Uniforms {
    u_matrix: mat4x4f,
    u_ele_delta: f32,
    u_terrain_coords_id: f32,
};

struct TerrainUniforms {
    u_terrain_dim: f32,
    u_terrain_matrix: mat4x4f,
    u_terrain_unpack: vec4<f32>,
    u_terrain_exaggeration: f32,
};

struct VertexInput {
    @location(0) a_pos3d : vec3f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_texture_pos: vec2f,
    @location(1) v_depth: f32,
};

var<uniform> uniforms: Uniforms;
var<uniform> terrain: TerrainUniforms;
var u_terrain: texture_2d<f32>;
var u_terrainSampler: sampler;

// fn ele(pos: vec2<f32>) -> f32 {
//     #ifdef TERRAIN3D
//         let texel = textureLoad(u_terrain, vec2<i32>(pos), 0);
//         let rgb = (texel * 255.0) * terrain.u_terrain_unpack;
//         return rgb.r + rgb.g + rgb.b - terrain.u_terrain_unpack.a;
//     #else
//         return 0.0;
//     #endif
// }

// fn get_elevation(pos: vec2<f32>) -> f32 {
//     #ifdef TERRAIN3D
//         let coord = (terrain.u_terrain_matrix * vec4<f32>(pos, 0.0, 1.0)).xy * terrain.u_terrain_dim + 1.0;
//         let f = fract(coord);
//         let c = (floor(coord) + 0.5) / (terrain.u_terrain_dim + 2.0);
//         let d = 1.0 / (terrain.u_terrain_dim + 2.0);
//         let tl = ele(c);
//         let tr = ele(c + vec2<f32>(d, 0.0));
//         let bl = ele(c + vec2<f32>(0.0, d));
//         let br = ele(c + vec2<f32>(d, d));
//         let elevation = mix(mix(tl, tr, f.x), mix(bl, br, f.x), f.y);
//         return elevation * terrain.u_terrain_exaggeration;
//     #else
//         return 0.0;
//     #endif
// }

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var extent: f32 = 8192.0; // 8192.0 is the hardcoded vector-tiles coordinates resolution
    var ele_delta: f32 = select(0.0, uniforms.u_ele_delta, input.a_pos3d.z == 1.0);
    output.v_texture_pos = input.a_pos3d.xy / extent;
    output.position = uniforms.u_matrix * vec4f(input.a_pos3d.xy, get_elevation(input.a_pos3d.xy) - ele_delta, 1.0);
    output.v_depth = output.position.z / output.position.w;
    
    return output;
}