// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";

const name = "gpuTransformPixelShader";
const shader = `#version 300 es
void main() {discard;}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const gpuTransformPixelShader = { name, shader };
