/**
 * Extracts the characters between two markers (for eg, between "(" and ")"). The function handles nested markers as well as markers inside strings (delimited by ", ' or `) and comments
 * @param markerOpen opening marker
 * @param markerClose closing marker
 * @param block code block to parse
 * @param startIndex starting index in block where the extraction must start. The character at block[startIndex] should be the markerOpen character!
 * @returns index of the last character for the extraction (or -1 if the string is invalid - no matching closing marker found). The string to extract (without the markers) is the string between startIndex + 1 and the returned value (exclusive)
 */
export function ExtractBetweenMarkers(markerOpen: string, markerClose: string, block: string, startIndex: number): number {
    let currPos = startIndex,
        openMarkers = 0,
        waitForChar = "";

    while (currPos < block.length) {
        const currChar = block.charAt(currPos);

        if (!waitForChar) {
            switch (currChar) {
                case markerOpen:
                    openMarkers++;
                    break;
                case markerClose:
                    openMarkers--;
                    break;
                case '"':
                case "'":
                case "`":
                    waitForChar = currChar;
                    break;
                case "/":
                    if (currPos + 1 < block.length) {
                        const nextChar = block.charAt(currPos + 1);
                        if (nextChar === "/") {
                            waitForChar = "\n";
                        } else if (nextChar === "*") {
                            waitForChar = "*/";
                        }
                    }
                    break;
            }
        } else {
            if (currChar === waitForChar) {
                if (waitForChar === '"' || waitForChar === "'") {
                    block.charAt(currPos - 1) !== "\\" && (waitForChar = "");
                } else {
                    waitForChar = "";
                }
            } else if (waitForChar === "*/" && currChar === "*" && currPos + 1 < block.length) {
                block.charAt(currPos + 1) === "/" && (waitForChar = "");
                if (waitForChar === "") {
                    currPos++;
                }
            }
        }

        currPos++;
        if (openMarkers === 0) {
            break;
        }
    }

    return openMarkers === 0 ? currPos - 1 : -1;
}

/**
 * Parses a string and skip whitespaces
 * @param s string to parse
 * @param index index where to start parsing
 * @returns the index after all whitespaces have been skipped
 */
export function SkipWhitespaces(s: string, index: number): number {
    while (index < s.length) {
        const c = s[index];
        if (c !== " " && c !== "\n" && c !== "\r" && c !== "\t" && c !== "\u000a" && c !== "\u00a0") {
            break;
        }
        index++;
    }

    return index;
}

/**
 * Checks if a character is an identifier character (meaning, if it is 0-9, A-Z, a-z or _)
 * @param c character to check
 * @returns true if the character is an identifier character
 */
export function IsIdentifierChar(c: string): boolean {
    const v = c.charCodeAt(0);
    return (
        (v >= 48 && v <= 57) || // 0-9
        (v >= 65 && v <= 90) || // A-Z
        (v >= 97 && v <= 122) || // a-z
        v == 95
    ); // _
}

/**
 * Removes the comments of a code block
 * @param block code block to parse
 * @returns block with the comments removed
 */
export function RemoveComments(block: string): string {
    let currPos = 0,
        waitForChar = "",
        inComments = false;
    const s = [];

    while (currPos < block.length) {
        const currChar = block.charAt(currPos);

        if (!waitForChar) {
            switch (currChar) {
                case '"':
                case "'":
                case "`":
                    waitForChar = currChar;
                    break;
                case "/":
                    if (currPos + 1 < block.length) {
                        const nextChar = block.charAt(currPos + 1);
                        if (nextChar === "/") {
                            waitForChar = "\n";
                            inComments = true;
                        } else if (nextChar === "*") {
                            waitForChar = "*/";
                            inComments = true;
                        }
                    }
                    break;
            }
            if (!inComments) {
                s.push(currChar);
            }
        } else {
            if (currChar === waitForChar) {
                if (waitForChar === '"' || waitForChar === "'") {
                    block.charAt(currPos - 1) !== "\\" && (waitForChar = "");
                    s.push(currChar);
                } else {
                    waitForChar = "";
                    inComments = false;
                }
            } else if (waitForChar === "*/" && currChar === "*" && currPos + 1 < block.length) {
                block.charAt(currPos + 1) === "/" && (waitForChar = "");
                if (waitForChar === "") {
                    inComments = false;
                    currPos++;
                }
            } else {
                if (!inComments) {
                    s.push(currChar);
                }
            }
        }

        currPos++;
    }

    return s.join("");
}

/**
 * Finds the first occurrence of a character in a string going backward
 * @param s the string to parse
 * @param index starting index in the string
 * @param c the character to find
 * @param c2 an optional second character to find
 * @returns the index of the character if found, else -1
 */
export function FindBackward(s: string, index: number, c: string, c2?: string): number {
    while (index >= 0 && s.charAt(index) !== c && (!c2 || s.charAt(index) !== c2)) {
        index--;
    }

    return index;
}

/**
 * Escapes a string so that it is usable as a regular expression
 * @param s string to escape
 * @returns escaped string
 */
export function EscapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Injects code at the beginning and/or end of a function.
 * The function is identified by "mainFuncDecl". The starting code is injected just after the first "\{" found after the mainFuncDecl.
 * The ending code is injected just before the last "\}" of the whole block of code (so, it is assumed that the function is the last of the block of code).
 * @param code code to inject into
 * @param mainFuncDecl Function declaration to find in the code (for eg: "void main")
 * @param startingCode The code to inject at the beginning of the function
 * @param endingCode The code to inject at the end of the function
 * @returns The code with the injected code
 */
export function InjectStartingAndEndingCode(code: string, mainFuncDecl: string, startingCode?: string, endingCode?: string): string {
    let idx = code.indexOf(mainFuncDecl);
    if (idx < 0) {
        return code;
    }
    if (startingCode) {
        // eslint-disable-next-line no-empty
        while (idx++ < code.length && code.charAt(idx) != "{") {}
        if (idx < code.length) {
            const part1 = code.substring(0, idx + 1);
            const part2 = code.substring(idx + 1);
            code = part1 + startingCode + part2;
        }
    }

    if (endingCode) {
        const lastClosingCurly = code.lastIndexOf("}");
        code = code.substring(0, lastClosingCurly);
        code += endingCode + "\n}";
    }

    return code;
}
