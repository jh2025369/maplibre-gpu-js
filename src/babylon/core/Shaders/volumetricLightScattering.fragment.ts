// Do not edit.
import { ShaderStore } from "../Engines/shaderStore";

const name = "volumetricLightScatteringPixelShader";
const shader = `uniform sampler2D textureSampler;uniform sampler2D lightScatteringSampler;uniform float decay;uniform float exposure;uniform float weight;uniform float density;uniform vec2 meshPositionOnScreen;varying vec2 vUV;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
vec2 tc=vUV;vec2 deltaTexCoord=(tc-meshPositionOnScreen.xy);deltaTexCoord*=1.0/float(NUM_SAMPLES)*density;float illuminationDecay=1.0;vec4 color=texture2D(lightScatteringSampler,tc)*0.4;for(int i=0; i<NUM_SAMPLES; i++) {tc-=deltaTexCoord;vec4 dataSample=texture2D(lightScatteringSampler,tc)*0.4;dataSample*=illuminationDecay*weight;color+=dataSample;illuminationDecay*=decay;}
vec4 realColor=texture2D(textureSampler,vUV);gl_FragColor=((vec4((vec3(color.r,color.g,color.b)*exposure),realColor.a))+(realColor*(1.5-0.4)));
#define CUSTOM_FRAGMENT_MAIN_END
}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const volumetricLightScatteringPixelShader = { name, shader };
