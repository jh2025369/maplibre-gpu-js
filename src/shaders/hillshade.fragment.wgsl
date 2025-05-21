struct Uniforms {
    u_matrix: mat4x4f,
    u_latrange: vec2f,
    u_light: vec2f,
    u_shadow: vec4f,
    u_highlight: vec4f,
    u_accent: vec4f,
};

struct FragmentInput {
    @location(0) v_pos: vec2f,
}

var<uniform> uniforms: Uniforms;
var u_image: texture_2d<f32>;
var u_imageSampler: sampler;

#define PI 3.141592653589793

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var pixel: vec4f = textureSample(u_image, u_imageSampler, vec2f(input.v_pos.x, input.v_pos.y));

    var deriv: vec2f = ((pixel.rg * 2.0) - 1.0);

    // We divide the slope by a scale factor based on the cosin of the pixel's approximate latitude
    // to account for mercator projection distortion. see #4807 for details
    var scaleFactor: f32 = cos(radians((uniforms.u_latrange[0] - uniforms.u_latrange[1]) * (1.0 - input.v_pos.y) + uniforms.u_latrange[1]));
    // We also multiply the slope by an arbitrary z-factor of 1.25
    var slope: f32 = atan(1.25 * length(deriv) / scaleFactor);
    var aspect: f32 = select(
        PI / 2.0 * select(-1.0, 1.0, deriv.y > 0.0),
        atan2(deriv.y, -deriv.x),
        deriv.x != 0.0
    );

    var intensity: f32 = uniforms.u_light.x;
    // We add PI to make this property match the global light object, which adds PI/2 to the light's azimuthal
    // position property to account for 0deg corresponding to north/the top of the viewport in the style spec
    // and the original shader was written to accept (-illuminationDirection - 90) as the azimuthal.
    var azimuth: f32 = uniforms.u_light.y + PI;

    // We scale the slope exponentially based on intensity, using a calculation similar to
    // the exponential interpolation function in the style spec:
    // src/style-spec/expression/definitions/interpolate.js#L217-L228
    // so that higher intensity values create more opaque hillshading.
    var base: f32 = 1.875 - intensity * 1.75;
    var maxValue: f32 = 0.5 * PI;
    var scaledSlope: f32 = select(
        slope,
        ((pow(base, slope) - 1.0) / (pow(base, maxValue) - 1.0)) * maxValue,
        intensity != 0.5
    );

    // The accent color is calculated with the cosine of the slope while the shade color is calculated with the sine
    // so that the accent color's rate of change eases in while the shade color's eases out.
    var accent: f32 = cos(scaledSlope);
    // We multiply both the accent and shade color by a clamped intensity value
    // so that intensities >= 0.5 do not additionally affect the color values
    // while intensity values < 0.5 make the overall color more transparent.
    var accent_color: vec4f = (1.0 - accent) * uniforms.u_accent * clamp(intensity * 2.0, 0.0, 1.0);
    var normalized_angle: f32 = (aspect + azimuth) / PI + 0.5;
    var shade: f32 = abs(normalized_angle - 2.0 * floor(normalized_angle / 2.0) - 1.0);
    var shade_color: vec4f = mix(uniforms.u_shadow, uniforms.u_highlight, shade) * sin(scaledSlope) * clamp(intensity * 2.0, 0.0, 1.0);
    var fragColor: vec4f = accent_color * (1.0 - shade_color.a) + shade_color;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4(1.0);
#endif

    return fragColor;
}
