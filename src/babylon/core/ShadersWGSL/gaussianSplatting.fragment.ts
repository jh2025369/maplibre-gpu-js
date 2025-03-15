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
varying vColor: vec4f;varying vPosition: vec2f;
#include<gaussianSplattingFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#include<clipPlaneFragment>
fragmentOutputs.color=gaussianColor(input.vColor,input.vPosition);}
`;
// Sideeffect
ShaderStore.ShadersStoreWGSL[name] = shader;
/** @internal */
export const gaussianSplattingPixelShaderWGSL = { name, shader };
