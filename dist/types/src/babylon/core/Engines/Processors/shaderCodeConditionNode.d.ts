import { ShaderCodeNode } from "./shaderCodeNode";
import type { _IProcessingOptions } from "./shaderProcessingOptions";
/** @internal */
export declare class ShaderCodeConditionNode extends ShaderCodeNode {
    process(preprocessors: {
        [key: string]: string;
    }, options: _IProcessingOptions, preProcessorsFromCode: {
        [key: string]: string;
    }): string;
}
