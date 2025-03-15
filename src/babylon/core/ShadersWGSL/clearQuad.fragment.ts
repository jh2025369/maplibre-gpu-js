// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";

const name = "clearQuadPixelShader";
const shader = `uniform color: vec4f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=uniforms.color;}
`;
// Sideeffect
ShaderStore.ShadersStoreWGSL[name] = shader;
/** @internal */
export const clearQuadPixelShaderWGSL = { name, shader };
