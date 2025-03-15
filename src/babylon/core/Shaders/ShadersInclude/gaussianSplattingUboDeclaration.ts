// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./sceneUboDeclaration";
import "./meshUboDeclaration";

const name = "gaussianSplattingUboDeclaration";
const shader = `#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute vec2 position;`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const gaussianSplattingUboDeclaration = { name, shader };
