
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

function findCodeBlock(code: string, regex: RegExp, bracketPairs: Record<number, number>): CodeBlockInfo {
    const codeBlockInfo = {start: 0, bracketStart: 0, end: 0, content: '', replacer: '', deleteWithSemicolon: false} as CodeBlockInfo;
    const match = regex.exec(code);
    if (match) {
        codeBlockInfo.start = match.index;
        codeBlockInfo.bracketStart = match.index + match[0].length - 1;
        codeBlockInfo.end = (bracketPairs?.[codeBlockInfo.bracketStart] ?? (match.index + match[0].length)) + 1;
        codeBlockInfo.content = code.substring(codeBlockInfo.start, codeBlockInfo.end);
        codeBlockInfo.match = match;
    }
    return codeBlockInfo;
}

function replaceReg(regex: RegExp, pattern: string): RegExp {
    return new RegExp(regex.source.replace('PATTERN', pattern), regex.flags);
}

function delSymbolsInUniform(block: CodeBlockInfo, symbols: string[]): Record<string, string> {
    const bracketPos = block.bracketStart - block.start;

    const declare = block.content.substring(0, bracketPos);
    const membersContent = block.content.substring(bracketPos + 1, block.content.length - 1);
    const members = membersContent.split('\n');
    const newMembers = [];

    const symbolsRegex = new RegExp(`\\b(${symbols.join('|')})\\b`);
    const symbolsTypeDict: Record<string, string> = {};

    let locationNumber = 0;
    for (let i = 0; i < members.length; i++) {
        const match = /\s*@location\s*\(\s*\d+\s*\)\s*(\w+)\s*:\s*([\w<>\d]+)\s*/gms.exec(members[i]);
        if (!match) {
            if (members[i] !== '\n' && members[i] !== '') {
                newMembers.push(`\n${members[i]}`);
            }
            continue;
        }
        if (symbolsRegex.test(match[1])) {
            symbolsTypeDict[match[1]] = match[2];
            continue;
        }
        newMembers.push(`\n    @location(${locationNumber}) ${match[1]}: ${match[2]},`);
        locationNumber++;
    }
    block.replacer = `${declare}{${newMembers.join('')}\n}`;

    return symbolsTypeDict;
}

function insertSymbolsInParams(block: CodeBlockInfo, symbolsTypeDict: Record<string, string>, blockName: string) {
    const bracketPos = block.bracketStart - block.start; // replacer 也不会改变 bracketStart
    const declare = block.content ? block.content.substring(0, bracketPos) : `struct ${blockName} `;
    const actualContent = block.replacer || block.content; // 可能存在第二次 insert
    const newMembers = actualContent ? actualContent.substring(bracketPos + 1, actualContent.length - 1).split(',') : [];

    if (newMembers.length > 0 && newMembers[newMembers.length - 1].match(/^\s*$/)) { // 去掉可能的结尾空行
        newMembers.pop();
    }

    for (const symbol of Object.keys(symbolsTypeDict)) {
        newMembers.push(`\n    ${symbol}: ${symbolsTypeDict[symbol]}`);
    }
    newMembers.push('\n');
    block.replacer = `${declare}{${newMembers.join(',')}}`;
}

function replaceSymbolsInMain(block: CodeBlockInfo, removeSymbols: string[], replaceRenameDict: Record<string, string>, paramsVarSymbol: string, deleteInput: boolean) {
    const bracketPos = block.bracketStart - block.start;
    let newDeclare = block.content.substring(0, bracketPos);
    if (deleteInput) {
        newDeclare = newDeclare.replace(/(@fragment\s+fn\s+\w+\s*)\(\s*(\w+)\s*:\s*\w+\s*\)/gms, '$1()');
    }
    const body = block.content.substring(bracketPos + 1, block.content.length - 1);

    const inputSymbol = block.match![1];
    const outputRegex = /\breturn\s+(\w+)\s*;/;
    const outputMatch = outputRegex.exec(body);
    if (!outputMatch) {
        throw new Error('Return statement not found in main function');
    }
    const outputSymbol = outputMatch[1];

    let newBody = body;

    if (removeSymbols.length > 0) {
        newBody = newBody.replace(replaceReg(/\b(PATTERN)\s*=\s*.+?;\n?/gms, removeSymbols.map(s => `${outputSymbol}\\s*\\.\\s*${s}`).join('|')), '');
    }

    for (const replaceSymbol of Object.keys(replaceRenameDict)) {
        newBody = newBody.replace(replaceReg(/\bPATTERN\b/gms, `${inputSymbol}\\s*\\.\\s*${replaceSymbol}`), `${paramsVarSymbol}.${replaceRenameDict[replaceSymbol]}`);
    }

    block.replacer = `${newDeclare}{${newBody}}`;
}

