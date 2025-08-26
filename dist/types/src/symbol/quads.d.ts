import Point from '@mapbox/point-geometry';
import type { Anchor } from './anchor';
import type { PositionedIcon, Shaping } from './shaping';
import type { SymbolStyleLayer } from '../style/style_layer/symbol_style_layer';
import type { Feature } from '@maplibre/maplibre-gl-style-spec';
import type { StyleImage } from '../style/style_image';
/**
 * A textured quad for rendering a single icon or glyph.
 *
 * The zoom range the glyph can be shown is defined by minScale and maxScale.
 *
 * @param tl - The offset of the top left corner from the anchor.
 * @param tr - The offset of the top right corner from the anchor.
 * @param bl - The offset of the bottom left corner from the anchor.
 * @param br - The offset of the bottom right corner from the anchor.
 * @param tex - The texture coordinates.
 */
export type SymbolQuad = {
    tl: Point;
    tr: Point;
    bl: Point;
    br: Point;
    tex: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    pixelOffsetTL: Point;
    pixelOffsetBR: Point;
    writingMode: any | void;
    glyphOffset: [number, number];
    sectionIndex: number;
    isSDF: boolean;
    minFontScaleX: number;
    minFontScaleY: number;
};
/**
 * Create the quads used for rendering an icon.
 */
export declare function getIconQuads(shapedIcon: PositionedIcon, iconRotate: number, isSDFIcon: boolean, hasIconTextFit: boolean): Array<SymbolQuad>;
/**
 * Create the quads used for rendering a text label.
 */
export declare function getGlyphQuads(anchor: Anchor, shaping: Shaping, textOffset: [number, number], layer: SymbolStyleLayer, alongLine: boolean, feature: Feature, imageMap: {
    [_: string]: StyleImage;
}, allowVerticalPlacement: boolean): Array<SymbolQuad>;
