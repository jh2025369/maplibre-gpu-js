import type { Nullable } from "../types";
import type { IPipelineContext } from "./IPipelineContext";
import type { ShaderProcessingContext } from "./Processors/shaderProcessingOptions";
import { WebGLPipelineContext } from "./WebGL/webGLPipelineContext";
import type { _loadFile } from "./abstractEngine.functions";
/**
 * @internal
 */
export interface IThinEngineStateObject {
    _contextWasLost?: boolean;
    validateShaderPrograms?: boolean;
    _webGLVersion: number;
    parallelShaderCompile?: {
        COMPLETION_STATUS_KHR: number;
    };
    _context?: WebGLContext;
    _createShaderProgramInjection?: typeof _createShaderProgram;
    createRawShaderProgramInjection?: typeof createRawShaderProgram;
    createShaderProgramInjection?: typeof createShaderProgram;
    loadFileInjection?: typeof _loadFile;
    cachedPipelines: {
        [name: string]: IPipelineContext;
    };
}
/**
 * get or create a state object for the given context
 * Note - Used in WebGL only at the moment.
 * @param context The context to get the state object from
 * @returns the state object
 * @internal
 */
export declare function getStateObject(context: WebGLContext): IThinEngineStateObject;
/**
 * Remove the state object that belongs to the specific context
 * @param context the context that is being
 */
export declare function deleteStateObject(context: WebGLContext): void;
export type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;
/**
 * Directly creates a webGL program
 * @param pipelineContext  defines the pipeline context to attach to
 * @param vertexCode defines the vertex shader code to use
 * @param fragmentCode defines the fragment shader code to use
 * @param context defines the webGL context to use (if not set, the current one will be used)
 * @param transformFeedbackVaryings defines the list of transform feedback varyings to use
 * @param _createShaderProgramInjection defines an optional injection to use to create the shader program
 * @returns the new webGL program
 */
export declare function createRawShaderProgram(pipelineContext: IPipelineContext, vertexCode: string, fragmentCode: string, context: WebGLContext, transformFeedbackVaryings: Nullable<string[]>, _createShaderProgramInjection?: typeof _createShaderProgram): WebGLProgram;
/**
 * Creates a webGL program
 * @param pipelineContext  defines the pipeline context to attach to
 * @param vertexCode  defines the vertex shader code to use
 * @param fragmentCode defines the fragment shader code to use
 * @param defines defines the string containing the defines to use to compile the shaders
 * @param context defines the webGL context to use (if not set, the current one will be used)
 * @param transformFeedbackVaryings defines the list of transform feedback varyings to use
 * @param _createShaderProgramInjection defines an optional injection to use to create the shader program
 * @returns the new webGL program
 */
export declare function createShaderProgram(pipelineContext: IPipelineContext, vertexCode: string, fragmentCode: string, defines: Nullable<string>, context: WebGLContext, transformFeedbackVaryings?: Nullable<string[]>, _createShaderProgramInjection?: typeof _createShaderProgram): WebGLProgram;
/**
 * Creates a new pipeline context. Note, make sure to attach an engine instance to the created context
 * @param context defines the webGL context to use (if not set, the current one will be used)
 * @param _shaderProcessingContext defines the shader processing context used during the processing if available
 * @returns the new pipeline
 */
export declare function createPipelineContext(context: WebGLContext, _shaderProcessingContext: Nullable<ShaderProcessingContext>): IPipelineContext;
/**
 * @internal
 */
export declare function _createShaderProgram(pipelineContext: WebGLPipelineContext, vertexShader: WebGLShader, fragmentShader: WebGLShader, context: WebGLContext, _transformFeedbackVaryings?: Nullable<string[]>, validateShaderPrograms?: boolean): WebGLProgram;
/**
 * @internal
 */
export declare function _isRenderingStateCompiled(pipelineContext: IPipelineContext, gl: WebGLContext, validateShaderPrograms?: boolean): boolean;
/**
 * @internal
 */
export declare function _finalizePipelineContext(pipelineContext: WebGLPipelineContext, gl: WebGLContext, validateShaderPrograms?: boolean): void;
/**
 * @internal
 */
export declare function _preparePipelineContext(pipelineContext: IPipelineContext, vertexSourceCode: string, fragmentSourceCode: string, createAsRaw: boolean, _rawVertexSourceCode: string, _rawFragmentSourceCode: string, rebuildRebind: any, defines: Nullable<string>, transformFeedbackVaryings: Nullable<string[]>, _key: string, onReady: () => void, createRawShaderProgramInjection?: typeof createRawShaderProgram, createShaderProgramInjection?: typeof createShaderProgram): void;
/**
 * @internal
 */
export declare function _setProgram(program: WebGLProgram, gl: WebGLContext): void;
/**
 * @internal
 */
export declare function _executeWhenRenderingStateIsCompiled(pipelineContext: IPipelineContext, action: (pipelineContext?: IPipelineContext) => void): void;
