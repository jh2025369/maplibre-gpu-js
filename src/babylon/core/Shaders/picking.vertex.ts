// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";
import "./ShadersInclude/bonesDeclaration";
import "./ShadersInclude/bakedVertexAnimationDeclaration";
import "./ShadersInclude/morphTargetsVertexGlobalDeclaration";
import "./ShadersInclude/morphTargetsVertexDeclaration";
import "./ShadersInclude/instancesDeclaration";
import "./ShadersInclude/morphTargetsVertexGlobal";
import "./ShadersInclude/morphTargetsVertex";
import "./ShadersInclude/instancesVertex";
import "./ShadersInclude/bonesVertex";
import "./ShadersInclude/bakedVertexAnimation";

const name = "pickingVertexShader";
const shader = `attribute vec3 position;
#if defined(INSTANCES)
attribute vec4 instanceMeshID;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<instancesDeclaration>
uniform mat4 viewProjection;
#if defined(INSTANCES)
varying vec4 vMeshID;
#endif
void main(void) {
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;
#if defined(INSTANCES)
vMeshID=instanceMeshID;
#endif
}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const pickingVertexShader = { name, shader };
