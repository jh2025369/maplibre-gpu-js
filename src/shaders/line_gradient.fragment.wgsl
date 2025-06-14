struct Uniforms {
    u_matrix: mat4x4f,
    u_ratio: f32,
    u_units_to_pixels: vec2f,
    u_device_pixel_ratio: f32,
    u_image_height: f32,
};

struct FragmentInput {
    @location(0) v_normal: vec2f,
    @location(1) v_width2: vec2f,
    @location(2) v_gamma_scale: f32,
    @location(3) v_uv: vec2f,
    @location(4) v_blur: f32,
    @location(5) v_opacity: f32,
    @location(6) v_gapwidth: f32,
    @location(7) v_offset: f32,
    @location(8) v_width: f32,
}

var<uniform> uniforms: Uniforms;
var u_image: texture_2d<f32>;
var u_imageSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    // Calculate the distance of the pixel from the line in pixels.
    var dist: f32 = length(input.v_normal) * input.v_width2.x;

    // Calculate the antialiasing fade factor. This is either when fading in
    // the line in case of an offset line (v_width2.t) or when fading out
    // (v_width2.s)
    var blur2: f32 = (input.v_blur + 1.0 / uniforms.u_device_pixel_ratio) * input.v_gamma_scale;
    var alpha: f32 = clamp(min(dist - (input.v_width2.y - blur2), input.v_width2.x - dist) / blur2, 0.0, 1.0);

    // For gradient lines, v_lineprogress is the ratio along the
    // entire line, the gradient ramp is stored in a texture.
    var color: vec4f = textureSample(u_image, u_imageSampler, input.v_uv);

    var fragColor: vec4f = color * (alpha * input.v_opacity);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return fragColor;
}
