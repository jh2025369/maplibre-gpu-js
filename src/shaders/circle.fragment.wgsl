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

struct FragmentInput {
    @location(0) v_data: vec3f,
    @location(1) v_visibility: f32,
    @location(2) v_color: vec4f,
    @location(3) v_radius: f32,
    @location(4) v_opacity: f32,
    @location(5) v_stroke_width: f32,
    @location(6) v_stroke_color: vec4f,
    @location(7) v_stroke_opacity: f32,
}

var<uniform> params: Params;
var<uniform> uniforms: Uniforms;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var extrude: vec2f = input.v_data.xy;
    var extrude_length: f32 = length(extrude);

    var antialiasblur: f32 = input.v_data.z;
    var antialiased_blur: f32 = -max(params.u_blur, antialiasblur);

    var opacity_t: f32 = smoothstep(0.0, antialiased_blur, extrude_length - 1.0);

    var color_t: f32 = select(smoothstep(antialiased_blur, 0.0, extrude_length - input.v_radius / (input.v_radius + input.v_stroke_width)), 0.0, input.v_stroke_width < 0.01);

    var fragColor: vec4f = input.v_visibility * opacity_t * mix(input.v_color * input.v_opacity, input.v_stroke_color * input.v_stroke_opacity, color_t);

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4<f32>(1.0);
#endif

    return fragColor;
}