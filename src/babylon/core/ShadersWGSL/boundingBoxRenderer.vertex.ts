// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";

const name = "boundingBoxRendererVertexShader";
const shader = `attribute position: vec3f;uniform world: mat4x4f;uniform viewProjection: mat4x4f;
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
var worldPos: vec4f=uniforms.world* vec4f(input.position,1.0);vertexOutputs.position=uniforms.viewProjection*worldPos;
#define CUSTOM_VERTEX_MAIN_END
}
`;
// Sideeffect
ShaderStore.ShadersStoreWGSL[name] = shader;
/** @internal */
export const boundingBoxRendererVertexShaderWGSL = { name, shader };
