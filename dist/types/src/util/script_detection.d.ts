export declare function allowsIdeographicBreaking(chars: string): boolean;
export declare function allowsVerticalWritingMode(chars: string): boolean;
export declare function allowsLetterSpacing(chars: string): boolean;
export declare function charAllowsLetterSpacing(char: number): boolean;
export declare function charAllowsIdeographicBreaking(char: number): boolean;
/**
 * Returns true if the given Unicode codepoint identifies a character with
 * upright orientation.
 *
 * A character has upright orientation if it is drawn upright (unrotated)
 * whether the line is oriented horizontally or vertically, even if both
 * adjacent characters can be rotated. For example, a Chinese character is
 * always drawn upright. An uprightly oriented character causes an adjacent
 * “neutral” character to be drawn upright as well.
 */
export declare function charHasUprightVerticalOrientation(char: number): boolean;
/**
 * Returns true if the given Unicode codepoint identifies a character with
 * neutral orientation.
 *
 * A character has neutral orientation if it may be drawn rotated or unrotated
 * when the line is oriented vertically, depending on the orientation of the
 * adjacent characters. For example, along a verticlly oriented line, the vulgar
 * fraction ½ is drawn upright among Chinese characters but rotated among Latin
 * letters. A neutrally oriented character does not influence whether an
 * adjacent character is drawn upright or rotated.
 */
export declare function charHasNeutralVerticalOrientation(char: number): boolean;
/**
 * Returns true if the given Unicode codepoint identifies a character with
 * rotated orientation.
 *
 * A character has rotated orientation if it is drawn rotated when the line is
 * oriented vertically, even if both adjacent characters are upright. For
 * example, a Latin letter is drawn rotated along a vertical line. A rotated
 * character causes an adjacent “neutral” character to be drawn rotated as well.
 */
export declare function charHasRotatedVerticalOrientation(char: number): boolean;
export declare function charInComplexShapingScript(char: number): boolean;
export declare function charInRTLScript(char: number): boolean;
export declare function charInSupportedScript(char: number, canRenderRTL: boolean): boolean;
export declare function stringContainsRTLText(chars: string): boolean;
export declare function isStringInSupportedScript(chars: string, canRenderRTL: boolean): boolean;
