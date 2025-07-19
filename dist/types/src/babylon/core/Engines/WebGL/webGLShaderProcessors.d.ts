import { ShaderLanguage } from "../../Materials/shaderLanguage";
import type { Nullable } from "../../types";
import type { IShaderProcessor } from "../Processors/iShaderProcessor";
import type { ShaderProcessingContext } from "../Processors/shaderProcessingOptions";
/** @internal */
export declare class WebGLShaderProcessor implements IShaderProcessor {
    shaderLanguage: ShaderLanguage;
    postProcessor(code: string, defines: string[], isFragment: boolean, processingContext: Nullable<ShaderProcessingContext>, parameters: {
        [key: string]: number | string | boolean | undefined;
    }): string;
}
