#include<preludeVertex>

struct Uniforms {
    u_is_size_zoom_constant: u32,
    u_is_size_feature_constant: u32,
    u_size_t: f32, // used to interpolate between zoom stops when size is a composite function
    u_size: f32, // used when size is both zoom and feature constant
    u_camera_to_center_distance: f32,
    u_pitch: f32,
    u_rotate_symbol: u32,
    u_aspect_ratio: f32,
    u_fade_change: f32,
    u_matrix: mat4x4f,
    u_label_plane_matrix: mat4x4f,
    u_coord_matrix: mat4x4f,
    u_is_text: u32,
    u_pitch_with_map: u32,
    u_texsize: vec2f,
};

struct VertexInput {
    @location(0) a_pos_offset : vec4i,
    @location(1) a_data : vec4<u32>,
    @location(2) a_pixeloffset: vec4i,
    @location(3) a_projected_pos: vec3f,
    @location(4) a_fade_opacity: u32,
    @location(5) a_opacity: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_tex: vec2f,
    @location(1) v_fade_opacity: f32,
    @location(2) v_opacity: f32,
    @location(3) v_projected_point: vec4f,
};

var<uniform> uniforms: Uniforms;

const PI: f32 = 3.141592653589793;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var a_pos: vec2f = vec2f(input.a_pos_offset.xy);
    var a_offset: vec2f = vec2f(input.a_pos_offset.zw);

    var a_tex: vec2f = vec2f(input.a_data.xy);
    var a_size: vec2f = vec2f(input.a_data.zw);

    var a_size_min: f32 = floor(a_size[0] * 0.5);
    var a_pxoffset: vec2f = vec2f(input.a_pixeloffset.xy);
    var a_minFontScale: vec2f = vec2f(input.a_pixeloffset.zw) / 256.0;

    var ele: f32 = get_elevation(a_pos);
    var segment_angle: f32 = -input.a_projected_pos[2];
    var size: f32;

    if (uniforms.u_is_size_zoom_constant == 0 && uniforms.u_is_size_feature_constant == 0) {
        size = mix(a_size_min, a_size[1], uniforms.u_size_t) / 128.0;
    } else if (uniforms.u_is_size_zoom_constant == 1 && uniforms.u_is_size_feature_constant == 0) {
        size = a_size_min / 128.0;
    } else {
        size = uniforms.u_size;
    }

    var projectedPoint: vec4f = uniforms.u_matrix * vec4f(a_pos, ele, 1);
    var camera_to_anchor_distance: f32 = projectedPoint.w;
    // See comments in symbol_sdf.vertex
    var distance_ratio: f32 = select(
        uniforms.u_camera_to_center_distance / camera_to_anchor_distance,
        camera_to_anchor_distance / uniforms.u_camera_to_center_distance,
        uniforms.u_pitch_with_map == 1
    );
    var perspective_ratio: f32 = clamp(
            0.5 + 0.5 * distance_ratio,
            0.0, // Prevents oversized near-field symbols in pitched/overzoomed tiles
            4.0);

    size *= perspective_ratio;

    var fontScale: f32 = select(
        size,
        size / 24.0,
        uniforms.u_is_text == 1
    );

    var symbol_rotation: f32 = 0.0;
    if (uniforms.u_rotate_symbol == 1) {
        // See comments in symbol_sdf.vertex
        var offsetProjectedPoint: vec4f = uniforms.u_matrix * vec4f(a_pos + vec2f(1, 0), ele, 1);

        var a: vec2f = projectedPoint.xy / projectedPoint.w;
        var b: vec2f = offsetProjectedPoint.xy / offsetProjectedPoint.w;

        symbol_rotation = atan2((b.y - a.y) / uniforms.u_aspect_ratio, b.x - a.x);
    }

    var angle_sin: f32 = sin(segment_angle + symbol_rotation);
    var angle_cos: f32 = cos(segment_angle + symbol_rotation);
    var rotation_matrix: mat2x2f = mat2x2<f32>(angle_cos, -1.0 * angle_sin, angle_sin, angle_cos);

    var projected_pos: vec4f = uniforms.u_label_plane_matrix * vec4f(input.a_projected_pos.xy, ele, 1.0);
    var z: f32 = f32(uniforms.u_pitch_with_map) * projected_pos.z / projected_pos.w;
    output.position = uniforms.u_coord_matrix * vec4f(projected_pos.xy / projected_pos.w + 
        rotation_matrix * (a_offset / 32.0 * max(a_minFontScale, vec2f(fontScale)) + a_pxoffset / 16.0), z, 1.0);

    output.v_tex = a_tex / uniforms.u_texsize;
    var fade_opacity: vec2f = unpack_opacity(f32(input.a_fade_opacity));
    var fade_change: f32 = select(
        -uniforms.u_fade_change,
        uniforms.u_fade_change,
        fade_opacity[1] > 0.5
    );
    output.v_fade_opacity = max(0.0, fade_opacity[0] + fade_change);
    
    output.v_opacity = input.a_opacity;
    output.v_projected_point = projectedPoint;

    return output;
}
