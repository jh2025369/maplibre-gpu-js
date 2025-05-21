#include<preludeVertex>

struct Uniforms {
    u_matrix: mat4x4f,
    u_ele_delta: f32,
    u_terrain_coords_id: f32,
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