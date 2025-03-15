
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

struct FragmentInput {
    @location(0) v_pos0: vec2f,
    @location(1) v_pos1: vec2f,
}

var<uniform> uniforms: Uniforms;
var u_image0: texture_2d<f32>;
var u_image0Sampler: sampler;
var u_image1: texture_2d<f32>;
var u_image1Sampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {

    // read and cross-fade colors from the main and parent tiles
    var color0: vec4f = textureSample(u_image0, u_image0Sampler, input.v_pos0);
    var color1: vec4f = textureSample(u_image1, u_image1Sampler, input.v_pos1);
    if (color0.a > 0.0) {
        color0 = vec4f(color0.rgb / color0.a, color0.a);
    }
    if (color1.a > 0.0) {
        color1 = vec4f(color1.rgb / color1.a, color1.a);
    }
    var color: vec4f = mix(color0, color1, uniforms.u_fade_t);
    color.a *= uniforms.u_opacity;
    var rgb: vec3f = color.rgb;

    // spin
    rgb = vec3f(
        dot(rgb, uniforms.u_spin_weights.xyz),
        dot(rgb, uniforms.u_spin_weights.zxy),
        dot(rgb, uniforms.u_spin_weights.yzx));

    // saturation
    var average: f32 = (color.r + color.g + color.b) / 3.0;
    rgb += (average - rgb) * uniforms.u_saturation_factor;

    // contrast
    rgb = (rgb - 0.5) * uniforms.u_contrast_factor + 0.5;

    // brightness
    var u_high_vec: vec3f = vec3f(uniforms.u_brightness_low, uniforms.u_brightness_low, uniforms.u_brightness_low);
    var u_low_vec: vec3f = vec3f(uniforms.u_brightness_high, uniforms.u_brightness_high, uniforms.u_brightness_high);

    var fragColor: vec4f = vec4f(mix(u_high_vec, u_low_vec, rgb) * color.a, color.a);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return vec4f(255, 0, 0, 1.0);
}
