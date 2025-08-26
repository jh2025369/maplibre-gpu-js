import { ShaderLanguage } from "../../Materials/shaderLanguage";
import type { Nullable } from "../../types";
import type { IShaderProcessor } from "../Processors/iShaderProcessor";
import type { _IShaderProcessingContext } from "../Processors/shaderProcessingOptions";
/** @internal */
export declare class WebGLShaderProcessor implements IShaderProcessor {
    shaderLanguage: ShaderLanguage;
    postProcessor(code: string, defines: string[], isFragment: boolean, processingContext: Nullable<_IShaderProcessingContext>, parameters: {
        [key: string]: number | string | boolean | undefined;
    }): string;
}
