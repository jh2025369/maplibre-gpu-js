// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";
import "./ShadersInclude/gaussianSplattingVertexDeclaration";
import "./ShadersInclude/gaussianSplattingUboDeclaration";
import "./ShadersInclude/clipPlaneVertexDeclaration";
import "./ShadersInclude/fogVertexDeclaration";
import "./ShadersInclude/logDepthDeclaration";
import "./ShadersInclude/gaussianSplatting";
import "./ShadersInclude/clipPlaneVertex";
import "./ShadersInclude/fogVertex";
import "./ShadersInclude/logDepthVertex";

const name = "gaussianSplattingVertexShader";
const shader = `#include<__decl__gaussianSplattingVertex>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
attribute float splatIndex;uniform vec2 invViewport;uniform vec2 dataTextureSize;uniform vec2 focal;uniform sampler2D covariancesATexture;uniform sampler2D covariancesBTexture;uniform sampler2D centersTexture;uniform sampler2D colorsTexture;varying vec4 vColor;varying vec2 vPosition;
#include<gaussianSplatting>
void main () {Splat splat=readSplat(splatIndex);vec3 covA=splat.covA.xyz;vec3 covB=vec3(splat.covA.w,splat.covB.xy);vec4 worldPos=world*vec4(splat.center.xyz,1.0);vColor=splat.color;vPosition=position;gl_Position=gaussianSplatting(position,worldPos.xyz,vec2(1.,1.),covA,covB,world,view,projection);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const gaussianSplattingVertexShader = { name, shader };
