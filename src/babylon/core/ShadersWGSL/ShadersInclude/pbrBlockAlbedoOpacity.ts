// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";
import "./decalFragment";

const name = "pbrBlockAlbedoOpacity";
const shader = `struct albedoOpacityOutParams
{surfaceAlbedo: vec3f,
alpha: f32};
#define pbr_inline
fn albedoOpacityBlock(
vAlbedoColor: vec4f
#ifdef ALBEDO
,albedoTexture: vec4f
,albedoInfos: vec2f
#endif
#ifdef OPACITY
,opacityMap: vec4f
,vOpacityInfos: vec2f
#endif
#ifdef DETAIL
,detailColor: vec4f
,vDetailInfos: vec4f
#endif
#ifdef DECAL
,decalColor: vec4f
,vDecalInfos: vec4f
#endif
)->albedoOpacityOutParams
{var outParams: albedoOpacityOutParams;var surfaceAlbedo: vec3f=vAlbedoColor.rgb;var alpha: f32=vAlbedoColor.a;
#ifdef ALBEDO
#if defined(ALPHAFROMALBEDO) || defined(ALPHATEST)
alpha*=albedoTexture.a;
#endif
#ifdef GAMMAALBEDO
surfaceAlbedo*=toLinearSpaceVec3(albedoTexture.rgb);
#else
surfaceAlbedo*=albedoTexture.rgb;
#endif
surfaceAlbedo*=albedoInfos.y;
#endif
#ifndef DECAL_AFTER_DETAIL
#include<decalFragment>
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
surfaceAlbedo*=fragmentInputs.vColor.rgb;
#endif
#ifdef DETAIL
var detailAlbedo: f32=2.0*mix(0.5,detailColor.r,vDetailInfos.y);surfaceAlbedo=surfaceAlbedo.rgb*detailAlbedo*detailAlbedo; 
#endif
#ifdef DECAL_AFTER_DETAIL
#include<decalFragment>
#endif
#define CUSTOM_FRAGMENT_UPDATE_ALBEDO
#ifdef OPACITY
#ifdef OPACITYRGB
alpha=getLuminance(opacityMap.rgb);
#else
alpha*=opacityMap.a;
#endif
alpha*=vOpacityInfos.y;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=fragmentInputs.vColor.a;
#endif
#if !defined(SS_LINKREFRACTIONTOTRANSPARENCY) && !defined(ALPHAFRESNEL)
#ifdef ALPHATEST 
#if DEBUGMODE != 88
if (alpha<ALPHATESTVALUE) {discard;}
#endif
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
#endif
outParams.surfaceAlbedo=surfaceAlbedo;outParams.alpha=alpha;return outParams;}
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const pbrBlockAlbedoOpacityWGSL = { name, shader };
