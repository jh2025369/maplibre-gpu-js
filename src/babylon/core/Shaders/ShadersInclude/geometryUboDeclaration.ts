// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./sceneUboDeclaration";

const name = "geometryUboDeclaration";
const shader = `#include<sceneUboDeclaration>
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const geometryUboDeclaration = { name, shader };
