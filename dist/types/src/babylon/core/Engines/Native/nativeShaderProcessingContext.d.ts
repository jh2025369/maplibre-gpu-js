import type { ShaderProcessingContext } from "../Processors/shaderProcessingOptions";
/**
 * @internal
 */
export declare class NativeShaderProcessingContext implements ShaderProcessingContext {
    vertexBufferKindToNumberOfComponents: {
        [kind: string]: number;
    };
    remappedAttributeNames: {
        [name: string]: string;
    };
    injectInVertexMain: string;
}
