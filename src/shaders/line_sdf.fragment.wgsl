struct Params {
    u_gapwidth: f32,
    u_offset: f32,
    u_blur: f32,
};

struct Uniforms {
    u_matrix: mat4x4f,
    u_ratio: f32,
    u_units_to_pixels: vec2f,
    u_device_pixel_ratio: f32,
    u_patternscale_a: vec2f,
    u_patternscale_b: vec2f,
    u_sdfgamma: f32,
    u_tex_y_a: f32,
    u_tex_y_b: f32,
    u_mix: f32,
};

struct FragmentInput {
    @location(0) v_normal: vec2f,
    @location(1) v_width2: vec2f,
    @location(2) v_gamma_scale: f32,
    @location(3) v_tex_a: vec2f,
    @location(4) v_tex_b: vec2f,
    @location(5) v_opacity: f32,
    @location(6) v_color: vec4f,
    @location(7) v_floorwidth: f32,
}

var<uniform> params: Params;
var<uniform> uniforms: Uniforms;
var u_image: texture_2d<f32>;
var u_imageSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var dist: f32 = length(input.v_normal) * input.v_width2.x;

    var blur2: f32 = (params.u_blur + 1.0 / uniforms.u_device_pixel_ratio) * input.v_gamma_scale;
    var alpha: f32 = clamp(min(dist - (input.v_width2.y - blur2), input.v_width2.x - dist) / blur2, 0.0, 1.0);

    var sdfdist_a: f32 = textureSample(u_image, u_imageSampler, input.v_tex_a).r;
    var sdfdist_b: f32 = textureSample(u_image, u_imageSampler, input.v_tex_b).r;
    var sdfdist: f32 = mix(sdfdist_a, sdfdist_b, uniforms.u_mix);
    alpha *= smoothstep(0.5 - uniforms.u_sdfgamma / input.v_floorwidth, 0.5 + uniforms.u_sdfgamma / input.v_floorwidth, sdfdist);

    var fragColor: vec4f = input.v_color * (alpha * input.v_opacity);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4<f32>(1.0);
#endif

    return fragColor;
}