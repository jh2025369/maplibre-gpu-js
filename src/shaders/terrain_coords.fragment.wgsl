struct Uniforms {
    u_matrix: mat4x4f,
    u_ele_delta: f32,
    u_terrain_coords_id: f32,
};

struct FragmentInput {
    @location(0) v_texture_pos: vec2f,
    @location(1) v_depth: f32,
}

var<uniform> uniforms: Uniforms;
var u_texture: texture_2d<f32>;
var u_textureSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var rgba: vec4f = textureSample(u_texture, u_textureSampler, input.v_texture_pos);
    var fragColor: vec4f = vec4f(rgba.r, rgba.g, rgba.b, uniforms.u_terrain_coords_id);
    return fragColor;
}