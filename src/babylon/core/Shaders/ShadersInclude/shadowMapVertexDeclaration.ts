// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./sceneVertexDeclaration";
import "./meshVertexDeclaration";

const name = "shadowMapVertexDeclaration";
const shader = `#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const shadowMapVertexDeclaration = { name, shader };
