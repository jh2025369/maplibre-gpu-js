struct Uniforms {
    u_matrix: mat4x4f,
    u_inv_matrix: mat4x4f,
    u_camera_to_center_distance: f32,
    u_viewport_size: vec2f,
};

struct VertexInput {
    @location(0) a_pos : vec2f,
    @location(1) a_radius : f32,
    @location(2) a_flags: vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_radius: f32,
    @location(1) v_extrude: vec2f,
    @location(2) v_perspective_ratio: f32,
    @location(3) v_collision: f32,
};

var<uniform> uniforms: Uniforms;

fn toTilePosition(vec2f screenPos) -> vec3f {
    // Shoot a ray towards the ground to reconstruct the depth-value
    var rayStart: vec4f = uniforms.u_inv_matrix * vec4f(screenPos, -1.0, 1.0);
    var rayEnd: vec4f = uniforms.u_inv_matrix * vec4f(screenPos, 1.0, 1.0);

    rayStart.xyz /= rayStart.w;
    rayEnd.xyz /= rayEnd.w;

    var t: f32 = (0.0 - rayStart.z) / (rayEnd.z - rayStart.z);
    return mix(rayStart.xyz, rayEnd.xyz, t);
}

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    var quadCenterPos: vec2f = input.a_pos;
    var radius: f32 = input.a_radius;
    var collision: f32 = input.a_flags.x;
    var vertexIdx: f32 = input.a_flags.y;

    var quadVertexOffset: vec2f = vec2f(
        mix(-1.0, 1.0, f32(vertexIdx >= 2.0)),
        mix(-1.0, 1.0, f32(vertexIdx >= 1.0 && vertexIdx <= 2.0)));

    var quadVertexExtent: vec2f = quadVertexOffset * radius;

    // Screen position of the quad might have been computed with different camera parameters.
    // Transform the point to a proper position on the current viewport
    var tilePos: vec3f = toTilePosition(quadCenterPos);
    var clipPos: vec4f = uniforms.u_matrix * vec4f(tilePos, 1.0);

    var camera_to_anchor_distance: f32 = clipPos.w;
    var collision_perspective_ratio: f32 = clamp(
        0.5 + 0.5 * (uniforms.u_camera_to_center_distance / camera_to_anchor_distance),
        0.0, // Prevents oversized near-field circles in pitched/overzoomed tiles
        4.0);

    // Apply small padding for the anti-aliasing effect to fit the quad
    // Note that v_radius and v_extrude are in screen coordinates already
    var padding_factor: f32 = 1.2;
    output.v_radius = radius;
    output.v_extrude = quadVertexExtent * padding_factor;
    output.v_perspective_ratio = collision_perspective_ratio;
    output.v_collision = collision;

    output.position = vec4f(clipPos.xyz / clipPos.w, 1.0) + vec4f(quadVertexExtent * padding_factor / uniforms.u_viewport_size * 2.0, 0.0, 0.0);

    return output;
}
