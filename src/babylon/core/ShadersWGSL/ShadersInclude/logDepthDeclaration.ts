// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "logDepthDeclaration";
const shader = `#ifdef LOGARITHMICDEPTH
uniform logarithmicDepthConstant: f32;varying vFragmentDepth: f32;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const logDepthDeclarationWGSL = { name, shader };
