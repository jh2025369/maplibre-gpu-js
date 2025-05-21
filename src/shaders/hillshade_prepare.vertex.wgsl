struct Uniforms {
    u_matrix: mat4x4f,
    u_dimension: vec2f,
    u_zoom: f32,
    u_unpack: vec4f,
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
    output.position = uniforms.u_matrix * vec4<f32>(input.a_pos, 0.0, 1.0);

    var epsilon: vec2f = 1.0 / uniforms.u_dimension;
    var scale: f32 = (uniforms.u_dimension.x - 2.0) / uniforms.u_dimension.x;
    output.v_pos = (input.a_texture_pos / 8192.0) * scale + epsilon;

    return output;
}