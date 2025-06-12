struct Uniforms {
    u_matrix: mat4x4f,
    u_extrude_scale: f32,
    u_intensity: f32,
};

struct VertexInput {
    @location(0) a_pos: vec2f,
    @location(1) a_weight: f32,
    @location(2) a_radius: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) v_extrude: vec2f,
    @location(1) v_weight: f32,
    @location(2) v_radius: f32,
};

var<uniform> uniforms: Uniforms;

// Effective "0" in the kernel density texture to adjust the kernel size to;
// this empirically chosen number minimizes artifacts on overlapping kernels
// for typical heatmap cases (assuming clustered source)
const ZERO: f32 = 1.0 / 255.0 / 16.0;

// Gaussian kernel coefficient: 1 / sqrt(2 * PI)
#define GAUSS_COEF 0.3989422804014327

@vertex
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    // unencode the extrusion vector that we snuck into the a_pos vector
    var unscaled_extrude: vec2f = vec2f((input.a_pos - 2.0 * floor(input.a_pos / 2.0)) * 2.0 - 1.0);

    // This 'extrude' comes in ranging from [-1, -1], to [1, 1].  We'll use
    // it to produce the vertices of a square mesh framing the point feature
    // we're adding to the kernel density texture.  We'll also pass it as
    // a out, so that the fragment shader can determine the distance of
    // each fragment from the point feature.
    // Before we do so, we need to scale it up sufficiently so that the
    // kernel falls effectively to zero at the edge of the mesh.
    // That is, we want to know S such that
    // weight * u_intensity * GAUSS_COEF * exp(-0.5 * 3.0^2 * S^2) == ZERO
    // Which solves to:
    // S = sqrt(-2.0 * log(ZERO / (weight * u_intensity * GAUSS_COEF))) / 3.0
    var S: f32 = sqrt(-2.0 * log(ZERO / input.a_weight / uniforms.u_intensity / GAUSS_COEF)) / 3.0;

    // Pass the out in units of radius
    output.v_extrude = S * unscaled_extrude;

    // Scale by radius and the zoom-based scale factor to produce actual
    // mesh position
    var extrude: vec2f = output.v_extrude * input.a_radius * uniforms.u_extrude_scale;

    // multiply a_pos by 0.5, since we had it * 2 in order to sneak
    // in extrusion data
    var pos: vec4f = vec4f(floor(input.a_pos * 0.5) + extrude, 0, 1);

    output.position = uniforms.u_matrix * pos;

    output.v_weight = input.a_weight;
    output.v_radius = input.a_radius;

    return output;
}
