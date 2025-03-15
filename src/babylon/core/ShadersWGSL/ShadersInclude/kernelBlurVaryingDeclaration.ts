// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "kernelBlurVaryingDeclaration";
const shader = `varying sampleCoord{X}: vec2f;`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const kernelBlurVaryingDeclarationWGSL = { name, shader };
