#ifdef TERRAIN3D
struct TerrainUniforms {
    u_terrain_dim: f32,
    u_terrain_matrix: mat4x4<f32>,
    u_terrain_unpack: vec4<f32>,
    u_terrain_exaggeration: f32,
};

var<uniform> terrain: TerrainUniforms;
var u_terrain: texture_2d<f32>;
var u_terrainSampler: sampler;
var u_depth: texture_2d<f32>;
var u_depthSampler: sampler;
#endif

fn unpack_float(packedValue: f32) -> vec2<f32> {
    let packedIntValue = i32(packedValue);
    let v0 = packedIntValue / 256;
    return vec2<f32>(f32(v0), f32(packedIntValue) - f32(v0) * 256.0);
}

fn unpack_opacity(packedOpacity: f32) -> vec2<f32> {
    let intOpacity = i32(packedOpacity) / 2;
    return vec2<f32>(f32(intOpacity) / 127.0, packedOpacity % 2.0);
}

fn decode_color(encodedColor: vec2<f32>) -> vec4<f32> {
    return vec4<f32>(
        unpack_float(encodedColor[0]) / 255.0,
        unpack_float(encodedColor[1]) / 255.0
    );
}

fn unpack_mix_vec2(packedValue: vec2<f32>, t: f32) -> f32 {
    return mix(packedValue[0], packedValue[1], t);
}

fn unpack_mix_color(packedColors: vec4<f32>, t: f32) -> vec4<f32> {
    let minColor = decode_color(vec2<f32>(packedColors[0], packedColors[1]));
    let maxColor = decode_color(vec2<f32>(packedColors[2], packedColors[3]));
    return mix(minColor, maxColor, t);
}

fn get_pattern_pos(
    pixel_coord_upper: vec2<f32>, 
    pixel_coord_lower: vec2<f32>,
    pattern_size: vec2<f32>, 
    tile_units_to_pixels: f32, 
    pos: vec2<f32>
) -> vec2<f32> {
    let temp = pixel_coord_upper % pattern_size;
    let temp2 = temp * 256.0 % pattern_size;
    let temp3 = temp2 * 256.0 + pixel_coord_lower;
    let offset = temp3 % pattern_size;
    return (tile_units_to_pixels * pos + offset) / pattern_size;
}

const bitSh = vec4<f32>(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);
const bitShifts = vec4<f32>(1.0) / bitSh;

fn unpack(color: vec4<f32>) -> f32 {
    return dot(color, bitShifts);
}

fn depthOpacity(frag: vec3<f32>) -> f32 {
    #ifdef TERRAIN3D
        let texel = textureLoad(u_depth, frag.xy * 0.5 + 0.5, 0);
        let d = unpack(texel) + 0.0001 - frag.z;
        return 1.0 - max(0.0, min(1.0, -d * 500.0));
    #else
        return 1.0;
    #endif
}

fn calculate_visibility(pos: vec4<f32>) -> f32 {
    #ifdef TERRAIN3D
        let frag = pos.xyz / pos.w;
        let d = depthOpacity(frag);
        if (d > 0.95) {
            return 1.0;
        } else {
            return (d + depthOpacity(frag + vec3<f32>(0.0, 0.01, 0.0))) / 2.0;
        }
    #else
        return 1.0;
    #endif
}

fn ele(pos: vec2<f32>) -> f32 {
    #ifdef TERRAIN3D
        let texel = textureLoad(u_terrain, vec2<i32>(pos), 0);
        let rgb = (texel * 255.0) * terrain.u_terrain_unpack;
        return rgb.r + rgb.g + rgb.b - terrain.u_terrain_unpack.a;
    #else
        return 0.0;
    #endif
}

fn get_elevation(pos: vec2<f32>) -> f32 {
    #ifdef TERRAIN3D
        let coord = (terrain.u_terrain_matrix * vec4<f32>(pos, 0.0, 1.0)).xy * terrain.u_terrain_dim + 1.0;
        let f = fract(coord);
        let c = (floor(coord) + 0.5) / (terrain.u_terrain_dim + 2.0);
        let d = 1.0 / (terrain.u_terrain_dim + 2.0);
        let tl = ele(c);
        let tr = ele(c + vec2<f32>(d, 0.0));
        let bl = ele(c + vec2<f32>(0.0, d));
        let br = ele(c + vec2<f32>(d, d));
        let elevation = mix(mix(tl, tr, f.x), mix(bl, br, f.x), f.y);
        return elevation * terrain.u_terrain_exaggeration;
    #else
        return 0.0;
    #endif
}