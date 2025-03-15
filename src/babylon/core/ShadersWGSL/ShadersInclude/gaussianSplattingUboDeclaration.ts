// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./sceneUboDeclaration";
import "./meshUboDeclaration";

const name = "gaussianSplattingUboDeclaration";
const shader = `#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute position: vec2f;`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const gaussianSplattingUboDeclarationWGSL = { name, shader };
