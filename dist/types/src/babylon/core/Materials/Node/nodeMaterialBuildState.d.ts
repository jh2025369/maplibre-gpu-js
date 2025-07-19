import { NodeMaterialBlockConnectionPointTypes } from "./Enums/nodeMaterialBlockConnectionPointTypes";
import { NodeMaterialBlockTargets } from "./Enums/nodeMaterialBlockTargets";
import type { NodeMaterialBuildStateSharedData } from "./nodeMaterialBuildStateSharedData";
import { ShaderLanguage } from "../shaderLanguage";
import type { NodeMaterialConnectionPoint } from "./nodeMaterialBlockConnectionPoint";
import type { NodeMaterialBlock } from "./nodeMaterialBlock";
/**
 * Class used to store node based material build state
 */
export declare class NodeMaterialBuildState {
    /** Gets or sets a boolean indicating if the current state can emit uniform buffers */
    supportUniformBuffers: boolean;
    /**
     * Gets the list of emitted attributes
     */
    attributes: string[];
    /**
     * Gets the list of emitted uniforms
     */
    uniforms: string[];
    /**
     * Gets the list of emitted constants
     */
    constants: string[];
    /**
     * Gets the list of emitted samplers
     */
    samplers: string[];
    /**
     * Gets the list of emitted functions
     */
    functions: {
        [key: string]: string;
    };
    /**
     * Gets the list of emitted extensions
     */
    extensions: {
        [key: string]: string;
    };
    /**
     * Gets the list of emitted prePass outputs - if using the prepass
     */
    prePassOutput: {
        [key: string]: string;
    };
    /**
     * Gets the target of the compilation state
     */
    target: NodeMaterialBlockTargets;
    /**
     * Gets the list of emitted counters
     */
    counters: {
        [key: string]: number;
    };
    /**
     * Shared data between multiple NodeMaterialBuildState instances
     */
    sharedData: NodeMaterialBuildStateSharedData;
    /** @internal */
    _terminalBlocks: Set<NodeMaterialBlock>;
    /** @internal */
    _vertexState: NodeMaterialBuildState;
    /** @internal */
    _attributeDeclaration: string;
    /** @internal */
    _uniformDeclaration: string;
    /** @internal */
    _constantDeclaration: string;
    /** @internal */
    _samplerDeclaration: string;
    /** @internal */
    _varyingTransfer: string;
    /** @internal */
    _injectAtEnd: string;
    private _repeatableContentAnchorIndex;
    /** @internal */
    _builtCompilationString: string;
    /**
     * Gets the emitted compilation strings
     */
    compilationString: string;
    /**
     * Gets the current shader language to use
     */
    get shaderLanguage(): ShaderLanguage;
    /** Gets suffix to add behind type casting */
    get fSuffix(): "f" | "";
    /**
     * Finalize the compilation strings
     * @param state defines the current compilation state
     */
    finalize(state: NodeMaterialBuildState): void;
    /** @internal */
    get _repeatableContentAnchor(): string;
    /**
     * @internal
     */
    _getFreeVariableName(prefix: string): string;
    /**
     * @internal
     */
    _getFreeDefineName(prefix: string): string;
    /**
     * @internal
     */
    _excludeVariableName(name: string): void;
    /**
     * @internal
     */
    _emit2DSampler(name: string, define?: string, force?: boolean): void;
    /**
     * @internal
     */
    _emitCubeSampler(name: string, define?: string, force?: boolean): void;
    /**
     * @internal
     */
    _emit2DArraySampler(name: string): void;
    /**
     * @internal
     */
    _getGLType(type: NodeMaterialBlockConnectionPointTypes): string;
    /**
     * @internal
     */
    _getShaderType(type: NodeMaterialBlockConnectionPointTypes): "" | "int" | "float" | "i32" | "f32" | "vec2f" | "vec2" | "vec3f" | "vec3" | "vec4f" | "vec4" | "mat4x4f" | "mat4";
    /**
     * @internal
     */
    _emitExtension(name: string, extension: string, define?: string): void;
    /**
     * @internal
     */
    _emitFunction(name: string, code: string, comments: string): void;
    /**
     * @internal
     */
    _emitCodeFromInclude(includeName: string, comments: string, options?: {
        replaceStrings?: {
            search: RegExp;
            replace: string;
        }[];
        repeatKey?: string;
        substitutionVars?: string;
    }): string;
    /**
     * @internal
     */
    _emitFunctionFromInclude(includeName: string, comments: string, options?: {
        repeatKey?: string;
        substitutionVars?: string;
        removeAttributes?: boolean;
        removeUniforms?: boolean;
        removeVaryings?: boolean;
        removeIfDef?: boolean;
        replaceStrings?: {
            search: RegExp;
            replace: string;
        }[];
    }, storeKey?: string): void;
    /**
     * @internal
     */
    _registerTempVariable(name: string): boolean;
    /**
     * @internal
     */
    _emitVaryingFromString(name: string, type: NodeMaterialBlockConnectionPointTypes, define?: string, notDefine?: boolean): boolean;
    /**
     * @internal
     */
    _getVaryingName(name: string): string;
    /**
     * @internal
     */
    _emitUniformFromString(name: string, type: NodeMaterialBlockConnectionPointTypes, define?: string, notDefine?: boolean): void;
    /**
     * @internal
     */
    _generateTernary(trueStatement: string, falseStatement: string, condition: string): string;
    /**
     * @internal
     */
    _emitFloat(value: number): string;
    /**
     * @internal
     */
    _declareOutput(output: NodeMaterialConnectionPoint, isConst?: boolean): string;
    /**
     * @internal
     */
    _declareLocalVar(name: string, type: NodeMaterialBlockConnectionPointTypes, isConst?: boolean): string;
    /**
     * @internal
     */
    _samplerCubeFunc(): "textureCube" | "textureSample";
    /**
     * @internal
     */
    _samplerFunc(): "texture2D" | "textureSample";
    /**
     * @internal
     */
    _samplerLODFunc(): "textureSampleLevel" | "texture2DLodEXT";
    _toLinearSpace(output: NodeMaterialConnectionPoint): string;
    /**
     * @internal
     */
    _generateTextureSample(uv: string, samplerName: string): string;
    /**
     * @internal
     */
    _generateTextureSampleLOD(uv: string, samplerName: string, lod: string): string;
    /**
     * @internal
     */
    _generateTextureSampleCube(uv: string, samplerName: string): string;
    /**
     * @internal
     */
    _generateTextureSampleCubeLOD(uv: string, samplerName: string, lod: string): string;
    private _convertVariableDeclarationToWGSL;
    private _convertVariableConstructorsToWGSL;
    private _convertOutParametersToWGSL;
    private _convertTernaryOperandsToWGSL;
    private _convertModOperatorsToWGSL;
    private _convertConstToWGSL;
    private _convertInnerFunctionsToWGSL;
    private _convertFunctionsToWGSL;
    _babylonSLtoWGSL(code: string): string;
    private _convertTernaryOperandsToGLSL;
    _babylonSLtoGLSL(code: string): string;
}
