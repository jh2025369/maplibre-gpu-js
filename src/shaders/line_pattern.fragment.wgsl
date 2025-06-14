struct Uniforms {
    u_matrix: mat4x4f,
    u_texsize: vec2f,
    u_ratio: f32,
    u_units_to_pixels: vec2f,
    u_device_pixel_ratio: f32,
    u_scale: vec3f,
    u_fade: f32,
};

struct FragmentInput {
    @location(0) v_normal: vec2f,
    @location(1) v_width2: vec2f,
    @location(2) v_linesofar: f32,
    @location(3) v_gamma_scale: f32,
    @location(4) v_width3: f32,
    @location(5) v_blur: f32,
    @location(6) v_opacity: f32,
    @location(7) v_offset: f32,
    @location(8) v_gapwidth: f32,
    @location(9) v_pattern_from: vec4f,
    @location(10) v_pattern_to: vec4f,
    @location(11) v_pixel_ratio_from: f32,
    @location(12) v_pixel_ratio_to: f32,
}

var<uniform> uniforms: Uniforms;
var u_image: texture_2d<f32>;
var u_imageSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var pattern_tl_a: vec2f = input.v_pattern_from.xy;
    var pattern_br_a: vec2f = input.v_pattern_from.zw;
    var pattern_tl_b: vec2f = input.v_pattern_to.xy;
    var pattern_br_b: vec2f = input.v_pattern_to.zw;

    var tileZoomRatio: f32 = uniforms.u_scale.x;
    var fromScale: f32 = uniforms.u_scale.y;
    var toScale: f32 = uniforms.u_scale.z;

    var display_size_a: vec2f = (pattern_br_a - pattern_tl_a) / input.v_pixel_ratio_from;
    var display_size_b: vec2f = (pattern_br_b - pattern_tl_b) / input.v_pixel_ratio_to;

    var pattern_size_a: vec2f = vec2f(display_size_a.x * fromScale / tileZoomRatio, display_size_a.y);
    var pattern_size_b: vec2f = vec2f(display_size_b.x * toScale / tileZoomRatio, display_size_b.y);

    var aspect_a: f32 = display_size_a.y / input.v_width3;
    var aspect_b: f32 = display_size_b.y / input.v_width3;

    // Calculate the distance of the pixel from the line in pixels.
    var dist: f32 = length(input.v_normal) * input.v_width2.x;

    // Calculate the antialiasing fade factor. This is either when fading in
    // the line in case of an offset line (v_width2.t) or when fading out
    // (v_width2.s)
    var blur2: f32 = (input.v_blur + 1.0 / uniforms.u_device_pixel_ratio) * input.v_gamma_scale;
    var alpha: f32 = clamp(min(dist - (input.v_width2.y - blur2), input.v_width2.x - dist) / blur2, 0.0, 1.0);

    var x_a: f32 = fract(input.v_linesofar / pattern_size_a.x * aspect_a);
    var x_b: f32 = fract(input.v_linesofar / pattern_size_b.x * aspect_b);

    var y: f32 = 0.5 * input.v_normal.y + 0.5;

    var texel_size: vec2f = 1.0 / uniforms.u_texsize;

    var pos_a: vec2f = mix(pattern_tl_a * texel_size - texel_size, pattern_br_a * texel_size + texel_size, vec2f(x_a, y));
    var pos_b: vec2f = mix(pattern_tl_b * texel_size - texel_size, pattern_br_b * texel_size + texel_size, vec2f(x_b, y));

    var color: vec4f = mix(
        textureSample(u_image, u_imageSampler, pos_a),
        textureSample(u_image, u_imageSampler, pos_b),
        uniforms.u_fade
    );

    var fragColor: vec4f = color * alpha * input.v_opacity;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return fragColor;
}
