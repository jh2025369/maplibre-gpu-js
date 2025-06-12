struct Uniforms {
    u_matrix: mat4x4f,
    u_world: vec2f,
    u_opacity: f32,
};

struct FragmentInput {
    @location(0) v_pos: vec2f,
}

var<uniform> uniforms: Uniforms;

var u_image: texture_2d<f32>;
var u_imageSampler: sampler;
var u_color_ramp: texture_2d<f32>;
var u_color_rampSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var t: f32 = textureSample(u_image, u_imageSampler, input.v_pos).r;
    var color: vec4f = textureSample(u_color_ramp, u_color_rampSampler, vec2f(t, 0.5));
    var fragColor: vec4f = color * uniforms.u_opacity;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(0.0);
#endif

    return fragColor;
}
