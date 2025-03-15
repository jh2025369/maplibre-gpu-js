// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "fogVertex";
const shader = `#ifdef FOG
vertexOutputs.vFogDistance=(scene.view*worldPos).xyz;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const fogVertexWGSL = { name, shader };
