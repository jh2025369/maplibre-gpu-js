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
    u_texsize_icon: vec2f,
    u_gamma_scale: f32,
    u_device_pixel_ratio: f32,
    u_is_halo: u32,
};

struct FragmentInput {
    @location(0) v_data0: vec2f,
    @location(1) v_data1: vec3f,
    @location(2) v_fill_color: vec4f,
    @location(3) v_halo_color: vec4f,
    @location(4) v_opacity: f32,
    @location(5) v_halo_width: f32,
    @location(6) v_halo_blur: f32,
    @location(7) v_projected_point: vec4f,
}

var<uniform> uniforms: Uniforms;

var u_texture: texture_2d<f32>;
var u_textureSampler: sampler;
var u_texture_icon: texture_2d<f32>;
var u_texture_iconSampler: sampler;

#define SDF_PX 8.0

#define SDF 1.0
#define ICON 0.0

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var visibility: f32 = calculate_visibility(input.v_projected_point);
    var fade_opacity: f32 = max(0.0, min(visibility, input.v_data1[2]));

    if (input.v_data1.w == ICON) {
        var tex_icon: vec2f = input.v_data0.zw;
        var alpha: f32 = input.v_opacity * fade_opacity;
        var fragColor: vec4f = textureSample(u_texture_icon, u_texture_iconSampler, tex_icon) * alpha;

#ifdef OVERDRAW_INSPECTOR
        fragColor = vec4f(1.0);
#endif
        return;
    }

    var tex: vec2f = input.v_data0.xy;

    var EDGE_GAMMA: f32 = 0.105 / u_device_pixel_ratio;

    var gamma_scale: f32 = input.v_data1.x;
    var size: f32 = input.v_data1.y;

    var fontScale: f32 = size / 24.0;

    var color: vec4f = input.v_fill_color;
    var gamma: f32 = EDGE_GAMMA / (fontScale * uniforms.u_gamma_scale);
    var buff: f32 = (256.0 - 64.0) / 256.0;
    if (uniforms.u_is_halo == 1) {
        color = input.v_halo_color;
        gamma = (input.v_halo_blur * 1.19 / SDF_PX + EDGE_GAMMA) / (fontScale * uniforms.u_gamma_scale);
        buff = (6.0 - input.v_halo_width / fontScale) / SDF_PX;
    }

    var dist: f32 = textureSample(u_texture, u_textureSampler, tex).r;
    var gamma_scaled: f32 = gamma * gamma_scale;
    var alpha: f32 = smoothstep(buff - gamma_scaled, buff + gamma_scaled, dist);

    var fragColor: vec4f = color * (alpha * input.v_opacity * fade_opacity);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4f(1.0);
#endif

    return fragColor;
}
