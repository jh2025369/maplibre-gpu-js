#include<preludeVertex>

struct Uniforms {
    u_matrix: mat4x4f,
    u_lightpos: vec3f,
    u_lightintensity: f32,
    u_lightcolor: vec3f,
    u_vertical_gradient: f32,
    u_opacity: f32,
};

struct VertexInput {
    @location(0) a_pos: vec2f,
    @location(1) a_normal_ed: vec4f,
    @location(2) a_color: vec4f,
    @location(3) a_base: f32,
    @location(4) a_height: f32,
#ifdef TERRAIN3D
    @location(5) a_centroid: vec2f,
#endif
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_color_: vec4f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var normal: vec3<f32> = input.a_normal_ed.xyz;

    #ifdef TERRAIN3D
	// Raise the "ceiling" of elements by the elevation of the centroid, in meters.
        var height_terrain3d_offset: f32 = get_elevation(input.a_centroid);
	// To avoid having buildings "hang above a slope", create a "basement"
	// by lowering the "floor" of ground-level (and below) elements.
	// This is in addition to the elevation of the centroid, in meters.
        var base_terrain3d_offset: f32 = height_terrain3d_offset - (input.a_base > 0.0 ? 0.0 : 10.0);
    #else
        var height_terrain3d_offset: f32 = 0.0;
        var base_terrain3d_offset: f32 = 0.0;
    #endif
    // Sub-terranian "floors and ceilings" are clamped to ground-level.
    // 3D Terrain offsets, if applicable, are applied on the result.
    var base: f32 = max(0.0, input.a_base) + base_terrain3d_offset;
    var height: f32 = max(0.0, input.a_height) + height_terrain3d_offset;

    var t: f32 = normal.x - 2.0 * floor(normal.x / 2.0);

    output.position = uniforms.u_matrix * vec4f(input.a_pos, select(base, height, t > 0.0), 1);

    // Relative luminance (how dark/bright is the surface color?)
    var colorvalue: f32 = input.a_color.r * 0.2126 + input.a_color.g * 0.7152 + input.a_color.b * 0.0722;

    output.v_color_ = vec4f(0.0, 0.0, 0.0, 1.0);

    // Add slight ambient lighting so no extrusions are totally black
    var ambientlight: vec4f = vec4f(0.03, 0.03, 0.03, 1.0);
    var color: vec4f = input.a_color + ambientlight;

    // Calculate cos(theta), where theta is the angle between surface normal and diffuse light ray
    var directional: f32 = clamp(dot(normal / 16384.0, uniforms.u_lightpos), 0.0, 1.0);

    // Adjust directional so that
    // the range of values for highlight/shading is narrower
    // with lower light intensity
    // and with lighter/brighter surface colors
    directional = mix((1.0 - uniforms.u_lightintensity), max((1.0 - colorvalue + uniforms.u_lightintensity), 1.0), directional);

    // Add gradient along z axis of side surfaces
    if (normal.y != 0.0) {
        // This avoids another branching statement, but multiplies by a constant of 0.84 if no vertical gradient,
        // and otherwise calculates the gradient based on base + height
        directional *= (
            (1.0 - uniforms.u_vertical_gradient) +
            (uniforms.u_vertical_gradient * clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - uniforms.u_lightintensity), 1.0)));
    }

    // Assign final color based on surface + ambient light color, diffuse light directional, and light color
    // with lower bounds adjusted to hue of light
    // so that shading is tinted with the complementary (opposite) color to the light color
    output.v_color_.r += clamp(color.r * directional * uniforms.u_lightcolor.r, mix(0.0, 0.3, 1.0 - uniforms.u_lightcolor.r), 1.0);
    output.v_color_.g += clamp(color.g * directional * uniforms.u_lightcolor.g, mix(0.0, 0.3, 1.0 - uniforms.u_lightcolor.g), 1.0);
    output.v_color_.b += clamp(color.b * directional * uniforms.u_lightcolor.b, mix(0.0, 0.3, 1.0 - uniforms.u_lightcolor.b), 1.0);
    output.v_color_ *= uniforms.u_opacity;

    return output;
}
