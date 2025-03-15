#include<preludeVertex>

struct Params {
    u_blur: f32,
};

struct Uniforms {
    u_matrix: mat4x4f,
    u_scale_with_map: u32,
    u_pitch_with_map: u32,
    u_extrude_scale: vec2f,
    u_device_pixel_ratio: f32,
    u_camera_to_center_distance: f32,
};

struct VertexInput {
    @location(0) a_pos: vec2f,
    @location(1) a_color: u32,
    @location(2) a_radius: f32,
    @location(3) a_opacity: f32,
    @location(4) a_stroke_width: f32,
    @location(5) a_stroke_color: u32,
    @location(6) a_stroke_opacity: f32,
}; 

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_data: vec3f,
    @location(1) v_visibility: f32,
    @location(2) v_color: vec4f,
    @location(3) v_radius: f32,
    @location(4) v_opacity: f32,
    @location(5) v_stroke_width: f32,
    @location(6) v_stroke_color: vec4f,
    @location(7) v_stroke_opacity: f32,
};

var<uniform> params: Params;
var<uniform> uniforms: Uniforms;

// fn get_elevation(pos: vec2f) -> f32 {
//     return 0.0;
// }

// fn calculate_visibility(pos: vec4f) -> f32 {
//     return 1.0;
// }

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    // unencode the extrusion vector that we snuck into the a_pos vector
    var extrude: vec2f = vec2f((input.a_pos % 2.0) * 2.0 - 1.0);

    // multiply a_pos by 0.5, since we had it * 2 in order to sneak
    // in extrusion data
    var circle_center: vec2f = floor(input.a_pos * 0.5);
    var ele: f32 = get_elevation(circle_center);
    output.v_visibility = calculate_visibility(uniforms.u_matrix * vec4(circle_center, ele, 1.0));

    if (uniforms.u_pitch_with_map == 1) {
        var corner_position: vec2f = circle_center;
        if (uniforms.u_scale_with_map == 1) {
            corner_position += extrude * (input.a_radius + input.a_stroke_width) * uniforms.u_extrude_scale;
        } else {
            // Pitching the circle with the map effectively scales it with the map
            // To counteract the effect for pitch-scale: viewport, we rescale the
            // whole circle based on the pitch scaling effect at its central point
            var projected_center: vec4f = uniforms.u_matrix * vec4f(circle_center, 0, 1);
            corner_position += extrude * (input.a_radius + input.a_stroke_width) * uniforms.u_extrude_scale * (projected_center.w / uniforms.u_camera_to_center_distance);
        }

        output.position = uniforms.u_matrix * vec4f(corner_position, ele, 1);
    } else {
        output.position = uniforms.u_matrix * vec4f(circle_center, ele, 1);

        if (uniforms.u_scale_with_map == 1) {
            output.position = vec4f(output.position.xy + extrude * (input.a_radius + input.a_stroke_width) * uniforms.u_extrude_scale * uniforms.u_camera_to_center_distance, output.position.zw);
        } else {
            output.position = vec4f(output.position.xy + extrude * (input.a_radius + input.a_stroke_width) * uniforms.u_extrude_scale * output.position.w, output.position.zw);
        }
    }
    // This is a minimum blur distance that serves as a faux-antialiasing for
    // the circle. since blur is a ratio of the circle's size and the intent is
    // to keep the blur at roughly 1px, the two are inversely related.
    var antialiasblur: f32 = 1.0 / uniforms.u_device_pixel_ratio / (input.a_radius + input.a_stroke_width);

    output.v_data = vec3f(extrude.x, extrude.y, antialiasblur);
    output.v_color = vec4f(
        f32((input.a_color >> 8) & 0xff),
        f32(input.a_color & 0xff),
        f32((input.a_color >> 24) & 0xff),
        f32((input.a_color >> 16) & 0xff)
    ) / 255.0;
    output.v_radius = input.a_radius;
    output.v_opacity = input.a_opacity;
    output.v_stroke_width = input.a_stroke_width;
    output.v_stroke_color = vec4f(
        f32((input.a_stroke_color >> 8) & 0xff),
        f32(input.a_stroke_color & 0xff),
        f32((input.a_stroke_color >> 24) & 0xff),
        f32((input.a_stroke_color >> 16) & 0xff)
    ) / 255.0;
    output.v_stroke_opacity = input.a_stroke_opacity;
    
    return output;
}