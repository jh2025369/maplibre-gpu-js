struct FragmentInput {
    @location(0) texcoord : vec2f,
};

var u_image: texture_2d<f32>;
var u_imageSampler: sampler;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    let r = textureSample(u_image, u_imageSampler, input.texcoord);
    return r;
    // return vec4f(1, 0, 0, 1.0);
}