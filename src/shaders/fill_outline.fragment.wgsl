struct Uniforms {
    u_matrix: mat4x4f,
    u_world: vec2f,
};

struct FragmentInput {
    @builtin(position) position: vec4f,
    @location(0) v_pos: vec2f,
    @location(1) v_outline_color: vec4f,
    @location(2) v_opacity: f32,
};

var<uniform> uniforms: Uniforms;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4<f32> {
    var dist: f32 = length(input.v_pos - floor(input.position.xy));
    var alpha: f32 = 1.0 - smoothstep(0.0, 1.0, dist);
    var fragColor: vec4f = input.v_outline_color * (alpha * input.v_opacity);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4<f32>(1.0);
#endif

    return fragColor;
}