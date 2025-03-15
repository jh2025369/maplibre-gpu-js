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
};

struct VertexInput {
    @location(0) a_pos_normal : vec2f,
    @location(1) a_data : u32,
    @location(2) a_opacity: f32,
    @location(3) a_color: u32,
    @location(4) a_width: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_normal: vec2f,
    @location(1) v_width2: vec2f,
    @location(2) v_gamma_scale: f32,
    @location(3) v_linesofar: f32,
    @location(4) v_opacity: f32,
    @location(5) v_color: vec4f,
};

var<uniform> params: Params;
var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var ANTIALIASING: f32 = 1.0 / uniforms.u_device_pixel_ratio / 2.0;

    var a_data: vec4<f32> = unpack4x8unorm(input.a_data) * 255.0;
    
    // var a_data_x: f32 = f32(input.a_data & 0xff);
    // var a_data_y: f32 = f32((input.a_data >> 8) & 0xff);
    // var a_data_z: f32 = f32((input.a_data >> 16) & 0xff);
    // var a_data_w: f32 = f32((input.a_data >> 24) & 0xff);

    var a_extrude: vec2f = a_data.xy - 128.0;
    var a_direction: f32 = a_data.z % 4.0 - 1.0;

    output.v_linesofar = (floor(a_data.z / 4.0) + a_data.w * 64.0) * 2.0;

    var pos: vec2f = floor(input.a_pos_normal * 0.5);

    var normal: vec2f = input.a_pos_normal - 2.0 * pos;
    normal.y = normal.y * 2.0 - 1.0;
    output.v_normal = normal;

    var width: f32 = select(1.0, input.a_width, input.a_width > 0.0);
    var gapwidth: f32 = params.u_gapwidth / 2.0;
    var halfwidth: f32 = width / 2.0;
    var offset: f32 = -1.0 * params.u_offset;

    var inset: f32 = gapwidth + select(0.0, ANTIALIASING, gapwidth > 0.0);
    var outset: f32 = gapwidth + halfwidth * select(1.0, 2.0, gapwidth > 0.0) + select(ANTIALIASING, 0.0, halfwidth == 0.0);

    var dist: vec2f = outset * a_extrude * 0.015873016;

    var u: f32 = 0.5 * a_direction;
    var t: f32 = 1.0 - abs(u);
    var offset2: vec2f = offset * a_extrude * 0.015873016 * normal.y * mat2x2f(t, -u, u, t);

    var projected_extrude: vec4f = uniforms.u_matrix * vec4(dist / uniforms.u_ratio, 0.0, 0.0);
    output.position = uniforms.u_matrix * vec4(pos + offset2 / uniforms.u_ratio, 0.0, 1.0) + projected_extrude;

    #ifdef TERRAIN3D
        output.v_gamma_scale = 1.0;
    #else
        var extrude_length_without_perspective: f32 = length(dist);
        var extrude_length_with_perspective: f32 = length(projected_extrude.xy / output.position.w * uniforms.u_units_to_pixels);
        output.v_gamma_scale = extrude_length_without_perspective / extrude_length_with_perspective;
    #endif

    output.v_width2 = vec2f(outset, inset);
    output.v_opacity = input.a_opacity;

    // var rgba: vec4f = unpack4x8unorm(input.a_color) * 255.0;
    // output.v_color = rgba / 255.0;

    // var rgba: vec2f = unpack2x16unorm(input.a_color) * 65535.0;
    // var g: f32 = floor(rgba.x / 256.0);
    // var r: f32 = rgba.x - g * 256.0;
    // var a: f32 = floor(rgba.y / 256.0);
    // var b: f32 = rgba.y - a * 256.0;

    // var g: f32 = f32(input.a_color & 0xff);
    // var r: f32 = f32((input.a_color >> 8) & 0xff);
    // var a: f32 = f32((input.a_color >> 16) & 0xff);
    // var b: f32 = f32((input.a_color >> 24) & 0xff);

    output.v_color = vec4f(
        f32((input.a_color >> 8) & 0xff),
        f32(input.a_color & 0xff),
        f32((input.a_color >> 24) & 0xff),
        f32((input.a_color >> 16) & 0xff)
    ) / 255.0;
    
    return output;
}