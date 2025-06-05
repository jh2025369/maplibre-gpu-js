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

struct FragmentInput {
    @location(0) v_tex: vec2f,
    @location(1) v_fade_opacity: f32,
    @location(2) v_opacity: f32,
    @location(3) v_projected_point: vec4f,
}

var<uniform> uniforms: Uniforms;

var u_texture: texture_2d<f32>;
var u_textureSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var visibility: f32 = calculate_visibility(input.v_projected_point);
    var fade_opacity: f32 = max(0.0, min(visibility, input.v_fade_opacity));
    var alpha: f32 = input.v_opacity * fade_opacity;
    var fragColor: vec4f = textureSample(u_texture, u_textureSampler, input.v_tex) * alpha;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return fragColor;
}
