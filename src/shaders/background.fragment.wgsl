struct Uniforms {
    u_matrix: mat4x4f,
    u_opacity: f32,
    u_color: vec4f,
};

var<uniform> uniforms: Uniforms;

@fragment
fn main() -> @location(0) vec4f {
    var fragColor: vec4f = uniforms.u_color * uniforms.u_opacity;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4<f32>(1.0);
#endif

    return fragColor;
}