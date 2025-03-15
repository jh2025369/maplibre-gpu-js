// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";
import "./ShadersInclude/clipPlaneFragmentDeclaration";
import "./ShadersInclude/logDepthDeclaration";
import "./ShadersInclude/logDepthFragment";
import "./ShadersInclude/clipPlaneFragment";

const name = "linePixelShader";
const shader = `#include<clipPlaneFragmentDeclaration>
uniform vec4 color;
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<logDepthFragment>
#include<clipPlaneFragment>
gl_FragColor=color;
#define CUSTOM_FRAGMENT_MAIN_END
}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const linePixelShader = { name, shader };
