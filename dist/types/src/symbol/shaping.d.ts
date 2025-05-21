import type { StyleGlyph, GlyphMetrics } from '../style/style_glyph';
import type { ImagePosition } from '../render/image_atlas';
import type { Rect, GlyphPosition } from '../render/glyph_atlas';
import { Formatted } from '@maplibre/maplibre-gl-style-spec';
declare enum WritingMode {
    none = 0,
    horizontal = 1,
    vertical = 2,
    horizontalOnly = 3
}
declare const SHAPING_DEFAULT_OFFSET = -17;
export { shapeText, shapeIcon, fitIconToText, getAnchorAlignment, WritingMode, SHAPING_DEFAULT_OFFSET };
export type PositionedGlyph = {
    glyph: number;
    imageName: string | null;
    x: number;
    y: number;
    vertical: boolean;
    scale: number;
    fontStack: string;
    sectionIndex: number;
    metrics: GlyphMetrics;
    rect: Rect | null;
};
export type PositionedLine = {
    positionedGlyphs: Array<PositionedGlyph>;
    lineOffset: number;
};
export type Shaping = {
    positionedLines: Array<PositionedLine>;
    top: number;
    bottom: number;
    left: number;
    right: number;
    writingMode: WritingMode.horizontal | WritingMode.vertical;
    text: string;
    iconsInText: boolean;
    verticalizable: boolean;
};
export type SymbolAnchor = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type TextJustify = 'left' | 'center' | 'right';
declare function shapeText(text: Formatted, glyphMap: {
    [_: string]: {
        [_: number]: StyleGlyph;
    };
}, glyphPositions: {
    [_: string]: {
        [_: number]: GlyphPosition;
    };
}, imagePositions: {
    [_: string]: ImagePosition;
}, defaultFontStack: string, maxWidth: number, lineHeight: number, textAnchor: SymbolAnchor, textJustify: TextJustify, spacing: number, translate: [number, number], writingMode: WritingMode.horizontal | WritingMode.vertical, allowVerticalPlacement: boolean, symbolPlacement: string, layoutTextSize: number, layoutTextSizeThisZoom: number): Shaping | false;
declare function getAnchorAlignment(anchor: SymbolAnchor): {
    horizontalAlign: number;
    verticalAlign: number;
};
export type PositionedIcon = {
    image: ImagePosition;
    top: number;
    bottom: number;
    left: number;
    right: number;
    collisionPadding?: [number, number, number, number];
};
declare function shapeIcon(image: ImagePosition, iconOffset: [number, number], iconAnchor: SymbolAnchor): PositionedIcon;
declare function fitIconToText(shapedIcon: PositionedIcon, shapedText: Shaping, textFit: string, padding: [number, number, number, number], iconOffset: [number, number], fontScale: number): PositionedIcon;
