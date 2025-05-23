// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "geometryVertexDeclaration";
const shader = `uniform mat4 viewProjection;uniform mat4 view;`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const geometryVertexDeclaration = { name, shader };
