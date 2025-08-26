// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";
import "./ShadersInclude/bonesDeclaration";
import "./ShadersInclude/bakedVertexAnimationDeclaration";
import "./ShadersInclude/instancesDeclaration";
import "./ShadersInclude/morphTargetsVertexGlobalDeclaration";
import "./ShadersInclude/morphTargetsVertexDeclaration";
import "./ShadersInclude/morphTargetsVertexGlobal";
import "./ShadersInclude/morphTargetsVertex";
import "./ShadersInclude/instancesVertex";
import "./ShadersInclude/bonesVertex";
import "./ShadersInclude/bakedVertexAnimation";

const name = "iblVoxelGridVertexShader";
const shader = `attribute position: vec3f;varying vNormalizedPosition: vec3f;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
uniform invWorldScale: mat4x4f;uniform viewMatrix: mat4x4f;@vertex
fn main(input : VertexInputs)->FragmentInputs {var positionUpdated=vertexInputs.position;
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
let worldPos=finalWorld*vec4f(positionUpdated,1.0);vertexOutputs.position=uniforms.viewMatrix*uniforms.invWorldScale*worldPos;vertexOutputs.vNormalizedPosition=vertexOutputs.position.xyz*0.5+0.5;
#ifdef IS_NDC_HALF_ZRANGE
vertexOutputs.position=vec4f(vertexOutputs.position.x,vertexOutputs.position.y,vertexOutputs.position.z*0.5+0.5,vertexOutputs.position.w);
#endif
}
`;
// Sideeffect
ShaderStore.ShadersStoreWGSL[name] = shader;
/** @internal */
export const iblVoxelGridVertexShaderWGSL = { name, shader };
