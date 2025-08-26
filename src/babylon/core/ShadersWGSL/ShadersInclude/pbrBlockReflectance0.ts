// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "pbrBlockReflectance0";
const shader = `var reflectanceF0: f32=reflectivityOut.reflectanceF0;var specularEnvironmentR0: vec3f=reflectivityOut.colorReflectanceF0;var specularEnvironmentR90: vec3f= reflectivityOut.reflectanceF90;
#ifdef ALPHAFRESNEL
var reflectance90: f32=fresnelGrazingReflectance(reflectanceF0);specularEnvironmentR90=specularEnvironmentR90*reflectance90;
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const pbrBlockReflectance0WGSL = { name, shader };
