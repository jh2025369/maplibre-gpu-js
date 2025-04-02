import { WgslConvertParams } from './convert_wgsl';
export declare const shaders: {};
export declare const shaderTemplates: {
    line: string[];
    lineSDF: string[];
    test: string[];
    background: string[];
    clippingMask: string[];
    circle: string[];
    fill: string[];
    fillPattern: string[];
    fillOutline: string[];
    fillOutlinePattern: string[];
    fillExtrusion: string[];
    fillExtrusionPattern: string[];
    terrain: string[];
    terrainDepth: string[];
    terrainCoords: string[];
    raster: string[];
};
export declare function generateShader(key: string, shaderName: string, cvtParams: WgslConvertParams): {
    vertexSource: string;
    fragmentSource: string;
    paramKeys: string[];
    vertexInputKeys: string[];
};
