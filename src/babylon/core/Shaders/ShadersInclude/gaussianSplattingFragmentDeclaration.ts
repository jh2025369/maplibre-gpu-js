// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./logDepthFragment";
import "./fogFragment";

const name = "gaussianSplattingFragmentDeclaration";
const shader = `vec4 gaussianColor(vec4 inColor)
{float A=-dot(vPosition,vPosition);if (A<-4.0) discard;float B=exp(A)*inColor.a;
#include<logDepthFragment>
vec3 color=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4(color,B);}
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const gaussianSplattingFragmentDeclaration = { name, shader };
