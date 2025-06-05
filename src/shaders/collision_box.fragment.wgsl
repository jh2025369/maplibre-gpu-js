struct Uniforms {
    u_matrix: mat4x4f,
    u_camera_to_center_distance: f32,
    u_pixels_to_tile_units: f32,
    u_extrude_scale: vec2f,
    u_overscale_factor: f32,
};

struct FragmentInput {
    @location(0) v_placed: f32,
    @location(1) v_notUsed: f32,
}

var<uniform> uniforms: Uniforms;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {

    var alpha: f32 = 0.5;

    // Red = collision, hide label
    var fragColor: vec4f = vec4f(1.0, 0.0, 0.0, 1.0) * alpha;

    // Blue = no collision, label is showing
    if (input.v_placed > 0.5) {
        fragColor = vec4f(0.0, 0.0, 1.0, 0.5) * alpha;
    }

    if (input.v_notUsed > 0.5) {
        // This box not used, fade it out
        fragColor *= 0.1;
    }

    return fragColor;
}