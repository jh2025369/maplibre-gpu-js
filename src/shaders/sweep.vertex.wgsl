struct Uniforms {
    u_time: f32,
    u_pixel: f32,
    u_ratio: f32,
    u_outside: f32,
    u_inside: f32
};

struct VertexInput {
    @location(0) pos : vec2f,
    @location(1) uv : vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) texcoord : vec2f,
};

var<uniform> uniforms: Uniforms;

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = vec4f(input.pos, 0, 1);
    output.texcoord = vec2f(input.uv.x, 1 - input.uv.y);
    
    return output;
}