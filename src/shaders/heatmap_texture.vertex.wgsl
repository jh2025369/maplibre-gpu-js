struct Uniforms {
    u_matrix: mat4x4f,
    u_world: vec2f,
    u_opacity: f32,
};

struct VertexInput {
    @location(0) a_pos: vec2u,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_pos: vec2f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var a_pos: vec2f = vec2f(input.a_pos);
    output.position = uniforms.u_matrix * vec4f(a_pos * uniforms.u_world, 0, 1);

    output.v_pos = a_pos;

    return output;
}
