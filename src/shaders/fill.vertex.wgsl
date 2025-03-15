struct Uniforms {
    u_matrix: mat4x4f,
};

struct VertexInput {
    @location(0) a_pos: vec2f,
    @location(1) a_color: u32,
    @location(2) a_opacity: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_color: vec4f,
    @location(1) v_opacity: f32,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = uniforms.u_matrix * vec4<f32>(input.a_pos, 0.0, 1.0);

    output.v_color = vec4f(
        f32((input.a_color >> 8) & 0xff),
        f32(input.a_color & 0xff),
        f32((input.a_color >> 24) & 0xff),
        f32((input.a_color >> 16) & 0xff)
    ) / 255.0;
    output.v_opacity = input.a_opacity;

    return output;
}