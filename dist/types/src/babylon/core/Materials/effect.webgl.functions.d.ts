import type { AbstractEngine } from "core/Engines/abstractEngine";
import type { IPipelineGenerationOptions } from "./effect.functions";
import type { IPipelineContext } from "core/Engines/IPipelineContext";
/**
 * Generate a pipeline context from the provided options
 * Note - at the moment only WebGL is supported
 * @param options the options to be used when generating the pipeline
 * @param context the context to be used when creating the pipeline
 * @param createPipelineContextInjection the function to create the pipeline context
 * @param _preparePipelineContextInjection the function to prepare the pipeline context
 * @returns a promise that resolves to the pipeline context
 */
export declare function generatePipelineContext(options: IPipelineGenerationOptions, context: WebGL2RenderingContext | WebGLRenderingContext, createPipelineContextInjection?: typeof AbstractEngine.prototype.createPipelineContext, _preparePipelineContextInjection?: typeof AbstractEngine.prototype._preparePipelineContext): Promise<IPipelineContext>;
