// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "diffusionProfile";
const shader = `uniform diffusionS: array<vec3f,5>;uniform diffusionD: array<f32,5>;uniform filterRadii: array<f32,5>;
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const diffusionProfileWGSL = { name, shader };
