// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "prePassDeclaration";
const shader = `#ifdef PREPASS
#ifdef PREPASS_LOCAL_POSITION
varying vPosition : vec3f;
#endif
#ifdef PREPASS_DEPTH
varying vViewPos: vec3f;
#endif
#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)
varying vCurrentPosition: vec4f;varying vPreviousPosition: vec4f;
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const prePassDeclarationWGSL = { name, shader };
