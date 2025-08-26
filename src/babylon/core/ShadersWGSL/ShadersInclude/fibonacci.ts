// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore";

const name = "fibonacci";
const shader = `fn rcp(x: f32)->f32
{return 1./x;}
const GOLDEN_RATIO=1.618033988749895;fn Golden2dSeq(i: u32,n: f32)->vec2f
{return vec2f(f32(i)/n+(0.5/n),fract(f32(i)*rcp(GOLDEN_RATIO)));}
fn SampleDiskGolden(i: u32,sampleCount: u32)->vec2f
{let f=Golden2dSeq(i,f32(sampleCount));return vec2f(sqrt(f.x),TWO_PI*f.y);}
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const fibonacciWGSL = { name, shader };
