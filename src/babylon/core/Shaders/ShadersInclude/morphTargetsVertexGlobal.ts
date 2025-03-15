// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "morphTargetsVertexGlobal";
const shader = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const morphTargetsVertexGlobal = { name, shader };
