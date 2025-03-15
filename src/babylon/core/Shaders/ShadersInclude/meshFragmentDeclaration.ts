// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "meshFragmentDeclaration";
const shader = `uniform mat4 world;uniform float visibility;
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const meshFragmentDeclaration = { name, shader };
