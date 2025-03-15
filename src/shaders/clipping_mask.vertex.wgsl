struct Uniforms {
    u_matrix: mat4x4f,
};

var<uniform> uniforms: Uniforms;

struct VertexInput {
    @location(0) a_pos : u32,
};

@vertex
fn main(input: VertexInput) -> @builtin(position) vec4f {
    var a_pos: vec2<f32> = unpack2x16snorm(input.a_pos) * 32767.0;
    return uniforms.u_matrix * vec4f(a_pos, 0, 1);
}