export interface WgslConvertParams {
    vertexParams: {
        name: string;
    };
    fragmentParams: {
        name: string;
    };
    vertexInput: {
        name: string;
        convertSymbols: string[];
    };
    vertexOutput: {
        name: string;
        convertSymbols: string[];
    };
    fragmentInput: {
        name: string;
        convertSymbols: string[];
    };
}
export interface WgslAnalyseResult {
    paramKeys: string[];
    vertexInputKeys: string[];
}
export interface WgslConvertResult extends WgslAnalyseResult {
    wgslCode: string;
}
export interface CodeBlockInfo {
    start: number;
    bracketStart: number;
    end: number;
    content: string;
    replacer: string;
    match: RegExpExecArray | undefined;
    deleteWithSemicolon: boolean;
}
export default function (wgslCode: string, cvtParams: WgslConvertParams): WgslConvertResult;
