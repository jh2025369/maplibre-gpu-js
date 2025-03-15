// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "decalFragmentDeclaration";
const shader = `#ifdef DECAL
uniform vDecalInfos: vec4f;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const decalFragmentDeclarationWGSL = { name, shader };
