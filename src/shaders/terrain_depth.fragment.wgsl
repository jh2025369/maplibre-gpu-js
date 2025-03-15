struct FragmentInput {
    @location(0) v_texture_pos: vec2f,
    @location(1) v_depth: f32,
}

const bitSh: vec4<f32> = vec4<f32>(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);
const bitMsk: vec4<f32> = vec4<f32>(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);

fn pack(value: f32) -> vec4<f32> {
    var comp: vec4<f32> = fract(value * bitSh);
    comp = comp - comp.xxyz * bitMsk;
    return comp;
}

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var fragColor: vec4f = pack(input.v_depth);
    return fragColor;
}