// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "pbrBlockReflectance";
const shader = `#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
var baseSpecularEnvironmentReflectance: vec3f=getReflectanceFromBRDFWithEnvLookup(vec3f(reflectanceF0),vec3f(reflectivityOut.reflectanceF90),environmentBrdf);
#if (CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR)
let metalEnvironmentReflectance: vec3f=vec3f(reflectivityOut.specularWeight)*getF82Specular(NdotV,clearcoatOut.specularEnvironmentR0,reflectivityOut.colorReflectanceF90,reflectivityOut.roughness);let dielectricEnvironmentReflectance=getReflectanceFromBRDFWithEnvLookup(reflectivityOut.dielectricColorF0,reflectivityOut.colorReflectanceF90,environmentBrdf);var colorSpecularEnvironmentReflectance: vec3f=mix(dielectricEnvironmentReflectance,metalEnvironmentReflectance,reflectivityOut.metallic);
#else
var colorSpecularEnvironmentReflectance=getReflectanceFromBRDFWithEnvLookup(clearcoatOut.specularEnvironmentR0,reflectivityOut.colorReflectanceF90,environmentBrdf);
#endif
#ifdef RADIANCEOCCLUSION
colorSpecularEnvironmentReflectance*=seo;
#endif
#ifdef HORIZONOCCLUSION
#ifdef BUMP
#ifdef REFLECTIONMAP_3D
colorSpecularEnvironmentReflectance*=eho;
#endif
#endif
#endif
#else
var colorSpecularEnvironmentReflectance: vec3f=getReflectanceFromAnalyticalBRDFLookup_Jones(NdotV,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,sqrt(microSurface));var baseSpecularEnvironmentReflectance: vec3f=getReflectanceFromAnalyticalBRDFLookup_Jones(NdotV,vec3f(reflectanceF0),vec3f(reflectivityOut.reflectanceF90),sqrt(microSurface));
#endif
#ifdef CLEARCOAT
colorSpecularEnvironmentReflectance*=clearcoatOut.conservationFactor;
#if defined(CLEARCOAT_TINT)
colorSpecularEnvironmentReflectance*=clearcoatOut.absorption;
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const pbrBlockReflectanceWGSL = { name, shader };
