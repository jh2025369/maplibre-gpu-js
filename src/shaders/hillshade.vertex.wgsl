struct Uniforms {
    u_matrix: mat4x4f,
    u_latrange: vec2f,
    u_light: vec2f,
    u_shadow: vec4f,
    u_highlight: vec4f,
    u_accent: vec4f,
};

struct VertexInput {
    @location(0) a_pos : vec2f,
    @location(1) a_texture_pos : vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_pos: vec2f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    output.position = uniforms.u_matrix * vec4f(input.a_pos, 0, 1);
    output.v_pos = input.a_texture_pos / 8192.0;

    return output;
}
