// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "subSurfaceScatteringFunctions";
const shader = `fn testLightingForSSS(diffusionProfile: f32)->bool
{return diffusionProfile<1.;}`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const subSurfaceScatteringFunctionsWGSL = { name, shader };
