// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "depthPrePass";
const shader = `#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);return;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const depthPrePass = { name, shader };
