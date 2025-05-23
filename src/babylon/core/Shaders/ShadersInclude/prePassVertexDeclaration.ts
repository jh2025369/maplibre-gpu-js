// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "prePassVertexDeclaration";
const shader = `#ifdef PREPASS
#ifdef PREPASS_LOCAL_POSITION
varying vec3 vPosition;
#endif
#ifdef PREPASS_DEPTH
varying vec3 vViewPos;
#endif
#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)
uniform mat4 previousViewProjection;varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const prePassVertexDeclaration = { name, shader };
