struct Uniforms {
    u_matrix: mat4x4f,
    u_opacity: f32,
    u_color: vec4f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(@location(0) a_pos: u32) -> @builtin(position) vec4f {
    var position: vec2<f32> = unpack2x16snorm(a_pos) * 32767.0;
    return uniforms.u_matrix * vec4f(position, 0.0, 1.0);
}