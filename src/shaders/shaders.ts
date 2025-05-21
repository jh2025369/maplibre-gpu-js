import convertWgsl, {WgslConvertParams} from './convert_wgsl';
import preludeVert from './ShadersInclude/_prelude.vertex.wgsl';
import lineVert from './line.vertex.wgsl';
import lineFrag from './line.fragment.wgsl';
import lineSDFVert from './line_sdf.vertex.wgsl';
import lineSDFFrag from './line_sdf.fragment.wgsl';
import testVert from './test.vertex.wgsl';
import testFrag from './test.fragment.wgsl';
import backgroundVert from './background.vertex.wgsl';
import backgroundFrag from './background.fragment.wgsl';
import clippingMaskVert from './clipping_mask.vertex.wgsl';
import clippingMaskFrag from './clipping_mask.fragment.wgsl';
import circleVert from './circle.vertex.wgsl';
import circleFrag from './circle.fragment.wgsl';
import fillVert from './fill.vertex.wgsl';
import fillFrag from './fill.fragment.wgsl';
import fillOutlineVert from './fill_outline.vertex.wgsl';
import fillOutlineFrag from './fill_outline.fragment.wgsl';
import fillOutlinePatternVert from './fill_outline_pattern.vertex.wgsl';
import fillOutlinePatternFrag from './fill_outline_pattern.fragment.wgsl';
import fillPatternVert from './fill_pattern.vertex.wgsl';
import fillPatternFrag from './fill_pattern.fragment.wgsl';
import fillExtrusionVert from './fill_extrusion.vertex.wgsl';
import fillExtrusionFrag from './fill_extrusion.fragment.wgsl';
import fillExtrusionPatternVert from './fill_extrusion_pattern.vertex.wgsl';
import fillExtrusionPatternFrag from './fill_extrusion_pattern.fragment.wgsl';
import terrainVert from './terrain.vertex.wgsl';
import terrainFrag from './terrain.fragment.wgsl';
import terrainDepthFrag from './terrain_depth.fragment.wgsl';
import terrainCoordsFrag from './terrain_coords.fragment.wgsl';
import rasterVert from './raster.vertex.wgsl';
import rasterFrag from './raster.fragment.wgsl';
import hillshadeVert from './hillshade.vertex.wgsl';
import hillshadeFrag from './hillshade.fragment.wgsl';
import hillshadePrepareVert from './hillshade_prepare.vertex.wgsl';
import hillshadePrepareFrag from './hillshade_prepare.fragment.wgsl';
import {ShaderStore} from 'core/Engines';

export const shaders = {};

ShaderStore.IncludesShadersStoreWGSL['preludeVertex'] = preludeVert;

export const shaderTemplates = {
    line: [lineVert, lineFrag],
    lineSDF: [lineSDFVert, lineSDFFrag],
    test: [testVert, testFrag],
    background: [backgroundVert, backgroundFrag],
    clippingMask: [clippingMaskVert, clippingMaskFrag],
    circle: [circleVert, circleFrag],
    fill: [fillVert, fillFrag],
    fillPattern: [fillPatternVert, fillPatternFrag],
    fillOutline: [fillOutlineVert, fillOutlineFrag],
    fillOutlinePattern: [fillOutlinePatternVert, fillOutlinePatternFrag],
    fillExtrusion: [fillExtrusionVert, fillExtrusionFrag],
    fillExtrusionPattern: [fillExtrusionPatternVert, fillExtrusionPatternFrag],
    terrain: [terrainVert, terrainFrag],
    terrainDepth: [terrainVert, terrainDepthFrag],
    terrainCoords: [terrainVert, terrainCoordsFrag],
    raster: [rasterVert, rasterFrag],
    hillshade: [hillshadeVert, hillshadeFrag],
    hillshadePrepare: [hillshadePrepareVert, hillshadePrepareFrag],
};

export function generateShader(key: string, shaderName: string, cvtParams: WgslConvertParams) {
    const [vertexCode, fragmentCode] = shaderTemplates[shaderName];

    const {wgslCode: vertexSource, paramKeys, vertexInputKeys} = convertWgsl(vertexCode, cvtParams);
    const {wgslCode: fragmentSource} = convertWgsl(fragmentCode, cvtParams);

    ShaderStore.ShadersStoreWGSL[`${key}VertexShader`] = vertexSource;
    ShaderStore.ShadersStoreWGSL[`${key}FragmentShader`] = fragmentSource;

    return {vertexSource, fragmentSource, paramKeys, vertexInputKeys};
}
