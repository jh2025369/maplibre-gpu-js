﻿// Attribute
attribute vec3 position;

#ifdef NORMAL
    attribute vec3 normal;
#endif

#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>

#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]

// Uniforms
// #include<instancesDeclaration>
#ifdef INSTANCES
	attribute vec4 world0;
	attribute vec4 world1;
	attribute vec4 world2;
	attribute vec4 world3;
#endif

#include<helperFunctions>

#include<__decl__shadowMapVertex>

#ifdef ALPHATEXTURE
varying vec2 vUV;
uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif

#include<shadowMapVertexExtraDeclaration>

#include<clipPlaneVertexDeclaration>


#define CUSTOM_VERTEX_DEFINITIONS

void main(void)
{
vec3 positionUpdated = position;
#ifdef UV1
    vec2 uvUpdated = uv;
#endif
#ifdef NORMAL
	vec3 normalUpdated = normal;
#endif

#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]

#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>

vec4 worldPos = finalWorld * vec4(positionUpdated, 1.0);

#ifdef NORMAL
    mat3 normWorldSM = mat3(finalWorld);

    #if defined(INSTANCES) && defined(THIN_INSTANCES)
        vec3 vNormalW = normalUpdated / vec3(dot(normWorldSM[0], normWorldSM[0]), dot(normWorldSM[1], normWorldSM[1]), dot(normWorldSM[2], normWorldSM[2]));
        vNormalW = normalize(normWorldSM * vNormalW);
    #else
        #ifdef NONUNIFORMSCALING
            normWorldSM = transposeMat3(inverseMat3(normWorldSM));
        #endif

        vec3 vNormalW = normalize(normWorldSM * normalUpdated);
    #endif
#endif

#include<shadowMapVertexNormalBias>

// Projection.
gl_Position = viewProjection * worldPos;

#include<shadowMapVertexMetric>

#ifdef ALPHATEXTURE
    #ifdef UV1
        vUV = vec2(diffuseMatrix * vec4(uvUpdated, 1.0, 0.0));
    #endif
    #ifdef UV2
        vUV = vec2(diffuseMatrix * vec4(uv2, 1.0, 0.0));
    #endif
#endif

#include<clipPlaneVertex>

}