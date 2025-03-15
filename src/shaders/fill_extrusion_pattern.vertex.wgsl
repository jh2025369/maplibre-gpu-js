#include<preludeVertex>

struct Uniforms {
    u_matrix: mat4x4f,
    u_lightpos: vec3f,
    u_lightintensity: f32,
    u_lightcolor: vec3f,
    u_vertical_gradient: f32,
    u_opacity: f32,
    u_texsize: vec2f,
    u_scale: vec3f,
    u_fade: f32,
    u_pixel_coord_upper: vec2f,
    u_pixel_coord_lower: vec2f,
    u_height_factor: f32,
};

struct VertexInput {
    @location(0) a_pos: vec2f,
    @location(1) a_normal_ed: vec4f,
    @location(2) a_pattern_to: vec4f,
    @location(3) a_pattern_from: vec4f,
    @location(4) a_pixel_ratio_to: f32,
    @location(5) a_pixel_ratio_from: f32,
    @location(6) a_base: f32,
    @location(7) a_height: f32,
#ifdef TERRAIN3D
    @location(8) a_centroid: vec2f,
#endif
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_pos_a: vec2f,
    @location(1) v_pos_b: vec2f,
    @location(2) v_lighting: vec4f,
    @location(3) v_pattern_to: vec4f,
    @location(4) v_pattern_from: vec4f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var pattern_tl_a: vec2f = input.a_pattern_from.xy;
    var pattern_br_a: vec2f = input.a_pattern_from.zw;
    var pattern_tl_b: vec2f = input.a_pattern_to.xy;
    var pattern_br_b: vec2f = input.a_pattern_to.zw;

    var tileRatio: f32 = uniforms.u_scale.x;
    var fromScale: f32 = uniforms.u_scale.y;
    var toScale: f32 = uniforms.u_scale.z;

    var normal : vec3f = input.a_normal_ed.xyz;
    var edgedistance: f32 = input.a_normal_ed.w;

    var display_size_a: vec2f = (pattern_br_a - pattern_tl_a) / input.a_pixel_ratio_from;
    var display_size_b: vec2f = (pattern_br_b - pattern_tl_b) / input.a_pixel_ratio_to;

    #ifdef TERRAIN3D
	// Raise the "ceiling" of elements by the elevation of the centroid, in meters.
        var height_terrain3d_offset: f32 = get_elevation(input.a_centroid);
	// To avoid having buildings "hang above a slope", create a "basement"
	// by lowering the "floor" of ground-level (and below) elements.
	// This is in addition to the elevation of the centroid, in meters.
        var base_terrain3d_offset: f32 = height_terrain3d_offset - select(10.0, 0.0, input.a_base > 0.0);
    #else
        var height_terrain3d_offset: f32 = 0.0;
        var base_terrain3d_offset: f32 = 0.0;
    #endif
    // Sub-terranian "floors and ceilings" are clamped to ground-level.
    // 3D Terrain offsets, if applicable, are applied on the result.
    var base: f32 = max(0.0, input.a_base) + base_terrain3d_offset;
    var height: f32 = max(0.0, input.a_height) + height_terrain3d_offset;

    var t: f32 = normal.x % 2.0;
    var z: f32 = select(base, height, t > 0.0);

    output.position = uniforms.u_matrix * vec4f(input.a_pos, z, 1);

    var pos: vec2f = select(
        vec2f(edgedistance, z * uniforms.u_height_factor), // extrusion side
        a_pos, // extrusion top
        normal.x == 1.0 && normal.y == 0.0 && normal.z == 16384.0);

    output.v_pos_a = get_pattern_pos(uniforms.u_pixel_coord_upper, uniforms.u_pixel_coord_lower, fromScale * display_size_a, tileRatio, pos);
    output.v_pos_b = get_pattern_pos(uniforms.u_pixel_coord_upper, uniforms.u_pixel_coord_lower, toScale * display_size_b, tileRatio, pos);

    output.v_lighting = vec4f(0.0, 0.0, 0.0, 1.0);
    var directional: f32 = clamp(dot(normal / 16383.0, uniforms.u_lightpos), 0.0, 1.0);
    directional = mix((1.0 - uniforms.u_lightintensity), max((0.5 + uniforms.u_lightintensity), 1.0), directional);

    if (normal.y != 0.0) {
        // This avoids another branching statement, but multiplies by a constant of 0.84 if no vertical gradient,
        // and otherwise calculates the gradient based on base + height
        directional *= (
            (1.0 - uniforms.u_vertical_gradient) +
            (uniforms.u_vertical_gradient * clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - uniforms.u_lightintensity), 1.0)));
    }

    output.v_lighting.rgb += clamp(directional * uniforms.u_lightcolor, mix(vec3f(0.0), vec3f(0.3), 1.0 - uniforms.u_lightcolor), vec3f(1.0));
    output.v_lighting *= uniforms.u_opacity;

    output.v_pattern_to = input.a_pattern_to;
    output.v_pattern_from = input.a_pattern_from;

    return output;
}
