struct Uniforms {
    u_matrix: mat4x4f,
    u_inv_matrix: mat4x4f,
    u_camera_to_center_distance: f32,
    u_viewport_size: vec2f,
};

struct FragmentInput {
    @location(0) v_radius: f32,
    @location(1) v_extrude: vec2f,
    @location(2) v_perspective_ratio: f32,
    @location(3) v_collision: f32,
}

var<uniform> uniforms: Uniforms;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var alpha: f32 = 0.5 * min(v_perspective_ratio, 1.0);
    var stroke_radius: f32 = 0.9 * max(v_perspective_ratio, 1.0);

    var distance_to_center: f32 = length(input.v_extrude);
    var distance_to_edge: f32 = abs(distance_to_center - input.v_radius);
    var opacity_t: f32 = smoothstep(-stroke_radius, 0.0, -distance_to_edge);

    var color: vec4f = mix(vec4f(0.0, 0.0, 1.0, 0.5), vec4f(1.0, 0.0, 0.0, 1.0), input.v_collision);

    var fragColor: vec4f = color * alpha * opacity_t;

    return fragColor;
}