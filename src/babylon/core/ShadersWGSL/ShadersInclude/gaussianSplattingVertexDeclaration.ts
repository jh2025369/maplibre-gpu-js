// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "gaussianSplattingVertexDeclaration";
const shader = `attribute position: vec2f;
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const gaussianSplattingVertexDeclarationWGSL = { name, shader };
