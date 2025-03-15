struct Params {
    u_pattern_to: vec4f,
    u_pattern_from: vec4f,
    u_pixel_ratio_to: f32,
    u_pixel_ratio_from: f32,
};

struct Uniforms {
    u_texsize: vec2f,
    u_fade: f32,
    u_matrix: mat4x4f,
    u_world: vec2f,
    u_pixel_coord_upper: vec2f,
    u_pixel_coord_lower: vec2f,
    u_scale: vec3f,
};

struct VertexInput {
    @location(0) a_pos: vec2f,
    @location(1) a_opacity: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_pos_a: vec2f,
    @location(1) v_pos_b: vec2f,
    @location(2) v_pos: vec2f,
    @location(3) v_opacity: f32,
};

fn get_pattern_pos(pixel_coord_upper: vec2f, pixel_coord_lower:vec2f, pattern_size: vec2f, tile_units_to_pixels: f32, pos:vec2f) -> vec2f {
    var offset: vec2f =  ((((pixel_coord_upper % pattern_size) * 256.0 ) % pattern_size) * 256.0 + pixel_coord_lower) % pattern_size;
    return (tile_units_to_pixels * pos + offset) / pattern_size;
}

var<uniform> params: Params;
var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var pattern_tl_a: vec2f = params.u_pattern_from.xy;
    var pattern_br_a: vec2f = params.u_pattern_from.zw;
    var pattern_tl_b: vec2f = params.u_pattern_to.xy;
    var pattern_br_b: vec2f = params.u_pattern_to.zw;

    var tileRatio: f32 = uniforms.u_scale.x;
    var fromScale: f32 = uniforms.u_scale.y;
    var toScale: f32 = uniforms.u_scale.z;

    output.position = uniforms.u_matrix * vec4f(input.a_pos, 0, 1);

    var display_size_a: vec2f = (pattern_br_a - pattern_tl_a) / params.u_pixel_ratio_from;
    var display_size_b: vec2f = (pattern_br_b - pattern_tl_b) / params.u_pixel_ratio_to;

    output.v_pos_a = get_pattern_pos(uniforms.u_pixel_coord_upper, uniforms.u_pixel_coord_lower, fromScale * display_size_a, tileRatio, input.a_pos);
    output.v_pos_b = get_pattern_pos(uniforms.u_pixel_coord_upper, uniforms.u_pixel_coord_lower, toScale * display_size_b, tileRatio, input.a_pos);
    output.v_pos = (output.position.xy / output.position.w + 1.0) / 2.0 * uniforms.u_world;
    output.v_opacity = input.a_opacity;
    
    return output;
}