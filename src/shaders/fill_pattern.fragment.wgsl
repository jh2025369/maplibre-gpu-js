struct Params {
    u_pattern_to: vec4f,
    u_pattern_from: vec4f,
    u_pixel_ratio_to: f32,
    u_pixel_ratio_from: f32,
};

struct Uniforms {
    u_texsize: vec2f,
    u_fade: f32,
    u_matrix: mat4x4f,
    u_pixel_coord_upper: vec2f,
    u_pixel_coord_lower: vec2f,
    u_scale: vec3f,
};

struct FragmentInput {
    @builtin(position) position: vec4f,
    @location(0) v_pos_a: vec2f,
    @location(1) v_pos_b: vec2f,
    @location(2) v_opacity: f32,
};

var<uniform> params: Params;
var<uniform> uniforms: Uniforms;
var u_image : texture_2d<f32>;
var u_imageSampler : sampler;

@fragment
fn main(input: FragmentInput)->@location(0)vec4f{
    var pattern_tl_a: vec2f = params.u_pattern_from.xy;
    var pattern_br_a: vec2f = params.u_pattern_from.zw;
    var pattern_tl_b: vec2f = params.u_pattern_to.xy;
    var pattern_br_b: vec2f = params.u_pattern_to.zw;

    var imagecoord: vec2f = input.v_pos_a % 1.0;
    var pos: vec2f = mix(pattern_tl_a / uniforms.u_texsize, pattern_br_a / uniforms.u_texsize, imagecoord);
    var color1: vec4f = textureSample(u_image, u_imageSampler, pos);

    var imagecoord_b: vec2f =  input.v_pos_b % 1.0;
    var pos2: vec2f = mix(pattern_tl_b / uniforms.u_texsize, pattern_br_b / uniforms.u_texsize, imagecoord_b);
    var color2: vec4f = textureSample(u_image, u_imageSampler, pos2);

    var fragColor: vec4f = mix(color1, color2, uniforms.u_fade) * input.v_opacity;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4<f32>(1.0);
#endif
    
    return fragColor;
}