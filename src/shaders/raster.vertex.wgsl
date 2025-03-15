struct Uniforms {
    u_matrix: mat4x4f,
    u_tl_parent: vec2f,
    u_scale_parent: f32,
    u_buffer_scale: f32,
    u_fade_t: f32,
    u_opacity: f32,
    u_brightness_low: f32,
    u_brightness_high: f32,
    u_saturation_factor: f32,
    u_contrast_factor: f32,
    u_spin_weights: vec3f,
};

struct VertexInput {
    @location(0) a_pos : vec2f,
    @location(1) a_texture_pos : vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_pos0: vec2f,
    @location(1) v_pos1: vec2f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = uniforms.u_matrix * vec4f(input.a_pos, 0, 1);
    // We are using Int16 for texture position coordinates to give us enough precision for
    // fractional coordinates. We use 8192 to scale the texture coordinates in the buffer
    // as an arbitrarily high number to preserve adequate precision when rendering.
    // This is also the same value as the EXTENT we are using for our tile buffer pos coordinates,
    // so math for modifying either is consistent.
    output.v_pos0 = (((input.a_texture_pos / 8192.0) - 0.5) / uniforms.u_buffer_scale ) + 0.5;
    output.v_pos1 = (output.v_pos0 * uniforms.u_scale_parent) + uniforms.u_tl_parent;

    return output;
}
