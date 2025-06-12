struct Uniforms {
    u_matrix: mat4x4f,
    u_extrude_scale: f32,
    u_intensity: f32,
};

struct FragmentInput {
    @location(0) v_extrude: vec2f,
    @location(1) v_weight: f32,
    @location(2) v_radius: f32,
}

var<uniform> uniforms: Uniforms;

// Gaussian kernel coefficient: 1 / sqrt(2 * PI)
#define GAUSS_COEF 0.3989422804014327

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    // Kernel density estimation with a Gaussian kernel of size 5x5
    var d: f32 = -0.5 * 3.0 * 3.0 * dot(input.v_extrude, input.v_extrude);
    var val: f32 = input.v_weight * uniforms.u_intensity * GAUSS_COEF * exp(d);

    var fragColor: vec4f = vec4f(val, 1.0, 1.0, 1.0);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return fragColor;
}
