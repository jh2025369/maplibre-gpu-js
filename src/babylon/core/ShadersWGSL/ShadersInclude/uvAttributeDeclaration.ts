// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "uvAttributeDeclaration";
const shader = `#ifdef UV{X}
attribute uv{X}: vec2f;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const uvAttributeDeclarationWGSL = { name, shader };
