// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "lineVertexDeclaration";
const shader = `uniform mat4 viewProjection;
#define ADDITIONAL_VERTEX_DECLARATION
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const lineVertexDeclaration = { name, shader };
