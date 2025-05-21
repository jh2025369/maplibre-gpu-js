struct Uniforms {
    u_matrix: mat4x4f,
    u_dimension: vec2f,
    u_zoom: f32,
    u_unpack: vec4f,
};

struct FragmentInput {
    @location(0) v_pos: vec2f,
}

var<uniform> uniforms: Uniforms;
var u_image: texture_2d<f32>;
var u_imageSampler: sampler;


fn getElevation(coord: vec2f, bias: f32) -> f32 {
    // Convert encoded elevation value to meters
    var data: vec4f = textureSample(u_image, u_imageSampler, vec2f(coord.x, 1 - coord.y)) * 255.0;
    data.a = -1.0;
    return dot(data, uniforms.u_unpack) / 4.0;
}

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var epsilon: vec2f = 1.0 / uniforms.u_dimension;

    // queried pixels:
    // +-----------+
    // |   |   |   |
    // | a | b | c |
    // |   |   |   |
    // +-----------+
    // |   |   |   |
    // | d | e | f |
    // |   |   |   |
    // +-----------+
    // |   |   |   |
    // | g | h | i |
    // |   |   |   |
    // +-----------+

    var a: f32 = getElevation(input.v_pos + vec2f(-epsilon.x, epsilon.y), 0.0);
    var b: f32 = getElevation(input.v_pos + vec2f(0, epsilon.y), 0.0);
    var c: f32 = getElevation(input.v_pos + vec2f(epsilon.x, epsilon.y), 0.0);
    var d: f32 = getElevation(input.v_pos + vec2f(-epsilon.x, 0), 0.0);
    var e: f32 = getElevation(input.v_pos, 0.0);
    var f: f32 = getElevation(input.v_pos + vec2f(epsilon.x, 0), 0.0);
    var g: f32 = getElevation(input.v_pos + vec2f(-epsilon.x, -epsilon.y), 0.0);
    var h: f32 = getElevation(input.v_pos + vec2f(0, -epsilon.y), 0.0);
    var i: f32 = getElevation(input.v_pos + vec2f(epsilon.x, -epsilon.y), 0.0);

    // Here we divide the x and y slopes by 8 * pixel size
    // where pixel size (aka meters/pixel) is:
    // circumference of the world / (pixels per tile * number of tiles)
    // which is equivalent to: 8 * 40075016.6855785 / (512 * pow(2, u_zoom))
    // which can be reduced to: pow(2, 19.25619978527 - u_zoom).
    // We want to vertically exaggerate the hillshading because otherwise
    // it is barely noticeable at low zooms. To do this, we multiply this by
    // a scale factor that is a function of zooms below 15, which is an arbitrary
    // that corresponds to the max zoom level of Mapbox terrain-RGB tiles.
    // See nickidlugash's awesome breakdown for more info:
    // https://github.com/mapbox/mapbox-gl-js/pull/5286#discussion_r148419556

    var exaggerationFactor: f32 = select(select(0.3, 0.35, uniforms.u_zoom < 4.5), 0.4, uniforms.u_zoom < 2.0);
    var exaggeration: f32 = select(0.0, (uniforms.u_zoom - 15.0) * exaggerationFactor, uniforms.u_zoom < 15.0);

    var deriv: vec2f = vec2f(
        (c + f + f + i) - (a + d + d + g),
        (g + h + h + i) - (a + b + b + c)
    ) / pow(2.0, exaggeration + (19.2562 - uniforms.u_zoom));

    var fragColor: vec4f = vec4f(
        clamp(deriv.x / 2.0 + 0.5, 0.0, 1.0),
        clamp(deriv.y / 2.0 + 0.5, 0.0, 1.0),
        1.0,
        1.0
    );

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return fragColor;
}
