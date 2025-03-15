struct Uniforms {
    u_matrix: mat4x4f,
};

struct FragmentInput {
    @location(0) v_color: vec4f,
    @location(1) v_opacity: f32,
}

var<uniform> uniforms: Uniforms;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4<f32> {
    var fragColor: vec4f = input.v_color * input.v_opacity;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4<f32>(1.0);
#endif

    return fragColor;
}