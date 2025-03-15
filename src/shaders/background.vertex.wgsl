struct Uniforms {
    u_matrix: mat4x4f,
    u_opacity: f32,
    u_color: vec4f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(@location(0) position: u32) -> @builtin(position) vec4f {
    var a_pos: vec2<f32> = unpack2x16snorm(position) * 32767.0;
    return uniforms.u_matrix * vec4f(a_pos, 0.0, 1.0);
}