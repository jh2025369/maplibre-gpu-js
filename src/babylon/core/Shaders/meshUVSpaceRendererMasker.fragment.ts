// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";

const name = "meshUVSpaceRendererMaskerPixelShader";
const shader = `varying vec2 vUV;void main(void) {gl_FragColor=vec4(1.0,1.0,1.0,1.0);}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const meshUVSpaceRendererMaskerPixelShader = { name, shader };
