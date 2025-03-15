// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";
import "./ShadersInclude/clipPlaneFragmentDeclaration";
import "./ShadersInclude/logDepthDeclaration";
import "./ShadersInclude/fogFragmentDeclaration";
import "./ShadersInclude/gaussianSplattingFragmentDeclaration";
import "./ShadersInclude/clipPlaneFragment";

const name = "gaussianSplattingPixelShader";
const shader = `#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vec4 vColor;varying vec2 vPosition;
#include<gaussianSplattingFragmentDeclaration>
void main () { 
#include<clipPlaneFragment>
gl_FragColor=gaussianColor(vColor);}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const gaussianSplattingPixelShader = { name, shader };
