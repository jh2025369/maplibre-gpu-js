uniform sampler2D textureSampler;
uniform sampler2D depthSampler;
uniform sampler2D normalSampler;

uniform int filterSize;
uniform vec2 blurDir;
uniform float depthThreshold;
uniform float normalThreshold;

varying vec2 vUV;

void main(void) {
    vec3 color = textureLod(textureSampler, vUV, 0.).rgb;
    float depth = textureLod(depthSampler, vUV, 0.).x;

    if (depth >= 1e6 || depth <= 0.) {
        glFragColor = vec4(color, 1.);
        return;
    }

    vec3 normal = textureLod(normalSampler, vUV, 0.).rgb;
    #ifdef DECODE_NORMAL
        normal = normal * 2.0 - 1.0;
    #endif

    float sigma = float(filterSize);
    float two_sigma2 = 2.0 * sigma * sigma;

    float sigmaDepth = depthThreshold;
    float two_sigmaDepth2 = 2.0 * sigmaDepth * sigmaDepth;

    float sigmaNormal = normalThreshold;
    float two_sigmaNormal2 = 2.0 * sigmaNormal * sigmaNormal;

    vec3 sum = vec3(0.);
    float wsum = 0.;

    for (int x = -filterSize; x <= filterSize; ++x) {
        vec2 coords = vec2(x);
        vec3 sampleColor = textureLod(textureSampler, vUV + coords * blurDir, 0.).rgb;
        float sampleDepth = textureLod(depthSampler, vUV + coords * blurDir, 0.).r;
        vec3 sampleNormal = textureLod(normalSampler, vUV + coords * blurDir, 0.).rgb;

        #ifdef DECODE_NORMAL
            sampleNormal = sampleNormal * 2.0 - 1.0;
        #endif

        float r = dot(coords, coords);
        float w = exp(-r / two_sigma2);

        float depthDelta = abs(sampleDepth - depth);
        float wd = step(depthDelta, depthThreshold);

        vec3 normalDelta = abs(sampleNormal - normal);
        float wn = step(normalDelta.x + normalDelta.y + normalDelta.z, normalThreshold);

        sum += sampleColor * w * wd * wn;
        wsum += w * wd * wn;
    }

    glFragColor = vec4(sum / wsum, 1.);
}
