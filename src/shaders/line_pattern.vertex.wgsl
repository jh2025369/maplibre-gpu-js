struct Uniforms {
    u_matrix: mat4x4f,
    u_texsize: vec2f,
    u_ratio: f32,
    u_units_to_pixels: vec2f,
    u_device_pixel_ratio: f32,
    u_scale: vec3f,
    u_fade: f32,
};

struct VertexInput {
    @location(0) a_pos_normal: vec2f,
    @location(1) a_data: u32,
    @location(2) a_blur: f32,
    @location(3) a_opacity: f32,
    @location(4) a_offset: f32,
    @location(5) a_gapwidth: f32,
    @location(6) a_width: f32,
    @location(7) a_floorwidth: f32,
    @location(8) a_pattern_from: vec4f,
    @location(9) a_pattern_to: vec4f,
    @location(10) a_pixel_ratio_from: f32,
    @location(11) a_pixel_ratio_to: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
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
};

var<uniform> uniforms: Uniforms;

// floor(127 / 2) == 63.0
// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is
// stored in a byte (-128..127). we scale regular normals up to length 63, but
// there are also "special" normals that have a bigger length (of up to 126 in
// this case).
// #define SCALE 63.0
#define SCALE 0.015873016

// We scale the distance before adding it to the buffers so that we can store
// long distances for long segments. Use this value to unscale the distance.
#define LINE_DISTANCE_SCALE 2.0

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    // the distance over which the line edge fades out.
    // Retina devices need a smaller distance to avoid aliasing.
    var ANTIALIASING: f32 = 1.0 / uniforms.u_device_pixel_ratio / 2.0;
    
    var a_data: vec4f = unpack4x8unorm(input.a_data) * 255.0;

    var a_extrude: vec2f = a_data.xy - 128.0;
    var a_direction: f32 = a_data.z % 4.0 - 1.0;
    var a_linesofar: f32 = (floor(a_data.z / 4.0) + a_data.w * 64.0) * LINE_DISTANCE_SCALE;
    // float tileRatio = u_scale.x;
    var pos: vec2f = floor(input.a_pos_normal * 0.5);

    // x is 1 if it's a round cap, 0 otherwise
    // y is 1 if the normal points up, and -1 if it points down
    // We store these in the least significant bit of a_pos_normal
    var normal: vec2f = input.a_pos_normal - 2.0 * pos;
    normal.y = normal.y * 2.0 - 1.0;
    output.v_normal = normal;

    // these transformations used to be applied in the JS and native code bases.
    // moved them into the shader for clarity and simplicity.
    var gapwidth: f32 = input.a_gapwidth / 2.0;
    var halfwidth: f32 = input.a_width / 2.0;
    var offset: f32 = -1.0 * input.a_offset;

    var inset: f32 = gapwidth + select(0.0, ANTIALIASING, gapwidth > 0.0);
    var outset: f32 = gapwidth + halfwidth * select(1.0, 2.0, gapwidth > 0.0) + select(ANTIALIASING, 0.0, halfwidth == 0.0);

    // Scale the extrusion vector down to a normal and then up by the line width
    // of this vertex.
    var dist: vec2f = outset * a_extrude * SCALE;

    // Calculate the offset when drawing a line that is to the side of the actual line.
    // We do this by creating a vector that points towards the extrude, but rotate
    // it when we're drawing round end points (a_direction = -1 or 1) since their
    // extrude vector points in another direction.
    var u: f32 = 0.5 * a_direction;
    var t: f32 = 1.0 - abs(u);
    var offset2: vec2f = offset * a_extrude * SCALE * normal.y * mat2x2<f32>(t, -u, u, t);

    var projected_extrude: vec4f = uniforms.u_matrix * vec4f(dist / uniforms.u_ratio, 0.0, 0.0);
    output.position = uniforms.u_matrix * vec4f(pos + offset2 / uniforms.u_ratio, 0.0, 1.0) + projected_extrude;

    // calculate how much the perspective view squishes or stretches the extrude
    #ifdef TERRAIN3D
        output.v_gamma_scale = 1.0; // not needed, because this is done automatically via the mesh
    #else
        var extrude_length_without_perspective: f32 = length(dist);
        var extrude_length_with_perspective: f32 = length(projected_extrude.xy / output.position.w * uniforms.u_units_to_pixels);
        output.v_gamma_scale = extrude_length_without_perspective / extrude_length_with_perspective;
    #endif

    output.v_linesofar = a_linesofar;
    output.v_width2 = vec2f(outset, inset);
    output.v_width3 = input.a_floorwidth;

    output.v_blur = input.a_blur;
    output.v_opacity = input.a_opacity;
    output.v_offset = input.a_offset;
    output.v_gapwidth = input.a_gapwidth;
    output.v_pattern_from = input.a_pattern_from;
    output.v_pattern_to = input.a_pattern_to;
    output.v_pixel_ratio_from = input.a_pixel_ratio_from;
    output.v_pixel_ratio_to = input.a_pixel_ratio_to;

    return output;
}
