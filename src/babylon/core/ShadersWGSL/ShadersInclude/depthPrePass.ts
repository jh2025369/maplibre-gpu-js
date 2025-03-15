// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "depthPrePass";
const shader = `#ifdef DEPTHPREPASS
fragmentOutputs.color= vec4f(0.,0.,0.,1.0);return fragmentOutputs;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const depthPrePassWGSL = { name, shader };
