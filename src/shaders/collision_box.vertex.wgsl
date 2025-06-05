#include<preludeVertex>

struct Uniforms {
    u_matrix: mat4x4f,
    u_camera_to_center_distance: f32,
    u_pixels_to_tile_units: f32,
    u_extrude_scale: vec2f,
    u_overscale_factor: f32,
};

struct VertexInput {
    @location(0) a_pos : vec2f,
    @location(1) a_anchor_pos : vec2f,
    @location(2) a_extrude: vec2f,
    @location(3) a_placed: u32,
    @location(4) a_shift: vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_placed: f32,
    @location(1) v_notUsed: f32,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var projectedPoint: vec4f = uniforms.u_matrix * vec4f(input.a_anchor_pos, 0, 1);
    var camera_to_anchor_distance: f32 = projectedPoint.w;
    var collision_perspective_ratio: f32 = clamp(
        0.5 + 0.5 * (uniforms.u_camera_to_center_distance / camera_to_anchor_distance),
        0.0, // Prevents oversized near-field boxes in pitched/overzoomed tiles
        4.0);

    output.position = uniforms.u_matrix * vec4f(input.a_pos, get_elevation(input.a_pos), 1.0);
    output.position.xy += (input.a_extrude + input.a_shift) * uniforms.u_extrude_scale * output.position.w * collision_perspective_ratio;

    var a_placed: vec4f = unpack4x8unorm(input.a_placed) * 255.0;
    output.v_placed = a_placed.x;
    output.v_notUsed = a_placed.y;

    return output;
}