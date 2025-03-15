// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";
import "./ShadersInclude/sceneUboDeclaration";
import "./ShadersInclude/meshUboDeclaration";
import "./ShadersInclude/clipPlaneVertexDeclaration";
import "./ShadersInclude/fogVertexDeclaration";
import "./ShadersInclude/logDepthDeclaration";
import "./ShadersInclude/gaussianSplatting";
import "./ShadersInclude/clipPlaneVertex";
import "./ShadersInclude/fogVertex";
import "./ShadersInclude/logDepthVertex";

const name = "gaussianSplattingVertexShader";
const shader = `#include<sceneUboDeclaration>
#include<meshUboDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
attribute splatIndex: f32;attribute position: vec2f;uniform invViewport: vec2f;uniform dataTextureSize: vec2f;uniform focal: vec2f;var covariancesATexture: texture_2d<f32>;var covariancesBTexture: texture_2d<f32>;var centersTexture: texture_2d<f32>;var colorsTexture: texture_2d<f32>;varying vColor: vec4f;varying vPosition: vec2f;
#include<gaussianSplatting>
@vertex
fn main(input : VertexInputs)->FragmentInputs {var splat: Splat=readSplat(input.splatIndex,uniforms.dataTextureSize);var covA: vec3f=splat.covA.xyz;var covB: vec3f=vec3f(splat.covA.w,splat.covB.xy);let worldPos: vec4f=mesh.world*vec4f(splat.center.xyz,1.0);vertexOutputs.vColor=splat.color;vertexOutputs.vPosition=input.position;vertexOutputs.position=gaussianSplatting(input.position,worldPos.xyz,vec2f(1.0,1.0),covA,covB,mesh.world,scene.view,scene.projection,uniforms.focal,uniforms.invViewport);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
}
`;
// Sideeffect
ShaderStore.ShadersStoreWGSL[name] = shader;
/** @internal */
export const gaussianSplattingVertexShaderWGSL = { name, shader };
