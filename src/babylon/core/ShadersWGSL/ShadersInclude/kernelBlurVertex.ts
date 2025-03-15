// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "kernelBlurVertex";
const shader = `vertexOutputs.sampleCoord{X}=vertexOutputs.sampleCenter+uniforms.delta*KERNEL_OFFSET{X};`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const kernelBlurVertexWGSL = { name, shader };
