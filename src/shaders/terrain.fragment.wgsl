struct FragmentInput {
    @location(0) v_texture_pos: vec2f,
    @location(1) v_depth: f32,
}

var u_texture: texture_2d<f32>;
var u_textureSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var fragColor: vec4f = textureSample(u_texture, u_textureSampler, vec2f(input.v_texture_pos.x, 1 - input.v_texture_pos.y));
    return fragColor;
}