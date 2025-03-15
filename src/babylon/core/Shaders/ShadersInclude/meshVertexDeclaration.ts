// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "meshVertexDeclaration";
const shader = `uniform mat4 world;uniform float visibility;
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const meshVertexDeclaration = { name, shader };
