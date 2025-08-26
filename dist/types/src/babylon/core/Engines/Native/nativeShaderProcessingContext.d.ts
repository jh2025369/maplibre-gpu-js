import type { _IShaderProcessingContext } from "../Processors/shaderProcessingOptions";
/**
 * @internal
 */
export declare class NativeShaderProcessingContext implements _IShaderProcessingContext {
    vertexBufferKindToNumberOfComponents: {
        [kind: string]: number;
    };
    remappedAttributeNames: {
        [name: string]: string;
    };
    injectInVertexMain: string;
}
