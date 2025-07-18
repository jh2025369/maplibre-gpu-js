struct Uniforms {
    u_time: f32,
    u_pixel: f32,
    u_ratio: f32,
    u_outside: f32,
    u_inside: f32
};

struct FragmentInput {
    @location(0) texcoord : vec2f,
};

var u_image: texture_2d<f32>;
var u_imageSampler: sampler;
var<uniform> uniforms: Uniforms;

#define PI 3.141592653589793

fn closestPointOnLine(p: vec2f, a: vec2f, b: vec2f) -> vec2f {
    let ab = b - a;
    let ap = p - a;
    
    // 计算投影长度 (标准化到0-1)
    let t = dot(ap, ab) / dot(ab, ab);
    let t_clamped = clamp(t, 0.0, 1.0);
    
    return a + t_clamped * ab;
}

fn lineCircleIntersection(
    lineRatio: f32,
    lineOffset: f32,
    radius: f32
) -> vec4f {
    let a = pow(2 * lineOffset * lineRatio, 2) - 4 * (1 + lineRatio * lineRatio) * (lineOffset * lineOffset - radius * radius);
    if (a < 0) {
        return vec4f(0);
    }
    let x1 = (-2 * lineOffset * lineRatio + sqrt(a)) / (2 * (1 + lineRatio * lineRatio));
    let y1 = x1 * lineRatio + lineOffset;
    let x2 = (-2 * lineOffset * lineRatio - sqrt(a)) / (2 * (1 + lineRatio * lineRatio));
    let y2 = x2 * lineRatio + lineOffset;
    return vec4f(x1, y1, x2, y2);
}

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    let baseColor = textureSample(u_image, u_imageSampler, input.texcoord);

    let toPixel = vec2f(input.texcoord.x * uniforms.u_pixel, input.texcoord.y);
    let distance = length(toPixel);
    let baseDir = normalize(vec2f(1.0, 1.0));
    let pixelDir = normalize(toPixel);
    let angle = acos(dot(baseDir, pixelDir));

    let sweepDistance = uniforms.u_time  / 255 * 1.5;

    var sweep = 0.0;
    let sweepColor = vec3f(1.0, 0.9, 0.6);
    var finalColor = baseColor;

    if (distance >= sweepDistance) {
        finalColor = vec4f(5, 5, 5, 1);
        // sweep = smoothstep(0.0, 1.0, distance / 1.5);
        // finalColor = sweep * sweepColor * 2.0;
    } else if (distance > sweepDistance - 0.4) {
        var range = 0.05;
        var range1 = 0.01;
        var ratio = -1 / uniforms.u_ratio;
        var ratio1 = uniforms.u_ratio - 0.05;
        var ratio2 = uniforms.u_ratio + 0.05;
        var offset1 = toPixel.y - toPixel.x * uniforms.u_ratio;
        var offset2 = toPixel.y - toPixel.x * ratio;

        var lineOffset1 = floor(offset1 / range) * range;
        var lineOffset2 = ceil(offset1 / range) * range;
        let intersection1 = lineCircleIntersection(uniforms.u_ratio, lineOffset1, sweepDistance);
        let intersection2 = lineCircleIntersection(uniforms.u_ratio, lineOffset2, sweepDistance);
        let lineOffset3 = intersection1.y - ratio1 * intersection1.x;
        let lineOffset4 = intersection2.y - ratio2 * intersection2.x;
        let y1 = ratio1 * toPixel.x + lineOffset3;
        let y2 = ratio2 * toPixel.x + lineOffset4;

        var angle = atan(ratio);
        var lineOffset5 = floor(offset2 / range) * range;
        var lineOffset6 = ceil(offset2 / range) * range;
        let intersection3 = lineCircleIntersection(ratio, lineOffset5, sweepDistance);
        let intersection4 = lineCircleIntersection(ratio, lineOffset6, sweepDistance);

        var longAxis1 = sqrt(pow(intersection3.x - intersection3.z, 2) + pow(intersection3.y - intersection3.w, 2)) / 2;
        var longAxis2 = sqrt(pow(intersection4.x - intersection4.z, 2) + pow(intersection4.y - intersection4.w, 2)) / 2;
        var shortAxis1 = range1 * smoothstep(0.0, 1.0, longAxis1 / sweepDistance);
        var shortAxis2 = range1 * smoothstep(0.0, 1.0, longAxis2 / sweepDistance);
        var origin1 = closestPointOnLine(vec2f(0, 0), vec2f(intersection3.xy), vec2f(intersection3.zw));
        var origin2 = closestPointOnLine(vec2f(0, 0), vec2f(intersection4.xy), vec2f(intersection4.zw));

        var x3 = toPixel.x - origin1.x;
        var y3 = toPixel.y - origin1.y;
        var x4 = x3 * cos(angle) + y3 * sin(angle);
        var y4 = -x3 * sin(angle) + y3 * cos(angle);
        var condition1 = x4 * x4 / (longAxis1 * longAxis1) + y4 * y4 / (shortAxis1 * shortAxis1);

        var x5 = toPixel.x - origin2.x;
        var y5 = toPixel.y - origin2.y;
        var x6 = x5 * cos(angle + PI) + y5 * sin(angle + PI);
        var y6 = -x5 * sin(angle + PI) + y5 * cos(angle + PI);
        var condition2 = x6 * x6 / (longAxis2 * longAxis2) + y6 * y6 / (shortAxis2 * shortAxis2);

        var b = offset2 - floor(offset2 / range) * range;

        if (toPixel.y >= y1 && toPixel.y <= y2 && condition1 >= 1 && condition2 >= 1) {
            sweep = smoothstep(0.0, 1.0, distance / 1.5);
            finalColor = vec4f(5, 5, 5, 1);
        }
    }
    
    return finalColor;
}