function findParamsKey(code: string): string[] {
    const keys: string[] = [];
    const regex = /(\w+)\s*:\s*\w+/gms;
    let match: RegExpExecArray | null;
    while (match = regex.exec(code)) {
        keys.push(match[1]);
    }
    return keys;
}

function findInputOutputKey(code: string): string[] {
    const keys: string[] = [];
    const regex = /\s*@location\s*\(\s*\d+\s*\)\s*(\w+)\s*:\s*(\w+)\s*/gms;
    let match: RegExpExecArray | null;
    while (match = regex.exec(code)) {
        keys.push(match[1]);
    }
    return keys;
}

export default function(wgslCode: string, cvtParams: WgslConvertParams): WgslConvertResult {

    // basic process ------------------------------------------

    wgslCode = wgslCode.replace(/\r/g, ''); // Remove windows CR characters

    const bracketPairs: Record<number, number> = {};
    const bracketStack: number[] = [];
    for (let i = 0; i < wgslCode.length; i++) {
        if (wgslCode[i] === '{') {
            bracketStack.push(i);
        } else if (wgslCode[i] === '}') {
            const start = bracketStack.pop();
            if (start === undefined) {
                throw new Error('Unmatched brackets in wgsl');
            }
            bracketPairs[start] = i;
        }
    }
    const changeBlocks: Set<CodeBlockInfo> = new Set();

    // basic blocks ------------------------------------------

    const vMainInfo = findCodeBlock(wgslCode, /@vertex\s+fn\s+\w+\s*\(\s*(\w+)\s*:\s*\w+\s*\)\s*->\s*.+?\s*{/gms, bracketPairs);
    const vMainDestructInfo = findCodeBlock(wgslCode, /@vertex\s+fn\s+\w+\s*\(\s*@location\s*\(\s*\d+\s*\)\s+(\w+)\s*:\s*\w+\s*\)\s*->\s*.+?\s*{/gms, bracketPairs);

    const fMainInfo = findCodeBlock(wgslCode, /@fragment\s+fn\s+\w+\s*\(\s*(\w+)\s*:\s*\w+\s*\)\s*->\s*.+?\s*{/gms, bracketPairs);

    const vParamsVarInfo = findCodeBlock(wgslCode, replaceReg(/\bvar\s*<\s*uniform\s*>\s+(\w+)\s*:\s*PATTERN\s*;/gms, cvtParams.vertexParams.name), bracketPairs);
    const fParamsVarInfo = findCodeBlock(wgslCode, replaceReg(/\bvar\s*<\s*uniform\s*>\s+(\w+)\s*:\s*PATTERN\s*;/gms, cvtParams.fragmentParams.name), bracketPairs);
    const paramsVarInfo = vParamsVarInfo.content ? vParamsVarInfo : fParamsVarInfo;

    const paramsVarSymbol = paramsVarInfo.content ? paramsVarInfo.match![1] : 'params';

    const structRegex = /\bstruct\s+PATTERN\s*{/gms;

    const vParamsInfo = findCodeBlock(wgslCode, replaceReg(structRegex, cvtParams.vertexParams.name), bracketPairs);
    const fParamsInfo = findCodeBlock(wgslCode, replaceReg(structRegex, cvtParams.fragmentParams.name), bracketPairs);
    const paramsInfo = vParamsInfo.content ? vParamsInfo : fParamsInfo;

    const insertSymbolsTypeDict: Record<string, string> = {};

    // vertex symbols ------------------------------------------

    const vSymbolsTypeDict: Record<string, string> = {};
    const vOutputSymbols: string[] = [];

    const vInputInfo = findCodeBlock(wgslCode, replaceReg(structRegex, cvtParams.vertexInput.name), bracketPairs);
    if (vInputInfo.content && cvtParams.vertexInput.convertSymbols.length > 0) {
        const typeDict = delSymbolsInUniform(vInputInfo, cvtParams.vertexInput.convertSymbols);
        Object.assign(vSymbolsTypeDict, typeDict);
        changeBlocks.add(vInputInfo);
    }
    const vOutputInfo = findCodeBlock(wgslCode, replaceReg(structRegex, cvtParams.vertexOutput.name), bracketPairs);
    if (vOutputInfo.content && cvtParams.vertexOutput.convertSymbols.length > 0) {
        const typeDict = delSymbolsInUniform(vOutputInfo, cvtParams.vertexOutput.convertSymbols);
        Object.assign(vSymbolsTypeDict, typeDict);
        vOutputSymbols.push(...Object.keys(typeDict));
        changeBlocks.add(vOutputInfo);
    }

    const vReplaceDict: Record<string, string> = {};
    for (const vInputSymbol of Object.keys(vSymbolsTypeDict)) {
        const paramsSymbol = vInputSymbol.replace(/^[va]_/, 'u_');
        vReplaceDict[vInputSymbol] = paramsSymbol;

        insertSymbolsTypeDict[paramsSymbol] = vSymbolsTypeDict[vInputSymbol];
    }

    if (Object.keys(vReplaceDict).length > 0 && vMainInfo.content) {
        replaceSymbolsInMain(vMainInfo, vOutputSymbols, vReplaceDict, paramsVarSymbol, false);
        changeBlocks.add(vMainInfo);
    }

    // fragment symbols ------------------------------------------

    const fSymbolsTypeDict: Record<string, string> = {};

    const fInputInfo = findCodeBlock(wgslCode, replaceReg(structRegex, cvtParams.fragmentInput.name), bracketPairs);
    if (fInputInfo.content && cvtParams.fragmentInput.convertSymbols.length > 0) {
        const typeDict = delSymbolsInUniform(fInputInfo, cvtParams.fragmentInput.convertSymbols);
        Object.assign(fSymbolsTypeDict, typeDict);
        changeBlocks.add(fInputInfo);

        // delete empty fragment input keys ------------------------------------------
        if (Object.keys(typeDict).length > 0) {
            const fragmentInputKeys = findInputOutputKey(fInputInfo.replacer);
            if (fragmentInputKeys.length === 0) {
                fInputInfo.deleteWithSemicolon = true;
            }
        }
    }

    const fReplaceDict: Record<string, string> = {};
    for (const fInputSymbol of Object.keys(fSymbolsTypeDict)) {
        const paramsSymbol = fInputSymbol.replace(/^[va]_/, 'u_');
        fReplaceDict[fInputSymbol] = paramsSymbol;

        insertSymbolsTypeDict[paramsSymbol] = fSymbolsTypeDict[fInputSymbol];
    }

    if (Object.keys(fReplaceDict).length > 0 && fMainInfo.content) {
        replaceSymbolsInMain(fMainInfo, [], fReplaceDict, paramsVarSymbol, fInputInfo.deleteWithSemicolon);
        changeBlocks.add(fMainInfo);
    }

    // insert params ------------------------------------------

    if (Object.keys(insertSymbolsTypeDict).length > 0) {
        // HARD COLOR to resolve v_xxx_color struct conflict
        for (const symbol in insertSymbolsTypeDict) {
            if (symbol.match(/_color$/)) {
                insertSymbolsTypeDict[symbol] = 'vec4f';
            }
        }

        insertSymbolsInParams(paramsInfo, insertSymbolsTypeDict, cvtParams.vertexParams.name);
        changeBlocks.add(paramsInfo);
    }

    // apply changes & return ------------------------------------------

    const blocks = Array.from(changeBlocks).filter(block => block.replacer);
    blocks.sort((a, b) => b.start - a.start);

    // insert default params ------------------------------------------

    if (paramsInfo.content || paramsInfo.replacer) {
        if (!paramsVarInfo.content && !paramsVarInfo.replacer) {
            paramsVarInfo.replacer = `var<uniform> params: ${cvtParams.vertexParams.name || cvtParams.fragmentParams.name}`;
            blocks.splice(blocks.indexOf(paramsInfo), 0, paramsVarInfo);
        }
    }

    for (const block of blocks) {
        if (block.deleteWithSemicolon) {
            const end = block.end + (wgslCode[block.end + 1] === ';' ? 1 : 0);
            wgslCode = wgslCode.substring(0, block.start) + wgslCode.substring(end);
        } else if (block.content) {
            const replacer = block.replacer;
            wgslCode = wgslCode.substring(0, block.start) + replacer + wgslCode.substring(block.end);
        } else {
            const replacer = `${block.replacer};\n\n`;
            wgslCode = wgslCode.substring(0, block.start) + replacer + wgslCode.substring(block.end);
        }
    }

    const paramKeys = findParamsKey(paramsInfo.replacer || paramsInfo.content);
    const vertexInputKeys = findInputOutputKey(vInputInfo.replacer || vInputInfo.content);
    if (vMainDestructInfo.content) {
        vertexInputKeys.push(vMainDestructInfo.match![1]);
    }

    return {wgslCode, paramKeys, vertexInputKeys};
}
