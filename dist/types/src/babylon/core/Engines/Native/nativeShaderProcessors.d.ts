import type { Nullable } from "core/types";
import type { IShaderProcessor } from "../Processors/iShaderProcessor";
import type { NativeShaderProcessingContext } from "./nativeShaderProcessingContext";
import type { _IShaderProcessingContext } from "../Processors/shaderProcessingOptions";
import { ShaderLanguage } from "../../Materials/shaderLanguage";
/** @internal */
export declare class NativeShaderProcessor implements IShaderProcessor {
    shaderLanguage: ShaderLanguage;
    protected _nativeProcessingContext: Nullable<NativeShaderProcessingContext>;
    initializeShaders(processingContext: Nullable<_IShaderProcessingContext>): void;
    attributeProcessor(attribute: string): string;
    varyingCheck(varying: string, _isFragment: boolean): boolean;
    varyingProcessor(varying: string, isFragment: boolean): string;
    postProcessor(code: string, defines: string[], isFragment: boolean): string;
}
