// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "kernelBlurVaryingDeclaration";
const shader = `varying vec2 sampleCoord{X};`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const kernelBlurVaryingDeclaration = { name, shader };
