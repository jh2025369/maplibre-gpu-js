// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./sceneUboDeclaration";
import "./meshUboDeclaration";

const name = "lineUboDeclaration";
const shader = `layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const lineUboDeclaration = { name, shader };
