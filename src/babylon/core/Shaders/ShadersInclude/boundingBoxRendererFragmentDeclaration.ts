// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "boundingBoxRendererFragmentDeclaration";
const shader = `uniform vec4 color;
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const boundingBoxRendererFragmentDeclaration = { name, shader };
