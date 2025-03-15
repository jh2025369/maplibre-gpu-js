// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "mainUVVaryingDeclaration";
const shader = `#ifdef MAINUV{X}
varying vMainUV{X}: vec2f;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const mainUVVaryingDeclarationWGSL = { name, shader };
