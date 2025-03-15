// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "gaussianSplattingVertexDeclaration";
const shader = `attribute vec2 position;uniform mat4 view;uniform mat4 projection;uniform mat4 world;`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const gaussianSplattingVertexDeclaration = { name, shader };
