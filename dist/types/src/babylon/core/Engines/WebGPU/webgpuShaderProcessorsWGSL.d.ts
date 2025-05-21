import type { Nullable } from "../../types";
import type { ShaderProcessingContext } from "../Processors/shaderProcessingOptions";
import type { WebGPUBufferDescription } from "./webgpuShaderProcessingContext";
import { WebGPUShaderProcessor } from "./webgpuShaderProcessor";
import { ShaderLanguage } from "../../Materials/shaderLanguage";
import "../../ShadersWGSL/ShadersInclude/bakedVertexAnimationDeclaration";
import "../../ShadersWGSL/ShadersInclude/bakedVertexAnimation";
import "../../ShadersWGSL/ShadersInclude/instancesDeclaration";
import "../../ShadersWGSL/ShadersInclude/instancesVertex";
import "../../ShadersWGSL/ShadersInclude/helperFunctions";
import "../../ShadersWGSL/ShadersInclude/fresnelFunction";
import "../../ShadersWGSL/ShadersInclude/meshUboDeclaration";
import "../../ShadersWGSL/ShadersInclude/sceneUboDeclaration";
import "../../ShadersWGSL/ShadersInclude/decalFragment";
/** @internal */
export declare class WebGPUShaderProcessorWGSL extends WebGPUShaderProcessor {
    protected _attributesInputWGSL: string[];
    protected _attributesWGSL: string[];
    protected _attributesConversionCodeWGSL: string[];
    protected _hasNonFloatAttribute: boolean;
    protected _varyingsWGSL: string[];
    protected _varyingNamesWGSL: string[];
    protected _stridedUniformArrays: string[];
    shaderLanguage: ShaderLanguage;
    uniformRegexp: RegExp;
    textureRegexp: RegExp;
    noPrecision: boolean;
    pureMode: boolean;
    preProcessor(code: string, defines: string[], preProcessors: {
        [key: string]: string;
    }, isFragment: boolean, processingContext: Nullable<ShaderProcessingContext>): string;
    protected _getArraySize(name: string, uniformType: string, preProcessors: {
        [key: string]: string;
    }): [string, string, number];
    initializeShaders(processingContext: Nullable<ShaderProcessingContext>): void;
    preProcessShaderCode(code: string): string;
    varyingCheck(varying: string): boolean;
    varyingProcessor(varying: string, isFragment: boolean, preProcessors: {
        [key: string]: string;
    }): string;
    attributeProcessor(attribute: string, preProcessors: {
        [key: string]: string;
    }): string;
    uniformProcessor(uniform: string, isFragment: boolean, preProcessors: {
        [key: string]: string;
    }): string;
    textureProcessor(texture: string, isFragment: boolean, preProcessors: {
        [key: string]: string;
    }): string;
    postProcessor(code: string): string;
    finalizeShaders(vertexCode: string, fragmentCode: string): {
        vertexCode: string;
        fragmentCode: string;
    };
    protected _generateLeftOverUBOCode(name: string, uniformBufferDescription: WebGPUBufferDescription): string;
    private _processSamplers;
    private _processCustomBuffers;
    private _processStridedUniformArrays;
}
